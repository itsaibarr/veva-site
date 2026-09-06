// node test.mjs            → structure + red list + live link check on dist/
// node test.mjs --offline  → skip the network
// node test.mjs --url URL  → fetch the deployed pages instead of dist/
import { readFileSync, existsSync } from "node:fs";
import { parseArgs } from "node:util";
import { RED_LIST, CONTENT, SECTIONS } from "./content.mjs";

const { values: { offline, url } } = parseArgs({ options: { offline: { type: "boolean" }, url: { type: "string" } } });
if (url !== undefined && !/^https?:\/\//.test(url)) { console.error("--url needs an absolute http(s) URL"); process.exit(2); }
const base = url?.replace(/\/$/, "") ?? null;
const UNVERIFIABLE = ["linkedin.com"]; // answers 999 to every non-browser client, real or not
const TIMEOUT = 15_000;

let failures = 0;
const fail = (msg) => { failures++; console.error("✗ " + msg); };
const ok = (msg) => console.log("✓ " + msg);

async function pageHtml(lang) {
  const path = CONTENT[lang].path;
  if (base) {
    const r = await fetch(base + path, { signal: AbortSignal.timeout(TIMEOUT) });
    if (!r.ok) { fail(`${lang}: HTTP ${r.status} for ${base + path}`); return ""; }
    return r.text();
  }
  const file = `dist${path}index.html`;
  if (!existsSync(file)) { fail(`${file} missing`); return ""; }
  return readFileSync(file, "utf8");
}

// A phrase made only of letters must match as a whole word; anything else is a substring.
const hit = (text, phrase) => /^[\p{L}-]+$/u.test(phrase)
  ? new RegExp(`(?<![\\p{L}])${phrase}(?![\\p{L}])`, "iu").test(text)
  : text.toLowerCase().includes(phrase.toLowerCase());

const links = new Set();
let origin = null;
for (const lang of Object.keys(CONTENT)) {
  const html = await pageHtml(lang);
  if (!html) continue;
  for (const id of ["hero", ...SECTIONS]) if (!html.includes(`id="${id}"`)) fail(`${lang}: section #${id} missing`);
  if (!html.includes(`<html lang="${lang}"`)) fail(`${lang}: <html lang> wrong`);
  if (!html.includes("<main>")) fail(`${lang}: <main> landmark missing`);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (canonical && !/^https?:\/\//.test(canonical)) fail(`${lang}: canonical is not absolute: ${canonical}`);
  if (canonical) origin = new URL(canonical).origin;
  // Scan everything except the inlined stylesheet: attributes (meta, og, alt) included.
  const scanned = html.replace(/<style>[\s\S]*?<\/style>/, "");
  for (const phrase of RED_LIST) if (hit(scanned, phrase)) fail(`${lang}: red-list phrase "${phrase}" present`);
  const cards = (html.match(/class="card"/g) || []).length;
  if (cards !== 6) fail(`${lang}: expected 6 work cards, found ${cards}`);
  for (const m of html.matchAll(/<a [^>]*href="(https?:\/\/[^"]+)"/g)) links.add(m[1].replace(/&amp;/g, "&"));
  ok(`${lang}: sections, lang attr, main, canonical, red list, 6 cards`);
}

for (const lang of Object.keys(CONTENT)) {
  for (const c of CONTENT[lang].work.items) {
    for (const f of ["problem", "built", "stack", "result"]) if (!c[f]) fail(`${lang}/${c.name}: empty ${f}`);
    if (!c.proof?.href?.startsWith("http")) fail(`${lang}/${c.name}: proof href missing`);
  }
}
ok("content: every card has problem/built/stack/result/proof");

if (!offline) {
  const external = [...links].filter((u) => !(origin && u.startsWith(origin)));
  const skipped = external.filter((u) => UNVERIFIABLE.some((h) => u.includes(h)));
  const checked = external.filter((u) => !skipped.includes(u));
  const results = await Promise.all(checked.map(async (u) => {
    try {
      const r = await fetch(u, { redirect: "follow", signal: AbortSignal.timeout(TIMEOUT), headers: { "user-agent": "Mozilla/5.0 link-check" } });
      return [u, r.status];
    } catch (e) { return [u, e.name]; }
  }));
  for (const [u, s] of results) if (typeof s !== "number" || s >= 400) fail(`link ${u} → ${s}`);
  ok(`${checked.length} external links checked, ${skipped.length} skipped as unverifiable (${skipped.join(", ")})`);
}

if (failures) { console.error(`\n${failures} failure(s)`); process.exit(1); }
console.log("\nall green");
