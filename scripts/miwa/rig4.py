# Blender: Miwa v2 — a "Live2D-style" deep rig on her cut-out image. Legs with knees + IK (feet stay planted),
# hips/spine/chest, neck/head, a face bone that slides the features for a fake head turn, a jaw for talking,
# hair bones (bun with pencil + side curls) for follow-through, both arms. Renders transparent PNG frames per clip.
# Usage: blender -b -P rig2.py -- stills | clips
import bpy, sys, math, os
import numpy as np
from mathutils import Vector

S = os.path.dirname(os.path.abspath(__file__))
MODE = sys.argv[sys.argv.index("--") + 1] if "--" in sys.argv else "stills"
W, H, STEP = 1024, 1536, 5

def P(px, py):
    return Vector(((px - 512) / 100, 0, (H - py) / 100))

bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
for eng in ("BLENDER_EEVEE", "BLENDER_EEVEE_NEXT"):
    try:
        sc.render.engine = eng; break
    except TypeError:
        pass
sc.render.film_transparent = True
sc.render.resolution_x, sc.render.resolution_y = 720, 960
sc.render.image_settings.file_format = "PNG"; sc.render.image_settings.color_mode = "RGBA"
sc.view_settings.view_transform = "Standard"; sc.view_settings.look = "None"
sc.render.fps = 24
try: sc.eevee.taa_render_samples = 48
except Exception: pass
cam_d = bpy.data.cameras.new("cam"); cam_d.type = "ORTHO"; cam_d.ortho_scale = 16
cam = bpy.data.objects.new("cam", cam_d); sc.collection.objects.link(cam)
cam.location = (0, -30, (H - 736) / 100 + 30 * math.tan(math.radians(6))); cam.rotation_euler = (math.radians(84), 0, 0); sc.camera = cam

alpha = np.load(os.path.join(S, "alpha.npy"))
def build_mesh(name, img_path, mask_fn):
    nx, ny = W // STEP + 1, H // STEP + 1
    keep, verts, faces, uvs = {}, [], [], []
    def vid(i, j):
        k = (i, j)
        if k not in keep:
            px, py = min(i * STEP, W), min(j * STEP, H)
            keep[k] = len(verts); verts.append(P(px, py)); uvs.append((px / W, 1 - py / H))
        return keep[k]
    for j in range(ny - 1):
        for i in range(nx - 1):
            if mask_fn(i * STEP, j * STEP):
                faces.append((vid(i, j + 1), vid(i + 1, j + 1), vid(i + 1, j), vid(i, j)))
    me = bpy.data.meshes.new(name); me.from_pydata([tuple(v) for v in verts], [], faces); me.update()
    uvl = me.uv_layers.new()
    for poly in me.polygons:
        for li in poly.loop_indices:
            uvl.data[li].uv = uvs[me.loops[li].vertex_index]
    ob = bpy.data.objects.new(name, me); sc.collection.objects.link(ob)
    mat = bpy.data.materials.new(name); mat.use_nodes = True
    try: mat.surface_render_method = "DITHERED"
    except Exception: mat.blend_method = "HASHED"
    nt = mat.node_tree; nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    tex = nt.nodes.new("ShaderNodeTexImage"); tex.image = bpy.data.images.load(img_path); tex.interpolation = "Cubic"; tex.extension = "CLIP"
    em = nt.nodes.new("ShaderNodeEmission"); tr = nt.nodes.new("ShaderNodeBsdfTransparent"); mix = nt.nodes.new("ShaderNodeMixShader")
    nt.links.new(tex.outputs["Color"], em.inputs["Color"]); nt.links.new(tex.outputs["Alpha"], mix.inputs["Fac"])
    nt.links.new(tr.outputs[0], mix.inputs[1]); nt.links.new(em.outputs[0], mix.inputs[2]); nt.links.new(mix.outputs[0], out.inputs["Surface"])
    me.materials.append(mat)
    return ob

