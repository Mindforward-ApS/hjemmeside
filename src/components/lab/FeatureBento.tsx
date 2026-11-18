// Funktioner (Marco 2026-11-14): replaces "Sådan kommer I i gang". A bento of six cards, same design as the features
// section on the 3770 draft, with Mindforward's own features. Photos of people are initials; the phone is a placeholder.
import "./feature-bento.css";
import { appLinks } from "@/lib/app";

const Initials = ({ t, bg }: { t: string; bg: string }) => (
  <span aria-hidden style={{ display: "grid", placeItems: "center", width: "100%", height: "100%", borderRadius: "50%", background: bg, color: "#fff", fontWeight: 600, fontSize: 14 }}>{t}</span>
);

export function FeatureBento() {
  return (
    <div className="ftx">
      <section className="features" aria-labelledby="features-title">
        <div className="features-head">
          <div>
            <p className="eyebrow">Funktioner</p>
            <h2 id="features-title">Alt, holdet har brug for,<br />ét sted</h2>
          </div>
          <p className="features-sub">Lektioner, øvemiljø, kursusbevis og overblik til lederen arbejder sammen på én platform, så holdet bruger tiden på at lære.</p>
        </div>
        <div className="bento">
          <article className="fc fc-light fc-center">
            <div className="fc-visual">
              <div className="note"><span className="note-av" style={{ width: 48, height: 48, flex: "none" }}><Initials t="AH" bg="#e8664a" /></span><div><b>anna@firma.dk</b><span>Færdig med <em>Modul 1</em> i ChatGPT</span></div></div>
              <div className="note note-2"><span className="note-av" style={{ width: 48, height: 48, flex: "none" }}><Initials t="MJ" bg="#7a5a4f" /></span><div><b>mads@firma.dk</b><span>Startede<br /><em>Lektion 3</em> i Copilot</span></div></div>
            </div>
            <h3>Teamoverblik</h3>
            <p className="clamp">Se, hvordan holdet kommer videre, og hvem der mangler et lille skub.</p>
            <a className="fbtn" href="#priser">Se priser</a>
          </article>

          <article className="fc fc-light fc-wide fc-split">
            <div className="fc-copy">
              <h3>Korte lektioner<br />på dansk</h3>
              <p>Ti minutter om dagen.<br />I det værktøj, I bruger.</p>
              <div className="stat">10 min</div>
              <p className="stat-label">Pr. lektion</p>
              <a className="fbtn" href="#kurser">Se kurserne</a>
            </div>
            <div className="phone-ph" aria-hidden>Billede: lektion på mobil</div>
          </article>

          <article className="fc fc-dark fc-center">
            <div className="fc-visual">
              <div className="chip"><span className="chip-dots">{Array.from({ length: 18 }, (_, k) => <i key={k} />)}</span><b>EU · Frankfurt</b><span className="chip-dots">{Array.from({ length: 18 }, (_, k) => <i key={k} />)}</span></div>
            </div>
            <h3>Data i EU</h3>
            <p className="clamp">Hostet i Frankfurt, og I får en databehandleraftale med fra start.</p>
            <a className="fbtn" href="#faq">Spørgsmål og svar</a>
          </article>

          <article className="fc fc-green fc-wide fc-split">
            <div className="fc-copy fc-bottom">
              <h3>Kursusbevis</h3>
              <p className="clamp">Alle får et bevis med navn, score og et unikt ID, der kan tjekkes via QR-koden.</p>
              <a className="fbtn" href="#priser">Se priser</a>
            </div>
            <div className="cards-visual">
              <div className="copy-tip"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="3" width="12" height="15" rx="2.5" /><rect x="4" y="6" width="12" height="15" rx="2.5" /></svg>Kopiér bevis-ID
                <svg className="cursor" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 2l16 9-7 2-3 7z" /></svg></div>
              <div className="ccard"><span className="cc-num">ID •••• 4875 &nbsp; 11/26</span><span className="cc-chip" /><span className="cc-brand"><i /><i /></span><span className="cc-world">Mindforward</span><span className="cc-nfc">)))</span></div>
              <div className="ccard ccard-2"><span className="cc-num">ID •••• 4875 &nbsp; 11/26</span><span className="cc-brand"><i /><i /></span></div>
            </div>
          </article>

          <article className="fc fc-light fc-center">
            <div className="fc-visual">
              <div className="signin">
                <div className="signin-head">Log ind med Microsoft</div>
                <div className="signin-row"><span className="zal" /><div><b>Mindforward</b><span>anna@firma.dk</span></div></div>
              </div>
              <div className="email-field">Skriv din e-mail<span className="np" /></div>
            </div>
            <h3>Log ind på sekunder</h3>
            <p className="clamp">Med Microsoft, Google eller en kode på mail. Ingen nye kodeord at huske.</p>
            <a className="fbtn" href={appLinks.startBusiness}>Opret konto</a>
          </article>

          <article className="fc fc-light fc-center">
            <div className="fc-visual">
              <div className="avatars">
                <span style={{ display: "block", width: 80, height: 80 }}><Initials t="SK" bg="#c9a48f" /></span>
                <span style={{ display: "block", width: 80, height: 80 }}><Initials t="LP" bg="#201613" /></span>
              </div>
              <div className="share"><span className="tools" aria-hidden><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#e8664a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c1 4.5 4.5 8 9 9-4.5 1-8 4.5-9 9-1-4.5-4.5-8-9-9 4.5-1 8-4.5 9-9z" /></svg></span><div><b>3 AI-værktøjer</b><span>ChatGPT, Copilot og Claude</span></div></div>
            </div>
            <h3>Øv i jeres værktøj</h3>
            <p>Opgaverne foregår i det værktøj, I allerede bruger.</p>
            <a className="fbtn" href="#saadan">Se øvemiljøet</a>
          </article>
        </div>
      </section>
    </div>
  );
}
