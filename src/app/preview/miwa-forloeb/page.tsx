import { Bebas_Neue, Geist } from "next/font/google";
import { NyForside } from "@/components/lab/NyForside";

const bebas = Bebas_Neue({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-bebas", display: "swap" });
const geist = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-geist", display: "swap" });

// Marco 2026-11-21: choreography preview — she sits at the computer, lifts the next section, jumps over it and presses the product video.
export default function Page() {
  return (
    <div className={`${bebas.variable} ${geist.variable}`}>
      <NyForside layout="ny" practice="b" pilot="a" sep={1} miwa="forloeb" />
    </div>
  );
}