DEPTH = np.load(os.path.join(S, "depth.npy"))
def build_inflated(name, img_path):
    # Two shells (front toward the camera, back away from it) whose thickness comes from the inflated silhouette.
    nx, ny = W // STEP + 1, H // STEP + 1
    verts, faces, uvs, idx = [], [], [], {}
    for side in (0, 1):
        for j in range(ny):
            for i in range(nx):
                px, py = min(i * STEP, W - 1), min(j * STEP, H - 1)
                dz = float(DEPTH[py, px]) / 100 * (1 if side else -1)
                idx[(side, i, j)] = len(verts); verts.append(((px - 512) / 100, dz, (H - py) / 100)); uvs.append((px / W, 1 - py / H))
    for side in (0, 1):
        for j in range(ny - 1):
            for i in range(nx - 1):
                blk = alpha[j * STEP:j * STEP + STEP + 1, i * STEP:i * STEP + STEP + 1]
                if blk.size and blk.max() > 40:
                    q = [idx[(side, i, j + 1)], idx[(side, i + 1, j + 1)], idx[(side, i + 1, j)], idx[(side, i, j)]]
                    faces.append(q if side == 0 else q[::-1])
    me = bpy.data.meshes.new(name); me.from_pydata(verts, [], faces); me.update()
    # drop vertices no face uses
    used = np.zeros(len(verts), bool)
    for f in faces: used[list(f)] = True
    uvl = me.uv_layers.new()
    for poly in me.polygons:
        for li in poly.loop_indices: uvl.data[li].uv = uvs[me.loops[li].vertex_index]
    ob = bpy.data.objects.new(name, me); sc.collection.objects.link(ob)
    mat = bpy.data.materials.new(name); mat.use_nodes = True
    try: mat.surface_render_method = "DITHERED"
    except Exception: pass
    nt = mat.node_tree; nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    tex = nt.nodes.new("ShaderNodeTexImage"); tex.image = bpy.data.images.load(img_path); tex.interpolation = "Cubic"; tex.extension = "EXTEND"
    em = nt.nodes.new("ShaderNodeEmission"); tr = nt.nodes.new("ShaderNodeBsdfTransparent"); mix = nt.nodes.new("ShaderNodeMixShader")
    nt.links.new(tex.outputs["Color"], em.inputs["Color"]); nt.links.new(tex.outputs["Alpha"], mix.inputs["Fac"])
    nt.links.new(tr.outputs[0], mix.inputs[1]); nt.links.new(em.outputs[0], mix.inputs[2]); nt.links.new(mix.outputs[0], out.inputs["Surface"])
    me.materials.append(mat)
    return ob
body = build_inflated("body", os.path.join(S, "cut-glad-dil.png"))
lids = build_mesh("lids", os.path.join(S, "lids-full.png"), lambda x, y: 420 <= x <= 590 and 160 <= y <= 235)
for v in lids.data.vertices:
    px, py = int(v.co.x * 100 + 512), int(H - v.co.z * 100)
    v.co.y = -float(DEPTH[min(max(py, 0), H - 1), min(max(px, 0), W - 1)]) / 100 - 0.004

