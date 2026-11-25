#!/usr/bin/env python3
"""Make a downloaded photo ready for the blog: landscape, at most 1600 px wide, WebP, about 200 KB or less.

    python3 scripts/blog-image.py <downloaded-file> <slug> <name>

Writes public/blog/<slug>/<name>.webp and prints the path to use in the post (/blog/<slug>/<name>.webp).
Needs Pillow (python3 -m pip install pillow).
"""
import os
import sys

from PIL import Image, ImageOps

if len(sys.argv) != 4:
    sys.exit(__doc__)
src, slug, name = sys.argv[1:]
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
out_dir = os.path.join(root, "public", "blog", slug)
os.makedirs(out_dir, exist_ok=True)
out = os.path.join(out_dir, f"{name}.webp")

img = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
if img.width < img.height:
    sys.exit("Billedet er i højformat. Vælg et liggende billede.")
if img.width < 1200:
    print(f"Advarsel: billedet er kun {img.width} px bredt (mindst 1600 anbefales).", file=sys.stderr)
if img.width > 1600:
    img = img.resize((1600, round(img.height * 1600 / img.width)), Image.LANCZOS)

for quality in (82, 76, 70, 64, 58):
    img.save(out, "WEBP", quality=quality, method=6)
    if os.path.getsize(out) <= 200 * 1024:
        break

print(f"/blog/{slug}/{name}.webp  ({img.width}x{img.height}, {os.path.getsize(out) // 1024} KB)")
