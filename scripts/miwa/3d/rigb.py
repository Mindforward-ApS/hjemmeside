# Blender: put a humanoid skeleton into the full-3D Miwa (A-pose), skin it with automatic weights, save miwa3d.blend.
import bpy, os, math, sys
from mathutils import Vector
D = os.path.dirname(os.path.abspath(__file__)) + "/"
exec(open(D + "build.py").read().replace('if __name__ == "__main__"', 'if False'))
sc, ob, cam = build_scene()
SHIFT = ob.data.vertices[0].co.x - ob.data.vertices[0].co.x  # mesh already centred in build_scene

def J(xpx, vpx, ypx=0.0):  # front-image px (x from centre, row) + depth px -> world
    return Vector((xpx / 100, ypx / 100, (2528 - vpx) / 100))

B = {  # name: (head, tail, parent)
    "hips": (J(0, 1300, 10), J(0, 1150, 5), None),
    "spine": (J(0, 1150, 5), J(0, 980, 0), "hips"),
    "chest": (J(0, 980, 0), J(0, 800, 0), "spine"),
    "neck": (J(0, 800, 0), J(0, 690, -5), "chest"),
    "head": (J(0, 690, -5), J(0, 250, -10), "neck"),
}
for s, k in (("L", 1), ("R", -1)):  # L = her left = +x
    B[f"{s}_shoulder"] = (J(k * 40, 800, 0), J(k * 165, 860, 0), "chest")
    B[f"{s}_upper"] = (J(k * 165, 860, 0), J(k * 322, 1140, 0), f"{s}_shoulder")
    B[f"{s}_fore"] = (J(k * 322, 1140, 0), J(k * 478, 1395, 0), f"{s}_upper")
    B[f"{s}_hand"] = (J(k * 478, 1395, 0), J(k * 556, 1515, 0), f"{s}_fore")
    B[f"{s}_thigh"] = (J(k * 110, 1320, 20), J(k * 128, 1850, 15), "hips")
    B[f"{s}_shin"] = (J(k * 128, 1850, 15), J(k * 150, 2290, 35), f"{s}_thigh")
    B[f"{s}_foot"] = (J(k * 150, 2290, 35), J(k * 160, 2440, -150), f"{s}_shin")

ad = bpy.data.armatures.new("rig"); arm = bpy.data.objects.new("rig", ad); sc.collection.objects.link(arm)
bpy.context.view_layer.objects.active = arm; bpy.ops.object.mode_set(mode="EDIT")
for n, (h, t, p) in B.items():
    eb = ad.edit_bones.new(n); eb.head = h; eb.tail = t
    eb.align_roll(Vector((0, -1, 0)))
for n, (h, t, p) in B.items():
    if p: ad.edit_bones[n].parent = ad.edit_bones[p]; ad.edit_bones[n].use_connect = False
bpy.ops.object.mode_set(mode="OBJECT")

# hand-built weights: distance to each bone, but every bone only reaches its own body part (no fused legs, no arms
# pulling the chest apart), with soft hand-overs at the joints
import numpy as np
co = np.empty(len(ob.data.vertices) * 3, np.float32); ob.data.vertices.foreach_get("co", co); co = co.reshape(-1, 3) * 100
x, yv, v = co[:, 0], co[:, 1], 2528 - co[:, 2]
def sm(e0, e1, t):
    q = np.clip((t - e0) / (e1 - e0), 0, 1); return q * q * (3 - 2 * q)
names = list(B.keys())
def segd(n):
    a = np.array(B[n][0]) * 100; b = np.array(B[n][1]) * 100; ab = b - a
    t = np.clip(((co - a) @ ab) / (ab @ ab), 0, 1); return np.linalg.norm(co - (a + np.outer(t, ab)), axis=1)
Dm = np.stack([segd(n) for n in names], 1)
allow = np.ones_like(Dm)
TH = np.load(D + "torso_half.npy"); th = TH[np.clip(v.astype(int), 0, len(TH) - 1)]
# below the armpit the arm is everything outside the torso's own outline in the front image; above it, the shoulder
below = sm(960, 1010, v)
armzone = ((1 - below) * sm(130, 175, np.abs(x)) + below * sm(th + 4, th + 22, np.abs(x))) * (1 - sm(1540, 1580, v))
legzone = sm(1230, 1330, v)
for k, n in enumerate(names):
    side = 1 if n.startswith("L_") else -1
    if n.endswith(("upper", "fore", "hand")): allow[:, k] = armzone * sm(-10, 10, side * x)
    elif n.endswith("shoulder"): allow[:, k] = sm(30, 90, np.abs(x)) * (1 - sm(900, 960, v)) * sm(-10, 10, side * x)
    elif n.endswith(("thigh", "shin", "foot")): allow[:, k] = legzone * sm(-12, 12, side * x)
    elif n == "head": allow[:, k] = 1 - sm(650, 720, v)
    elif n == "neck": allow[:, k] = sm(560, 640, v) * (1 - sm(820, 880, v))
    elif n in ("chest", "spine"): allow[:, k] = (1 - sm(1250, 1350, v)) * (1 - armzone * 0.95)
    elif n == "hips": allow[:, k] = sm(1050, 1150, v) * (1 - armzone * 0.95)
Wm = np.exp(-(Dm - Dm.min(1, keepdims=True)) / 25.0) * allow
Wm /= np.maximum(Wm.sum(1, keepdims=True), 1e-9)
for k, n in enumerate(names):
    g = ob.vertex_groups.new(name=n)
    idx = np.nonzero(Wm[:, k] > 1e-3)[0]
    for i in idx: g.add([int(i)], float(Wm[i, k]), "REPLACE")
md = ob.modifiers.new("arm", "ARMATURE"); md.object = arm; ob.parent = arm
print("groups", len(ob.vertex_groups))
for b in arm.pose.bones: b.rotation_mode = "XYZ"
bpy.ops.wm.save_as_mainfile(filepath=D + "miwa3d.blend")
print("saved")
