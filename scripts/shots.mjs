// Self-review screenshots (§2.6): node scripts/shots.mjs / /priser ...
import { chromium } from "playwright";
const base = process.env.BASE ?? "http://localhost:3400";
const out = process.env.OUT ?? "./.shots";
const routes = process.argv.slice(2).length ? process.argv.slice(2) : ["/"];
const widths = (process.env.WIDTHS ?? "375,768,1440").split(",").map(Number);
const browser = await chromium.launch();
for (const w of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1 });
  for (const r of routes) {
    await page.goto(base + r, { waitUntil: "networkidle" });
    // trigger reveals
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); } window.scrollTo(0, 0); });
    await page.waitForTimeout(600);
    const name = (r === "/" ? "home" : r.replace(/\//g, "_").replace(/^_/, "")) + `-${w}.png`;
    await page.screenshot({ path: `${out}/${name}`, fullPage: true });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    console.log(name, overflow > 0 ? `H-OVERFLOW ${overflow}px` : "ok");
  }
  await page.close();
}
await browser.close();
