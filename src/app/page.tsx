import type { Metadata } from "next";
import { Instrument_Serif, Inter_Tight } from "next/font/google";
import { Venteliste } from "@/components/venteliste/Venteliste";

const serif = Instrument_Serif({ subsets: ["latin", "latin-ext"], weight: "400", style: ["italic"], variable: "--font-wl-serif", display: "swap" });
// Display face for the headline: tight, slightly narrow letters.
const display = Inter_Tight({ subsets: ["latin", "latin-ext"], weight: ["500", "600"], variable: "--font-wl-display", display: "swap" });

export const metadata: Metadata = {
  title: "Mindforward · Skriv dig op",
  description: "AI ændrer måden, vi lever og arbejder på. Skriv dig op til Mindforward, der åbner 1. december 2026.",
};

// Marco 2026-11-19: until launch on 1 December the home page is the waitlist. The launch front page waits at
// /preview/forside-lancering and moves back here at launch.
export default function Home() {
  return <div className={`${serif.variable} ${display.variable}`}><Venteliste /></div>;
}
