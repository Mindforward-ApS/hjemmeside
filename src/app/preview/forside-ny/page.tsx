import { Bebas_Neue, Geist } from "next/font/google";
import { NyForside } from "@/components/lab/NyForside";

const bebas = Bebas_Neue({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-bebas", display: "swap" });
const geist = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-geist", display: "swap" });

// Hero unchanged; everything below in the new structure (Forside2), 2026-11-10. Øvemiljøet = version B (Marco: "Klart B"), Pilot = A mirrored (picture left), section separation 1 "Skiftende flader". "/" is unchanged.
export default function Page() {
  return (
    <div className={`${bebas.variable} ${geist.variable}`}>
      <NyForside layout="ny" practice="b" pilot="a" sep={1} />
    </div>
  );
}
