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

export function Farve({ v }: { v: "a" | "b" | "c" }) {
  return (
    <div className={`${bebas.variable} ${geist.variable}`}>
      <style>{css(palettes[v])}</style>
      <NyForside layout="ny" practice="b" pilot="a" sep={1} />
    </div>
  );
}
