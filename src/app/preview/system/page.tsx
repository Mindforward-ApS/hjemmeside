import { Bebas_Neue, Geist } from "next/font/google";
import { NyForside } from "@/components/lab/NyForside";

const bebas = Bebas_Neue({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-bebas", display: "swap" });
const geist = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-geist", display: "swap" });

// Marco 2026-11-12: preview of the card-and-section system under the unchanged hero. The live home page is untouched.
export default function SystemPreview() {
  return (
    <div className={`${bebas.variable} ${geist.variable}`}>
      <NyForside layout="ny" practice="b" pilot="a" sep={1} system />
    </div>
  );
}
