import { Bebas_Neue, Google_Sans_Flex } from "next/font/google";
import { NyForside } from "@/components/lab/NyForside";
import { Skift } from "./Skift";

// Design pass preview (Marco 2026-11-24, design/troevaerdighed.md): the live home with points 1, 2, 3 and 6 applied
// as one CSS layer, switchable Før/Efter. Nothing here touches the live site.
export const metadata = { robots: { index: false } };
const bebas = Bebas_Neue({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-bebas", display: "swap" });
const geist = Google_Sans_Flex({ subsets: ["latin", "latin-ext"], variable: "--font-geist", display: "swap" });

import { designCss } from "@/components/lab/designPass";
export { designCss };

export default function Page() {
  return (
    <div className={`${bebas.variable} ${geist.variable}`}>
      <style>{designCss}</style>
      <NyForside layout="ny" practice="b" pilot="a" sep={1} />
      <Skift />
    </div>
  );
}
