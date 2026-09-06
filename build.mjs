// node build.mjs → dist/index.html (ru), dist/en/index.html, dist/style.css, dist/assets/
import { mkdirSync, writeFileSync, cpSync, rmSync, existsSync } from "node:fs";
import { CONTENT } from "./content.mjs";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const ext = (href) => (href.startsWith("http") ? ' target="_blank" rel="noopener"' : "");
const a = (link, cls = "") => `<a class="${cls}" href="${esc(link.href)}"${ext(link.href)}>${esc(link.label)}</a>`;
const dots = (lines, tag = "h1") => `<${tag} class="dots">${lines.map((l) => `<span>${esc(l)}</span>`).join("")}</${tag}>`;
const sectionHead = (s, id) => `<div class="shead"><p class="label">${esc(s.label)}</p>${dots([s.title], "h2")}</div>`;

// The outreach engine's public status document, shown instead of a screenshot.
const STATUS_JSON = `{
  "service": "resona-outreach",
  "killSwitch": "on",
  "sendEnabled": false
}`;

function card(c, f) {
  const media = c.image
    ? `<img class="plate" src="/assets/half/${c.image}.png" width="1200" height="750" alt="" loading="lazy" decoding="async">`
    : `<pre class="plate plate-text" aria-hidden="true">${esc(STATUS_JSON)}</pre>`;
  const proofs = [c.proof, c.proof2].filter(Boolean).map((p) => a(p, "proof")).join(" ");
  return `<article class="card" id="p-${c.id}">
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
  return `<!doctype html>
<html lang="${t.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t.title)}</title>
<meta name="description" content="${esc(t.description)}">
<meta property="og:title" content="${esc(t.title)}">
<meta property="og:description" content="${esc(t.description)}">
<meta property="og:type" content="website">
<link rel="alternate" hreflang="${t.lang}" href="${t.path}">
<link rel="alternate" hreflang="${alt.lang}" href="${alt.path}">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/assets/fonts/unbounded-${t.lang === "ru" ? "cyr" : "lat"}.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/inter-${t.lang === "ru" ? "cyr" : "lat"}.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/style.css">
</head>
<body>
<div class="frame">

<header class="top">
  <a class="brand" href="${t.path}">${esc(t.hero.label.split(" · ")[0])}</a>
  <nav aria-label="${t.lang === "ru" ? "Разделы" : "Sections"}">${t.nav.map(([h, l]) => `<a href="${h}">${esc(l)}</a>`).join("")}</nav>
  <a class="lang" href="${t.otherPath}" hreflang="${alt.lang}" lang="${alt.lang}">${esc(t.otherLabel)}</a>
</header>

<section class="hero" id="hero">
  <p class="label">${esc(t.hero.label)}</p>
  ${dots(t.hero.title)}
  <p class="lead">${esc(t.hero.lead)}</p>
  <div class="ctas">${a(t.hero.cta, "btn")}${a(t.hero.cta2, "btn ghost")}</div>
  <ul class="meta">${t.hero.meta.map(([k, v]) => `<li><span class="label">${esc(k)}</span><span>${esc(v)}</span></li>`).join("")}</ul>
</section>

<section id="help">
  ${sectionHead(t.help)}
  <ol class="tiles">${t.help.items.map((i) => `<li><span class="label">${esc(i.n)}</span><h3>${esc(i.title)}</h3><p>${esc(i.text)}</p><p class="ev">${esc(i.ev)}</p></li>`).join("")}</ol>
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
  <ol class="qs">${t.veva.items.map(([h, p], i) => `<li><span class="label">${String(i + 1).padStart(2, "0")}</span><h3>${esc(h)}</h3><p>${esc(p)}</p></li>`).join("")}</ol>
  <p class="note label">${esc(t.veva.note)}</p>
</section>

<section id="how">
  ${sectionHead(t.how)}
  <ol class="steps">${t.how.steps.map(([h, p], i) => `<li><span class="label">${String(i + 1).padStart(2, "0")}</span><h3>${esc(h)}</h3><p>${esc(p)}</p></li>`).join("")}</ol>
  <ul class="meta facts">${t.how.facts.map(([k, v]) => `<li><span class="label">${esc(k)}</span><span>${esc(v)}</span></li>`).join("")}</ul>
</section>

<section id="contact">
  ${sectionHead(t.contact)}
  <p class="intro">${esc(t.contact.intro)}</p>
  <ul class="channels">${t.contact.items.map(([k, c]) => `<li><span class="label">${esc(k)}</span><a href="${esc(c.href)}"${ext(c.href)}>${esc(c.value)}</a></li>`).join("")}</ul>
</section>

<footer class="foot">
  <p>${esc(t.footer.line)}</p>
  <p>${a(t.footer.veva)} · <a href="${t.otherPath}" hreflang="${alt.lang}" lang="${alt.lang}">${esc(t.otherLabel)}</a></p>
</footer>

</div>
</body>
</html>
`;
}

if (existsSync("dist")) rmSync("dist", { recursive: true });
mkdirSync("dist/en", { recursive: true });
writeFileSync("dist/index.html", page(CONTENT.ru));
writeFileSync("dist/en/index.html", page(CONTENT.en));
cpSync("style.css", "dist/style.css");
cpSync("assets", "dist/assets", { recursive: true, filter: (p) => !p.includes("/src") });
console.log("built dist/ (ru, en)");