# ---------- armature ----------
B = {  # name: (head px, tail px, parent)  — deform bones
    "hips": ((512, 650), (512, 600), None),
    "spine": ((512, 600), (512, 500), "hips"),
    "chest": ((512, 500), (512, 390), "spine"),
    "neck": ((512, 390), (512, 330), "chest"),
    "head": ((512, 330), (505, 70), "neck"),
    "face": ((510, 250), (510, 190), "head"),
    "jaw": ((512, 300), (512, 270), "face"),
    "bun": ((490, 105), (470, 20), "head"),
    "curlL": ((415, 215), (408, 310), "head"),
    "curlR": ((600, 205), (606, 305), "head"),
    "L_up": ((420, 425), (245, 478), "chest"),
    "L_fore": ((245, 478), (200, 345), "L_up"),
    "L_hand": ((200, 345), (135, 250), "L_fore"),
    "R_up": ((604, 425), (790, 474), "chest"),
    "R_fore": ((790, 474), (832, 348), "R_up"),
    "R_hand": ((832, 348), (905, 252), "R_fore"),
    "L_thigh": ((468, 650), (440, 980), "hips"),
    "L_shin": ((440, 980), (440, 1330), "L_thigh"),
    "R_thigh": ((556, 650), (584, 980), "hips"),
    "R_shin": ((584, 980), (584, 1330), "R_thigh"),
    "L_foot": ((440, 1330), (420, 1420), "L_shin"),
    "R_foot": ((584, 1330), (610, 1420), "R_shin"),
}
EXTRA = {"L_ik": ((440, 1330), (440, 1300)), "R_ik": ((584, 1330), (584, 1300))}
ad = bpy.data.armatures.new("rig"); arm = bpy.data.objects.new("rig", ad); sc.collection.objects.link(arm)
bpy.context.view_layer.objects.active = arm; bpy.ops.object.mode_set(mode="EDIT")
for n, (h, t, *rest) in list(B.items()) + [(k, (v[0], v[1], None)) for k, v in EXTRA.items()]:
    p = rest[0] if rest else None
    eb = ad.edit_bones.new(n); eb.head = P(*h); eb.tail = P(*t); eb.align_roll(Vector((0, -1, 0)))
    if n in EXTRA: eb.use_deform = False
for n, (h, t, p) in B.items():
    if p: ad.edit_bones[n].parent = ad.edit_bones[p]
bpy.ops.object.mode_set(mode="OBJECT")

pb = arm.pose.bones
for b in pb: b.rotation_mode = "XYZ"
for side in "LR":
    c = pb[f"{side}_shin"].constraints.new("IK"); c.target = arm; c.subtarget = f"{side}_ik"; c.chain_count = 2; c.name = "IK"
    for bn in (f"{side}_thigh", f"{side}_shin"):
        pb[bn].lock_ik_x = True; pb[bn].lock_ik_y = True

# ---------- weights ----------
def seg_dist(p, a, b):
    ab = b - a; t = np.clip(((p - a) @ ab) / (ab @ ab), 0, 1)
    return np.linalg.norm(p - (a + np.outer(t, ab)), axis=1)
def sm(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t)

co = np.array([((v.co.x * 100) + 512, H - v.co.z * 100) for v in body.data.vertices]); x, y = co[:, 0], co[:, 1]
base = ["hips", "spine", "chest", "neck", "head", "L_up", "L_fore", "L_hand", "R_up", "R_fore", "R_hand",
        "L_thigh", "L_shin", "R_thigh", "R_shin", "L_foot", "R_foot"]
D = np.stack([seg_dist(co, np.array(B[n][0], float), np.array(B[n][1], float)) for n in base], 1)
allow = np.ones_like(D)
headzone_L = sm(330, 360, x) * (1 - sm(340, 385, y)); headzone_R = (1 - sm(660, 690, x)) * (1 - sm(340, 385, y))
chestzone = (1 - sm(470, 500, y))  # keep the chest logo out of the shoulder bend
armL = (1 - sm(392, 430, x) * chestzone) * (1 - sm(405, 450, x)) * (1 - sm(540, 580, y)) * (1 - headzone_L)
armR = sm(615, 640, x * chestzone + 700 * (1 - chestzone)) * sm(575, 620, x) * (1 - sm(540, 580, y)) * (1 - headzone_R)
legs = sm(600, 680, y)
for k, n in enumerate(base):
    if n in ("head", "neck"): allow[:, k] = 1 - sm(345, 380, y)
    elif n.startswith("L_") and n[2:] in ("up", "fore", "hand"): allow[:, k] = armL
    elif n.startswith("R_") and n[2:] in ("up", "fore", "hand"): allow[:, k] = armR
    elif n in ("spine", "chest"): allow[:, k] = 1 - sm(600, 650, y)
    elif n == "hips": allow[:, k] = sm(560, 610, y) * (1 - sm(700, 760, y))
    elif n in ("L_thigh", "L_shin"): allow[:, k] = legs * (1 - sm(500, 524, x)) * (1 - sm(1320, 1345, y))
    elif n in ("R_thigh", "R_shin"): allow[:, k] = legs * sm(500, 524, x) * (1 - sm(1320, 1345, y))
    elif n == "L_foot": allow[:, k] = sm(1315, 1340, y) * (1 - sm(500, 524, x))
    elif n == "R_foot": allow[:, k] = sm(1315, 1340, y) * sm(500, 524, x)
