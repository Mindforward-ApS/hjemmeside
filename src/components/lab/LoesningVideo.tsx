import Image from "next/image";
import { GrebBtn } from "@/components/ui/GrebBtn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PlatformVideo } from "@/components/lab/Forside2";

// Løsningen with the video as the main thing (Marco 2026-11-24, preview): centred heading, the product video big
// across the section, the two figures and the button in one quiet row underneath. Same background as the hero.
const head = "font-[family-name:var(--font-geist)] !font-semibold tracking-[-0.045em]";

export function LoesningVideo() {
  return (
    <section id="kurser" className="relative isolate overflow-hidden py-24 sm:py-[7.5rem]">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <Image src="/img/hero-erhverv-2.jpg" alt="" fill sizes="100vw" className="scale-[1.1] object-cover object-[50%_40%] blur-[40px]" />
        <div className="absolute inset-0" style={{ background: "rgba(32,22,19,0.92)" }} />
      </div>
      <div className="w-full px-5 sm:px-[3.5vw]">
        <div className="mx-auto flex max-w-[60rem] flex-col items-center text-center">
          <SectionLabel light>Løsningen</SectionLabel>
          <h2 className={`${head} mt-4 text-balance text-[clamp(2.25rem,1.4rem+2.6vw,3.5rem)] leading-[1.143] text-white`}>Korte lektioner, et rigtigt øvemiljø og overblik til lederen</h2>
          <p className="mt-5 max-w-[38rem] text-[1.0625rem] leading-[1.6] text-white/70">Lektioner på dansk i ChatGPT, Copilot eller Claude. Hver lektion slutter med en opgave fra jeres egen hverdag, og lederen kan følge holdet.</p>
        </div>

        <div className="relative mx-auto mt-14 max-w-[1240px]">
          <div className="relative aspect-video overflow-hidden rounded-[24px] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_40px_80px_-30px_rgba(0,0,0,0.7)] sm:rounded-[32px]">
            <PlatformVideo />
          </div>
        </div>

        <div className="mx-auto mt-12 flex max-w-[1240px] flex-col items-center justify-center gap-8 sm:flex-row sm:gap-14">
          {[["10", "min", "Så lang tid tager en lektion"], ["69", "kr.", "Pris pr. bruger pr. måned"]].map(([n, u, l]) => (
            <div key={n} className="flex items-center gap-4">
              <p className={`${head} flex items-start text-[48px] leading-none text-white`}>{n}<span className="ml-1 text-[18px] font-bold leading-6 tracking-normal">{u}</span></p>
              <p className="max-w-[10rem] text-[0.9375rem] leading-5 text-white/60">{l}</p>
            </div>
          ))}
          <GrebBtn href="/priser" onDark>Se priser</GrebBtn>
        </div>
      </div>
    </section>
  );
}
