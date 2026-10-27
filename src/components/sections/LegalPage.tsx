// Legal text is a draft (UDKAST) until a Danish lawyer has reviewed it (§12.10).
export function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: [string, string][] }) {
  return (
    <section className="pt-12 pb-20 md:pt-20 md:pb-28">
      <div className="container-wide grid gap-12 lg:grid-cols-[240px_1fr] lg:gap-16">
        <nav aria-label="Indhold" className="hidden lg:block">
          <ol className="sticky top-28 space-y-1 t-small">
            {sections.map(([h], i) => (
              <li key={h}><a href={`#s${i}`} className="block rounded-md py-1.5 text-muted transition-colors hover:text-heading">{h}</a></li>
            ))}
          </ol>
        </nav>
        <article className="max-w-[68ch]">
          <p className="inline-block rounded-full bg-[oklch(0.95_0.05_85)] px-3 py-1 t-small font-semibold text-[oklch(0.45_0.1_70)]">UDKAST – skal gennemgås af advokat</p>
          <h1 className="t-display mt-6">{title}</h1>
          <p className="mt-3 t-small text-muted">Senest opdateret {updated}</p>
          <div className="mt-12 space-y-10">
            {sections.map(([h, b], i) => (
              <section key={h} id={`s${i}`}>
                <h2 className="t-h4" id={h === "Cookies" ? "cookies" : undefined}>{i + 1}. {h}</h2>
                <p className="mt-3 t-body text-muted">{b}</p>
              </section>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
