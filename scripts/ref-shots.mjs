// Reference captures for design/DNA.md (internal study only, not shipped): node scripts/ref-shots.mjs https://www.docebo.com/ docebo-home
import { chromium } from "playwright";
const [url, name] = process.argv.slice(2);
const b = await chromium.launch();
for (const w of [1440, 390]) {
  const p = await b.newPage({ viewport: { width: w, height: w < 600 ? 844 : 900 }, userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36" });
  await p.goto(url, { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});
  await p.waitForTimeout(3000);
  // decline/close cookie banners if present (privacy-preserving choice)
  for (const sel of ["#onetrust-reject-all-handler", "button:has-text('Reject')", "button:has-text('Decline')"]) { try { await p.click(sel, { timeout: 1500 }); break; } catch {} }
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  let i = 0;
  for (let y = 0; y < Math.min(H, 14000); y += (w < 600 ? 844 : 900)) {
    await p.evaluate((y) => window.scrollTo(0, y), y);
    await p.waitForTimeout(900);
    await p.screenshot({ path: `design/references/${name}-${w}-${String(i++).padStart(2, "0")}.png` });
  }
  console.log(name, w, "height", H, "frames", i);
  await p.close();
}
await b.close();
