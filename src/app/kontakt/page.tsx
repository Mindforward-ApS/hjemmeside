import type { Metadata } from "next";
import { KontaktSide } from "@/components/forms/KontaktSide";

export const metadata: Metadata = { title: "Kontakt", description: "Skriv, ring eller book 15 minutter. Svar inden for 1 hverdag.", alternates: { canonical: "/kontakt" } };

// Marco 2026-11-23: new contact page after his reference (KontaktSide).
export default function ContactPage() {
  return <KontaktSide />;
}
