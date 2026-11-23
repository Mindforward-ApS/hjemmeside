import { Bebas_Neue, Google_Sans_Flex } from "next/font/google";
import { NyForside } from "@/components/lab/NyForside";

// Section background test (Marco 2026-11-23): the home page with fewer surface colours. a = white/sand alternating,
// b = all white with sand cards. Everything else is the live home.
const bebas = Bebas_Neue({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-bebas", display: "swap" });
const geist = Google_Sans_Flex({ subsets: ["latin", "latin-ext"], variable: "--font-geist", display: "swap" });

export function Side({ sep }: { sep: 4 | 5 }) {
  return (
    <div className={`${bebas.variable} ${geist.variable}`}>
      <NyForside layout="ny" practice="b" pilot="a" sep={sep} />
    </div>
  );
}
