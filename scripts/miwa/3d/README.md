# Miwa i fuld 3D (Blender)

Bygget af hendes fire turnaround-billeder fra Higgsfield (forfra, bagfra, venstre, højre; A-pose):

1. `hull.py` – skærer en lukket krop ud af de fire silhuetter (+ afrundede lemmer), marching cubes → `hull.npz`.
2. `tex.py` – maler kroppen med de fire billeder (synlighed, farvetilpasning, ansigt låst til forfra-billedet) → `texmap.npz` + `tex-*.png`.
3. `rigb.py` – menneskeskelet + vægte pr. lem → `miwa3d.blend`.
4. `anim3.py` – klippene (idle, hello, talk, point, laugh, dance, walkR/L + start/stop) → PNG-frames → `public/video/miwa`.

Kildebillederne (`front/back/left/right.png` og `cut-*.png`) skal ligge i samme mappe. Higgsfield-job-id'er står i ~/Downloads/MIWA_BRIEF.md.
