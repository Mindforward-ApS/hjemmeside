"use client";

// Waitlist page (Marco 2026-11-19): dark page with a slow smoky coral/brown glow, logo top left, an
// early-access pill top right, a "Nyt" pill, a two-line headline with an italic serif accent, the email form in a
// glass card, a launch countdown and a small footer. Preview: the launch date is an
// example and the email is not stored; there is no social proof because there is no real waiting count yet.
import { useEffect, useState, useTransition } from "react";
import { addDetails, joinWaitlist, waitlistCount } from "./actions";
import { SPOTS } from "./spots";
import { MindforwardLogo } from "@/components/ui/MindforwardLogo";
import { appLinks } from "@/lib/app";

// Social profiles. TODO(Marco): replace "#" with the real profile links.
// The networks' own logos in their own colours (marks from simple-icons, CC0; Instagram and TikTok in full colour).
const BrandLogo = ({ k }: { k: string }) => {
  if (k === "LinkedIn") return <svg viewBox="0 0 24 24" className="size-8 sm:size-9" aria-hidden><rect x="1" y="1" width="22" height="22" rx="3" fill="#fff" /><path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;
  if (k === "Facebook") return <svg viewBox="0 0 24 24" className="size-8 sm:size-9" aria-hidden><circle cx="12" cy="12" r="11" fill="#fff" /><path fill="#0866FF" d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" /></svg>;
  if (k === "YouTube") return <svg viewBox="0 0 24 24" className="size-8 sm:size-9" aria-hidden><rect width="24" height="24" rx="6" fill="#FF0000" /><path d="M9.6 7.4v9.2l7.9-4.6z" fill="#fff" /></svg>;
  if (k === "Instagram") return (
    <svg viewBox="0 0 24 24" className="size-8 sm:size-9" aria-hidden>
      <defs><radialGradient id="ig-g" cx="30%" cy="107%" r="150%"><stop offset="0" stopColor="#fdf497" /><stop offset=".05" stopColor="#fdf497" /><stop offset=".45" stopColor="#fd5949" /><stop offset=".6" stopColor="#d6249f" /><stop offset=".9" stopColor="#285AEB" /></radialGradient></defs>
      <rect width="24" height="24" rx="6.5" fill="url(#ig-g)" />
      <rect x="5" y="5" width="14" height="14" rx="4.2" fill="none" stroke="#fff" strokeWidth="1.9" /><circle cx="12" cy="12" r="3.4" fill="none" stroke="#fff" strokeWidth="1.9" /><circle cx="16.4" cy="7.6" r="1.1" fill="#fff" />
    </svg>
  );
  return (
    <svg viewBox="0 0 24 24" className="size-8 sm:size-9" aria-hidden>
      <rect width="24" height="24" rx="6" fill="#000" />
      <g transform="translate(5 4.5) scale(.62)"><path fill="#25F4EE" transform="translate(-0.9 -0.9)" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /><path fill="#FE2C55" transform="translate(0.9 0.9)" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /><path fill="#fff" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></g>
    </svg>
  );
};
const socials = [
  ["LinkedIn", "#"],
  ["Instagram", "#"],
  ["Facebook", "#"],
  ["TikTok", "#"],
  ["YouTube", "#"],
] as const;
const LAUNCH = new Date("2027-01-01T09:00:00+01:00"); // launch (Marco 2026-11-19: moved from 1 December)

function useCountdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => { const tick = () => setNow(Date.now()); const first = setTimeout(tick, 0); const t = setInterval(tick, 1000); return () => { clearTimeout(first); clearInterval(t); }; }, []);
  const ms = Math.max(0, LAUNCH.getTime() - (now ?? LAUNCH.getTime()));
  const s = Math.floor(ms / 1000);
  return [["Dage", Math.floor(s / 86400)], ["Timer", Math.floor(s / 3600) % 24], ["Min", Math.floor(s / 60) % 60], ["Sek", s % 60]] as const;
}

// Sign-up (Marco 2026-11-19): no box, one dark pill with the field and a black button inside; the button's small
// diagonal arrow in a white ball; on hover the ball rolls to the left and the arrow straightens out.
// White disc with a black check, same pairing as the arrow ball in "Skriv mig op".
function Tick() {
  return (
    <span aria-hidden className="grid size-5 shrink-0 place-items-center rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.35)]">
      <svg viewBox="0 0 20 20" className="size-3.5"><path d="M5.5 10.4l2.8 2.8L14.5 7" fill="none" stroke="#0a0a0b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </span>
  );
}

