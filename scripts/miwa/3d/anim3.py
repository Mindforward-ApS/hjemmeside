# Blender: animate the full-3D Miwa (miwa3d.blend) and render transparent clips for the hero.
# Usage: blender -b miwa3d.blend -P anim3.py   (env ONLY=idle,walkR to render a subset, STILL=1 for a frame check)
import bpy, math, os
D = os.path.dirname(bpy.data.filepath) + "/"
sc = bpy.context.scene; arm = bpy.data.objects["rig"]; pb = arm.pose.bones; cam = bpy.data.objects["cam"]
R = math.radians
sc.render.resolution_x, sc.render.resolution_y = 720, 960
cam.data.ortho_scale = 25.6
cam.rotation_euler = (R(86), 0, 0); cam.location = (0, -40, 12.55 + 40 * math.tan(R(4)))

DOWN = {"L_upper": (0, 0, -30), "R_upper": (0, 0, 30), "L_fore": (8, 0, -4), "R_fore": (8, 0, 4)}
def P(**kw):
    d = dict(DOWN)
    for k, v in kw.items(): d[k] = v
    return d
def key(f, d=None, lift=0.0, yaw=0.0, sway=0.0):
    d = d or DOWN
    for b in pb:
        v = d.get(b.name, (0, 0, 0)); b.rotation_euler = tuple(R(a) for a in v); b.keyframe_insert("rotation_euler", frame=f)
    arm.location = (sway, 0, lift); arm.keyframe_insert("location", frame=f)
    arm.rotation_euler = (0, 0, R(yaw)); arm.keyframe_insert("rotation_euler", frame=f)

# idle 1–168 (7 s loop): weight shift, real head turns, breathing, arms swing a touch
key(1, P())
key(30, P(hips=(0, 0, -2), chest=(0, -6, 1.5), head=(0, 25, 2), L_upper=(4, 0, -29), R_upper=(-3, 0, 31)), sway=0.08)
key(62, P(chest=(0, -3, 0), head=(-4, 18, 0)), sway=0.04)
key(90, P(head=(2, 0, -1)))
key(120, P(hips=(0, 0, 2), chest=(0, 6, -1.5), head=(0, -25, -2), L_upper=(-3, 0, -31), R_upper=(4, 0, 29)), sway=-0.08)
key(150, P(chest=(0, 3, 0), head=(0, -8, 0)), sway=-0.03)
key(169, P())
# hello 201–290: turns to you, right arm comes up and waves
Wv = lambda a: P(R_upper=(10, 0, -72), R_fore=(0, 0, -55 + a), R_hand=(0, 0, a * 0.5), chest=(0, -10, -2), head=(0, -6, -5))
key(201, P()); key(210, P(R_upper=(15, 0, -30), R_fore=(20, 0, -40), chest=(0, -6, 0)), lift=0.05)
key(216, Wv(0), lift=0.1)
for i, f in enumerate(range(222, 266, 7)):
    key(f, Wv(16 if i % 2 == 0 else -16), lift=0.05 if i % 2 else 0)
key(274, P(R_upper=(15, 0, -25), R_fore=(15, 0, -30), head=(0, -2, -2))); key(290, P())
# talk 301–372: hands in front, explaining, head turns
key(301, P())
for k, f in enumerate(range(310, 366, 7)):
    s_ = 1 if k % 2 else -1
    key(f, P(L_upper=(38 + 5 * s_, 0, -22), R_upper=(38 - 5 * s_, 0, 22), L_fore=(45 - 8 * s_, 0, 10), R_fore=(45 + 8 * s_, 0, -10),
             L_hand=(0, 0, 10), R_hand=(0, 0, -10), chest=(0, 6 * s_, 0), head=(2 * s_, 12 * s_, 2 * s_)))
