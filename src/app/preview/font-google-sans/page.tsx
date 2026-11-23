import type { Metadata } from "next";
import { Bebas_Neue, Google_Sans_Flex } from "next/font/google";
import { NyForside } from "@/components/lab/NyForside";

// Font trial (Marco 2026-11-23, "Prøv den"): the home page with Google Sans Flex (SIL OFL 1.1) in place of
// Inter, Geist and Space Grotesk. The condensed hero caps (Bebas Neue) are unchanged.
const bebas = Bebas_Neue({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-bebas", display: "swap" });
const gsans = Google_Sans_Flex({ subsets: ["latin", "latin-ext"], variable: "--font-gsans", display: "swap" });

export const metadata: Metadata = { title: "Skrifttype: Google Sans Flex", robots: { index: false } };

export default function FontPreview() {
  return (
    <div className={`${bebas.variable} ${gsans.variable} gsans-trial`}>
      <style>{`.gsans-trial { --font-geist: var(--font-gsans); --font-inter: var(--font-gsans); --font-grotesk: var(--font-gsans); --font-text-family: var(--font-gsans), system-ui, sans-serif; --font-display-family: var(--font-gsans), system-ui, sans-serif; font-family: var(--font-gsans), system-ui, sans-serif; }`}</style>
      <NyForside layout="ny" practice="b" pilot="a" sep={1} />
    </div>
  );
}
