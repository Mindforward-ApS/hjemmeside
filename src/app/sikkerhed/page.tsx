import type { Metadata } from "next";
import { HeroInternal } from "@/components/sections/HeroInternal";
import { FooterCta } from "@/components/sections/FooterCta";
import { Faq } from "@/components/sections/Faq";

export const metadata: Metadata = { title: "Sikkerhed", description: "Hosting, kryptering, backup, databehandleraftale og underdatabehandlere.", alternates: { canonical: "/sikkerhed" } };

// Fill with the project's actual setup. Never claim a certification you don't hold.
const subProcessors = [
  ["Vercel", "Hosting af hjemmeside og app", "EU (Frankfurt)"],
  ["Neon", "Database", "EU (Frankfurt)"],
  ["[Mailudbyder]", "Transaktionelle mails", "[Region]"],
  ["Anthropic", "AI-forslag til svar (kun nødvendige data)", "[Region – tjek aftalen]"],
  ["Stripe", "Kortbetaling", "[Region]"],
];

export default function SecurityPage() {
  return (
    <>
      <HeroInternal label="Sikkerhed" title="Dine data, dine regler" sub="Her er præcis, hvor dine data ligger, hvem der behandler dem, og hvordan vi passer på dem." />
      <section className="pb-16 md:pb-24">
        <div className="container-wide grid gap-4 md:grid-cols-2">
          {[
            ["Hosting i EU", "App og database kører i Frankfurt. Data forlader ikke EU uden en aftale, der tillader det."],
            ["Kryptering", "TLS under overførsel og kryptering i hvile på database og backup."],
            ["Backup", "Point-in-time restore. Vi har testet en fuld gendannelse [dato]."],
            ["Adgang", "Kun to personer har admin-adgang. Det kræver 2FA, og al adgang logges."],
          ].map(([h, b]) => (
            <article key={h} className="card p-6 md:p-8">
              <h2 className="t-h3">{h}</h2>
              <p className="mt-3 t-body text-muted">{b}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="pad-standard section-dark">
        <div className="container-wide">
          <h2 className="t-display">Underdatabehandlere</h2>
          <div className="mt-10 overflow-x-auto rounded-[var(--r-xl)] border border-line">
            <table className="w-full min-w-[560px] text-left t-small">
              <thead className="bg-surface text-muted">
                <tr><th className="p-4 font-semibold">Leverandør</th><th className="p-4 font-semibold">Formål</th><th className="p-4 font-semibold">Region</th></tr>
              </thead>
              <tbody className="divide-y divide-line">
                {subProcessors.map(([n, f, r]) => (
                  <tr key={n}><td className="p-4 font-semibold text-heading">{n}</td><td className="p-4">{f}</td><td className="p-4">{r}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 t-small text-muted">Databehandleraftale: skriv til hej@example.dk, så sender vi den samme dag.</p>
        </div>
      </section>
      <Faq title="Spørgsmål om data" items={[
        { q: "Bruger I mine data til at træne AI?", a: "Nej. AI-forslag laves ud fra den enkelte henvendelse, og vores aftale med udbyderen forbyder træning på dine data. [Verificér mod aftalen.]" },
        { q: "Kan jeg få alle mine data ud?", a: "Ja, som CSV når som helst, og automatisk tilbudt, hvis du opsiger." },
        { q: "Hvad sker der med data, når jeg stopper?", a: "Vi gemmer dem i [X] dage, så du kan komme tilbage, og sletter dem derefter. Du kan bede om sletning med det samme." },
      ]} />
      <FooterCta />
    </>
  );
}
