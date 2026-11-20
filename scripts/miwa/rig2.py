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
try: sc.eevee.taa_render_samples = 16
except Exception: pass
cam_d = bpy.data.cameras.new("cam"); cam_d.type = "ORTHO"; cam_d.ortho_scale = 16
cam = bpy.data.objects.new("cam", cam_d); sc.collection.objects.link(cam)
cam.location = (0, -30, (H - 736) / 100); cam.rotation_euler = (math.radians(90), 0, 0); sc.camera = cam

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
    try: mat.surface_render_method = "BLENDED"
    except Exception: mat.blend_method = "BLEND"
    nt = mat.node_tree; nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    tex = nt.nodes.new("ShaderNodeTexImage"); tex.image = bpy.data.images.load(img_path); tex.interpolation = "Cubic"; tex.extension = "CLIP"
    em = nt.nodes.new("ShaderNodeEmission"); tr = nt.nodes.new("ShaderNodeBsdfTransparent"); mix = nt.nodes.new("ShaderNodeMixShader")
    nt.links.new(tex.outputs["Color"], em.inputs["Color"]); nt.links.new(tex.outputs["Alpha"], mix.inputs["Fac"])
    nt.links.new(tr.outputs[0], mix.inputs[1]); nt.links.new(em.outputs[0], mix.inputs[2]); nt.links.new(mix.outputs[0], out.inputs["Surface"])
    me.materials.append(mat)
    return ob

body = build_mesh("body", os.path.join(S, "cut-glad.png"),
                  lambda x, y: (lambda b: b.size and b.max() > 4)(alpha[y:min(y + STEP + 1, H), x:min(x + STEP + 1, W)]))
lids = build_mesh("lids", os.path.join(S, "lids-full.png"), lambda x, y: 420 <= x <= 590 and 160 <= y <= 235)
lids.location.y = -0.01

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
    "L_foot": ((440, 1330), (420, 1420), None),
    "R_foot": ((584, 1330), (610, 1420), None),
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
    c = pb[f"{side}_shin"].constraints.new("IK"); c.target = arm; c.subtarget = f"{side}_ik"; c.chain_count = 2
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
armL = (1 - sm(405, 450, x)) * (1 - sm(540, 580, y)); armR = sm(575, 620, x) * (1 - sm(540, 580, y))
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
Wt = np.exp(-(D - D.min(1, keepdims=True)) / 22.0) * allow
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
mod = body.modifiers.new("arm", "ARMATURE"); mod.object = arm; body.parent = arm
g = lids.vertex_groups.new(name="face"); g.add(list(range(len(lids.data.vertices))), 1.0, "REPLACE")
m = lids.modifiers.new("arm", "ARMATURE"); m.object = arm; lids.parent = arm

# ---------- posing ----------
ROT = [n for n in B if n not in ("L_thigh", "L_shin", "R_thigh", "R_shin", "L_foot", "R_foot")]
def key(f, r=None, hips=(0, 0), face=(0, 0), jaw=0.0, breathe=1.0, lift=0.0):
    r = r or {}
    arm.location = (0, 0, lift / 100); arm.keyframe_insert("location", frame=f)  # whole body incl. feet (hops)
    for n in ROT:
        pb[n].rotation_euler = (0, 0, math.radians(r.get(n, 0))); pb[n].keyframe_insert("rotation_euler", frame=f)
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
    d = os.path.join(S, "frames2", name); os.makedirs(d, exist_ok=True)
    sc.frame_start, sc.frame_end = f0, f1; sc.render.filepath = os.path.join(d, "f_")
    bpy.ops.render.render(animation=True)

def talk(f0, f1, amp=3.0, step=4):
    k = 0
    for f in range(f0, f1, step):
        yield f, (amp if k % 2 else amp * 0.2); k += 1

if MODE == "stills":
    tests = {
        "rest": dict(),
        "shift": dict(r={"hips": -2, "chest": 1.5, "head": 3, "bun": -4, "curlL": -4, "curlR": -4}, hips=(10, 0)),
        "look": dict(r={"head": -3}, face=(7, 0)),
        "squat": dict(r={"head": 6, "L_up": -10, "R_up": 10}, hips=(0, 16), jaw=4),
        "hop": dict(r={"bun": 6, "curlL": 5, "curlR": -5}, hips=(0, -14)),
        "dance": dict(r={"hips": 3, "chest": -2, "head": -5, "L_up": -10, "R_up": -6, "R_fore": 10, "bun": 5}, hips=(-10, 2), face=(-4, 0)),
    }
    for i, (n, kw) in enumerate(tests.items()):
        key(i + 1, **kw)
    for i, n in enumerate(tests):
        sc.frame_set(i + 1); sc.render.filepath = os.path.join(S, "stills2", n + ".png"); bpy.ops.render.render(write_still=True)