Wt = np.exp(-(D - D.min(1, keepdims=True)) / 28.0) * allow
Wt /= np.maximum(Wt.sum(1, keepdims=True), 1e-9)
Wd = {n: Wt[:, k].copy() for k, n in enumerate(base)}
# Overrides carved out of the head weight.
headw = Wd["head"]
r_face = np.hypot(x - 508, y - 222)
w_face = (1 - sm(55, 95, r_face)) * (1 - sm(300, 320, y))
r_jaw = np.hypot(x - 512, y - 290)
w_jaw = (1 - sm(20, 46, r_jaw)) * sm(258, 274, y)
w_bun = (1 - sm(80, 112, y)) * sm(380, 400, x) * (1 - sm(590, 610, x))
w_cl = (1 - sm(418, 432, x)) * sm(215, 240, y)
w_cr = sm(588, 602, x) * sm(205, 230, y)
hair = np.clip(w_bun + w_cl + w_cr, 0, 1)
Wd["bun"] = headw * w_bun; Wd["curlL"] = headw * w_cl; Wd["curlR"] = headw * w_cr
rest_h = headw * (1 - hair)
Wd["jaw"] = rest_h * w_jaw
Wd["face"] = rest_h * w_face * (1 - w_jaw)
Wd["head"] = rest_h * (1 - w_face) * (1 - w_jaw) + rest_h * w_face * 0  # face/jaw take their share
for n, w in Wd.items():
    g = body.vertex_groups.new(name=n)
    idx = np.nonzero(w > 1e-3)[0]
    for i in idx: g.add([int(i)], float(w[i]), "REPLACE")
armw = sum(Wd[n] for n in ("L_up", "L_fore", "L_hand", "R_up", "R_fore", "R_hand"))
handw = sum(Wd[n] for n in ("L_fore", "L_hand", "R_fore", "R_hand"))

mod = body.modifiers.new("arm", "ARMATURE"); mod.object = arm; body.parent = arm
g = lids.vertex_groups.new(name="face"); g.add(list(range(len(lids.data.vertices))), 1.0, "REPLACE")
m = lids.modifiers.new("arm", "ARMATURE"); m.object = arm; lids.parent = arm

# ---------- posing ----------
ROT = [n for n in B if n not in ("L_thigh", "L_shin", "R_thigh", "R_shin", "L_foot", "R_foot")]
LEGROT = ("L_thigh", "L_shin", "R_thigh", "R_shin", "L_foot", "R_foot")
def key(f, r=None, hips=(0, 0), face=(0, 0), jaw=0.0, breathe=1.0, lift=0.0, ik=1.0, legs=None, x=0.0, yaw=0.0):
    r = r or {}; legs = legs or {}
    for side in "LR":
        c = pb[f"{side}_shin"].constraints["IK"]; c.influence = ik; c.keyframe_insert("influence", frame=f)
    for n in LEGROT:
        rot, sy = legs.get(n, (0, 1)); rot = rot if isinstance(rot, tuple) else (0, 0, rot)
        pb[n].rotation_euler = tuple(math.radians(c) for c in rot); pb[n].keyframe_insert("rotation_euler", frame=f)
        pb[n].scale = (1, sy, 1); pb[n].keyframe_insert("scale", frame=f)
    arm.location = (x / 100, 0, lift / 100); arm.keyframe_insert("location", frame=f)
    arm.rotation_euler = (0, 0, math.radians(yaw)); arm.keyframe_insert("rotation_euler", frame=f)  # whole body incl. feet (hops)
    for n in ROT:
        v = r.get(n, 0); v = v if isinstance(v, tuple) else (0, 0, v)
        pb[n].rotation_euler = tuple(math.radians(c) for c in v); pb[n].keyframe_insert("rotation_euler", frame=f)
    # bone-local axes for up-pointing bones: X = image right, Y = image up
    pb["hips"].location = (hips[0] / 100, -hips[1] / 100, 0); pb["hips"].keyframe_insert("location", frame=f)
    pb["face"].location = (face[0] / 100, -face[1] / 100, 0); pb["face"].keyframe_insert("location", frame=f)
    pb["jaw"].location = (0, -jaw / 100, 0); pb["jaw"].keyframe_insert("location", frame=f)
    pb["chest"].scale = (1, breathe, 1); pb["chest"].keyframe_insert("scale", frame=f)
