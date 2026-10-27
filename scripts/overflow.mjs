import { chromium } from "playwright";
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: Number(process.env.W ?? 375), height: 800 } });
await p.goto("http://localhost:3400" + (process.argv[2] ?? "/"), { waitUntil: "networkidle" });
console.log(await p.evaluate(() => [...document.querySelectorAll("body *")].filter(e => { const r = e.getBoundingClientRect(); return r.right > innerWidth + 1 && r.width > 0; }).filter(e => getComputedStyle(e.parentElement).overflowX === "visible").slice(0, 8).map(e => `${e.tagName}.${String(e.className).slice(0, 80)} right=${Math.round(e.getBoundingClientRect().right)}`).join("\n")));
await b.close();
