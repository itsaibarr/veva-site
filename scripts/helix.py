#!/usr/bin/env python3
"""Draws a vertical DNA double helix as a grayscale source for ascii.py → assets/ascii-src/dna.jpg"""
import math
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

W, H = 900, 1600
SS = 2
im = Image.new("L", (W * SS, H * SS), 255)
d = ImageDraw.Draw(im)
cx, amp, turns = W * SS / 2, W * SS * 0.30, 3.2
steps = 2200
pts = []
for i in range(steps + 1):
    t = i / steps
    y = 60 * SS + t * (H * SS - 120 * SS)
    ph = t * turns * 2 * math.pi
    pts.append((y, ph))

# rungs first (behind), then strands, shaded by depth
for i in range(0, steps + 1, steps // 48):
    y, ph = pts[i]
    x1 = cx + amp * math.sin(ph); x2 = cx + amp * math.sin(ph + math.pi)
    depth = (math.cos(ph) + 1) / 2          # 0 back .. 1 front
    g = int(175 - 70 * depth)
    d.line([(x1, y), (x2, y)], fill=g, width=int(5 * SS))
    for k in (0.33, 0.66):                   # base-pair beads
        x = x1 + (x2 - x1) * k
        d.ellipse([x - 7 * SS, y - 7 * SS, x + 7 * SS, y + 7 * SS], fill=g - 30)

for strand in (0, math.pi):
    prev = None
    for y, ph in pts:
        x = cx + amp * math.sin(ph + strand)
        depth = (math.cos(ph + strand) + 1) / 2
        w = int((10 + 12 * depth) * SS)
        g = int(185 - 175 * depth)
        if prev:
            d.line([prev, (x, y)], fill=g, width=w)
        prev = (x, y)

im = im.resize((W, H), Image.LANCZOS).filter(ImageFilter.GaussianBlur(0.6))
out = Path(__file__).resolve().parent.parent / "assets/ascii-src/dna.jpg"
im.save(out, quality=90)
print(out)
