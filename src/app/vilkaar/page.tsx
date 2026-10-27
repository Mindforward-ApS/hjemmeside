import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata: Metadata = { title: "Vilkår", alternates: { canonical: "/vilkaar" } };

export default function TermsPage() {
  return (
    <LegalPage
      title="Vilkår"
      updated="[dato] · version [1]"
      sections={[
        ["Aftalen", "[Parter, hvad aftalen dækker, og hvordan den indgås (clickwrap med versionsnummer).]"],
        ["Ydelsen", "[Præcis beskrivelse af tjenesten og hvad der regnes som en fejl.]"],
        ["Pris og betaling", "[Priser ekskl. moms (B2B), betalingsfrist, fakturering, rykkere og renter efter renteloven.]"],
        ["Binding og opsigelse", "[Ingen binding på månedsplan. Årsplan løber perioden ud. Opsigelse i appen.]"],
        ["Reklamation", "[Skriftligt via formular inden for X dage. Ubestridte beløb forfalder fortsat.]"],
        ["Ansvar", "[Ansvarsbegrænsning, fx 12 måneders betaling; indirekte tab undtaget.]"],
        ["Data", "[Henvisning til privatlivspolitik og databehandleraftale. Eksport ved ophør.]"],
        ["Lovvalg og værneting", "[Dansk ret; værneting ved selskabets hjemting.]"],
      ]}
    />
  );
}
