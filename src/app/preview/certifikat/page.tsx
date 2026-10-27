import type { Metadata } from "next";
import { Certificate, type CertData } from "@/components/cert/Certificate";
import { CertV1, CertV2, CertV3 } from "@/components/cert/CertVariants";

export const metadata: Metadata = { title: "Certifikat", robots: { index: false } };

// Certificate previews with example data. ?v=1|2|3 picks a direction (0 = first draft), ?name= overrides the name.
export default async function Page({ searchParams }: { searchParams: Promise<{ name?: string; v?: string }> }) {
  const sp = await searchParams;
  const d: CertData = {
    name: sp.name ?? "Sofie Lund",
    course: "AI på arbejdet",
    level: "Niveau 1",
    skills: ["Prompting", "AI til mails og referater", "Datasikkerhed og GDPR", "Faktatjek af AI-svar"],
    hours: "8 timer",
    date: "14. november 2026",
    id: "MF-26-04812",
    verifyUrl: "https://mindforward.dk/c/MF-26-04812",
    signer: "Marco Nielsen",
    signerTitle: "Stifter, Mindforward",
  };
  const v = sp.v ?? "1";
  return (
    <div className="grid min-h-svh place-items-center bg-neutral-700 p-10">
      <div id="cert" className="shadow-2xl">
        {v === "0" ? <Certificate d={d} /> : v === "2" ? <CertV2 d={d} /> : v === "3" ? <CertV3 d={d} /> : <CertV1 d={d} />}
      </div>
    </div>
  );
}
