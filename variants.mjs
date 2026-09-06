// Title-font experiments, selected with TITLE_FONT=dotmatrix|tiny5 at build time.
// Default (unset) is the production treatment: Unbounded under a dot mask.
export const VARIANTS = {
  dotmatrix: {
    label: "Title font test 1 / 2 — Dot Matrix Bold (DaFont, Dionaea). Latin only: Russian titles keep the current treatment.",
    fonts: ["dotmatrix-bold"],
    css: `
@font-face { font-family: "Dot Matrix"; font-weight: 700; font-display: swap; src: url(/assets/fonts/dotmatrix-bold.woff2) format("woff2"); }
html[lang="en"] .dots span { font-family: "Dot Matrix", var(--display); font-weight: 700; letter-spacing: 0.02em; -webkit-mask-image: none; mask-image: none; padding-bottom: 0; }
html[lang="en"] h1.dots { font-size: clamp(30px, 6.6vw, 72px); line-height: 1.08; }
html[lang="en"] h2.dots { font-size: clamp(24px, 4.2vw, 48px); }`,
  },
  tiny5: {
    label: "Title font test 2 / 2 — 5-pixel grid (Tiny5) screened into dots. Stand-in for the FontStruct 5x7, which needs a login to download; Cyrillic included.",
    fonts: ["tiny5-lat", "tiny5-cyr"],
    css: `
@font-face { font-family: "Tiny5"; font-weight: 400; font-display: swap; src: url(/assets/fonts/tiny5-cyr.woff2) format("woff2"); unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116; }
@font-face { font-family: "Tiny5"; font-weight: 400; font-display: swap; src: url(/assets/fonts/tiny5-lat.woff2) format("woff2"); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
.dots { font-family: "Tiny5", var(--display); font-weight: 400; letter-spacing: 0; line-height: 0.875; }
.dots span { padding-bottom: 0;
  -webkit-mask-image: radial-gradient(circle, #000 0 27%, transparent 33%); mask-image: radial-gradient(circle, #000 0 27%, transparent 33%);
  -webkit-mask-size: 0.125em 0.125em; mask-size: 0.125em 0.125em; }
h1.dots { font-size: clamp(40px, 9.4vw, 104px); margin: 24px 0 36px; }
.dots span + span { margin-top: 0.125em; }
h2.dots { font-size: clamp(34px, 6vw, 68px); }
@media (max-width: 639px) { .dots span { -webkit-mask-image: none; mask-image: none; } }`,
  },
};
