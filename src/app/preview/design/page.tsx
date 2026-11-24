import { Bebas_Neue, Google_Sans_Flex } from "next/font/google";
import { NyForside } from "@/components/lab/NyForside";
import { Skift } from "./Skift";

// Design pass preview (Marco 2026-11-24, design/troevaerdighed.md): the live home with points 1, 2, 3 and 6 applied
// as one CSS layer, switchable Før/Efter. Nothing here touches the live site.
export const metadata = { robots: { index: false } };
const bebas = Bebas_Neue({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-bebas", display: "swap" });
const geist = Google_Sans_Flex({ subsets: ["latin", "latin-ext"], variable: "--font-geist", display: "swap" });

const P = ".greb-btn:not(.greb-btn--light), .nf-press.h-11.text-white";
const S = ".greb-btn.greb-btn--light, .nf-press.h-11:not(.text-white), .nf-press.h-\\[43px\\]";

export const designCss = `
/* 1 · Ét knapsystem: alle primære orange, alle sekundære hvide, samme pille og samme løft. */
.dp main :is(${P}) { background: linear-gradient(90deg, #fb970a, #f8400a) !important; color: #fff !important; border-color: transparent !important;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.3), inset 0 -2px 5px rgba(120,20,0,.35), 0 1px 1px rgba(0,0,0,.3), 0 3px 6px -2px rgba(0,0,0,.26), 0 14px 24px -12px rgba(0,0,0,.38) !important; }
.dp main :is(${S}) { background: #fff !important; color: #201613 !important; border-color: transparent !important;
  box-shadow: inset 0 0 0 1px rgba(32,22,19,.12), 0 1px 1px rgba(0,0,0,.06), 0 3px 6px -2px rgba(0,0,0,.08), 0 12px 20px -12px rgba(0,0,0,.16) !important; }
.dp main :is(${P}, ${S}):active { box-shadow: inset 0 2px 6px rgba(120,20,0,.45) !important; transform: translateY(0) !important; }

/* 1b · Samme form på alle knapper: højde 43, Tilmeld-skriften, pil i mørk cirkel til højre, så bred som teksten. */
.dp main :is(.nf-press.h-11, .nf-press.h-\\[43px\\]), .dp .nf-focus.h-9 {
  display: inline-flex !important; width: auto !important; align-self: flex-start !important; justify-content: flex-start !important;
  gap: 1.18em !important; height: 43px !important; min-height: 0 !important; padding: 5px 5px 5px 22px !important; border-radius: 999px !important;
  font: 700 13px/1.2 var(--font-grotesk), system-ui, sans-serif !important; letter-spacing: -.015em !important; }
.dp main .nf-press.h-11 > svg, .dp .nf-focus.h-9 > svg {
  order: 2; width: 33px !important; height: 33px !important; padding: 10px; box-sizing: border-box; flex: none;
  border-radius: 50%; background: #1a0e08; color: #fff; transform: rotate(-45deg); }
.dp main .nf-press.h-\\[43px\\] { flex-direction: row-reverse; }
.dp main .nf-press.h-\\[43px\\] > span:first-child { width: 33px !important; height: 33px !important; }

/* 1c · Hvide knapper: kun tekst, ingen cirkel og pil (Marco 2026-11-24). Orange beholder cirklen. */
.dp :is(.greb-btn--light) .greb-btn__circle,
.dp main :is(.nf-press.h-11:not(.text-white), .nf-press.h-\\[43px\\]) > :is(svg, span:first-child) { display: none !important; }
.dp .greb-btn.greb-btn--light,
.dp main :is(.nf-press.h-11:not(.text-white), .nf-press.h-\\[43px\\]) { padding: 0 24px !important; height: 43px !important; justify-content: center !important; }

/* 2 · Orange er beholdt overalt (Marco 2026-11-24): rammer, ikoncirkler, barer og glød som på den live side. */

/* 2b · "Skriv til os" i pilotforløbet bliver en hvid knap som de andre: kun mailadressen, ingen cirkel (Marco 2026-11-24). */
.dp main a.nf-focus.rounded-full.bg-white[href^="mailto:"] {
  height: 43px !important; padding: 0 24px !important; gap: 0 !important; justify-content: center !important;
  box-shadow: inset 0 0 0 1px rgba(32,22,19,.12), 0 1px 1px rgba(0,0,0,.06), 0 3px 6px -2px rgba(0,0,0,.08), 0 12px 20px -12px rgba(0,0,0,.16) !important; }
.dp main a.nf-focus.rounded-full.bg-white[href^="mailto:"] > span:first-child { display: none !important; }
.dp main a.nf-focus.rounded-full.bg-white[href^="mailto:"] span.leading-tight > span.block { display: none !important; }
.dp main a.nf-focus.rounded-full.bg-white[href^="mailto:"] :is(small, span, p) { font: 700 13px/1.2 var(--font-grotesk), system-ui, sans-serif !important; letter-spacing: -.015em !important; color: #201613 !important; text-transform: none !important; }

/* 3 · Kort med dybde: én radius-skala (24 ude, 16 inde), 1 px kant, lag-skygge og en lys linje i toppen. */
.dp main :is(.rounded-\\[20px\\], .rounded-\\[22px\\], .rounded-\\[24px\\], .rounded-\\[32px\\], .rounded-\\[34px\\]):not(.pris-glow):not(button):not(a) { border-radius: 24px !important; }
.dp main :is(.rounded-\\[16px\\], .rounded-\\[18px\\], .rounded-\\[19px\\]) { border-radius: 16px !important; }
.dp main :is(.rounded-\\[20px\\], .rounded-\\[24px\\], .rounded-\\[32px\\], .rounded-\\[34px\\]):is(.bg-white, [style*="#fbf8f3"], [style*="#f5f2ef"]):not(button):not(a) {
  box-shadow: 0 0 0 1px rgba(32,22,19,.07), inset 0 1px 0 rgba(255,255,255,.9), 0 1px 2px rgba(32,22,19,.05), 0 8px 16px -8px rgba(32,22,19,.08), 0 24px 40px -24px rgba(32,22,19,.18) !important; border-color: transparent !important; }

/* 4 · Ét ikon-sprog (Marco 2026-11-24): samme stregtykkelse overalt, 18 px i alle lister, ét flueben (orange, 18 px). */
.dp main svg:not(.greb-btn svg) :is(path, circle, rect, polyline, line)[stroke], .dp main svg[stroke]:not(.greb-btn svg) :is(path, circle, rect, polyline, line) { stroke-width: 1.75 !important; }
.dp main li > svg:first-child { width: 18px !important; height: 18px !important; flex: none; }
.dp main :is(#priser, #kontakt) li > svg:first-child { color: #f8580a !important; }
.dp main ul[data-hero-in] > li > svg:first-child { width: 22px !important; height: 22px !important; } /* hero: større tekst, større ikon */

/* 3b · Ét kortudtryk (Marco 2026-11-24): kun to kortfarver, hvid og brun. Alle lyse kort får Funktioner-kortets udtryk:
   hvid, 24 px hjørner, 1 px kant, samme lag-skygge. Brune kort ([data-brun], øvemiljø-kortet) beholder deres farve. */
.dp main :is(
  #problemet .flex.flex-col.rounded-\\[22px\\]:not(.pris-glow),
  #kurser .self-start.rounded-\\[32px\\],
  [class*="w-\\[var(--cw)\\]"].rounded-\\[24px\\],
  #saadan .grid.content-start.rounded-\\[16px\\],
  #saadan .rounded-\\[16px\\].bg-white,
  #saadan .overflow-hidden.rounded-\\[32px\\].p-3,
  #faq details,
  #kontakt figure,
  #kontakt .relative.rounded-\\[16px\\]
):not([data-brun]) {
  background: #fff !important; border: 1px solid rgba(32,22,19,0.08) !important; border-radius: 24px !important;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.9), 0 1px 2px rgba(32,22,19,.05), 0 8px 16px -8px rgba(32,22,19,.08), 0 24px 40px -24px rgba(32,22,19,.18) !important; }
.dp main #faq details { border-radius: 20px !important; }

/* 6 · Detaljer: tal i samme bredde, formularfelter 48 px, samme fokusring overalt. */
.dp main { font-variant-numeric: tabular-nums; }
.dp main :is(input:not([type=checkbox]):not([type=radio]), select) { min-height: 48px !important; border-radius: 12px !important; }
.dp main textarea { border-radius: 12px !important; }
.dp main :is(a, button, input, textarea, select):focus-visible { outline: 2px solid #201613 !important; outline-offset: 3px !important; }
`;

export default function Page() {
  return (
    <div className={`${bebas.variable} ${geist.variable}`}>
      <style>{designCss}</style>
      <NyForside layout="ny" practice="b" pilot="a" sep={1} />
      <Skift />
    </div>
  );
}
