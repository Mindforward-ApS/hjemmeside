import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import { GrebBtn } from "@/components/ui/GrebBtn";
import sikr from "./nu/nu-00.png";
import tilmeld from "./nu/nu-01.png";
import lektion from "./nu/nu-02.png";
import kontakt from "./nu/nu-05.png";
import komHvid from "./nu/nu-07.png";
import komSort from "./nu/nu-08.png";
import send from "./nu/nu-09.png";
import nyhedsbrev from "./nu/nu-15.png";

// Button system proposal (Marco 2026-11-23): today's buttons on mindforward.dk next to one system built on the
// orange button he chose on 23/11 and its light twin. Preview only; nothing on the live site changes from this page.
export const metadata: Metadata = { title: "Knapper – forslag", robots: { index: false } };

const nu: { img: StaticImageData; navn: string; hvor: string; bliver: string }[] = [
  { img: tilmeld, navn: "Orange med mørk cirkel", hvor: "Tilmeld jer, Se priser, Se kurset, Book 15 min, Prøv øvemiljøet", bliver: "Primær (uændret)" },
  { img: sikr, navn: "Orange uden cirkel", hvor: "Lanceringsbjælken: Sikr din plads", bliver: "Primær" },
  { img: lektion, navn: "Hvid med cirkel til venstre", hvor: "Hero: Se en lektion", bliver: "Sekundær" },
  { img: komHvid, navn: "Hvid med kant, pil efter tekst", hvor: "Priser: Kom i gang · Funktioner: FAQ, Se priser", bliver: "Sekundær" },
  { img: komSort, navn: "Sort", hvor: "Priser: 10 brugere", bliver: "Primær" },
  { img: send, navn: "Orange i fuld bredde", hvor: "Kontaktformularen: Send besked", bliver: "Primær i normal bredde" },
  { img: nyhedsbrev, navn: "Hvid i mørkt inputfelt", hvor: "Nyhedsbrev i bunden: Tilmeld", bliver: "Primær" },
  { img: kontakt, navn: "Kontakt-pille", hvor: "Pilotforløb: Skriv til os", bliver: "Bliver et kontaktkort, ikke en knap" },
];

const states = ["Normal", "Hover", "Trykket", "Fokus", "Deaktiveret", "Indlæser"] as const;

function Demo({ state, light = false, children = "Tilmeld jer" }: { state: (typeof states)[number]; light?: boolean; children?: string }) {
  const cls = { Normal: "", Hover: "s-hover", Trykket: "s-active", Fokus: "s-focus", Deaktiveret: "", Indlæser: "" }[state];
  return (
    <div className={cls}>
      {state === "Indlæser" ? (
        <span className={`greb-btn${light ? " greb-btn--light" : ""}`} aria-busy="true">
          <span>{children}</span>
          <span className="greb-btn__circle" aria-hidden="true"><span className="kn-spin" /></span>
        </span>
      ) : state === "Deaktiveret" ? (
        <span className={`greb-btn${light ? " greb-btn--light" : ""} kn-disabled`} aria-disabled="true">
          <span>{children}</span>
          <span className="greb-btn__circle" aria-hidden="true"><Arrow /></span>
        </span>
      ) : (
        <span className={`greb-btn${light ? " greb-btn--light" : ""}`}>
          <span>{children}</span>
          <span className="greb-btn__circle" aria-hidden="true"><Arrow /></span>
        </span>
      )}
    </div>
  );
}

function Arrow() {
  return <svg viewBox="0 0 20 20" fill="none"><path d="M6 14l8-8M7.5 6H14v6.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="miter" /></svg>;
}

function TextLink({ children }: { children: string }) {
  return (
    <a href="#" className="kn-link">
      {children}
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10h11m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </a>
  );
}