lids.hide_render = True; lids.keyframe_insert("hide_render", frame=0)
def eyes(f0, f1):  # closed from f0 to f1 inclusive
    for ff, show in ((f0 - 1, False), (f0, True), (f1, True), (f1 + 1, False)):
        lids.hide_render = not show; lids.keyframe_insert("hide_render", frame=ff)

def render_range(name, f0, f1):
    d = os.path.join(S, "frames4", name); os.makedirs(d, exist_ok=True)
    sc.frame_start, sc.frame_end = f0, f1; sc.render.filepath = os.path.join(d, "f_")
    bpy.ops.render.render(animation=True)

def talk(f0, f1, amp=3.0, step=4):
    k = 0
    for f in range(f0, f1, step):
        yield f, (amp if k % 2 else amp * 0.2); k += 1

DOWN = {"L_up": 55, "L_fore": 98, "L_hand": -9, "R_up": -55, "R_fore": -98, "R_hand": 9}
HIPS = {"L_up": 45, "L_fore": 150, "L_hand": 30, "R_up": -45, "R_fore": -150, "R_hand": -30}
CHEER = {"L_up": -35, "L_fore": -20, "R_up": 35, "R_fore": 20, "head": 4}
if MODE == "stills":
    tests = {
        "turnHead": dict(r=dict(DOWN, head=(0, 30, 0)), face=(0, 0)),
        "twist": dict(r=dict(DOWN, chest=(0, 22, 0), head=(0, 15, 0))),
        "stepX+": dict(r=DOWN, ik=0, legs={"L_thigh": ((25, 0, 0), 1), "L_shin": ((-30, 0, 0), 1)}),
        "stepX-": dict(r=DOWN, ik=0, legs={"L_thigh": ((-25, 0, 0), 1), "L_shin": ((-30, 0, 0), 1)}),
        "armFwd": dict(r=dict(DOWN, R_up=(40, 0, -55), L_up=(-30, 0, 55))),
        "wave3d": dict(r=dict(DOWN, R_up=(0, 0, 5), R_fore=(0, 0, 10), chest=(0, -15, 0), head=(0, -20, 0))),
    }
    for i, (n, kw) in enumerate(tests.items()):
        key(i + 1, **kw)
    for i, n in enumerate(tests):
        sc.frame_set(i + 1); sc.render.filepath = os.path.join(S, "stills4", n + ".png"); bpy.ops.render.render(write_still=True)
    cam.rotation_euler = (math.radians(90), 0, math.radians(90)); cam.location = (30, 0, (H - 736) / 100)
    for i, n in enumerate(tests):
        sc.frame_set(i + 1); sc.render.filepath = os.path.join(S, "stills4", n + "_side90.png"); bpy.ops.render.render(write_still=True)
    cam.location = (0, -30, (H - 736) / 100)
    # one turned view to judge depth
    sc.frame_set(1); cam.rotation_euler = (math.radians(90), 0, math.radians(30)); cam.location = (15, -26, (H - 736) / 100)
    sc.render.filepath = os.path.join(S, "stills4", "turnHead_side.png"); bpy.ops.render.render(write_still=True)

