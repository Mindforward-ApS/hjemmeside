// Funktioner (Marco 2026-11-14, rebuilt 2026-11-23 on the price section's standard): six white cards with a hairline
// border, left-aligned copy and the price section's buttons; the course certificate is the highlighted card in the
// M logo's gradient frame. Real Mindforward content: the platform recorded on a phone, the approved certificate (V7) and the
// three tools' own logos. Phones: every card reads picture → title and text → button.
import Image from "next/image";
import Link from "next/link";
import { appLinks } from "@/lib/app";
import { SectionLabel } from "@/components/ui/SectionLabel";

const ink = "#0f0d0c";
const muted = "#4a4440";
const line = "#e3dfdc";
const grad = "linear-gradient(135deg, #fb970a, #f8400a)";

const Arrow = () => <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;

function CardButton({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <Link href={href} className={`nf-focus nf-press mt-6 flex h-11 items-center justify-center gap-2 rounded-full text-[0.9375rem] font-semibold transition ${dark ? "text-white hover:bg-black" : "border hover:bg-[#f7f5f3]"}`} style={dark ? { background: ink } : { borderColor: "#dcd7d3", color: ink }}>
      {children} <Arrow />
    </Link>
  );
}

function Copy({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <h3 className="text-[1.5rem] font-medium leading-tight tracking-[-0.02em]" style={{ color: ink }}>{title}</h3>
      <p className="mt-2 text-[0.9375rem] leading-6" style={{ color: muted }}>{children}</p>
    </>
  );
}

const card = "flex flex-col rounded-[20px] border bg-white p-6";

