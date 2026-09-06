# veva-site

One-page capability site (RU at `/`, EN at `/en/`). No framework: `content.mjs` holds every word, `build.mjs` writes `dist/`, `test.mjs` checks structure, a red list of claims that must never appear, and every external link.

```
npm run build          # dist/
npm test               # build + red list + live link check
npm run test:offline   # same without the network
python3 scripts/halftone.py   # assets/src/*.png → assets/half/*.png (diamond halftone plates)
bash scripts/capture.sh       # re-screenshot the live products into assets/src/
```

Design: shared 1px grid lines, dot-matrix display titles (a CSS mask over Unbounded, works for Cyrillic), diamond-halftone plates generated offline with Pillow. Fonts are self-hosted subsets.
