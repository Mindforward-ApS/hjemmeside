import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
for (const v of ["a", "b", "c"]) {
  await p.goto(`http://localhost:3400/preview/nav/${v}`, { waitUntil: "networkidle" });
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `.shots/nav-${v}-top.png`, clip: { x: 0, y: 0, width: 1440, height: 260 } });
  // mega menu open
  const btn = p.locator('header[data-preview-nav] button:has-text("Platform")').first();
  await btn.hover();
  await p.waitForTimeout(600);
  await p.screenshot({ path: `.shots/nav-${v}-mega.png`, clip: { x: 0, y: 0, width: 1440, height: 640 } });
  await p.mouse.move(700, 850);
  await p.waitForTimeout(400);
  await p.evaluate(() => window.scrollTo(0, 900));
  await p.waitForTimeout(800);
  await p.screenshot({ path: `.shots/nav-${v}-scrolled.png`, clip: { x: 0, y: 0, width: 1440, height: 160 } });
}
await b.close();
