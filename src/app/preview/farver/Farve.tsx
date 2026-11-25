import { Bebas_Neue, Google_Sans_Flex } from "next/font/google";
import { NyForside } from "@/components/lab/NyForside";

// Colour test (Marco 2026-11-24: "tre forskellige farver som kan få troværdigheden op"). The live home, only the
// colours change, as one CSS layer per variant. Preview only.
const bebas = Bebas_Neue({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-bebas", display: "swap" });
const geist = Google_Sans_Flex({ subsets: ["latin", "latin-ext"], variable: "--font-geist", display: "swap" });

type P = { dark: string; dark2: string; deep: string; accent: string; accentDark: string; cream: string; veil: string };
const palettes: Record<"a" | "b" | "c", P> = {
  // A · Rolig orange: same brown, orange flat and quieter, no glows.
  a: { dark: "#201613", dark2: "#2a1d18", deep: "#140d0b", accent: "#e8662a", accentDark: "#c9531c", cream: "#f5f2ef", veil: "rgba(32,22,19,0.92)" },
  // B · Espresso: deeper, more neutral brown, muted terracotta accent, warm paper white.
  b: { dark: "#1b1715", dark2: "#24201d", deep: "#110e0d", accent: "#c4572f", accentDark: "#a5461f", cream: "#f3eee7", veil: "rgba(27,23,21,0.93)" },
  // C · Nat-blå: deep navy instead of brown (the classic trust colour), cream, a small warm orange accent.
  c: { dark: "#14213d", dark2: "#1c2b4a", deep: "#0c1528", accent: "#e8662a", accentDark: "#c9531c", cream: "#f4f1ea", veil: "rgba(20,33,61,0.92)" },
};

function css(p: P) {
  // Only backgrounds: brown is also the text colour, so never match "color:" styles.
  const darkSel = ["#201613", "rgb(32, 22, 19)", "#2a1d18", "#1a0f0c"].flatMap((c) => [`[style*="background:${c}"]`, `[style*="background: ${c}"]`, `[style*="background-color: ${c}"]`, `[style*="background-color:${c}"]`]).join(", ") + `, .bg-\\[\\#201613\\]`;
  return `
  /* dark surfaces */
  :is(${darkSel}):not(img):not(svg) { background: ${p.dark} !important; }
  [data-hero] [aria-hidden][style*="0.92"], #kurser [aria-hidden] > div[style*="0.92"], #virksomheder [aria-hidden] > div[style*="0.92"] { background: ${p.veil} !important; }
  html.brun [data-brun], html.brun .pris-glow > [data-brun] { background: linear-gradient(180deg, ${p.dark2} 0%, ${p.dark} 100%) !important; }
  footer[style] { background: ${p.dark} !important; }
  footer section[style] { background: ${p.dark} !important; }
  /* light surfaces */
  html.rytme { --lys-b: ${p.cream}; }
  /* accent: flat, no gradients, no glows */
  .greb-btn:not(.greb-btn--light) { --fill: linear-gradient(${p.accent}, ${p.accent}) !important; box-shadow: inset 0 1px 0 rgba(255,255,255,.22), 0 1px 2px rgba(0,0,0,.2), 0 8px 18px -10px rgba(0,0,0,.35) !important; }
  .greb-btn::before, .greb-btn::after { display: none !important; }
  .greb-btn__circle { background: ${p.deep} !important; }
  .pris-glow, .eu-frame { background: ${p.accent} !important; animation: none !important; }
  .pris-glow::before { display: none !important; }
  .pris-glow:has(> [data-brun]) { box-shadow: 0 1px 2px rgba(0,0,0,.2), 0 18px 34px -18px rgba(0,0,0,.45) !important; }
  .kontakt-glow, [data-glow] { display: none !important; }
  .bg-clip-text { background: none !important; -webkit-text-fill-color: ${p.accent} !important; color: ${p.accent} !important; }
  [style*="#f8400a"], [style*="#f8580a"], [style*="rgb(248, 64, 10)"] { color: ${p.accent} !important; }
  [style*="linear-gradient(90deg, #fb970a, #f8400a)"]:not(.bg-clip-text) { background: ${p.accent} !important; }
  a[href="/venteliste"] { background: ${p.accent} !important; }
  ::selection { background: ${p.accent}; color: #fff; }
  `;
}

// Button test in Espresso (Marco 2026-11-24): three primary-button looks. The design pass sets the buttons with
// ".dp main :is(…)", so these rules start with "html.dp body" to win. White secondary buttons stay as they are.
const PB = ".greb-btn:not(.greb-btn--light), .nf-press.h-11.text-white";
const CIRCLE = ".greb-btn:not(.greb-btn--light) .greb-btn__circle, .nf-press.h-11.text-white > svg";
const ON_DARK = ":is([data-hero], [data-brun], #virksomheder)"; // the dark backgrounds: hero + nav, brown cards, pilot
type Knap = { bg: string; color: string; shadow: string; press: string; circle: string; arrow: string; dark?: { bg: string; color: string; shadow: string; circle: string; arrow: string } };
const knapper: Record<1 | 2 | 3, Knap> = {
  // 1 · Terracotta, flad: one solid colour, a small press, no gradient, no glow.
  1: { bg: "#c4572f", color: "#fff", shadow: "inset 0 1px 0 rgba(255,255,255,.16), 0 1px 2px rgba(0,0,0,.22), 0 8px 16px -10px rgba(0,0,0,.4)", press: "inset 0 2px 4px rgba(0,0,0,.25)", circle: "#1b1715", arrow: "#fff" },
  // 2 · Terracotta med blød 3D: light top edge, darker bottom, like a physical key.
  2: { bg: "linear-gradient(180deg, #d06a40 0%, #c4572f 55%, #ad4823 100%)", color: "#fff", shadow: "inset 0 1px 0 rgba(255,255,255,.38), inset 0 -3px 0 rgba(80,25,8,.32), 0 1px 1px rgba(0,0,0,.3), 0 4px 8px -2px rgba(0,0,0,.22), 0 14px 24px -12px rgba(0,0,0,.42)", press: "inset 0 2px 5px rgba(80,25,8,.5)", circle: "#1b1715", arrow: "#fff" },
  // 3 · Espresso-mørk: dark brown button, light circle; cream on dark backgrounds. Orange is left to Miwa.
  3: { bg: "linear-gradient(180deg, #332b27 0%, #1b1715 100%)", color: "#fff", shadow: "inset 0 1px 0 rgba(255,255,255,.14), 0 1px 2px rgba(0,0,0,.3), 0 10px 20px -10px rgba(0,0,0,.45)", press: "inset 0 2px 5px rgba(0,0,0,.45)", circle: "#f3eee7", arrow: "#1b1715",
    dark: { bg: "linear-gradient(180deg, #fbf8f3 0%, #ece5db 100%)", color: "#1b1715", shadow: "inset 0 1px 0 #fff, 0 1px 2px rgba(0,0,0,.3), 0 10px 20px -10px rgba(0,0,0,.5)", circle: "#1b1715", arrow: "#fff" } },
};
function knapCss(k: Knap) {
  const d = k.dark;
  return `
  html.dp body :is(${PB}) { background: ${k.bg} !important; color: ${k.color} !important; box-shadow: ${k.shadow} !important; filter: none !important; }
  html.dp body :is(${PB}):active { box-shadow: ${k.press} !important; }
  html.dp body :is(${CIRCLE}) { background: ${k.circle} !important; color: ${k.arrow} !important; box-shadow: none !important; }
  ${d ? `
  html.dp body ${ON_DARK} :is(${PB}) { background: ${d.bg} !important; color: ${d.color} !important; box-shadow: ${d.shadow} !important; }
  html.dp body ${ON_DARK} :is(${PB}) > :not(.greb-btn__circle):not(svg) { color: ${d.color} !important; }
  html.dp body ${ON_DARK} :is(${CIRCLE}) { background: ${d.circle} !important; color: ${d.arrow} !important; }` : ""}
  `;
}

export function Farve({ v, k }: { v: "a" | "b" | "c"; k?: 1 | 2 | 3 }) {
  return (
    <div className={`${bebas.variable} ${geist.variable}`}>
      <style>{css(palettes[v]) + (k ? knapCss(knapper[k]) : "")}</style>
      <NyForside layout="ny" practice="b" pilot="a" sep={1} />
    </div>
  );
}
