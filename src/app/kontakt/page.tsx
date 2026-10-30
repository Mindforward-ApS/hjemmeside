import type { Metadata } from "next";
import { copy } from "@/content/copy.da";
import { site } from "@/content/site";
import { ContactForm } from "@/components/forms/ContactForm";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = { title: "Kontakt", description: "Skriv, ring eller book 15 minutter. Svar inden for 1 hverdag.", alternates: { canonical: "/kontakt" } };

export default function ContactPage() {
  const c = copy.contact;
  return (
    <section className="pt-12 pb-20 md:pt-20 md:pb-28">
      <div className="container-wide grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="t-label mb-5">Kontakt</p>
          <h1 className="t-hero">{c.title}</h1>
          <p className="t-lead mt-6 max-w-md">{c.sub}</p>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {[
              { icon: "mail" as const, label: "Mail", value: site.company.email, href: `mailto:${site.company.email}` },
              ...(site.company.phone.startsWith("[") ? [] : [{ icon: "phone" as const, label: "Telefon", value: site.company.phone, href: `tel:${site.company.phone}` }]),
              { icon: "clock" as const, label: "Svartid", value: site.company.responsePromise },
            ].map((r) => (
              <li key={r.label} className="flex min-h-16 items-center gap-4 py-3">
                <Icon name={r.icon} className="text-accent" />
                <span className="w-20 t-small text-muted">{r.label}</span>
                {r.href ? <a href={r.href} className="t-h4 hover:text-accent">{r.value}</a> : <span className="t-h4">{r.value}</span>}
              </li>
            ))}
          </ul>
          <p className="mt-6 t-small text-muted">{[site.company.legalName, site.company.cvr, site.company.address].filter((v) => !v.startsWith("[")).join(" · ")}</p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
