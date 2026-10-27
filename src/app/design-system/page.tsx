import type { Metadata } from "next";
import { ProductScreen } from "@/components/product/ProductScreen";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = { title: "Design system", robots: { index: false, follow: false } };

// Living style guide (§6.1): the reference for every new screen.
const swatches = [
  ["--bg", "bg"], ["--surface", "surface"], ["--surface-raised", "surface-raised"], ["--surface-sunk", "surface-sunk"],
  ["--heading", "heading"], ["--text", "text"], ["--text-muted", "text-muted"], ["--border-strong", "border-strong"],
  ["--accent", "accent"], ["--accent-soft", "accent-soft"], ["--success", "success"], ["--danger", "danger"],
];
const space = [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128];

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-12">
      <h2 className="t-label mb-8">{title}</h2>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <div className="container-wide pt-12 pb-24">
      <h1 className="t-display">Design system</h1>
      <p className="t-lead mt-4 max-w-xl">Tokens, typeskala og komponenter i alle tilstande. Ret tokens i <code>globals.css</code>, aldrig i komponenterne.</p>

      <Block title="Farver (semantiske tokens)">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {swatches.map(([v, n]) => (
            <li key={v}>
              <span className="block h-16 rounded-[var(--r-md)] border border-line" style={{ background: `var(${v})` }} />
              <span className="mt-2 block t-small font-semibold text-heading">{n}</span>
              <code className="text-[0.75rem] text-muted">{v}</code>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Typeskala">
        <div className="space-y-6">
          <p className="t-hero">Hero · Æble og ø</p>
          <p className="t-display">Display · Kundehenvendelser</p>
          <p className="t-h3">H3 · Tilbudsgodkendelse</p>
          <p className="t-h4">H4 · Brugervenlighedsundersøgelse</p>
          <p className="t-lead max-w-xl">Lead · Fjord samler henvendelser fra mail, formularer og telefon i én liste.</p>
          <p className="t-body max-w-[65ch]">Body · Brødtekst holder 60–75 tegn pr. linje og linjehøjde 1,6. Tal står i tabeltal: <span className="tnum">1.249</span> kr.</p>
          <p className="t-label">Label · til små overskrifter</p>
        </div>
      </Block>

      <Block title="Spacing">
        <ul className="space-y-2">
          {space.map((s) => (
            <li key={s} className="flex items-center gap-4">
              <code className="tnum w-12 text-[0.75rem] text-muted">{s}</code>
              <span className="h-3 rounded-sm bg-accent" style={{ width: s }} />
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Radius og dybde">
        <div className="flex flex-wrap gap-6">
          {["xs", "sm", "md", "lg", "xl", "2xl"].map((r) => (
            <div key={r} className="grid size-24 place-items-center border border-line bg-surface-raised t-small text-muted" style={{ borderRadius: `var(--r-${r})` }}>{r}</div>
          ))}
          {[1, 2, 3].map((s) => (
            <div key={s} className="grid size-24 place-items-center rounded-[var(--r-lg)] bg-surface-raised t-small text-muted" style={{ boxShadow: `var(--shadow-${s})` }}>shadow-{s}</div>
          ))}
        </div>
      </Block>

      <Block title="Knapper (hover, active, focus, disabled, loading)">
        <div className="flex flex-wrap items-center gap-3">
          <button className="btn btn-primary">Primær</button>
          <button className="btn btn-secondary">Sekundær</button>
          <button className="btn btn-primary btn-sm">Lille</button>
          <button className="btn btn-primary" disabled>Deaktiveret</button>
          <button className="btn btn-primary" data-loading="true">Sender …</button>
          <a href="#" className="link-arrow">Link med pil <Icon name="arrowRight" size={16} /></a>
        </div>
        <div className="section-dark mt-6 flex flex-wrap items-center gap-3 rounded-[var(--r-xl)] p-6">
          <button className="btn btn-primary">Primær (mørk)</button>
          <button className="btn btn-secondary">Sekundær (mørk)</button>
          <a href="#" className="link-arrow">Link <Icon name="arrowRight" size={16} /></a>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button className="chip" aria-pressed="false">Filter</button>
          <button className="chip" aria-pressed="true">Valgt filter</button>
        </div>
      </Block>

      <Block title="Formularfelter">
        <div className="grid max-w-md gap-5">
          <div className="field"><label htmlFor="ds1">Normal</label><input id="ds1" className="input" placeholder="navn@firma.dk" /></div>
          <div className="field"><label htmlFor="ds2">Fejl</label><input id="ds2" className="input" aria-invalid="true" defaultValue="navn@" aria-describedby="ds2e" /><p id="ds2e" className="field-error">Skriv en gyldig mail, fx navn@firma.dk.</p></div>
          <div className="field"><label htmlFor="ds3">Deaktiveret</label><input id="ds3" className="input" disabled defaultValue="Kan ikke ændres" /></div>
        </div>
      </Block>

      <Block title="Ikoner (én familie, 1,75 streg)">
        <div className="flex flex-wrap gap-4 text-heading">
          {(["arrowRight", "check", "close", "menu", "mail", "form", "phone", "clock", "shield", "bell", "doc", "sparkle", "mobile", "lock", "server", "user"] as const).map((n) => (
            <span key={n} className="grid size-12 place-items-center rounded-[var(--r-md)] border border-line" title={n}><Icon name={n} /></span>
          ))}
        </div>
      </Block>

      <Block title="Produktskærm (alle tilstande)">
        <div className="grid gap-6 lg:grid-cols-2">
          {([0, 1, 2, 3] as const).map((s) => <ProductScreen key={s} stage={s} />)}
        </div>
      </Block>
    </div>
  );
}
