#!/usr/bin/env bash
# design-director §4: scripts/shots.sh /preview/<screen>/<variant> design/shots/<screen>/<variant>
# Writes full-page PNGs at 375, 768 and 1440 px (plus a 1440 first-viewport crop) for the critic.
set -euo pipefail
ROUTE="${1:?route, e.g. /preview/hero/a}"
OUT="${2:?output folder, e.g. design/shots/hero/a}"
mkdir -p "$OUT"
ROUTE="$ROUTE" OUT="$OUT" node --input-type=module -e '
import { chromium } from "playwright";
const { ROUTE, OUT } = process.env;
const b = await chromium.launch();
for (const w of [375, 768, 1440]) {
  const p = await b.newPage({ viewport: { width: w, height: w < 600 ? 812 : 900 } });
  await p.goto("http://localhost:3400" + ROUTE, { waitUntil: "networkidle" });
  await p.waitForTimeout(2500);
  await p.screenshot({ path: `${OUT}/${w}-fold.png` });
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } scrollTo(0, 0); });
  await p.waitForTimeout(800);
  await p.screenshot({ path: `${OUT}/${w}.png`, fullPage: true });
  await p.close();
}
await b.close();
console.log("wrote", OUT);
'
