// Preview: three new versions of "Mindforward i tal" and the closing CTA "Få hele teamet i gang" (Marco 2026-11-03,
// "3 versioner af alle sektioner"). The current sections are copied in first ("Nu") for comparison.
import Image from "next/image";
import Link from "next/link";
import { Bebas_Neue } from "next/font/google";
import { Icon } from "@/components/ui/Icon";
import { appLinks } from "@/lib/app";
import { KortRangliste } from "@/components/lab/HoldetKort";
import * as Tal from "@/components/lab/v3/Tal";
import * as Cta from "@/components/lab/v3/Cta";

const bebas = Bebas_Neue({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-bebas", display: "swap" });
const c = { dark: "#201613", ink: "#201613", muted: "#5a4a44", cream: "#f7f2ee", peach: "#f6c9b6" };
const h2 = "font-[family-name:var(--font-bebas)] uppercase leading-[0.92] tracking-[0.005em] text-[clamp(2.75rem,1.9rem+2.6vw,4rem)]";
const wrap = "w-full px-5 sm:px-[3.5vw]";

function NuTal() {
  const s = [
    { n: "10", u: "min", d: "pr. lektion, så det passer ind i en travl dag" },
    { n: "3", u: "værktøjer", d: "ChatGPT, Copilot og Claude, side om side", dark: true },
    { n: "1–2", u: "timer", d: "for et helt kursus, fordelt på korte lektioner" },
    { n: "69", u: "kr", d: "pr. bruger pr. måned, ingen binding" },
  ];
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className={wrap}>
        <div className="grid gap-4">
          <h2 className={h2} style={{ color: c.ink }}>Mindforward i tal</h2>
          <p className="max-w-[30rem] text-[1rem] leading-relaxed" style={{ color: c.muted }}>Lavet til travle teams i danske virksomheder. Kort, konkret og på dansk.</p>
        </div>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {s.map((x) => (
            <div key={x.u} className="flex items-center justify-between gap-4 rounded-[22px] p-5 sm:block sm:p-9 sm:text-center" style={{ background: x.dark ? c.dark : c.cream }}>
              <p className="whitespace-nowrap text-[2.5rem] font-semibold leading-none tracking-[-0.03em] tabular-nums sm:text-[3.75rem]" style={{ color: x.dark ? "#fff" : c.ink }}>{x.n}<span className="ml-1.5 text-[1rem] font-semibold tracking-normal" style={{ color: x.dark ? c.peach : "rgba(32,22,19,0.6)" }}>{x.u}</span></p>
              <p className="max-w-[11rem] text-right text-[0.875rem] leading-snug sm:mx-auto sm:mt-4 sm:max-w-[12rem] sm:text-center" style={{ color: x.dark ? "rgba(255,255,255,0.65)" : c.muted }}>{x.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NuCta() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className={wrap}>
        <div className="relative grid overflow-hidden rounded-[32px] lg:grid-cols-[1fr_1fr]" style={{ background: "linear-gradient(135deg, #fbd5c4 0%, #f6b49b 55%, #f9e4d8 100%)" }}>
          <div className="relative h-[24rem] overflow-hidden sm:h-[30rem] lg:h-auto lg:min-h-[32rem]">
            <Image src="/img/unsplash/team.jpg" alt="Et hold, der kigger på den samme laptop" fill sizes="(min-width:1024px) 600px, 100vw" className="object-cover object-[40%_40%]" />
            <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(90deg, transparent 55%, rgba(246,180,155,0.55) 100%)" }} />
            <div className="absolute -bottom-28 right-2 z-10 origin-bottom-right scale-[0.72] sm:right-8 sm:scale-100">
              <div className="w-[13rem] -rotate-6 rounded-[2.2rem] p-2 shadow-[0_30px_60px_-25px_rgba(32,22,19,0.6)] sm:w-[15rem]" style={{ background: c.dark }}>
                <div className="relative h-[24rem] overflow-hidden rounded-[1.8rem] sm:h-[28rem]" style={{ background: "#fbf6f2" }}>
                  <span aria-hidden className="absolute left-1/2 top-2 h-5 w-20 -translate-x-1/2 rounded-full" style={{ background: c.dark }} />
                  <div className="px-2 pt-10"><Cta.Fit w={300}><KortRangliste /></Cta.Fit></div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-8 sm:p-12 lg:self-center lg:py-16 lg:pl-4 lg:pr-14">
            <h2 className={h2} style={{ color: c.ink }}>Få hele teamet i gang</h2>
            <p className="mt-4 max-w-[26rem] text-[1rem] leading-relaxed" style={{ color: "#4a3a34" }}>Fra 5 brugere. Teamoverblik, rapport og databehandleraftale er med.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={appLinks.startBusiness} className="inline-flex h-12 items-center gap-2 rounded-full px-6 text-[0.9375rem] font-medium text-white" style={{ background: c.dark }}>Start et kursus <Icon name="arrowRight" size={16} /></Link>
              <Link href="/kontakt" className="inline-flex h-12 items-center gap-2 rounded-full border px-6 text-[0.9375rem] font-medium" style={{ borderColor: c.dark, color: c.ink }}>Book 15 min</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function V3TalCta() {
  const groups = [
    {
      g: "Mindforward i tal",
      v: [
        { t: "Nu", d: "Den nuværende sektion, til sammenligning.", n: <NuTal /> },
        { t: "A · Instrumentbræt", d: "Hvert tal bliver sit eget lille produktkort: en lektionsur-ring (10 min), de tre værktøjer side om side, et prisskilt og et helt kursus som 9 søjler à 10 min.", n: <Tal.A /> },
        { t: "B · Mørk tavle", d: "Kæmpestore Bebas-tal på mørk bund, delt af tynde linjer, med én stille mikrograf under hvert tal.", n: <Tal.B /> },
        { t: "C · Tallene i ét kursus", d: "Tallene som en liste til venstre; til højre ét kursuskort (eksempel), der viser dem i brug: 10-minutters lektioner, de tre værktøjer, 1–2 timer og prisen.", n: <Tal.C /> },
      ],
    },
    {
      g: "Få hele teamet i gang",
      v: [
        { t: "Nu", d: "Den nuværende sektion, til sammenligning.", n: <NuCta /> },
        { t: "A · Mørk scene", d: "Mørkt bånd med teksten til venstre; til højre det rigtige certifikat skråt bagved telefonen med holdkortet. Fem ansigter = fra 5 brugere.", n: <Cta.A /> },
        { t: "B · Scenen rejser sig", d: "Centreret tekst på fersken; score-graf, telefon med holdkort og certifikat rejser sig fra kortets underkant.", n: <Cta.B /> },
        { t: "C · Det er med", d: "Teksten lover teamoverblik, rapport og databehandleraftale: til højre ét kort for hvert ord, så man ser præcis hvad man får.", n: <Cta.C /> },
      ],
    },
  ];
  return (
    <div className={`${bebas.variable} bg-[#d9d2cc]`}>
      {groups.map((gr) => (
        <div key={gr.g}>
          <p className="px-[3.5vw] pt-12 text-[1.5rem] font-bold text-[#201613]">{gr.g}</p>
          {gr.v.map((x) => (
            <div key={x.t} className="pb-10">
              <div className="px-[3.5vw] pb-3 pt-8"><p className="text-[1rem] font-semibold text-[#201613]">{x.t}</p><p className="max-w-[60rem] text-[0.8125rem] text-[#5a4a44]">{x.d}</p></div>
              {x.n}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
