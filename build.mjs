// node build.mjs → dist/<path>index.html per language + dist/assets/  (CSS is inlined)
import { mkdirSync, writeFileSync, cpSync, rmSync, existsSync, readFileSync } from "node:fs";
import { basename } from "node:path";
import { CONTENT, SECTIONS } from "./content.mjs";

// Absolute origin for hreflang/canonical. Vercel injects the production host at
// build time; without any origin the tags are omitted rather than emitted relative.
const ORIGIN = (process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "")).replace(/\/$/, "");
if (!ORIGIN) console.warn("build: no SITE_URL / VERCEL_PROJECT_PRODUCTION_URL, skipping canonical + hreflang");
const CSS = readFileSync("style.css", "utf8");
// Latin subsets carry digits and punctuation, so every page needs them; Cyrillic only on RU.
const FONTS = (lang) => ["tiny5-lat", "inter-lat", "inter-arrow", "mono-lat", ...(lang === "ru" ? ["tiny5-cyr", "inter-cyr", "mono-cyr"] : [])];

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const ext = (href) => (href.startsWith("http") ? ' target="_blank" rel="noopener"' : "");
const a = (link, cls = "") => `<a class="${cls}" href="${esc(link.href)}"${ext(link.href)}>${esc(link.label)}</a>`;
const dots = (lines, tag = "h1") => `<${tag} class="dots">${lines.map((l) => `<span>${esc(l)}</span>`).join("")}</${tag}>`;
const sectionHead = (s) => `<div class="shead"><p class="label">${esc(s.label)}</p>${dots([s.title], "h2")}</div>`;
const nn = (i) => String(i + 1).padStart(2, "0");
// numbered list items: [heading, text] or {title, text, ev}
const numbered = (items, lead = () => "") => items.map((it, i) => {
  const [h, p, ev] = Array.isArray(it) ? it : [it.title, it.text, it.ev];
  return `<li>${lead(i)}<span class="label">${nn(i)}</span><h3>${esc(h)}</h3><p>${esc(p)}</p>${ev ? `<p class="ev">${esc(ev)}</p>` : ""}</li>`;
}).join("");
const kv = (pairs) => pairs.map(([k, v]) => `<li><span class="label">${esc(k)}</span><span>${esc(v)}</span></li>`).join("");

function card(c, f) {
  const media = c.image
    ? `<img class="plate" src="/assets/half/${c.image}.png" width="1200" height="750" alt="" loading="lazy" decoding="async">`
    : c.plateText ? `<pre class="plate plate-text" aria-hidden="true">${esc(c.plateText)}</pre>` : "";
  const proofs = [c.proof, c.proof2].filter(Boolean).map((p) => a(p, "proof")).join(" ");
  return `<article class="card">
  ${media}
  <div class="card-head"><h3>${esc(c.name)}</h3><span class="tag">${esc(c.status)}</span></div>
  <dl class="fields">
    <dt>${esc(f.problem)}</dt><dd>${esc(c.problem)}</dd>
    <dt>${esc(f.built)}</dt><dd>${esc(c.built)}</dd>
    <dt>${esc(f.stack)}</dt><dd>${esc(c.stack)}</dd>
    <dt>${esc(f.result)}</dt><dd>${esc(c.result)}</dd>
  </dl>
  <div class="card-foot">${proofs}</div>
</article>`;
}

