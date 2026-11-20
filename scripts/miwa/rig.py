# Blender: Miwa as a skinned 2D mesh (cut-out image on a dense grid + armature), rendered as transparent PNG frames.
# Usage: blender -b -P rig.py -- <mode>   mode = stills | clips
import bpy, sys, math, os
import numpy as np
from mathutils import Vector

S = os.path.dirname(os.path.abspath(__file__))
MODE = sys.argv[sys.argv.index("--") + 1] if "--" in sys.argv else "stills"
W, H = 1024, 1536
STEP = 6

def P(px, py):  # image px -> world (x, z)
    return Vector(((px - 512) / 100, 0, (H - py) / 100))

# ---------- scene ----------
bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
for eng in ("BLENDER_EEVEE", "BLENDER_EEVEE_NEXT"):
    try:
        sc.render.engine = eng; break
    except TypeError:
        pass
sc.render.film_transparent = True
sc.render.resolution_x, sc.render.resolution_y = 720, 960
sc.render.image_settings.file_format = "PNG"
sc.render.image_settings.color_mode = "RGBA"
sc.view_settings.view_transform = "Standard"
sc.view_settings.look = "None"
sc.render.fps = 24
try:
    sc.eevee.taa_render_samples = 16
except Exception:
    pass

cam_d = bpy.data.cameras.new("cam"); cam_d.type = "ORTHO"; cam_d.ortho_scale = 16
cam = bpy.data.objects.new("cam", cam_d); sc.collection.objects.link(cam)
cam.location = (0, -30, (H - 736) / 100); cam.rotation_euler = (math.radians(90), 0, 0)
sc.camera = cam

# ---------- mesh ----------
alpha = np.load(os.path.join(S, "alpha.npy"))
def build_mesh(name, img_path, mask_fn):
    nx, ny = W // STEP + 1, H // STEP + 1
    keep = {}
    verts, faces, uvs = [], [], []
    def vid(i, j):
        k = (i, j)
        if k not in keep:
            px, py = min(i * STEP, W), min(j * STEP, H)
            keep[k] = len(verts); verts.append(P(px, py)); uvs.append((px / W, 1 - py / H))
        return keep[k]
    for j in range(ny - 1):
        for i in range(nx - 1):
            x0, y0 = i * STEP, j * STEP
            if mask_fn(x0, y0):
                faces.append((vid(i, j + 1), vid(i + 1, j + 1), vid(i + 1, j), vid(i, j)))
    me = bpy.data.meshes.new(name); me.from_pydata([tuple(v) for v in verts], [], faces); me.update()
    uvl = me.uv_layers.new()
    for poly in me.polygons:
        for li in poly.loop_indices:
            uvl.data[li].uv = uvs[me.loops[li].vertex_index]
    ob = bpy.data.objects.new(name, me); sc.collection.objects.link(ob)
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    try:
        mat.surface_render_method = "BLENDED"
    except Exception:
        mat.blend_method = "BLEND"
    nt = mat.node_tree; nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    tex = nt.nodes.new("ShaderNodeTexImage"); tex.image = bpy.data.images.load(img_path); tex.interpolation = "Cubic"; tex.extension = "CLIP"
    em = nt.nodes.new("ShaderNodeEmission"); tr = nt.nodes.new("ShaderNodeBsdfTransparent"); mix = nt.nodes.new("ShaderNodeMixShader")
    nt.links.new(tex.outputs["Color"], em.inputs["Color"])
    nt.links.new(tex.outputs["Alpha"], mix.inputs["Fac"])
    nt.links.new(tr.outputs[0], mix.inputs[1]); nt.links.new(em.outputs[0], mix.inputs[2])
    nt.links.new(mix.outputs[0], out.inputs["Surface"])
    me.materials.append(mat)
    return ob

def body_mask(x0, y0):
    blk = alpha[y0:min(y0 + STEP + 1, H), x0:min(x0 + STEP + 1, W)]
    return blk.size and blk.max() > 4
body = build_mesh("body", os.path.join(S, "cut-glad.png"), body_mask)
lids = build_mesh("lids", os.path.join(S, "lids-full.png"), lambda x, y: 420 <= x <= 590 and 160 <= y <= 235)
lids.location.y = -0.01

# ---------- armature ----------
B = {  # name: (head px, tail px, parent)
    "root": ((512, 640), (512, 600), None),
    "spine": ((512, 600), (512, 390), "root"),
    "neck": ((512, 390), (512, 330), "spine"),
    "head": ((512, 330), (505, 70), "neck"),
    "L_up": ((420, 425), (245, 478), "spine"),
    "L_fore": ((245, 478), (200, 345), "L_up"),
    "L_hand": ((200, 345), (135, 250), "L_fore"),
    "R_up": ((604, 425), (790, 474), "spine"),
    "R_fore": ((790, 474), (832, 348), "R_up"),
    "R_hand": ((832, 348), (905, 252), "R_fore"),
}
ad = bpy.data.armatures.new("rig"); arm = bpy.data.objects.new("rig", ad); sc.collection.objects.link(arm)
bpy.context.view_layer.objects.active = arm; bpy.ops.object.mode_set(mode="EDIT")
for n, (h, t, p) in B.items():
    eb = ad.edit_bones.new(n); eb.head = P(*h); eb.tail = P(*t)
    eb.align_roll(Vector((0, -1, 0)))
    if p: eb.parent = ad.edit_bones[p]; eb.use_connect = False
bpy.ops.object.mode_set(mode="OBJECT")

def seg_dist(p, a, b):
    ab = b - a; t = np.clip(((p - a) @ ab) / (ab @ ab), 0, 1)
    return np.linalg.norm(p - (a + np.outer(t, ab)), axis=1)

def smooth(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t)

