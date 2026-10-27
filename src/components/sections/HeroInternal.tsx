import Link from "next/link";
import type { ReactNode } from "react";

export function HeroInternal({
  label,
  title,
  sub,
  primary,
  secondary,
  aside,
}: {
  label: string;
  title: ReactNode;
  sub: ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  aside?: ReactNode;
}) {
  return (
    <section className="pt-12 pb-12 md:pt-20 md:pb-16">
      <div className={`container-wide grid gap-10 ${aside ? "lg:grid-cols-[1.1fr_1fr] lg:items-end" : ""}`}>
        <div className="max-w-3xl">
          <p className="t-label mb-5">{label}</p>
          <h1 className="t-hero">{title}</h1>
          <p className="t-lead mt-6 max-w-xl">{sub}</p>
          {(primary || secondary) && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {primary && <Link href={primary.href} className="btn btn-primary">{primary.label}</Link>}
              {secondary && <Link href={secondary.href} className="btn btn-secondary">{secondary.label}</Link>}
            </div>
          )}
        </div>
        {aside}
      </div>
    </section>
  );
}
