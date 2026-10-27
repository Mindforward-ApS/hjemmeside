// Scroll-through frames for motion review: node scripts/frames.mjs /preview/motion/a 1440
import { chromium } from "playwright";
const [route = "/", w = "1440"] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: Number(w), height: 900 } });
const errors = [];
p.on("pageerror", (e) => errors.push(e.message));
p.on("console", (m) => m.type() === "error" && errors.push(m.text()));
await p.goto("http://localhost:3400" + route, { waitUntil: "networkidle" });
await p.waitForTimeout(1200);
const H = await p.evaluate(() => document.documentElement.scrollHeight);
const n = 12;
for (let i = 0; i < n; i++) {
  const y = Math.round((H - 900) * (i / (n - 1)));
  await p.evaluate((y) => window.scrollTo(0, y), y);
  await p.waitForTimeout(700);
  await p.screenshot({ path: `.shots/f-${route.replace(/\W+/g, "_")}-${w}-${String(i).padStart(2, "0")}.png` });
}
console.log("height", H, "errors", JSON.stringify(errors.slice(0, 5)));
const ov = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
console.log("h-overflow", ov);
await b.close();
