import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata: Metadata = { title: "Privatlivspolitik", alternates: { canonical: "/privatliv" }, robots: { index: true } };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privatlivspolitik"
      updated="[dato]"
      sections={[
        ["Dataansvarlig", "[Firmanavn ApS], [CVR], [adresse], [mail]."],
        ["Hvilke data vi behandler", "[Liste: konto (mail, navn), henvendelser og tilbud du opretter, tekniske logs uden personfølsomme data.]"],
        ["Formål og retsgrundlag", "[For hver kategori: formål + GDPR art. 6-grundlag.]"],
        ["Databehandlere og regioner", "[Vercel, Neon, mailudbyder, Anthropic, Stripe – med regioner. Se /sikkerhed.]"],
        ["Opbevaring", "[Hændelsesdata: 13 måneder, derefter aggregeret. Kontodata: indtil sletning + X dage.]"],
        ["Dine rettigheder", "[Indsigt, berigtigelse, sletning, dataportabilitet, indsigelse. Klage til Datatilsynet.]"],
        ["Cookies", "Vi bruger kun nødvendige cookies, indtil du siger ja til andet. [Liste over cookies og formål.]"],
        ["AI", "Når du bruger forslag til svar, behandles henvendelsens tekst af en AI-model. Forslaget er altid tydeligt markeret, og du godkender, før noget sendes."],
      ]}
    />
  );
}