// Live count of Hold 1, polled every 5 s so new sign-ups show up without a reload.
function useWaitlistCount(initial: number | null) {
  const [n, setN] = useState<number | null>(initial);
  useEffect(() => {
    let alive = true;
    const tick = () => waitlistCount().then((v) => alive && setN(v)).catch(() => {});
    const first = setTimeout(tick, 0);
    const t = setInterval(tick, 5000);
    return () => { alive = false; clearTimeout(first); clearInterval(t); };
  }, []);
  return [n, setN] as const;
}

// Places counter as a black tile like the countdown (Marco 2026-11-19): big number of places left and
// one dot per place (100), coral when taken.
function Spots({ n }: { n: number | null }) {
  const taken = Math.min(n ?? 0, SPOTS), left = SPOTS - taken, full = n !== null && left <= 0;

  return (
    <div className="wl-tile mt-3 w-full rounded-[18px] px-5 py-4 text-left" aria-live="polite">
      <div className="flex items-center justify-between gap-3">
        <p className="wl-display flex items-baseline gap-2 tabular-nums">
        {full ? <span className="text-[1.25rem] font-medium">Hold 1 er fyldt. Skriv dig op til Hold 2.</span> : <><span className="text-[2.125rem] font-medium leading-none tracking-[-0.02em]">{n === null ? "…" : left}</span><span className="text-[0.9375rem] text-white/65">af {SPOTS} pladser tilbage</span></>}
      </p>
        <span className="inline-flex shrink-0 items-center gap-2 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-white/60"><span className="wl-live relative size-2 rounded-full bg-[#e8664a]" />Live</span>
      </div>
      {/* One small pill per place, in one row like before: 100 pills, coral when taken. */}
      <div className="mt-3 grid grid-cols-[repeat(100,minmax(0,1fr))] gap-[2px]" aria-hidden>
        {Array.from({ length: SPOTS }, (_, k) => <span key={k} className="h-2 rounded-full transition-colors duration-500" style={{ background: k < taken ? "#e8664a" : "rgba(255,255,255,0.12)" }} />)}
      </div>
    </div>
  );
}

// Placeholder that types an example address, pauses, deletes it and types it again (Marco 2026-11-19).
function useTypedPlaceholder(text: string) {
  const [n, setN] = useState(0);
  const [back, setBack] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) { const t = setTimeout(() => setN(text.length), 0); return () => clearTimeout(t); }
    const done = !back && n === text.length, empty = back && n === 0;
    const t = setTimeout(() => {
      if (done) setBack(true);
      else if (empty) setBack(false);
      else setN((x) => x + (back ? -1 : 1));
    }, done ? 1800 : empty ? 500 : back ? 35 : 85);
    return () => clearTimeout(t);
  }, [n, back, text]);
  return text.slice(0, n) + (n < text.length || back ? "|" : "");
}

