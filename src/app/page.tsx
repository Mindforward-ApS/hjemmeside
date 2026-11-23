import type { Metadata } from "next";
import { Bebas_Neue, Google_Sans_Flex } from "next/font/google";
import { NyForside } from "@/components/lab/NyForside";

// Condensed caps display face from Marco's reference (2026-11-02). Full æ ø å via latin-ext.
const bebas = Bebas_Neue({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-bebas", display: "swap" });
// Marco 2026-11-23: Google Sans Flex under the old --font-geist name.
const geist = Google_Sans_Flex({ subsets: ["latin", "latin-ext"], variable: "--font-geist", display: "swap" });

const title = "Mindforward – AI-kurser på dansk i ChatGPT, Copilot og Claude";
const description = "Lær at bruge AI i dit arbejde og din hverdag. Korte AI-kurser på dansk, et øvemiljø med opgaver fra din egen hverdag og et certifikat, når du er færdig.";
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: ["AI-kursus", "AI kursus", "AI-træning", "ChatGPT kursus", "Copilot kursus", "Claude kursus", "AI for medarbejdere", "AI på dansk", "lær AI", "AI-uddannelse"],
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/", type: "website", locale: "da_DK", siteName: "Mindforward" },
  twitter: { card: "summary_large_image", title, description },
};

// Marco 2026-11-20: the full website is the home page again instead of the waitlist (which lives at /venteliste).
// Hero unchanged, everything below in the new structure, Øvemiljø B, Pilot A (picture left), section separation 1.
export default function Home() {
  return (
    <div className={`${bebas.variable} ${geist.variable}`}>
      <NyForside layout="ny" practice="b" pilot="a" sep={6} />
    </div>
  );
}
