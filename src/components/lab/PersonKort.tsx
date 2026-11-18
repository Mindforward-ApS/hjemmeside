// Her card (the leader, AI-generated image, no name), three proposals (Marco 2026-11-02, card 3 of 3).
// Each after one Dribbble reference (design/references/person-kort/). The chosen Holdet and score cards are shown
// below for comparison. Example data.
import Image from "next/image";
import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { KortRangliste } from "@/components/lab/HoldetKort";
import { ScoreKurve } from "@/components/lab/ScoreKort";

const c = { ink: "#201613", muted: "#6e625d", line: "#efe8e3", coral: "#e8664a", coralSoft: "#fbe1d7", peach: "#f6c9b6" };
const shadow = "shadow-[0_40px_80px_-40px_rgba(0,0,0,0.75)]";

/* A · Foto med kort (after Afternow "Integration-free. Friction-free.") */
export function PersonFoto() {
  return (
    <div className={`relative aspect-[4/5] w-full max-w-[30rem] overflow-hidden rounded-[28px] ${shadow}`} style={{ background: "linear-gradient(180deg, #efe6df 0%, #e2d3c8 100%)" }}>
      <Image src="/img/leder-cut.webp" alt="Leder, der følger holdet på sin telefon" width={1189} height={1400} className="absolute bottom-0 left-[54%] h-[92%] w-auto max-w-none -translate-x-1/2" />
      <div className="absolute bottom-5 left-5 w-[62%] rounded-[18px] bg-white p-5 shadow-[0_20px_40px_-20px_rgba(32,22,19,0.5)]">
        <span className="grid size-8 place-items-center rounded-[10px] text-white" style={{ background: c.coral }}><Icon name="sparkle" size={15} /></span>
        <p className="mt-4 text-[1.375rem] font-semibold leading-[1.15] tracking-[-0.02em]" style={{ color: c.ink }}>Hele holdet.<br />Ét overblik.</p>
      </div>
    </div>
  );
}

/* B · Fritlagt på fersken (after Andrew Oliinyk "Pure clarity for your money") */
export function PersonFersken() {
  return (
    <div className={`relative aspect-[4/5] w-full max-w-[30rem] overflow-hidden rounded-[28px] ${shadow}`} style={{ background: "linear-gradient(150deg, #fff3ec 0%, #f8d6c4 55%, #eeb79f 100%)" }}>
      <div aria-hidden className="absolute -right-24 top-10 size-[26rem] rounded-full border-[18px] border-white/45" />
      <div className="absolute left-7 top-7">
        <p className="text-[2rem] font-semibold leading-[1.05] tracking-[-0.03em]" style={{ color: c.ink }}>Se, hvem<br /><span style={{ color: "#b8432a" }}>der er i gang</span></p>
      </div>
      <Image src="/img/leder-cut.webp" alt="Leder, der følger holdet på sin telefon" width={1189} height={1400} className="absolute bottom-0 right-[-6%] h-[78%] w-auto max-w-none" />
      <div className="absolute bottom-7 left-7 grid gap-5">
        <div><p className="text-[1.75rem] font-semibold leading-none tracking-[-0.03em] tabular-nums" style={{ color: c.ink }}>12</p><p className="mt-1 text-[0.8125rem]" style={{ color: c.muted }}>på holdet</p></div>
        <div><p className="text-[1.75rem] font-semibold leading-none tracking-[-0.03em] tabular-nums" style={{ color: c.ink }}>9 / 12</p><p className="mt-1 text-[0.8125rem]" style={{ color: c.muted }}>har øvet i dag</p></div>
      </div>
    </div>
  );
}

/* C · Profilkort (after Knife and Fox "Emily Berg"). Marco 2026-11-02: chosen, with a white photo area, the line
   "Lederen kan følge med" in brown, and an orange bottom panel. */