function SignupForm({ onJoined }: { onJoined: (count: number) => void }) {
  const [mail, setMail] = useState("");
  const typed = useTypedPlaceholder("marco@mindforward.dk");
  const [step, setStep] = useState<"mail" | "details" | "done">("mail");
  const [pos, setPos] = useState<number | null>(null);
  const [d, setD] = useState({ name: "", phone: "" });
  const [err, setErr] = useState("");
  const [pending, start] = useTransition();
  const ok = /\S+@\S+\.\S+/.test(mail);
  const join = () => {
    if (!ok) { setErr("Skriv en gyldig e-mailadresse."); return; }
    setErr("");
    start(async () => {
      const r = await joinWaitlist({ email: mail });
      if (!r.ok) { setErr(r.error ?? "Noget gik galt. Prøv igen."); return; }
      setPos(r.position ?? null); onJoined(r.count); setStep("details");
    });
  };
  const save = () => start(async () => {
    const r = await addDetails({ email: mail, name: d.name, phone: d.phone });
    if (!r.ok) { setErr(r.error ?? "Noget gik galt."); return; }
    setErr(""); setStep("done");
  });
  const pill = "flex flex-col gap-2 rounded-[22px] bg-[rgba(10,6,5,0.55)] p-1.5 ring-1 ring-white/12 sm:flex-row sm:rounded-full";
  const inputCls = "h-[52px] w-full rounded-full bg-transparent pr-4 text-[0.9375rem] text-white outline-none placeholder:text-white/45";
  const button = (label: string, compact = false) => (
    <button type="submit" disabled={pending} aria-label={compact ? label : undefined} className={`wl-btn group relative inline-flex h-[52px] shrink-0 items-center justify-center rounded-full text-[0.9375rem] font-semibold text-white sm:w-[200px] ${compact ? "wl-compact w-[52px]" : "w-full"}`}>
      <span className={`wl-label ${compact ? "max-sm:sr-only" : ""}`}>{pending ? "Gemmer …" : label}</span>
      <span aria-hidden className="wl-ball grid size-8 place-items-center rounded-full bg-white text-[#0a0a0b]"><svg viewBox="0 0 20 20" fill="none" className="size-4"><path d="M6 14l8-8M7.5 6H14v6.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
    </button>
  );
  return (
    <div className="mt-12 w-full max-w-[34rem] text-left sm:mt-10">
      {step === "mail" && (
        <form onSubmit={(e) => { e.preventDefault(); join(); }} noValidate className="flex items-center gap-2 rounded-full bg-[rgba(10,6,5,0.55)] p-1.5 ring-1 ring-white/12">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Din e-mail</span>
            <input type="email" value={mail} onChange={(e) => setMail(e.target.value)} placeholder={typed} aria-label="Din e-mail" autoComplete="email" className={`${inputCls} pl-6`} />
          </label>
          {button("Skriv mig op", true)}
        </form>
      )}
      {step === "details" && (
        <form onSubmit={(e) => { e.preventDefault(); save(); }} noValidate className="grid gap-3">
          <p className="text-center text-[0.9375rem] text-white/85"><b className="text-white">Du er skrevet op{pos ? ` som nr. ${pos}` : ""}.</b> Fortæl os lidt mere, så vi kan kontakte dig.</p>
          <div className={pill}>
            <label className="relative min-w-0 flex-1"><span className="sr-only">Navn</span><input value={d.name} onChange={(e) => setD({ ...d, name: e.target.value })} placeholder="Dit navn" autoComplete="name" className={`${inputCls} pl-5`} /></label>
            <label className="relative min-w-0 flex-1"><span className="sr-only">Telefonnummer</span><input type="tel" value={d.phone} onChange={(e) => setD({ ...d, phone: e.target.value })} placeholder="Telefonnummer" autoComplete="tel" className={`${inputCls} pl-5`} /></label>
          </div>
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
            {button("Gem")}
            <button type="button" onClick={() => setStep("done")} className="h-10 px-4 text-[0.875rem] text-white/60 hover:text-white">Spring over</button>
          </div>
        </form>
      )}
      {step === "done" && (
        <div className="flex items-center justify-center gap-3 px-3 py-3.5" role="status">
          <Tick />
          <p className="text-[0.9375rem]"><b>Tak, du er med{pos ? ` som nr. ${pos}` : ""}.</b> <span className="opacity-70">Vi skriver til {mail} før lanceringen.</span></p>
        </div>
      )}
      {err && <p className="mt-3 text-center text-[0.8125rem] text-[#f6a58f]" role="alert">{err}</p>}
      {step === "mail" && (
        <div className="mt-6 flex items-center justify-center gap-x-5 text-left text-[0.8125rem] leading-snug text-white/65 sm:mt-5 sm:items-center sm:gap-x-7 sm:text-[0.8125rem]">
          <span className="inline-flex items-center gap-2 whitespace-nowrap"><Tick />Vær blandt de første</span>
          <span className="inline-flex items-center gap-2 whitespace-nowrap"><Tick />Gratis at komme i gang</span>
        </div>
      )}
    </div>
  );
}

