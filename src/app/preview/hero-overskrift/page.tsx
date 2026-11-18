import { Bebas_Neue } from "next/font/google";
import { HeroOverskrift } from "@/components/lab/HeroOverskrift";

// Hero test without cards (Marco 2026-11-05). Preview only.
const bebas = Bebas_Neue({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-bebas", display: "swap" });

export default function Page() {
  return (
    <div className={bebas.variable}>
      <HeroOverskrift />
    </div>
  );
}
