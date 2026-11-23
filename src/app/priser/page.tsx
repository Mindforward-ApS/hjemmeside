import type { Metadata } from "next";
import { Google_Sans_Flex } from "next/font/google";
import { Faq, Price } from "@/components/lab/Forside2";

// Marco 2026-11-23: Google Sans Flex under the old --font-geist name.
const geist = Google_Sans_Flex({ subsets: ["latin", "latin-ext"], variable: "--font-geist", display: "swap" });

export const metadata: Metadata = {
  title: "Priser",
  description: "Erhverv fra 55 kr. pr. bruger pr. måned ekskl. moms. Privat fra 34,50 kr. pr. måned. Ingen binding.",
  alternates: { canonical: "/priser" },
};

// Marco 2026-11-17: /priser shows the same prices and questions as the front page (src/content/priser.ts), with its
// own Erhverv / Privat switch. The old plans (Privat / Virksomhed / Tilpasset, yearly billing) are gone.
export default function PricingPage() {
  return (
    <div className={geist.variable} style={{ background: "#f5f2ef" }}>
      <Price toggle />
      <Faq />
    </div>
  );
}