export default function KnapperPage() {
  return (
    <main className="kn">
      <style>{css}</style>

      <header className="kn-wrap kn-head">
        <p className="kn-eyebrow">Forslag · kun til gennemsyn</p>
        <h1 className="kn-h1">Ét knapsystem til mindforward.dk</h1>
        <p className="kn-lead">
          Til venstre: de 8 knaptyper, der står på siden i dag. Til højre: tre roller, bygget på den orange knap du valgte
          23/11 og dens hvide tvilling. Hver rolle har én opgave, og alle har de samme tilstande.
        </p>
      </header>

      <section className="kn-wrap kn-compare">
        <div>
          <p className="kn-h2">I dag · 8 typer</p>
          <ul className="kn-now">
            {nu.map((n) => (
              <li key={n.navn}>
                <div className="kn-now-img"><Image src={n.img} alt={n.navn} height={Math.round(n.img.height / 2)} style={{ width: "auto", maxWidth: "100%" }} /></div>
                <div>
                  <p className="kn-now-name">{n.navn}</p>
                  <p className="kn-now-where">{n.hvor}</p>
                  <p className="kn-now-to">→ {n.bliver}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="kn-h2">Forslag · 3 roller</p>
          <div className="kn-roles">
            <article>
              <p className="kn-role">1 · Primær</p>
              <p className="kn-rule">Den ene handling, vi vil have. Højst én pr. skærm eller kort.</p>
              <div className="kn-row"><GrebBtn href="#">Tilmeld jer</GrebBtn><GrebBtn href="#">Sikr din plads</GrebBtn></div>
            </article>
            <article>
              <p className="kn-role">2 · Sekundær</p>
              <p className="kn-rule">Alternativet ved siden af den primære. Samme form og størrelse, hvid i stedet for orange.</p>
              <div className="kn-row"><span className="greb-btn greb-btn--light"><span>Se en lektion</span><span className="greb-btn__circle" aria-hidden="true"><Arrow /></span></span></div>
            </article>
            <article>
              <p className="kn-role">3 · Tekstlink</p>
              <p className="kn-rule">Alt det mindre vigtige: Se alle, FAQ, Læs mere. Ingen ramme, så det ikke konkurrerer.</p>
              <div className="kn-row"><TextLink>Se alle kurser</TextLink><TextLink>FAQ</TextLink></div>
            </article>
          </div>

          <p className="kn-h2 kn-h3">Sammen, som de vil stå på siden</p>
          <div className="kn-pair">
            <div className="kn-pair-dark">
              <GrebBtn href="#" onDark>Tilmeld jer</GrebBtn>
              <span className="greb-btn greb-btn--light"><span>Se en lektion</span><span className="greb-btn__circle" aria-hidden="true"><Arrow /></span></span>
            </div>
            <div className="kn-pair-light">
              <div className="kn-card">
                <p className="kn-card-t">10 brugere</p>
                <p className="kn-card-p">55 kr<span>/bruger/md.</span></p>
                <GrebBtn href="#">Kom i gang</GrebBtn>
              </div>
              <div className="kn-card">
                <p className="kn-card-t">Enkelt bruger</p>
                <p className="kn-card-p">69 kr<span>/bruger/md.</span></p>
                <span className="greb-btn greb-btn--light"><span>Kom i gang</span><span className="greb-btn__circle" aria-hidden="true"><Arrow /></span></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="kn-wrap kn-states">
        <p className="kn-h2">Alle tilstande · det er her, man kan se, at der er brugt tid</p>
        <div className="kn-grid">
          <span />
          {states.map((s) => <p key={s} className="kn-col">{s}</p>)}
          <p className="kn-rowlabel">Primær</p>
          {states.map((s) => <Demo key={s} state={s} />)}
          <p className="kn-rowlabel">Sekundær</p>
          {states.map((s) => <Demo key={s} state={s} light>Se en lektion</Demo>)}
        </div>
        <ul className="kn-notes">
          <li><b>Hover:</b> knappen løfter sig 2 px, en orange glød løber rundt om kanten, og pilen drejer mod højre. Det har du allerede godkendt.</li>
          <li><b>Trykket:</b> knappen sænker sig, og skyggen går indad, så den føles trykket ned.</li>
          <li><b>Fokus (tastatur):</b> i dag er ringen blå. Forslag: mørk ring med 3 px luft, så den passer til brandet.</li>
          <li><b>Indlæser:</b> pilen bliver til en lille spinner i cirklen. Knappen ændrer ikke bredde, så intet hopper.</li>
        </ul>
      </section>
    </main>
  );
}

const css = `
.kn { background: #f5f2ef; color: #201613; min-height: 100vh; padding-bottom: 96px; font-family: var(--font-inter), system-ui, sans-serif; }
.kn-wrap { max-width: 1240px; margin: 0 auto; padding: 0 32px; }
.kn-head { padding-top: 64px; }
.kn-eyebrow { font-size: 12px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: #8a7d76; }
.kn .kn-h1 { font-size: 44px; line-height: 1.05; letter-spacing: -.02em; font-weight: 600; margin-top: 12px; }
.kn-lead { max-width: 640px; margin-top: 14px; font-size: 16px; line-height: 1.55; color: #5e524c; }
.kn .kn-h2 { font-family: var(--font-inter), system-ui, sans-serif; line-height: 1.3; font-size: 13px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: #8a7d76; margin-bottom: 18px; }
.kn .kn-h3 { margin: 36px 0 14px; }
.kn-compare { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-top: 48px; }
.kn-now { display: grid; gap: 10px; }
.kn-now li { display: grid; grid-template-columns: 200px 1fr; gap: 18px; align-items: center; background: #fff; border-radius: 14px; padding: 14px 16px; box-shadow: 0 0 0 1px rgba(32,22,19,.07), 0 1px 2px rgba(32,22,19,.05); }
.kn-now-img { display: flex; align-items: center; }
.kn-now-name { font-size: 14px; font-weight: 600; }
.kn-now-where { font-size: 13px; color: #7a6e68; margin-top: 2px; line-height: 1.4; }
.kn-now-to { font-size: 13px; color: #c2410c; margin-top: 4px; font-weight: 500; }
.kn-roles { display: grid; gap: 10px; }
.kn-roles article { background: #fff; border-radius: 14px; padding: 18px 20px; box-shadow: 0 0 0 1px rgba(32,22,19,.07), 0 1px 2px rgba(32,22,19,.05); }
.kn-role { font-size: 15px; font-weight: 600; }
.kn-rule { font-size: 13.5px; color: #6b5f59; margin-top: 3px; line-height: 1.45; }
.kn-row { display: flex; flex-wrap: wrap; align-items: center; gap: 16px; margin-top: 14px; }
.kn-link { display: inline-flex; align-items: center; gap: 6px; font: 600 14px/1.2 var(--font-grotesk), system-ui, sans-serif; color: #201613; text-decoration: underline; text-decoration-color: rgba(32,22,19,.25); text-underline-offset: 4px; transition: text-decoration-color .18s ease; }
.kn-link svg { width: 16px; height: 16px; transition: transform .25s cubic-bezier(.2,.7,.2,1); }
.kn-link:hover { text-decoration-color: currentColor; }
.kn-link:hover svg { transform: translateX(3px); }
.kn-pair { display: grid; gap: 10px; }
.kn-pair-dark { display: flex; gap: 12px; flex-wrap: wrap; background: #1b1a17; border-radius: 14px; padding: 28px; }
.kn-pair-light { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.kn-card { background: #fff; border-radius: 14px; padding: 20px; box-shadow: 0 0 0 1px rgba(32,22,19,.07), 0 1px 2px rgba(32,22,19,.05); display: grid; gap: 6px; justify-items: start; }
.kn-card-t { font-size: 14px; font-weight: 600; }
.kn-card-p { font-size: 28px; font-weight: 600; letter-spacing: -.02em; margin-bottom: 10px; font-variant-numeric: tabular-nums; }
.kn-card-p span { font-size: 13px; font-weight: 400; color: #7a6e68; letter-spacing: 0; margin-left: 4px; }
.kn-states { margin-top: 64px; }
.kn-grid { display: grid; grid-template-columns: 110px repeat(6, 1fr); gap: 22px 12px; align-items: center; background: #fff; border-radius: 16px; padding: 28px; box-shadow: 0 0 0 1px rgba(32,22,19,.07), 0 1px 2px rgba(32,22,19,.05); }
.kn-col { font-size: 12px; font-weight: 600; color: #8a7d76; letter-spacing: .06em; text-transform: uppercase; }
.kn-rowlabel { font-size: 14px; font-weight: 600; }
.kn-notes { margin-top: 18px; display: grid; gap: 6px; font-size: 14px; color: #5e524c; line-height: 1.5; max-width: 820px; }
.kn-notes b { color: #201613; }
/* Static copies of the live states, so they can be seen side by side. */
.s-hover .greb-btn { filter: brightness(1.06); transform: translateY(-2px); box-shadow: inset 0 1px 0 rgba(255,255,255,.3), inset 0 -3px 8px rgba(120,20,0,.4), 0 1px 1px rgba(0,0,0,.22), 0 10px 16px -4px rgba(0,0,0,.3), 0 28px 40px -16px rgba(0,0,0,.5); }
.s-hover .greb-btn::before, .s-hover .greb-btn::after { opacity: 1; --greb-ang: 200deg; }
.s-hover .greb-btn__circle svg { transform: rotate(45deg); }
.s-hover .greb-btn--light { box-shadow: 0 1px 1px rgba(0,0,0,.08), 0 10px 16px -4px rgba(0,0,0,.12), 0 24px 36px -16px rgba(0,0,0,.18); }
.s-active .greb-btn { box-shadow: inset 0 2px 6px rgba(120,20,0,.5), 0 1px 1px rgba(0,0,0,.38); }
.s-active .greb-btn--light { box-shadow: inset 0 2px 5px rgba(32,22,19,.18); }
.s-active .greb-btn__circle { transform: scale(.96); }
.s-active .greb-btn__circle svg { transform: rotate(45deg); }
.s-focus .greb-btn { outline: 2px solid #201613; outline-offset: 3px; }
.kn-disabled { opacity: .45; filter: saturate(.6); cursor: not-allowed; box-shadow: none !important; }
.kn-spin { width: 1.05em; height: 1.05em; border-radius: 50%; border: 2px solid rgba(255,255,255,.3); border-top-color: #fff; animation: kn-spin .8s linear infinite; }
@keyframes kn-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .kn-spin { animation-duration: 2.4s; } }
@media (max-width: 900px) {
  .kn-compare { grid-template-columns: 1fr; }
  .kn-grid { grid-template-columns: 90px repeat(3, 1fr); }
  .kn-now li { grid-template-columns: 1fr; }
}
`;
