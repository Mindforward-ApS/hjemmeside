import numpy as np
from PIL import Image
from scipy import ndimage as nd
D = "/private/tmp/claude-501/-Users-marconielsen/28eb3a52-bc7f-4115-8c8d-16373e9bfdff/scratchpad/miwa/turn/"
h = np.load(D + "hull.npz"); P, N = h["P"], h["N"]
# all four cameras are horizontal, so pick views by the horizontal part of the normal (terraces facing up get a view too)
N = N.copy(); N[:, 2] = 0; N /= np.linalg.norm(N, axis=1, keepdims=True) + 1e-6
W_, H_ = 1696, 2528
CX = {"front": 857, "back": 846, "left": 852, "right": 853}
x, y, z = P[:, 0] * 100, P[:, 1] * 100, P[:, 2] * 100
v = H_ - z
views = {
    "front": (CX["front"] + x, y, np.array([0, -1, 0])),
    "back": (CX["back"] - x, -y, np.array([0, 1, 0])),
    "left": (CX["left"] + y, -x, np.array([1, 0, 0])),
    "right": (CX["right"] - y, x, np.array([-1, 0, 0])),
}
UV, Wt, FAC = {}, [], []
ARMMASK = {}
for n, (u, dep, d) in views.items():
    bi, bj = np.clip((u / 4).astype(int), 0, W_ // 4 - 1), np.clip((v / 4).astype(int), 0, H_ // 4 - 1)
    zb = np.full((H_ // 4, W_ // 4), np.inf)
    np.minimum.at(zb, (bj, bi), dep)
    vis = dep <= zb[bj, bi] + 30  # generous: the nose must not hide the eyes
    if n in ("left", "right"):
        # in the side photos the hanging arm covers the hip; keep arm pixels off the body (and body pixels off the arm)
        TH = np.load(D + "torso_half.npy"); th = TH[np.clip(v.astype(int), 0, len(TH) - 1)]
        isarm = (np.abs(x) > th + 15) & (v > 960) & (v < 1600)
        am = np.zeros_like(zb, bool); am[bj[isarm], bi[isarm]] = True
        am = nd.binary_dilation(am, iterations=9)
        ARMMASK[n] = am
        vis = vis & ~isarm  # arms take their colour from the front/back photos
    facing = np.clip(N.astype(np.float64) @ d.astype(np.float64), 0, None)
    head = z > (H_ - 600)
    if n in ("left", "right"): vis = vis | (head & (np.abs(N[:, 0]) > 0.3))  # curls/ears are not real occluders on the head
    # the carved head is rounder than the drawn face, so its normals turn sideways too early: favour the front view on
    # the face and the back view on the back of the head
    face = (v > 340) & (v < 650) & (np.abs(x) < 150) & (N[:, 1] < 0) & (np.abs(N[:, 0]) < 0.8)
    if n == "front": facing = facing + np.where(face, 0.45, 0)
    FAC.append(facing * vis)                       # head and hair: much sharper hand-over between views (no double eyes)
    pw = np.where(head, 24, 16)
    Wt.append(vis * (facing + 0.02) ** pw)
    UV[n] = np.stack([u / W_, 1 - v / H_], 1)
    # dilated colour texture so seams never sample the transparent background
    # colours from the ORIGINAL render (the cut-out softens eye whites and curls); the cut-out only decides what is body
    cut = np.array(Image.open(D + f"cut-{n}.png").convert("RGBA"))[:, :, 3]
    orig = np.array(Image.open(D + f"{n}.png").convert("RGB")).astype(np.float32)
    # un-mix the light studio background from half-transparent hair edges
    al = np.clip(cut.astype(np.float32) / 255, 0.05, 1)[:, :, None]
    bgc = np.median(orig[cut < 10], axis=0)
    orig = np.clip((orig - (1 - al) * bgc) / al, 0, 255)
    # the four photos are lit differently: pull the dark clothing of back/side photos to the front photo's level
    GAIN = {"front": 1.0, "back": 34.7 / 40.7, "left": 34.7 / 42.0, "right": 34.7 / 47.7}
    Lm = orig.mean(2, keepdims=True); blend = np.clip((160 - Lm) / 60, 0, 1)
    orig = orig * (1 + (GAIN[n] - 1) * blend)
    body = cut > 110
    m = nd.binary_erosion(body, iterations=14)  # drop the rim light along the silhouette (it smears over the flanks)
    if n in ("left", "right"):  # paint the hanging hand/forearm (skin + watch) out of the side photo's hip area
        rr = np.arange(m.shape[0])[:, None]
        sk = (orig[:, :, 0] > 120) & (orig[:, :, 0] > orig[:, :, 1] + 15) & (orig[:, :, 1] > orig[:, :, 2])
        sk &= (rr > 1150) & (rr < 1600)
        sk = nd.binary_dilation(nd.binary_opening(sk, iterations=2), iterations=14)
        m = m & ~sk
    # smooth fill outside the body (blurred neighbour colours, no streaks): multi-scale normalised blur
    rgb = orig.astype(np.float32); out = rgb.copy(); known = m.copy()
    for sg in (2, 4, 8, 16, 32, 64):
        wgt = nd.gaussian_filter(m.astype(np.float32), sg)
        est = np.stack([nd.gaussian_filter(rgb[:, :, c] * m, sg) for c in range(3)], 2) / np.maximum(wgt[:, :, None], 1e-6)
        fill = (~known) & (wgt > 0.02)
        out[fill] = est[fill]; known |= fill
    Image.fromarray(np.clip(out, 0, 255).astype(np.uint8)).save(D + f"tex-{n}.png")
Wt = np.stack(Wt, 1); FAC = np.stack(FAC, 1)
# surfaces no camera sees well (ledges under the hair, under the chin): take only the single best view
low = FAC.max(1) < 0.35
one = np.zeros_like(Wt); one[np.arange(len(Wt)), FAC.argmax(1)] = 1
Wt = np.where(low[:, None], one, Wt)
# back of the head down to the collar: only the back view (the side views put face and ear colours there)
nape = (v > 430) & (v < 720) & (y > 15) & (N[:, 1] > 0.6)
Wt = np.where(nape[:, None], np.array([[0, 1, 0, 0]], np.float32), Wt)
s = Wt.sum(1, keepdims=True)
Wt = np.where(s > 1e-6, Wt / np.maximum(s, 1e-9), np.array([[1, 0, 0, 0]]))
np.savez(D + "texmap.npz", W=Wt.astype(np.float32), **{f"uv_{k}": v_.astype(np.float32) for k, v_ in UV.items()})
print("ok", Wt.mean(0))
