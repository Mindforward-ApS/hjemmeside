import { Bebas_Neue, Geist } from "next/font/google";
import { NyForside } from "@/components/lab/NyForside";

// Condensed caps display face from Marco's reference (2026-11-02). Full æ ø å via latin-ext.
const bebas = Bebas_Neue({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-bebas", display: "swap" });
const geist = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-geist", display: "swap" });

// Marco 2026-11-11: the new front page (/preview/forside-ny) is the home page: hero unchanged, everything below in
// the new structure, Øvemiljø B, Pilot A (picture left), section separation 1. The previous home is ?gammel via git.
export default function Home() {
  return (
    <div className={`${bebas.variable} ${geist.variable}`}>
      <NyForside layout="ny" practice="b" pilot="a" sep={1} />
    </div>
  );
}
