import { Bebas_Neue, Google_Sans_Flex } from "next/font/google";
import { NyForside } from "@/components/lab/NyForside";

// Fewer cards (Marco 2026-11-24: "alle sektioner er bare fyldt med kort"), then his own plan: Løsningen built around
// the video, an øvemiljø you can try on the page, the pilot picture edge to edge, no cards in FAQ and Kontakt.
// Problemet open; Funktioner, Kurser and Priser keep their cards.
// Preview only, as one CSS layer. The design pass styles cards through :is() lists with section ids, so the rules
// here carry two ids to win.
const bebas = Bebas_Neue({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-bebas", display: "swap" });
const geist = Google_Sans_Flex({ subsets: ["latin", "latin-ext"], variable: "--font-geist", display: "swap" });

const ink = "#201613";
const muted = "#6b625d";
const line = "rgba(32,22,19,0.14)";
const accent = "#f8580a";
const open = `background: transparent !important; box-shadow: none !important; border-color: transparent !important; border-radius: 0 !important;`;

const css = `
/* Problemet: two open columns. */
html.dp body .aab #problemet#problemet .mt-\\[60px\\] { align-items: start !important; }
html.dp body .aab #problemet#problemet .mt-\\[60px\\] > div, html.dp body .aab #problemet#problemet .mt-\\[60px\\] > .pris-glow > [data-brun] { ${open} padding: 0 !important; }
html.dp body .aab #problemet#problemet .pris-glow { animation: none !important; }
html.dp body .aab #problemet#problemet .pris-glow::before, html.dp body .aab #problemet#problemet .pris-glow::after { display: none !important; }
html.dp body .aab #problemet#problemet .pris-glow > p { display: none !important; }
html.dp body .aab #problemet#problemet [data-brun] :is(p, li, span) { color: ${ink} !important; }
html.dp body .aab #problemet#problemet [data-brun] p.mt-3 { color: ${muted} !important; }
html.dp body .aab #problemet#problemet [data-brun] ul { border-color: ${line} !important; }
html.dp body .aab #problemet#problemet .mt-\\[60px\\] ul { border-color: ${line} !important; }
@media (min-width: 768px) {
  html.dp body .aab #problemet#problemet .mt-\\[60px\\] { gap: 0 !important; }
  html.dp body .aab #problemet#problemet .mt-\\[60px\\] > div:first-child { padding-right: 4vw !important; }
  html.dp body .aab #problemet#problemet .mt-\\[60px\\] > .pris-glow { padding-left: 4vw !important; border-radius: 0 !important; }
}

/* FAQ: no cards at all. Questions divided by thin lines; Marco's note sits open on the background. */
html.dp body .aab #faq#faq details { ${open} border-bottom: 1px solid ${line} !important; }
html.dp body .aab #faq#faq details:first-of-type { border-top: 1px solid ${line} !important; }
html.dp body .aab #faq#faq details > summary { padding-left: 0 !important; padding-right: 0 !important; }
html.dp body .aab #faq#faq details > p { padding-left: 0 !important; padding-right: 48px !important; }
html.dp body .aab #faq#faq :has(> details) { gap: 0 !important; }
html.dp body .aab #faq#faq [data-brun] { ${open} padding: 0 !important; }
html.dp body .aab #faq#faq [data-brun] :is(h3, p, span) { color: ${ink} !important; }
html.dp body .aab #faq#faq [data-brun] p.mb-5 { color: ${muted} !important; }
html.dp body .aab #faq#faq [data-brun] blockquote { color: ${muted} !important; border-color: ${line} !important; }
html.dp body .aab #faq#faq [data-brun] blockquote footer { color: ${muted} !important; opacity: .8; }
html.dp body .aab #faq#faq [data-brun] .greb-btn--light, html.dp body .aab #faq#faq [data-brun] .greb-btn--light * { color: ${ink} !important; }

/* Lad os tage en snak: no cards. The form sits straight in the section, Marco's quote is an open quote with a thin
   line. */
html.dp body .aab #kontakt#kontakt [data-mind="peek"] { ${open} padding: 0 !important; }
html.dp body .aab #kontakt#kontakt .kontakt-glow { display: none !important; }
html.dp body .aab #kontakt#kontakt figure { ${open} padding: 0 0 0 22px !important; border-left: 2px solid ${accent} !important; margin-top: 48px !important; margin-bottom: 0 !important; }

/* Pilotforløb: the picture big and edge to edge, top to bottom, still half the section. */
@media (min-width: 1024px) {
  html.dp body .aab #virksomheder#virksomheder { padding-block: 0 !important; }
  html.dp body .aab #virksomheder#virksomheder > div.grid { grid-template-columns: 1fr 1fr !important; align-items: stretch !important; padding-left: 0 !important; }
  html.dp body .aab #virksomheder#virksomheder > div.grid > div:first-child { padding-block: 120px !important; }
  html.dp body .aab #virksomheder#virksomheder > div.grid > div:last-child { border-radius: 0 !important; }
  html.dp body .aab #virksomheder#virksomheder > div.grid > div:last-child > div.relative { aspect-ratio: auto !important; height: 100% !important; min-height: 760px; }
}
`;

export const metadata = { robots: { index: false } };

export default function Page() {
  return (
    <div className={`aab ${bebas.variable} ${geist.variable}`}>
      <style>{css}</style>
      <NyForside layout="ny" practice="b" pilot="a" sep={1} aaben />
    </div>
  );
}
