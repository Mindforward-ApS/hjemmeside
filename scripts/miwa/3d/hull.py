# Miwa full 3D: carve a closed body out of the four turnaround silhouettes (visual hull), limit limb depth with an
# inflated front silhouette (4 views alone make arms plate-thick), smooth, marching cubes -> PLY + per-vertex data.
import numpy as np
from PIL import Image
from scipy import ndimage as nd
from skimage import measure
D = "/private/tmp/claude-501/-Users-marconielsen/28eb3a52-bc7f-4115-8c8d-16373e9bfdff/scratchpad/miwa/turn/"
F = 4  # px per voxel
def mask(n):
    a = np.array(Image.open(D + f"cut-{n}.png").convert("RGBA"))[:, :, 3] > 110
    a = nd.binary_opening(a, iterations=2)
    return a[::F, ::F]
M = {n: mask(n) for n in ("front", "back", "left", "right")}
Hh, Ww = M["front"].shape
CX = {"front": 857 // F, "back": 846 // F, "left": 852 // F, "right": 853 // F}
X = np.arange(-160, 161); Yd = np.arange(-90, 91); Z = np.arange(Hh)  # z = image row (0 top)
def col(n, off):  # sample mask n at row z, column cx+off  -> array [z, off]
    c = CX[n] + off
    ok = (c >= 0) & (c < Ww)
    out = np.zeros((Hh, len(off)), bool); out[:, ok] = M[n][:, c[ok]]
    return out
Fm = col("front", X)            # [z, x]
Bm = col("back", -X)            # back camera sees x mirrored
Lm = col("left", Yd)            # camera at +X: image right = +y
Rm = col("right", -Yd)          # camera at -X: image right = -y
# inflated front silhouette -> allowed half-depth per (z, x)
fr = Fm & Bm
dist = nd.distance_transform_edt(fr)
R = nd.gaussian_filter(nd.maximum_filter(dist, size=21), 3)
half = np.minimum(dist, R)
depth = np.sqrt(np.clip(half * (2 * R - half), 0, None)) * 1.15 + 2
depth = nd.gaussian_filter(depth, (3, 1))  # no per-row steps
# depth centre per row from the side silhouettes
side = Lm & Rm
yc = np.array([Yd[r].mean() if r.any() else 0 for r in side])
feet = Z > (2380 // F)  # sneakers: silhouettes only (they stick out forward)
vol = np.zeros((Hh, len(X), len(Yd)), bool)
for z in range(Hh):
    a = fr[z][:, None] & side[z][None, :]
    if not a.any(): continue
    if not feet[z]:
        a &= np.abs(Yd[None, :] - yc[z]) <= depth[z][:, None]
    vol[z] = a
v = nd.gaussian_filter(vol.astype(np.float32), 1.7)
v *= fr[:, :, None]  # smoothing must not bridge gaps (hands vs. thighs)
verts, faces, normals, _ = measure.marching_cubes(v, 0.5)
# verts: (z, xi, yi) -> world units of 100 original px: x right, y back, z up
zz, xi, yi = verts[:, 0], verts[:, 1], verts[:, 2]
P = np.stack([X[0] + xi, Yd[0] + yi, (Hh - zz)], 1) * F / 100.0
Nn = np.stack([normals[:, 1], normals[:, 2], -normals[:, 0]], 1)
Nn /= np.linalg.norm(Nn, axis=1, keepdims=True) + 1e-9
np.savez(D + "hull.npz", P=P.astype(np.float32), N=Nn.astype(np.float32), Fc=faces.astype(np.int32))
print("verts", len(P), "faces", len(faces), "bbox", P.min(0), P.max(0))