def skin(ob, only=None):
    co = np.array([((v.co.x * 100) + 512, H - v.co.z * 100) for v in ob.data.vertices])
    x, y = co[:, 0], co[:, 1]
    names = list(B.keys()) if only is None else only
    D = np.stack([seg_dist(co, np.array(B[n][0], float), np.array(B[n][1], float)) for n in names], 1)
    # region masks (px): head only above the collar, arms only out at the sides, legs only on root
    allow = np.ones_like(D)
    for k, n in enumerate(names):
        if n in ("head", "neck"): allow[:, k] = 1 - smooth(345, 380, y)
        if n.startswith("L_"): allow[:, k] = (1 - smooth(405, 450, x)) * (1 - smooth(540, 580, y))
        if n.startswith("R_"): allow[:, k] = smooth(575, 620, x) * (1 - smooth(540, 580, y))
        if n == "spine": allow[:, k] = 1 - smooth(610, 650, y)
        if n == "root": allow[:, k] = smooth(570, 640, y)
    Wt = np.exp(-(D - D.min(1, keepdims=True)) / 22.0) * allow
    Wt /= np.maximum(Wt.sum(1, keepdims=True), 1e-9)
    for k, n in enumerate(names):
        g = ob.vertex_groups.new(name=n)
        for i, w in enumerate(Wt[:, k]):
            if w > 1e-3: g.add([i], float(w), "REPLACE")
    m = ob.modifiers.new("arm", "ARMATURE"); m.object = arm
    ob.parent = arm

skin(body)
g = lids.vertex_groups.new(name="head"); g.add(list(range(len(lids.data.vertices))), 1.0, "REPLACE")
m = lids.modifiers.new("arm", "ARMATURE"); m.object = arm; lids.parent = arm

# ---------- posing ----------
pb = arm.pose.bones
for b in pb: b.rotation_mode = "XYZ"
def pose(f, rot=None, lift=0.0, breathe=1.0, blink=False):
    rot = rot or {}
    for b in pb:
        b.rotation_euler = (0, 0, math.radians(rot.get(b.name, 0)))
        b.keyframe_insert("rotation_euler", frame=f)
    pb["root"].location = (0, lift, 0)  # bone-local Y = along the bone (up for root, which points up? root points down) handled below
    pb["root"].keyframe_insert("location", frame=f)
    pb["spine"].scale = (1, breathe, 1); pb["spine"].keyframe_insert("scale", frame=f)
    lids.hide_render = not blink; lids.keyframe_insert("hide_render", frame=f)

def render_range(name, f0, f1):
    d = os.path.join(S, "frames", name); os.makedirs(d, exist_ok=True)
    sc.frame_start, sc.frame_end = f0, f1
    sc.render.filepath = os.path.join(d, "f_")
    bpy.ops.render.render(animation=True)

REST = {}
if MODE == "stills":
    tests = {
        "rest": {},
        "waveA": {"R_fore": 14, "R_hand": 8, "R_up": 4, "head": -4},
        "waveB": {"R_fore": -14, "R_hand": -8, "R_up": 4, "head": -4},
        "point": {"R_up": -35, "R_fore": -25, "R_hand": -15, "spine": -3, "head": -5},
        "laugh": {"L_up": -10, "R_up": 10, "L_fore": -6, "R_fore": 6, "head": 6},
        "idle": {"spine": 1.2, "head": 3, "L_up": 3, "R_up": -3},
    }
    for i, (n, r) in enumerate(tests.items()):
        pose(i + 1, r, blink=(n == "idle"))
    for i, n in enumerate(tests):
        sc.frame_set(i + 1)
        sc.render.filepath = os.path.join(S, "stills", n + ".png")
        bpy.ops.render.render(write_still=True)

if MODE == "clips":
    def blink(f):
        for ff, show in ((f - 1, False), (f, True), (f + 2, True), (f + 3, False)):
            lids.hide_render = not show; lids.keyframe_insert("hide_render", frame=ff)
    # idle loop 1-96
    I1 = {"spine": 1.0, "head": 2.5, "L_up": 2, "R_up": -2, "L_fore": 2, "R_fore": -2}
    I2 = {"spine": -1.0, "head": -2, "L_up": -1.5, "R_up": 1.5, "L_hand": -2, "R_hand": 2}
    pose(1, {}); pose(25, I1, breathe=1.008); pose(49, {}); pose(73, I2, breathe=1.008); pose(97, {})
    blink(60)
    # wave 101-160
    Wv = lambda a: {"R_fore": a, "R_hand": a * 0.6, "R_up": 5, "head": -4, "spine": -1}
    pose(101, {}); pose(108, Wv(14)); pose(116, Wv(-14)); pose(124, Wv(14)); pose(132, Wv(-14)); pose(140, Wv(12))
    pose(150, {"R_fore": -2, "head": -2}); pose(160, {})
    # point + tap 201-250
    Pt = {"R_up": -35, "R_fore": -25, "R_hand": -15, "spine": -3, "head": -5}
    Tp = dict(Pt, R_fore=-33, R_hand=-26)
    pose(201, {}); pose(213, Pt); pose(217, Tp); pose(221, Pt); pose(234, Pt); pose(250, {})
    # laugh hop 301-336
    Lg = {"head": 6, "L_up": -10, "R_up": 10, "L_fore": -6, "R_fore": 6}
    pose(301, {}); pose(305, {}, breathe=0.985); pose(310, Lg, lift=0.14); pose(316, dict(Lg, head=3), breathe=0.99)
    pose(320, dict(Lg, head=5), lift=0.07); pose(326, {"head": 2}); pose(336, {})
    render_range("idle", 1, 96)
    render_range("wave", 101, 160)
    render_range("point", 201, 250)
    render_range("laugh", 301, 336)