if MODE == "clips":
    def R(**kw):
        d = dict(DOWN); d.update(kw); return d
    A = lambda x, z: (x, 0, z)          # arm: x = swing forward(+)/back(-), z = in-plane
    Y = lambda y, z=0: (0, y, z)         # spine/head: y = turn
    # idle 1–168 (7 s loop): weight shift, real head turns, small arm swing, two blinks
    key(1, R())
    key(30, R(hips=-1.5, chest=Y(-6, 1), head=Y(22, 2), bun=-3, L_up=A(6, 57), R_up=A(-4, -53)), hips=(8, 0), breathe=1.01)
    key(62, R(chest=Y(-4), head=Y(18, -1), bun=2))
    key(90, R(head=Y(0, -1), bun=2))
    key(120, R(hips=1.5, chest=Y(6, -1), head=Y(-22, -2), bun=3, L_up=A(-4, 53), R_up=A(6, -57)), hips=(-8, 0), breathe=1.01)
    key(150, R(chest=Y(3), head=Y(-10, 0)))
    key(169, R())
    eyes(46, 48); eyes(136, 138)
    # hello 201–290: turns to you, right arm up, waves, talks
    Wv = lambda a: R(R_up=A(10, 5), R_fore=a, R_hand=a * 0.6, chest=Y(-12, -1), head=Y(-8, -4), bun=-a * 0.25)
    key(201, R()); key(209, R(R_up=A(20, -20), R_fore=-60, chest=Y(-8), head=Y(-6, -2)), lift=4); key(215, Wv(0), lift=6)
    for i, f in enumerate(range(221, 262, 7)):
        key(f, Wv(14 if i % 2 == 0 else -14), lift=3 if i % 2 else 0, jaw=3.5 if i % 2 else 1)
    key(270, R(R_up=A(15, -25), R_fore=-60, chest=Y(-4), head=Y(-2, -1))); key(290, R())
    # talk 301–372: hands in front, explaining, head turns
    key(301, R()); key(310, R(L_up=A(35, 45), L_fore=(0, 0, 70), R_up=A(35, -45), R_fore=(0, 0, -70), L_hand=-20, R_hand=20))
    for k, f in enumerate(range(316, 364, 6)):
        s_ = 1 if k % 2 else -1
        key(f, R(L_up=A(35 + 6 * s_, 45), L_fore=(0, 0, 70 - 10 * s_), R_up=A(35 - 6 * s_, -45), R_fore=(0, 0, -70 - 10 * s_),
                 L_hand=-20, R_hand=20 + 8 * s_, chest=Y(5 * s_), head=Y(10 * s_, 2 * s_), bun=-s_), jaw=3 if k % 2 else 0.6)
    key(372, R())
    # point + tap 401–460: turns toward the cards (her left = screen right) and taps
    Pt = R(R_up=A(25, -35), R_fore=-25, R_hand=-15, chest=Y(18, -3), hips=Y(8, -1), head=Y(25, -6), bun=3, curlR=4)
    key(401, R()); key(415, Pt, hips=(6, 0)); key(419, dict(Pt, R_fore=-33, R_hand=-26), hips=(7, 0))
    key(423, Pt, hips=(6, 0)); key(440, dict(Pt, head=Y(5, -4)), hips=(4, 0)); key(460, R())
    # laugh 501–552: leans back, arms up, hop, eyes squeezed
    Ch = R(L_up=A(10, -35), L_fore=-20, R_up=A(10, 35), R_fore=20, spine=(-6, 0, 0), head=(-10, 0, 6))
    key(501, R()); key(505, R(spine=(4, 0, 0), head=(6, 0, 2)), hips=(0, 6), jaw=2)
    key(511, dict(Ch, bun=8, curlL=6, curlR=-6), lift=22, jaw=5)
    key(518, dict(Ch, L_fore=-10, R_fore=10, bun=-4), hips=(0, 4), jaw=2); key(525, dict(Ch, head=(-6, 0, 4), bun=3), lift=10, jaw=5)
    key(533, dict(Ch, head=(-4, 0, 3), bun=-2), jaw=3); key(552, R())
    eyes(509, 529)
    # dance 601–696 (4 s loop): hip twist + sway, arms alternate up, head bobs
    for i, f in enumerate(range(601, 697, 12)):
        sgn = 1 if i % 2 == 0 else -1
        if i == 0: key(f, R()); continue
        up = dict(L_up=A(15, -30), L_fore=-15) if sgn > 0 else dict(R_up=A(15, 30), R_fore=15)
        key(f, R(hips=Y(14 * sgn, 3 * sgn), chest=Y(-10 * sgn, -2 * sgn), head=Y(-8 * sgn, -5 * sgn), bun=6 * sgn, curlL=6 * sgn, curlR=6 * sgn, **up),
            hips=(-9 * sgn, 4 if i % 2 else 0), jaw=2)
    key(697, R())
    eyes(660, 662)
    # walking: start (turn into the walk), loop, stop (turn back to you); one set per direction
    def stride(f, phase, yaw):
        # phase 0: left foot forward contact, 1: passing (right lifted), 2: right forward, 3: passing (left lifted)
        Lf = phase == 0; Rf = phase == 2; pas = phase in (1, 3)
        if not pas:
            fwd, back = ("L", "R") if Lf else ("R", "L")
            sw = 1 if Lf else -1
            key(f, R(L_up=A(-18 * sw, 55), R_up=A(18 * sw, -55), L_fore=(-10 if sw < 0 else 0, 0, 98), R_fore=(-10 if sw > 0 else 0, 0, -98),
                     chest=Y(8 * sw), hips=Y(-6 * sw), head=Y(-8 * sw * 0.3)), hips=(0, 3), ik=0, yaw=yaw,
                legs={f"{fwd}_thigh": ((24, 0, 0), 1), f"{fwd}_shin": ((-4, 0, 0), 1), f"{back}_thigh": ((-16, 0, 0), 1), f"{back}_shin": ((-14, 0, 0), 1),
                      f"{back}_foot": ((-12, 0, 0), 1)})
        else:
            lift_ = "R" if phase == 1 else "L"; plant = "L" if phase == 1 else "R"
            key(f, R(bun=-3 if phase == 1 else 3, curlL=-2, curlR=2), hips=(0, -7), ik=0, yaw=yaw,
                legs={f"{lift_}_thigh": ((14, 0, 0), 1), f"{lift_}_shin": ((-42, 0, 0), 1), f"{plant}_thigh": ((-2, 0, 0), 1)})
    def walkset(f0, yaw):
        # start 12 frames: rest -> first contact, body turns
        key(f0, R(), ik=0, yaw=0); stride(f0 + 6, 1, yaw * 0.6); stride(f0 + 12, 2, yaw)
        # loop 24 frames starting at contact R
        b = f0 + 30
        for k, ph in enumerate((2, 3, 0, 1, 2)): stride(b + k * 6, ph, yaw)
        # stop 14 frames: last step closes, turns back
        c = b + 40
        stride(c, 2, yaw); stride(c + 6, 3, yaw * 0.5); key(c + 14, R(), ik=0, yaw=0)
        return (f0, f0 + 11), (b, b + 23), (c, c + 14)
    sR = walkset(701, 32); sL = walkset(801, -32)
    clips = [("idle", 1, 168), ("hello", 201, 290), ("talk", 301, 372), ("point", 401, 460), ("laugh", 501, 552), ("dance", 601, 696)]
    for nm, (st, lp, sp) in (("walkR", sR), ("walkL", sL)):
        clips += [(nm + "Start", *st), (nm, *lp), (nm + "Stop", *sp)]
    only = os.environ.get("ONLY")
    for name, f0, f1 in clips:
        if only and name not in only.split(","): continue
        render_range(name, f0, f1)
