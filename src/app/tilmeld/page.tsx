import type { Metadata } from "next";
import { copy } from "@/content/copy.da";
import { SignupForm } from "@/components/forms/SignupForm";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = { title: "Prøv gratis", description: "14 dage gratis. Intet kreditkort. Du skal kun bruge din mail.", alternates: { canonical: "/tilmeld" } };

export default function SignupPage() {
  const s = copy.signup;
  return (
    <section className="pt-12 pb-20 md:pt-20 md:pb-28">
      <div className="container-wide grid gap-12 lg:grid-cols-[1fr_minmax(0,480px)] lg:gap-20">
        <div className="lg:pt-6">
          <h1 className="t-hero max-w-xl">{s.title}</h1>
          <p className="t-lead mt-6 max-w-md">{s.sub}</p>
          <ul className="mt-10 space-y-3">
            {copy.pricing.risk.map((r) => (
              <li key={r} className="flex items-center gap-3 t-body font-medium text-heading">
                <span className="grid size-6 place-items-center rounded-full bg-accent-soft text-accent"><Icon name="check" size={14} /></span>
                {r}
              </li>
            ))}
          </ul>
          {/* Proof at the moment of commitment (§4.4) */}
          <figure className="ph mt-12 max-w-md border-l-2 border-accent pl-5">
            <blockquote className="t-body text-heading">“[TESTIMONIAL NEEDED: kort citat om, hvor nemt det var at komme i gang]”</blockquote>
            <figcaption className="mt-3 t-small text-muted">[Navn], [rolle], [firma]</figcaption>
          </figure>
        </div>
        <SignupForm />
      </div>
    </section>
  );
}
