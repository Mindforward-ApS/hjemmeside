import { Bebas_Neue, Geist } from "next/font/google";
import { Switcher } from "./Switcher";

const bebas = Bebas_Neue({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-bebas", display: "swap" });
const geist = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-geist", display: "swap" });

// The new front page with three versions of the Øvemiljøet section (2026-11-10), switcher at the bottom.
export default function Page() {
  return (
    <div className={`${bebas.variable} ${geist.variable}`}>
      <Switcher />
    </div>
  );
}
