// Viewport screenshots at a few scroll positions: node scripts/viewport.mjs /route 1440 0,700
import { chromium } from "playwright";
const [route = "/", w = "1440", ys = "0"] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: Number(w), height: Number(w) < 600 ? 812 : 900 } });
const errors = [];
p.on("pageerror", (e) => errors.push(e.message.slice(0, 160)));
p.on("console", (m) => m.type() === "error" && errors.push(m.text().slice(0, 160)));
await p.goto("http://localhost:3400" + route, { waitUntil: "networkidle" });
await p.waitForTimeout(2500);
for (const y of ys.split(",").map(Number)) {
  await p.evaluate((y) => window.scrollTo(0, y), y);
  await p.waitForTimeout(900);
  await p.screenshot({ path: `.shots/v-${route.replace(/\W+/g, "_")}-${w}-${y}.png` });
}
const ov = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
console.log(route, w, "errors:", errors.length ? errors : "none", "h-overflow:", ov);
await b.close();