key(372, P())
# point + tap 401–460: turns to the cards on her left (screen right) and taps with her left hand
Pt = P(L_upper=(25, 0, 25), L_fore=(10, 0, 10), L_hand=(0, 0, 10), chest=(0, 22, 0), hips=(0, 10, 0), head=(0, 30, -3))
key(401, P()); key(415, Pt); key(419, P(**{**Pt, "L_fore": (22, 0, 18)})); key(423, Pt); key(440, Pt); key(460, P())
# laugh 501–552: leans back, arms up, a little hop
Ch = P(L_upper=(0, 0, 75), R_upper=(0, 0, -75), L_fore=(0, 0, 25), R_fore=(0, 0, -25), spine=(-6, 0, 0), head=(-12, 0, 0))
key(501, P()); key(506, P(spine=(6, 0, 0), head=(8, 0, 0)), lift=-0.05)
key(512, Ch, lift=0.35); key(519, P(**{**Ch, "head": (-6, 0, 4)}), lift=0.0); key(526, Ch, lift=0.15); key(534, P(**{**Ch, "head": (-4, 0, -3)})); key(552, P())
# dance 601–696 (4 s loop)
for i, f in enumerate(range(601, 697, 12)):
    sg = 1 if i % 2 == 0 else -1
    if i == 0: key(f, P()); continue
    up = {"L_upper": (0, 0, 70), "L_fore": (0, 0, 30)} if sg > 0 else {"R_upper": (0, 0, -70), "R_fore": (0, 0, -30)}
    key(f, P(hips=(0, 14 * sg, 4 * sg), chest=(0, -10 * sg, -3 * sg), head=(0, -10 * sg, -5 * sg), **up), sway=-0.1 * sg, lift=0.05 if i % 2 else 0)
key(697, P())
# walking in profile: start (turns 90°), loop (2 steps/s), stop (turns back to you)
def stride(f, ph, yaw):
    if ph in (0, 2):  # contact: one leg forward
        fw, bk = ("L", "R") if ph == 0 else ("R", "L"); s = 1 if ph == 0 else -1
        key(f, P(**{f"{fw}_thigh": (26, 0, 0), f"{fw}_shin": (-6, 0, 0), f"{bk}_thigh": (-18, 0, 0), f"{bk}_shin": (-16, 0, 0), f"{bk}_foot": (-15, 0, 0),
                    "L_upper": (-24 * s, 0, -30), "R_upper": (24 * s, 0, 30), "L_fore": (8 + (12 if s < 0 else 0), 0, -4), "R_fore": (8 + (12 if s > 0 else 0), 0, 4),
                    "chest": (0, 7 * s, 0), "hips": (0, -6 * s, 0), "head": (0, -3 * s, 0)}), lift=-0.06, yaw=yaw)
    else:  # passing: one leg lifted under the body
        up = "R" if ph == 1 else "L"
        key(f, P(**{f"{up}_thigh": (16, 0, 0), f"{up}_shin": (-48, 0, 0), f"{up}_foot": (10, 0, 0)}), lift=0.1, yaw=yaw)
def walkset(f0, yaw):
    key(f0, P(), yaw=0); stride(f0 + 6, 1, yaw * 0.55); stride(f0 + 12, 2, yaw)
    b = f0 + 30
    for k, ph in enumerate((2, 3, 0, 1, 2)): stride(b + k * 6, ph, yaw)
    c = b + 40
    stride(c, 2, yaw); stride(c + 6, 3, yaw * 0.5); key(c + 14, P(), yaw=0)
    return (f0, f0 + 11), (b, b + 23), (c, c + 14)
sR = walkset(701, 90); sL = walkset(801, -90)
for fc in arm.animation_data.action.fcurves if hasattr(arm.animation_data.action, "fcurves") else []:
    pass
clips = [("idle", 1, 168), ("hello", 201, 290), ("talk", 301, 372), ("point", 401, 460), ("laugh", 501, 552), ("dance", 601, 696)]
for nm, (st, lp, sp) in (("walkR", sR), ("walkL", sL)):
    clips += [(nm + "Start", *st), (nm, *lp), (nm + "Stop", *sp)]
only = os.environ.get("ONLY")
if os.environ.get("STILL"):
    for f in [int(x) for x in os.environ["STILL"].split(",")]:
        sc.frame_set(f); sc.render.filepath = D + f"st/f{f:04d}.png"; bpy.ops.render.render(write_still=True)
else:
    for name, f0, f1 in clips:
        if only and name not in only.split(","): continue
        d = D + f"frames/{name}"; os.makedirs(d, exist_ok=True)
        sc.frame_start, sc.frame_end = f0, f1; sc.render.filepath = d + "/f_"
        bpy.ops.render.render(animation=True)
