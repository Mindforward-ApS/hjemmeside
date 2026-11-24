import { Bebas_Neue, Google_Sans_Flex } from "next/font/google";
import { NyForside } from "@/components/lab/NyForside";
import { designCss } from "@/components/lab/designPass";
import { Skift } from "./Skift";

// Punkt 5 · Rigtig UI (Marco 2026-11-24): the design-pass preview plus real platform UI in three places
// (Løsningen video poster, Teamoverblik, Data i EU), switchable Før/Efter.
export const metadata = { robots: { index: false } };
const bebas = Bebas_Neue({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-bebas", display: "swap" });
const geist = Google_Sans_Flex({ subsets: ["latin", "latin-ext"], variable: "--font-geist", display: "swap" });

export default function Page() {
  return (
    <div className={`${bebas.variable} ${geist.variable}`}>
      <style>{designCss}</style>
      <NyForside layout="ny" practice="b" pilot="a" sep={1} />
      <Skift />
    </div>
  );
}