export function Venteliste() {
  const [count, setCount] = useWaitlistCount(null);
  const parts = useCountdown();

  return (
    <div className="wl relative flex min-h-svh flex-col overflow-hidden text-[#faf6f2]" style={{ background: "#120c0a" }}>
      {/* Smoky glow behind everything. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Smoke: soft coloured clouds, warped by an SVG turbulence filter so they read as smoke, not circles. */}
        <svg className="absolute h-0 w-0"><filter id="wl-smoke"><feTurbulence type="fractalNoise" baseFrequency="0.006" numOctaves="3" seed="7"><animate attributeName="baseFrequency" values="0.006;0.0085;0.005;0.006" dur="18s" repeatCount="indefinite" /></feTurbulence><feDisplacementMap in="SourceGraphic" scale="180" /></filter></svg>
        <div className="wl-smoke absolute inset-[-15%]">
          <div className="wl-blob absolute left-[0%] top-[20%] h-[75%] w-[45%] rounded-full" style={{ background: "radial-gradient(circle at 40% 50%, rgba(232,102,74,0.85), rgba(184,69,46,0.45) 45%, transparent 70%)" }} />
          <div className="wl-blob2 absolute right-[2%] top-[25%] h-[80%] w-[50%] rounded-full" style={{ background: "radial-gradient(circle at 55% 50%, rgba(140,52,38,0.9), rgba(90,32,24,0.5) 45%, transparent 70%)" }} />
          <div className="wl-blob absolute left-[30%] top-[45%] h-[60%] w-[40%] rounded-full" style={{ background: "radial-gradient(circle, rgba(246,165,143,0.55), rgba(232,102,74,0.25) 45%, transparent 70%)" }} />
          <div className="wl-blob2 absolute right-[18%] top-[-5%] h-[45%] w-[35%] rounded-full" style={{ background: "radial-gradient(circle, rgba(251,225,215,0.22), transparent 70%)" }} />
        </div>
        {/* Keep the middle readable and the edges dark. */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 45% at 50% 42%, rgba(18,12,10,0.55), transparent 70%), linear-gradient(180deg, rgba(18,12,10,0.6) 0%, transparent 18%, transparent 80%, rgba(18,12,10,0.7) 100%)" }} />
        <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")" }} />
      </div>

      <header className="relative z-10 flex items-center justify-between px-5 py-5 sm:px-20 sm:py-6">
        <MindforwardLogo size={28} className="!text-[#faf6f2]" />
        {/* Existing users go straight to the platform (Marco 2026-11-20). */}
        <a href={appLinks.login} className="wl-login inline-flex h-10 items-center gap-2 rounded-full px-4 text-[0.875rem] font-semibold text-white transition">
          Log ind
          <svg viewBox="0 0 20 20" fill="none" aria-hidden className="size-3.5"><path d="M6 14l8-8M7.5 6H14v6.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-[1100px] flex-1 flex-col items-center justify-center px-6 pb-10 pt-10 text-center sm:px-5 sm:pb-6 sm:pt-2">
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-white/60 sm:text-[0.8125rem] sm:tracking-[0.18em]">AI ændrer måden, vi lever og arbejder på</p>
        {/* Marco 2026-11-19: the first sentence stands free above, the second is the headline. */}
        <h1 className="wl-display mt-5 max-w-[27ch] text-[clamp(1.875rem,0.8rem+3.4vw,4rem)] leading-[1.1] sm:mt-5 sm:leading-[1.04] font-medium tracking-[-0.03em] sm:tracking-[-0.04em] [text-wrap:balance]" style={{ color: "#faf6f2" }}>
          Forestil dig, hvad du kunne, hvis du begyndte at udnytte mulighederne.
        </h1>

        <SignupForm onJoined={setCount} />

        {/* Launch block: countdown with the live Hold 1 counter right under it, the same width. */}
        <div className="mt-14 inline-flex flex-col items-stretch sm:mt-10">
          {/* Countdown tiles in the same black as the "Skriv mig op" button (Marco 2026-11-19). */}
          <div className="flex items-center gap-2 sm:gap-3" aria-label="Tid til lancering">
            {parts.map(([l, v], k) => (
              <div key={l} className="flex items-center gap-2 sm:gap-3">
                <div className="wl-tile grid w-[64px] justify-items-center rounded-[16px] py-3 sm:w-[84px] sm:rounded-[18px] sm:py-4">
                  <p className="wl-display text-[1.75rem] font-medium tabular-nums leading-none tracking-[-0.02em] sm:text-[2.125rem]">{String(v).padStart(2, "0")}</p>
                  <p className="mt-2 text-[0.625rem] uppercase tracking-[0.16em] text-white/55">{l}</p>
                </div>
                {k < 3 && <span className="text-[1.25rem] text-white/30">:</span>}
              </div>
            ))}
          </div>
          <Spots n={count} />
        </div>
      </main>


      <footer className="relative z-10 flex flex-col items-center gap-4 px-5 pb-10 pt-10 text-[0.75rem] text-white/60 sm:flex-row sm:justify-between sm:px-20 sm:pb-7 sm:pt-4 sm:text-[0.8125rem]">
        <span className="inline-flex items-center gap-3">Følg med
          <span className="flex gap-2">
            {socials.map(([label, href]) => (
              <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer" className="grid size-10 place-items-center transition hover:-translate-y-0.5 sm:size-11"><BrandLogo k={label} /></a>
            ))}
          </span>
        </span>
        <span className="flex flex-col items-center gap-1 text-center sm:items-end sm:text-right lg:flex-row lg:items-center lg:gap-6">
          <span className="max-w-[26rem] text-white/45 lg:max-w-none lg:whitespace-nowrap">Vi bruger dine oplysninger til at give dig adgang og kontakte dig om lanceringen. Læs vores <a href="/privatliv" className="underline underline-offset-2 hover:text-white/70">privatlivspolitik</a>.</span>
          <span className="whitespace-nowrap">© 2026 Mindforward</span>
        </span>
      </footer>

      <style>{`
        .wl-btn, .wl-login { background: linear-gradient(90deg, #fb970a, #f8400a); box-shadow: inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -2px 5px rgba(120,20,0,0.35), 0 10px 22px -10px rgba(0,0,0,0.8); transition: filter .2s, transform .15s; }
        /* Same orange gradient as the M logo (Marco 2026-11-22). */
        .wl-btn:hover, .wl-login:hover { filter: brightness(1.08); }
        .wl-login:active { transform: translateY(1px); }
        .wl-btn:active { transform: translateY(1px); }
        /* Hover: the white ball rolls to the left end (one turn minus 45°, so the arrow ends pointing straight right)
           and the label slides over to make room. */
        .wl-btn { padding: 0 52px 0 24px; white-space: nowrap; }
        .wl-label { transition: transform .5s cubic-bezier(.65,0,.35,1); }
        .wl-ball { position: absolute; right: 10px; top: 50%; transform: translate(0,-50%) rotate(0deg); transition: transform .5s cubic-bezier(.65,0,.35,1); }
        @media (min-width: 640px) {
          .wl-btn:is(:hover,:focus-visible) .wl-label { transform: translateX(28px); }
          .wl-btn:is(:hover,:focus-visible) .wl-ball { transform: translate(-148px,-50%) rotate(-315deg); /* 200 − 2×10 − 32 */ }
        }
        .wl-tile { background: #0a0a0b; box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -2px 5px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1), 0 12px 24px -12px rgba(0,0,0,0.8); }
        .wl-live::after { content: ""; position: absolute; inset: -3px; border-radius: 9999px; border: 1.5px solid #e8664a; animation: wlPing 1.8s ease-out infinite; }
        @keyframes wlPing { from { transform: scale(.6); opacity: 1; } to { transform: scale(1.8); opacity: 0; } }
        @media (max-width: 639px) { .wl-compact { padding: 0; } .wl-compact .wl-ball { right: 10px; } }
        .wl-smoke { filter: blur(60px); }
        @media (min-width: 768px) { .wl-smoke { filter: url(#wl-smoke) blur(40px); } }
        .wl-glass { background: linear-gradient(180deg, rgba(255,255,255,0.09), rgba(255,255,255,0.03)), rgba(18,12,10,0.38); -webkit-backdrop-filter: blur(22px) saturate(140%); backdrop-filter: blur(22px) saturate(140%); box-shadow: inset 0 1px 0 rgba(255,255,255,0.14), 0 30px 60px -30px rgba(0,0,0,0.8); }
        .wl-glass::before { content: ""; position: absolute; inset: 0; border-radius: inherit; padding: 1px; pointer-events: none; background: linear-gradient(180deg, rgba(255,255,255,0.32), rgba(255,255,255,0.06) 45%, rgba(255,255,255,0.12)); -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask-composite: exclude; }
        .wl-display { font-family: var(--font-wl-display), system-ui, sans-serif; }
        .wl-serif { font-family: var(--font-wl-serif), Georgia, serif; font-style: italic; letter-spacing: -0.02em; }
        /* The smoke never stops: each cloud wanders on its own loop (Marco 2026-11-19). */
        .wl-blob { animation: wlDriftA 14s ease-in-out infinite; }
        .wl-blob2 { animation: wlDriftB 17s ease-in-out infinite; }
        @keyframes wlDriftA { 0%,100% { transform: translate(0,0) scale(1) rotate(0deg); } 25% { transform: translate(8vw,-6vh) scale(1.12) rotate(8deg); } 50% { transform: translate(14vw,4vh) scale(0.95) rotate(-4deg); } 75% { transform: translate(4vw,8vh) scale(1.08) rotate(6deg); } }
        @keyframes wlDriftB { 0%,100% { transform: translate(0,0) scale(1) rotate(0deg); } 25% { transform: translate(-10vw,5vh) scale(1.1) rotate(-7deg); } 50% { transform: translate(-16vw,-5vh) scale(0.94) rotate(5deg); } 75% { transform: translate(-5vw,-9vh) scale(1.12) rotate(-5deg); } }
        @media (prefers-reduced-motion: reduce) { .wl-live::after { animation: none; } .wl-blob, .wl-blob2 { animation: none; } .wl-label, .wl-ball { transition: none; } }
      `}</style>
    </div>
  );
}
