import Link from "next/link";
import { copy } from "@/content/copy.da";
import { integrations } from "@/content/data";
import { Icon, type IconName } from "@/components/ui/Icon";

export function TrustGrid() {
  const t = copy.home.trust;
  const facts: { icon: IconName; title: string; body: string }[] = [
    { icon: "server", title: "Hostet i Frankfurt", body: "Al data bliver i EU." },
    { icon: "lock", title: "Krypteret", body: "Under overførsel og i hvile." },
    { icon: "doc", title: "Databehandleraftale", body: "Klar til underskrift." },
    { icon: "clock", title: "Daglig backup", body: "Gendannelse er testet." },
  ];
  return (
    <section className="section-dark pad-standard" aria-labelledby="trust-title">
      <div className="container-wide grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="reveal">
          <p className="t-label mb-4">{t.label}</p>
          <h2 id="trust-title" className="t-display">{t.title}</h2>
          <p className="t-lead mt-5 max-w-md">{t.body}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-8">
            <Link href="/sikkerhed" className="link-arrow">{t.security} <Icon name="arrowRight" size={16} /></Link>
            <Link href="/platform#integrationer" className="link-arrow">{t.integrations} <Icon name="arrowRight" size={16} /></Link>
          </div>
        </div>
        <div className="grid gap-6">
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--r-xl)] border border-line bg-line">
            {facts.map((f) => (
              <li key={f.title} className="bg-bg p-5 md:p-6">
                <Icon name={f.icon} className="text-accent" />
                <p className="mt-4 t-small font-semibold text-heading">{f.title}</p>
                <p className="text-[0.8125rem] text-muted">{f.body}</p>
              </li>
            ))}
          </ul>
          <ul className="grid grid-cols-4 gap-2" aria-label="Integrationer (eksempler)">
            {integrations.map((n) => (
              <li key={n} className="grid h-[4.5rem] place-items-center rounded-[16px] border border-line bg-surface px-2 text-center text-[0.8125rem] font-semibold text-heading">{n}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
