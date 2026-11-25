import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLandingPage } from "@/content/landingssider";
import { KursusLanding, landingMetadata } from "@/components/seo/KursusLanding";

const page = getLandingPage("chatgpt-kursus");

export const metadata: Metadata = page ? landingMetadata(page) : {};

export default function Page() {
  if (!page) notFound();
  return <KursusLanding page={page} />;
}
