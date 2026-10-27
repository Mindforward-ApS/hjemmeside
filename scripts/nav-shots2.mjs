import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
for (const v of (process.env.VARS ?? "b-sort,b-skov,b-petrol").split(",")) {
  await p.goto(`http://localhost:3400/preview/nav/${v}`, { waitUntil: "networkidle" });
  await p.waitForTimeout(1800);
  await p.screenshot({ path: `.shots/nav2-${v}-top.png`, clip: { x: 0, y: 0, width: 1440, height: 560 } });
  await p.locator('header[data-preview-nav] button:has-text("Platform")').first().hover();
  await p.waitForTimeout(600);
  await p.screenshot({ path: `.shots/nav2-${v}-mega.png`, clip: { x: 0, y: 0, width: 1440, height: 640 } });
  await p.mouse.move(700, 880);
  await p.waitForTimeout(400);
  await p.evaluate(() => window.scrollTo(0, 900));
  await p.waitForTimeout(800);
  await p.screenshot({ path: `.shots/nav2-${v}-scrolled.png`, clip: { x: 0, y: 0, width: 1440, height: 140 } });
}
await b.close();
