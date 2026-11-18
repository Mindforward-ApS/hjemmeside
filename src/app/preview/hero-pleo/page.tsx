import { Bebas_Neue } from "next/font/google";
import { NyForside } from "@/components/lab/NyForside";

// Condensed caps display face from Marco's reference (2026-11-02). Full æ ø å via latin-ext.
const bebas = Bebas_Neue({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-bebas", display: "swap" });

export default function HeroPleoPage() {
  return (
    <div className={bebas.variable}>
      <NyForside hero="pleo" />
    </div>
  );
}
