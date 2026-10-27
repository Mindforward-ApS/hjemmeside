import Link from "next/link";
import { copy } from "@/content/copy.da";
import { Icon } from "@/components/ui/Icon";

// A designed ending with a clear next step (§4.8).
export default function NotFound() {
  const n = copy.notFound;
  const links = [
    { href: "/", label: "Forsiden", body: "Start forfra" },
    { href: "/priser", label: "Priser", body: "Se planerne" },
    { href: "/kontakt", label: "Kontakt", body: "Spørg et menneske" },
  ];
  return (
    <section className="pt-16 pb-24 md:pt-28 md:pb-32">
      <div className="container-wide">
        <p className="tnum t-label">Fejl 404</p>
        <h1 className="t-hero mt-5 max-w-3xl">{n.title}</h1>
        <p className="t-lead mt-6 max-w-lg">{n.sub}</p>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="card group flex items-center justify-between p-6 transition-shadow hover:shadow-2">
                <span>
                  <span className="block t-h4">{l.label}</span>
                  <span className="t-small text-muted">{l.body}</span>
                </span>
                <Icon name="arrowRight" className="text-accent transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
