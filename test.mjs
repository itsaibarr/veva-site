// node test.mjs            → structure + red list + live link check on dist/
// node test.mjs --offline  → skip the network
// node test.mjs --url URL  → fetch the deployed pages instead of dist/
import { readFileSync, existsSync } from "node:fs";
import { RED_LIST, CONTENT } from "./content.mjs";

const args = process.argv.slice(2);
const offline = args.includes("--offline");
const urlIdx = args.indexOf("--url");
const base = urlIdx >= 0 ? args[urlIdx + 1].replace(/\/$/, "") : null;

const SECTIONS = ["hero", "help", "work", "veva", "how", "contact"];
let failures = 0;
const fail = (msg) => { failures++; console.error("✗ " + msg); };
const ok = (msg) => console.log("✓ " + msg);

async function pageHtml(lang) {
  const path = CONTENT[lang].path;
  if (base) return (await fetch(base + path)).text();
  const file = path === "/" ? "dist/index.html" : `dist${path}index.html`;
  if (!existsSync(file)) { fail(`${file} missing`); return ""; }
  return readFileSync(file, "utf8");
}

const links = new Set();
for (const lang of Object.keys(CONTENT)) {
  const html = await pageHtml(lang);
  if (!html) continue;
  for (const id of SECTIONS) {
    if (!html.includes(`id="${id}"`)) fail(`${lang}: section #${id} missing`);
  }
  if (!html.includes(`<html lang="${lang}"`)) fail(`${lang}: <html lang> wrong`);
  const text = html.replace(/<[^>]+>/g, " ");
  for (const phrase of RED_LIST) {
    if (text.toLowerCase().includes(phrase.toLowerCase())) fail(`${lang}: red-list phrase "${phrase}" present`);
  }
  const cards = (html.match(/class="card"/g) || []).length;
  if (cards !== 6) fail(`${lang}: expected 6 work cards, found ${cards}`);
  for (const m of html.matchAll(/href="(https?:\/\/[^"]+)"/g)) links.add(m[1]);
  ok(`${lang}: sections, lang attr, red list, 6 cards`);
}

// every card in content has the five required fields
for (const lang of Object.keys(CONTENT)) {
  for (const c of CONTENT[lang].work.items) {
    for (const f of ["problem", "built", "stack", "result"]) {
      if (!c[f]) fail(`${lang}/${c.id}: empty ${f}`);
    }
    if (!c.proof?.href?.startsWith("http")) fail(`${lang}/${c.id}: proof href missing`);
  }
}
ok("content: every card has problem/built/stack/result/proof");

if (!offline) {
  const results = await Promise.all([...links].map(async (u) => {
    try {
      const r = await fetch(u, { redirect: "follow", headers: { "user-agent": "Mozilla/5.0 link-check" } });
      return [u, r.status];
    } catch (e) { return [u, e.message]; }
  }));
  for (const [u, s] of results) {
    if (typeof s !== "number" || s >= 400) fail(`link ${u} → ${s}`);
  }
  ok(`${links.size} external links checked`);
}

if (failures) { console.error(`\n${failures} failure(s)`); process.exit(1); }
console.log("\nall green");