// `wide`: the hero version (design width 980 px), with a wider photo area and bigger type.
export function PersonProfil({ wide = false, privat = false }: { wide?: boolean; privat?: boolean }) {
  return (
    <div className={`w-full overflow-hidden rounded-[28px] ${wide ? "" : "max-w-[30rem]"} ${shadow}`}>
      <div className={`relative overflow-hidden ${wide ? "aspect-[2.7]" : "aspect-[5/4]"}`} style={{ background: "#f5ece4" }}>
        <Image src="/img/leder-cut.webp" alt="Leder, der følger holdet på sin telefon" width={1189} height={1400} className={`absolute bottom-0 h-[96%] w-auto max-w-none -translate-x-1/2 ${wide ? "left-[68%]" : "left-[60%]"}`} />
        <p className={`absolute font-[family-name:var(--font-bebas)] uppercase leading-[0.9] ${wide ? "left-9 top-8 text-[3.75rem]" : "left-6 top-6 text-[3.25rem]"}`} style={{ color: "#5c3328" }}>{privat ? <>Lær i dit<br />eget<br />tempo</> : <>Lederen<br />kan følge<br />med</>}</p>
        <span className={`absolute flex items-center gap-2 rounded-full border px-3 py-1.5 ${wide ? "right-6 top-6 text-[0.875rem]" : "bottom-5 left-6 text-[0.75rem]"}`} style={{ borderColor: "rgba(32,22,19,0.1)", color: c.ink, background: "rgba(255,255,255,0.7)" }}><span className="size-1.5 rounded-full" style={{ background: "#3aa66b" }} />Online nu</span>
      </div>
      <div className={wide ? "flex items-center gap-10 px-9 py-5" : "p-6"} style={{ background: "linear-gradient(150deg, #fbe2d4 0%, #f8d6c4 45%, #eeb79f 100%)" }}>
        <p className={`shrink-0 font-semibold uppercase tracking-[0.16em] ${wide ? "text-[0.875rem]" : "text-[0.6875rem]"}`} style={{ color: "rgba(32,22,19,0.75)" }}>{privat ? "Privat · 69 kr. pr. måned" : "Teamleder · Kundeservice"}</p>
        <div className={`grid flex-1 grid-cols-3 ${wide ? "" : "mt-5 border-t pt-5"}`} style={{ borderColor: "rgba(32,22,19,0.15)" }}>
          {(privat ? [["10 min", "pr. lektion"], ["86", "din score"], ["7/9", "moduler"]] : [["12", "på holdet"], ["86", "holdets score"], ["9/9", "moduler"]]).map(([v, l], i) => (
            <div key={l} className={`text-center ${i ? "border-l" : ""}`} style={{ borderColor: "rgba(32,22,19,0.15)" }}>
              <p className={`font-semibold tracking-[-0.03em] tabular-nums ${wide ? "text-[2rem]" : "text-[1.5rem]"}`} style={{ color: c.ink }}>{v}</p>
              <p className={wide ? "text-[0.9375rem]" : "text-[0.75rem]"} style={{ color: "rgba(32,22,19,0.75)" }}>{l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PersonKortPreview() {
  const items: { id: string; title: string; ref: string; node: ReactNode }[] = [
    { id: "a", title: "A · Foto med kort", ref: "Efter Afternow · Integration-free", node: <PersonFoto /> },
    { id: "b", title: "B · Fritlagt på fersken", ref: "Efter Andrew Oliinyk · Pure clarity", node: <PersonFersken /> },
    { id: "c", title: "C · Profilkort", ref: "Efter Knife and Fox · Emily Berg", node: <PersonProfil /> },
  ];
  return (
    <div className="min-h-[100svh] px-5 py-14 sm:px-10" style={{ background: "radial-gradient(70% 60% at 50% 0%, #3a2722 0%, #201613 70%)" }}>
      <div className="mx-auto max-w-[1500px]">
        <h1 className="text-[2rem] font-semibold tracking-[-0.02em] text-white">Hendes kort · 3 forslag</h1>
        <p className="mt-2 text-white/60">Kort nr. 3. Vælg det, du synes er flottest. Billedet er AI-genereret, så hun har ikke noget navn.</p>
        <div className="mt-12 grid gap-12 lg:grid-cols-3">
          {items.map((it) => (
            <section key={it.id} className="grid content-start justify-items-center gap-5">
              <div className="text-center"><p className="text-[1.125rem] font-semibold text-white">{it.title}</p><p className="text-[0.8125rem] text-white/50">{it.ref}</p></div>
              {it.node}
            </section>
          ))}
        </div>
        <div className="mt-20 border-t border-white/10 pt-12">
          <p className="text-center text-[1.125rem] font-semibold text-white">De to valgte kort til sammenligning</p>
          <div className="mt-8 grid justify-items-center gap-10 lg:grid-cols-2"><KortRangliste /><ScoreKurve /></div>
        </div>
      </div>
    </div>
  );
}
