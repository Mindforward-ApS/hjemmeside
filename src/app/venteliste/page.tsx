import type { Metadata } from "next";
import { Instrument_Serif, Inter_Tight } from "next/font/google";
import { Venteliste } from "@/components/venteliste/Venteliste";

const serif = Instrument_Serif({ subsets: ["latin", "latin-ext"], weight: "400", style: ["italic"], variable: "--font-wl-serif", display: "swap" });
// Display face for the headline: tight, slightly narrow letters.
const display = Inter_Tight({ subsets: ["latin", "latin-ext"], weight: ["500", "600"], variable: "--font-wl-display", display: "swap" });

// SEO (Marco 2026-11-19): Danish search terms people actually use (AI-kursus, AI-træning, ChatGPT, Copilot, Claude),
// a canonical URL and a share image in the waitlist's look.
const title = "Mindforward – AI-kurser på dansk i ChatGPT, Copilot og Claude";
const description = "Lær at bruge AI i dit arbejde og din hverdag. Korte AI-kurser på dansk, øvelser fra din egen hverdag og et certifikat, når du er færdig. Åbner 1. januar 2027. Skriv dig op.";
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: ["AI-kursus", "AI kursus", "AI-træning", "ChatGPT kursus", "Copilot kursus", "Claude kursus", "AI for medarbejdere", "AI på dansk", "lær AI", "AI-uddannelse"],
  alternates: { canonical: "/venteliste" },
  openGraph: { title, description, url: "/venteliste", type: "website", locale: "da_DK", siteName: "Mindforward" },
  twitter: { card: "summary_large_image", title, description },
};

// The waitlist (Marco 2026-11-19), at /venteliste since the full website is the home page again (2026-11-20).
export default function WaitlistPage() {
  return <div className={`${serif.variable} ${display.variable}`}><Venteliste /></div>;
}