export function FeatureBento() {
  return (
    <section aria-labelledby="features-title" className="py-[100px]" style={{ background: "#ece6de" }}>
      <div className="mx-auto w-full max-w-[1440px] px-5 lg:px-[3.5vw]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col">
            <SectionLabel>Funktioner</SectionLabel>
            <h2 id="features-title" className="mt-4" style={{ color: ink }}>Alt, holdet har brug for,<br />ét sted</h2>
          </div>
          <p className="max-w-[26rem] text-[1rem] leading-6" style={{ color: muted }}>Lektioner, øvemiljø, kursusbevis og overblik til lederen arbejder sammen på én platform, så holdet bruger tiden på at lære.</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {/* Teamoverblik */}
          <article className={card} style={{ borderColor: line }}>
            <div className="mb-6 grid flex-1 content-center gap-3">
              {[["AH", "Anna H.", "Modul 1 i ChatGPT", 100], ["MJ", "Mads J.", "Lektion 3 i Copilot", 45], ["SK", "Sara K.", "Lektion 1 i Claude", 15]].map(([i, n, t, p]) => (
                <div key={i as string} className="flex items-center gap-3 rounded-[14px] border p-3" style={{ borderColor: line }}>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full text-[0.75rem] font-semibold text-white" style={{ background: grad }}>{i}</span>
                  <div className="min-w-0 flex-1">
                    <p className="flex justify-between text-[0.8125rem] font-medium" style={{ color: ink }}>{n}<span style={{ color: muted }}>{p as number}%</span></p>
                    <p className="truncate text-[0.75rem]" style={{ color: muted }}>{t}</p>
                    <div className="mt-1.5 h-1 rounded-full" style={{ background: "#efebe7" }}><div className="h-1 rounded-full" style={{ width: `${p}%`, background: grad }} /></div>
                  </div>
                </div>
              ))}
            </div>
            <Copy title="Teamoverblik">Se, hvordan holdet kommer videre, og hvem der mangler et lille skub.</Copy>
            <CardButton href="#priser">Se priser</CardButton>
          </article>

          {/* Platformen på telefonen (Marco 2026-11-23): a real recording of the platform at phone size, in a phone frame */}
          <article className={`${card} gap-6 md:col-span-2 lg:flex-row lg:items-center`} style={{ borderColor: line }}>
            <div className="flex flex-col lg:w-[52%] lg:self-stretch">
              <Copy title="Lær på telefonen">Hele platformen virker på mobilen: lektioner, kurser og dit kursusbevis. Ti minutter i toget er nok.</Copy>
              <p className="mt-5 text-[2.5rem] font-semibold leading-none tracking-[-0.03em] lg:mt-8 lg:text-[3rem]" style={{ color: ink }}>10 min</p>
              <p className="mt-2 text-[0.9375rem]" style={{ color: muted }}>pr. lektion, hvor du er</p>
              <div className="mt-auto"><CardButton href="#kurser">Se kurserne</CardButton></div>
            </div>
            <div className="order-first flex flex-1 justify-center lg:order-none">
              <div className="relative w-[200px] rounded-[38px] p-[7px] shadow-[0_30px_60px_-28px_rgba(31,22,17,0.55)] lg:w-[188px]" style={{ background: "#0f0d0c" }}>
                <div className="relative overflow-hidden rounded-[31px] bg-white" style={{ aspectRatio: "390 / 844" }}>
                  <video src="/video/platform-mobil.mp4" poster="/video/platform-mobil-poster.jpg" autoPlay muted loop playsInline aria-label="Platformen på en telefon: oversigt, kurser og kursusbeviser" className="absolute inset-0 h-full w-full object-cover" />
                </div>
                <span aria-hidden className="absolute left-1/2 top-[13px] h-[18px] w-[64px] -translate-x-1/2 rounded-full" style={{ background: "#0f0d0c" }} />
              </div>
            </div>
          </article>

          {/* Data i EU */}
          <article className={card} style={{ borderColor: line }}>
            <div className="mb-6 grid flex-1 place-items-center">
              <div className="scale-90 rounded-[22px] p-[3px] lg:scale-100" style={{ background: grad }}>
                <div className="grid size-[150px] place-items-center rounded-[19px] text-center" style={{ background: "#201613" }}>
                  <div>
                    <p className="text-[0.75rem] uppercase tracking-[0.12em] text-white/55">Hostet i</p>
                    <p className="mt-1 text-[1.25rem] font-semibold text-white">EU · Frankfurt</p>
                  </div>
                </div>
              </div>
            </div>
            <Copy title="Data i EU">Hostet i Frankfurt, og I får en databehandleraftale med fra start.</Copy>
            <CardButton href="#faq">FAQ</CardButton>
          </article>

          {/* Kursusbevis: the highlighted card, framed like the featured price */}
          <article className="pris-glow relative flex flex-col rounded-[22px] p-[3px] md:col-span-2">
            <p className="relative px-4 pb-2 pt-1.5 text-center text-[0.875rem] font-semibold text-white [text-shadow:0_1px_2px_rgba(120,20,0,0.45)]">Med i alle pakker</p>
            <div className="relative flex flex-1 flex-col gap-6 rounded-[19px] bg-white p-6 lg:flex-row">
              <div className="flex flex-col lg:w-[40%]">
                <Copy title="Kursusbevis">Alle får et bevis med navn, score og et unikt ID, der kan tjekkes via QR-koden.</Copy>
                <div className="mt-auto"><CardButton href="#priser" dark>Se priser</CardButton></div>
              </div>
              <div className="relative order-first flex flex-1 items-center justify-center lg:order-none">
                <Image src="/cert/certifikat-v7.webp" alt="Eksempel på et kursusbevis fra Mindforward" width={1124} height={794} sizes="(min-width: 1024px) 420px, 90vw" className="h-auto w-full max-w-[440px] rounded-[10px] border shadow-[0_24px_48px_-28px_rgba(31,22,17,0.45)]" style={{ borderColor: line }} />
              </div>
            </div>
          </article>

          {/* Log ind */}
          <article className={card} style={{ borderColor: line }}>
            <div className="mb-6 grid flex-1 content-center gap-2.5">
              {[
                ["Microsoft", <svg key="m" width="16" height="16" viewBox="0 0 16 16" aria-hidden><path fill="#f25022" d="M0 0h7.5v7.5H0z" /><path fill="#7fba00" d="M8.5 0H16v7.5H8.5z" /><path fill="#00a4ef" d="M0 8.5h7.5V16H0z" /><path fill="#ffb900" d="M8.5 8.5H16V16H8.5z" /></svg>],
                ["Google", <svg key="g" width="16" height="16" viewBox="0 0 48 48" aria-hidden><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" /><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" /><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" /><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" /></svg>],
                ["mail", <svg key="e" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ink} strokeWidth="1.8" aria-hidden><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>],
              ].map(([n, icon]) => (
                <div key={n as string} className="flex h-11 items-center justify-center gap-2.5 rounded-full border text-[0.875rem] font-medium" style={{ borderColor: line, color: ink }}>{icon}Fortsæt med {n}</div>
              ))}
            </div>
            <Copy title="Log ind på sekunder">Med Microsoft, Google eller en kode på mail. Ingen nye kodeord at huske.</Copy>
            <CardButton href={appLinks.startBusiness}>Opret konto</CardButton>
          </article>

          {/* Øv i jeres værktøj */}
          <article className={card} style={{ borderColor: line }}>
            <div className="mb-6 flex flex-1 items-center justify-center gap-3">
              {[["chatgpt", "ChatGPT"], ["copilot", "Copilot"], ["claude", "Claude"]].map(([f, n]) => (
                <div key={f} className="flex flex-col items-center gap-2">
                  <span className="grid size-16 place-items-center rounded-full border bg-white" style={{ borderColor: line }}><Image src={`/logos/${f}.png`} alt="" width={34} height={34} /></span>
                  <span className="text-[0.8125rem]" style={{ color: muted }}>{n}</span>
                </div>
              ))}
            </div>
            <Copy title="Øv i jeres værktøj">Opgaverne foregår i det værktøj, I allerede bruger.</Copy>
            <CardButton href="#saadan">Se øvemiljøet</CardButton>
          </article>
        </div>
      </div>
    </section>
  );
}
