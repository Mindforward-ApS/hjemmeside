"use client";

// The front page with the "Lyse" treatment (Marco 2026-11-05: "det skal være meget mere som ... solcelle" → "Bare lav
// det flot"). Same sections and copy as /; only the system changes, all through the .mf-lyse wrapper:
// - Type: Archivo with the width axis (expanded, sentence case, tight tracking) for every display heading, Geist for
//   body text. Display sizes scale by --dz (hero 0.8, the rest 0.95) because Archivo expanded is wider than Bebas.
// - Buttons: one primary (coral pill, 52 px) and one outline, everywhere ([data-btn]).
// - Backgrounds: a fixed rhythm of cream, stone and dark instead of white/sand/cream mixed.
// - UI motion: "AI skriver" (only the AI-written text is typed; everything else pops in once).
import { NyForside } from "@/components/lab/NyForside";
import { PhotoOverride, type PhotoSpec } from "@/components/lab/photoOverride";

// Documentary photos from Wikimedia Commons (CC BY / BY-SA, credits in public/img/doc/CREDITS.json; a public
// credits page is needed before this goes live).
const photos: Record<string, PhotoSpec> = {
  Mails: { src: "/img/doc/mails-2.jpg", pos: "35% 50%", ui: "right" },
  Møder: { src: "/img/doc/team-1.jpg", pos: "65% 45%", ui: "left" },
  Excel: { src: "/img/doc/excel-1.jpg", pos: "30% 50%", ui: "right" },
  Data: { src: "/img/doc/data-1.jpg", pos: "50% 55%", ui: "left" },
  pilot: { src: "/img/doc/pilot-1.jpg", pos: "70% 40%" },
};

const css = `
  .mf-lyse { --dz: 0.95; font-family: var(--font-geist), system-ui, sans-serif; }
  .mf-lyse [class*="--font-bebas"], .mf-lyse [data-display] {
    font-family: var(--font-bebas), system-ui, sans-serif !important;
    text-transform: none !important;
    font-variation-settings: "wdth" 115;
    font-weight: 600 !important;
    letter-spacing: -0.035em !important;
    line-height: 1.02 !important;
    text-wrap: balance;
  }
  .mf-lyse [data-hero-title] { --dz: 0.8; font-variation-settings: "wdth" 118; letter-spacing: -0.045em !important; line-height: 0.96 !important; }
  .mf-lyse [data-display] { font-size: clamp(2rem, 1.1rem + 3.2vw, 4rem) !important; }

  /* Buttons: one fill colour + one outline */
  .mf-lyse [data-btn] {
    height: 52px !important; padding: 0 24px !important; border-radius: 999px !important;
    align-items: center; gap: 10px;
    font-size: 15px !important; font-weight: 600 !important; letter-spacing: -0.01em;
    transition: background-color .18s, border-color .18s, transform .18s !important;
  }
  .mf-lyse [data-btn^="primary"] { background: #e8664a !important; color: #201613 !important; border: 1px solid transparent !important; }
  .mf-lyse [data-btn^="primary"]:hover { background: #ef7b61 !important; filter: none !important; }
  .mf-lyse [data-btn^="primary"]:active { transform: translateY(1px); }
  .mf-lyse [data-btn="primary-sm"] { height: 40px !important; padding: 0 18px !important; font-size: 14px !important; }
  .mf-lyse [data-btn="ghost"] { background: transparent !important; color: #201613 !important; border: 1px solid rgba(32,22,19,0.22) !important; box-shadow: none !important; }
  .mf-lyse [data-btn="ghost"]:hover { border-color: #201613 !important; }
  .mf-lyse [data-btn] svg { transition: transform .18s; }
  .mf-lyse [data-btn]:hover svg { transform: translateX(4px); }

  /* Background rhythm: hero dark · cream · dark · cream · stone · dark photo · cream · stone · cream */
  .mf-lyse [data-page] > section:nth-of-type(2) { background: #f7f2ee !important; }
  .mf-lyse [data-page] > section:nth-of-type(4) { background: #f7f2ee !important; }
  .mf-lyse [data-page] > section:nth-of-type(5) { background: #efe7e1 !important; }
  .mf-lyse [data-page] > section:nth-of-type(7) { background: #f7f2ee !important; }
  .mf-lyse [data-page] > section:nth-of-type(8) { background: #efe7e1 !important; }
  .mf-lyse [data-page] > section:nth-of-type(9) { background: #f7f2ee !important; }
  .mf-lyse [data-page] { background: #f7f2ee !important; }
`;

export function LyseForside() {
  return (
    <div className="mf-lyse">
      <style>{css}</style>
      <PhotoOverride.Provider value={photos}>
        <NyForside uiMode="type" />
      </PhotoOverride.Provider>
    </div>
  );
}
