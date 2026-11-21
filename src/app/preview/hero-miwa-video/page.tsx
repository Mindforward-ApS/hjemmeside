import { Bebas_Neue, Geist } from "next/font/google";
import { NyForside } from "@/components/lab/NyForside";

const bebas = Bebas_Neue({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-bebas", display: "swap" });
const geist = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-geist", display: "swap" });

// Marco 2026-11-21: Miwa's animated clip (walks to the desk, works, turns to the viewer) as a card in the hero.
export default function Page() {
  return (
    <div className={`${bebas.variable} ${geist.variable}`}>
      <NyForside layout="ny" practice="b" pilot="a" sep={1} miwa="video" />
    </div>
  );
}