function page(t) {
  const alt = CONTENT[t.lang === "ru" ? "en" : "ru"];
  const langLink = (cls = "") => `<a class="${cls}" href="${alt.path}" hreflang="${alt.lang}" lang="${alt.lang}">${alt.lang.toUpperCase()}</a>`;
  const seo = ORIGIN ? `
<link rel="alternate" hreflang="${t.lang}" href="${ORIGIN}${t.path}">
<link rel="alternate" hreflang="${alt.lang}" href="${ORIGIN}${alt.path}">
<link rel="alternate" hreflang="x-default" href="${ORIGIN}/">
<link rel="canonical" href="${ORIGIN}${t.path}">
<meta property="og:url" content="${ORIGIN}${t.path}">` : "";
  return `<!doctype html>
<html lang="${t.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t.title)}</title>
<meta name="description" content="${esc(t.description)}">
<meta property="og:title" content="${esc(t.title)}">
<meta property="og:description" content="${esc(t.description)}">
<meta property="og:type" content="website">${seo}
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
${FONTS(t.lang).map((f) => `<link rel="preload" href="/assets/fonts/${f}.woff2" as="font" type="font/woff2" crossorigin>`).join("\n")}
<style>${CSS}</style>
</head>
<body>
<div class="frame">
<header class="top">
  <a class="brand" href="${t.path}">${esc(t.hero.label.split(" · ")[0])}</a>
  <nav aria-label="${t.lang === "ru" ? "Разделы" : "Sections"}">${SECTIONS.map((id, i) => `<a href="#${id}">${esc(t.nav[i])}</a>`).join("")}</nav>
  ${langLink("lang")}
</header>

<main>
<section class="hero" id="hero">
  <img class="plate-hero" src="/assets/ascii/hero.png" width="960" height="1280" alt="" decoding="async" fetchpriority="low">
  <p class="label">${esc(t.hero.label)}</p>
  ${dots(t.hero.title)}
  <p class="lead">${esc(t.hero.lead)}</p>
  <div class="ctas">${a(t.hero.cta, "btn")}${a(t.hero.cta2, "btn ghost")}</div>
  <ul class="meta">${kv(t.hero.meta)}</ul>
</section>

<section id="help">
  ${sectionHead(t.help)}
  <ol class="tiles">${numbered(t.help.items)}</ol>
</section>

<section id="work">
  ${sectionHead(t.work)}
  <p class="intro">${esc(t.work.intro)}</p>
  <div class="cards">${t.work.items.map((c) => card(c, t.work.fields)).join("")}</div>
  <p class="label also-label">${esc(t.work.alsoLabel)}</p>
  <ul class="also">${t.work.also.map((s) => `<li><h3>${esc(s.name)}</h3><p>${esc(s.text)}</p>${s.proof ? a(s.proof, "proof") : ""}</li>`).join("")}</ul>
</section>

<section id="veva">
  ${sectionHead(t.veva)}
  <p class="intro">${esc(t.veva.intro)}</p>
  <div class="veva-body"><img class="plate-veva" src="/assets/ascii/veva.png" width="720" height="960" alt="" loading="lazy" decoding="async"><ol class="qs">${numbered(t.veva.items)}</ol></div>
  <p class="note label">${esc(t.veva.note)}</p>
</section>

<section id="how">
  ${sectionHead(t.how)}
  <ol class="steps">${numbered(t.how.steps, (i) => `<img class="plate-step" src="/assets/ascii/step${i + 1}.png" width="800" height="600" alt="" loading="lazy" decoding="async">`)}</ol>
  <ul class="meta facts">${kv(t.how.facts)}</ul>
</section>

<section id="contact">
  ${sectionHead(t.contact)}
  <p class="intro">${esc(t.contact.intro)}</p>
  <img class="plate-contact" src="/assets/ascii/contact.png" width="1500" height="500" alt="" loading="lazy" decoding="async">
  <ul class="channels">${t.contact.items.map(([k, c]) => `<li><span class="label">${esc(k)}</span><a href="${esc(c.href)}"${ext(c.href)}>${esc(c.value)}</a></li>`).join("")}</ul>
</section>
</main>

<footer class="foot">
  <p>${esc(t.footer.line)}</p>
  <p>${a(t.footer.veva)} · ${langLink()}</p>
</footer>

</div>
</body>
</html>
`;
}

if (existsSync("dist")) rmSync("dist", { recursive: true });
for (const t of Object.values(CONTENT)) {
  mkdirSync(`dist${t.path}`, { recursive: true });
  writeFileSync(`dist${t.path}index.html`, page(t));
}
cpSync("assets", "dist/assets", { recursive: true, filter: (p) => basename(p) !== "src" });
console.log(`built dist/ (${Object.keys(CONTENT).join(", ")})`);