if MODE == "clips":
    # idle 1–144 (6 s loop): weight shift, look around, breathing, hair follow-through, two blinks
    key(1)
    key(37, {"hips": -1.5, "chest": 1, "head": 3, "bun": -3, "curlL": -3, "curlR": -3, "L_up": 2, "R_up": -1, "L_hand": -3}, hips=(8, 0), face=(5, 0), breathe=1.01)
    key(73, {"head": -1, "bun": 2, "curlL": 2, "curlR": 2}, face=(0, 0))
    key(109, {"hips": 1.5, "chest": -1, "head": -3, "bun": 3, "curlL": 3, "curlR": 3, "L_up": -1, "R_up": 2, "R_hand": 3}, hips=(-8, 0), face=(-5, 0), breathe=1.01)
    key(145)
    eyes(55, 57); eyes(121, 123)
    # hello 201–272: wave + talk + little bounce
    Wv = lambda a: {"R_fore": a, "R_hand": a * 0.6, "R_up": 5, "head": -4, "chest": -1, "bun": -a * 0.25}
    key(201); key(207, Wv(0), lift=8)
    for i, f in enumerate(range(213, 255, 7)):
        key(f, Wv(14 if i % 2 == 0 else -14), lift=4 if i % 2 else 0, jaw=3.5 if i % 2 else 1)
    key(262, {"head": -2}); key(272)
    # point + tap 301–352
    Pt = {"R_up": -35, "R_fore": -25, "R_hand": -15, "chest": -3, "hips": -1, "head": -6, "bun": 3, "curlR": 4}
    key(301); key(313, Pt, hips=(6, 0), face=(7, 0)); key(317, dict(Pt, R_fore=-33, R_hand=-26), hips=(7, 0), face=(7, 0))
    key(321, Pt, hips=(6, 0), face=(7, 0)); key(334, Pt, hips=(6, 0), face=(4, 0)); key(352)
    # laugh 401–444: dip, hop, giggle bounces, eyes squeezed
    Lg = {"head": 7, "L_up": -10, "R_up": 10, "L_fore": -6, "R_fore": 6}
    key(401); key(405, {"head": 2}, hips=(0, 6), jaw=2)
    key(411, dict(Lg, bun=8, curlL=6, curlR=-6), lift=20, jaw=5)
    key(417, dict(Lg, bun=-4), hips=(0, 4), jaw=2); key(423, dict(Lg, head=5, bun=3), lift=9, jaw=5)
    key(429, {"head": 3, "bun": -2}, hips=(0, 3), jaw=2); key(444)
    eyes(409, 425)
    # dance 501–596 (4 s loop): hip sway on the beat, arms alternating, head off-beat, hair swinging
    for i, f in enumerate(range(501, 597, 12)):
        s = 1 if i % 2 == 0 else -1
        if i == 0:
            key(f); continue
        key(f, {"hips": 3 * s, "chest": -2 * s, "head": -5 * s, "L_up": -12 if s > 0 else 4, "R_up": 12 if s < 0 else -4,
                "L_fore": 8 * s, "R_fore": 8 * s, "L_hand": 6 * s, "R_hand": 6 * s, "bun": 6 * s, "curlL": 6 * s, "curlR": 6 * s},
            hips=(-9 * s, 4 if i % 2 else 0), face=(-4 * s, 0), jaw=2)
    key(597)
    eyes(560, 562)
    # talk 601–648 (2 s): jaw, nods, small hand gestures
    key(601)
    for f, j in talk(605, 642):
        key(f, {"head": 2 if (f // 8) % 2 else -1, "R_fore": 5 if (f // 12) % 2 else -3, "L_fore": -4 if (f // 12) % 2 else 3,
                "bun": -1 if (f // 8) % 2 else 1}, face=(2 if (f // 16) % 2 else -2, 0), jaw=j)
    key(648)
    for name, f0, f1 in (("idle", 1, 144), ("hello", 201, 272), ("point", 301, 352), ("laugh", 401, 444), ("dance", 501, 596), ("talk", 601, 648)):
        render_range(name, f0, f1)
