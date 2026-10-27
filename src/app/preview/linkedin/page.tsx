import type { Metadata } from "next";
import Image from "next/image";
import { SilkWave } from "@/components/night/SilkWave";
import { MindforwardLogo } from "@/components/ui/MindforwardLogo";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = { title: "LinkedIn-cover", robots: { index: false } };

// LinkedIn personal cover, 1584×396 (rendered at 2× for export). The profile photo covers the lower left on desktop,
// and mobile crops the sides, so everything important sits right of centre.
const stage =
  "radial-gradient(70% 90% at 62% 10%, #3d2c28 0%, #2e1f1c 35%, transparent 75%), linear-gradient(180deg, #1f120f 0%, #1c100d 55%, #201613 100%)";

const tiles = [
  { src: "/logos/claude.png", x: 1010, y: 46, r: "-6deg" },
  { src: "/logos/chatgpt.png", x: 1452, y: 214, r: "5deg" },
  { src: "/logos/copilot.png", x: 1078, y: 262, r: "-4deg" },
];

const ink = "oklch(0.22 0.02 30)";
const muted = "oklch(0.5 0.012 30)";
const coralFill = "radial-gradient(circle at 35% 30%, oklch(0.8 0.12 38), oklch(0.6 0.17 24))";

// Right-hand visual: v=cert (certificate), v=chat (practice window), v=tiles (the AI tools orbiting the brain).
function Cert() {
  return (
    <div className="absolute left-[1090px] top-[44px] w-[420px] rotate-[-3deg] rounded-[10px] bg-white p-[12px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]">
      <div className="relative rounded-[6px] border border-[oklch(0.75_0.06_45/0.5)] px-7 py-6">
        <span className="[&_span:last-child]:!text-[oklch(0.22_0.02_30)]"><MindforwardLogo size={22} /></span>
        <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.2em]" style={{ color: muted }}>Certifikat</p>
        <p className="mt-1.5 text-[12px]" style={{ color: muted }}>Det bekræftes hermed, at</p>
        <p className="mt-1 font-display text-[30px] font-semibold leading-none tracking-[-0.04em]" style={{ color: ink }}>Dit navn her</p>
        <p className="mt-3 text-[14px] font-medium" style={{ color: ink }}>AI på arbejdet · Niveau 1</p>
        <div className="mt-4 flex gap-8 border-t border-black/10 pt-3 text-[10px]" style={{ color: muted }}><span>Certifikat-ID<br /><b style={{ color: ink }}>MF-26-04812</b></span><span>Dato<br /><b style={{ color: ink }}>14. nov. 2026</b></span></div>
        <span className="absolute right-6 top-6 grid size-16 place-items-center rounded-full text-white" style={{ background: coralFill }}><Icon name="check" size={24} /></span>
      </div>
    </div>
  );
}

function Chat() {
  return (
    <div className="absolute left-[1080px] top-[40px] w-[440px] overflow-hidden rounded-[16px] bg-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]">
      <div className="flex items-center gap-2 border-b border-black/10 px-4 py-2.5 text-[11px]" style={{ color: muted }}><span className="size-2 rounded-full" style={{ background: coralFill }} /> Øvemiljø · Opgave 1 af 2</div>
      <div className="grid gap-2.5 p-4 text-[12px] leading-snug">
        <p className="max-w-[85%] justify-self-end rounded-[14px] rounded-br-sm px-3 py-2 text-white" style={{ background: coralFill }}>Skriv en kort mail til Lars om tilbuddet på 12 scannere. Han skal have det før fredag.</p>
        <p className="max-w-[88%] rounded-[14px] rounded-bl-sm bg-[oklch(0.96_0.008_60)] px-3 py-2" style={{ color: ink }}>Hej Lars. Tak for snakken i går. Her er tilbuddet på de 12 scannere, så du har det i god tid før fredag …</p>
        <p className="flex items-center gap-1.5 text-[12px] font-medium text-[oklch(0.45_0.11_150)]"><Icon name="check" size={14} /> Opgaven er løst</p>
      </div>
    </div>
  );
}

function Orbit() {
  const all = [...tiles, { src: "", x: 1300, y: 40, r: "4deg" }];
  return (
    <>
      <div className="absolute left-[1250px] top-[198px] grid size-[120px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[radial-gradient(closest-side,oklch(0.68_0.17_33/0.5),transparent)]"><span className="scale-[2.2]"><MindforwardLogo size={28} className="[&>span:last-child]:hidden" /></span></div>
      <svg className="absolute inset-0" width="1584" height="396" fill="none"><ellipse cx="1250" cy="198" rx="230" ry="130" stroke="rgba(255,220,200,0.18)" strokeDasharray="4 6" /></svg>
      {all.map((t, i) => (
        <span key={i} className="absolute grid size-[58px] place-items-center overflow-hidden rounded-[18px] bg-white shadow-[0_18px_40px_-14px_rgba(14,8,6,.7)] ring-4 ring-white/50" style={{ left: [1005, 1420, 1050, 1290][i], top: [70, 250, 270, 40][i], rotate: t.r, ...(t.src ? {} : { background: "linear-gradient(145deg,#4a2f27,#33201b)" }) }}>
          {t.src ? <Image src={t.src} alt="" width={116} height={116} className="h-full w-full object-cover" /> : <span className="bg-[linear-gradient(160deg,#ffd9b8,#ff9a5c_45%,#e8643a)] bg-clip-text text-[24px] font-black tracking-[-0.06em] text-transparent">AI</span>}
        </span>
      ))}
    </>
  );
}

// Layout after Marco's reference (2026-10-23): a small outlined tag top left, a bold two-line headline right of centre,
// a short sub-line, and the four AI tools in a row. A soft coral glow in the top-right corner.
function Ref({ blue = false }: { blue?: boolean }) {
  const logos = ["/logos/claude.png", "/logos/chatgpt.png", "/logos/copilot.png", ""];
  return (
    <>
      <div aria-hidden style={{ ["--glow-c" as string]: blue ? "oklch(0.6 0.13 250 / 0.5)" : "oklch(0.66 0.17 38 / 0.45)" }} className="absolute -right-24 -top-32 size-[520px] rounded-full bg-[radial-gradient(closest-side,var(--glow-c),transparent)] blur-2xl" />
      <span className="absolute left-8 top-7"><MindforwardLogo size={34} /></span>
      <div className="absolute left-[640px] top-1/2 -translate-y-1/2">
        <p className="font-display text-[60px] font-bold leading-[1.02] tracking-[-0.035em] text-white">AI-kurser med<br />veludviklet øvemiljø</p>
        <p className="mt-4 max-w-[560px] text-[21px] leading-snug text-white/75">Lær at bruge AI i praksis, med rigtige opgaver og et certifikat, du stolt kan vise frem.</p>
        <div className="mt-6 flex gap-3">
          {logos.map((l, i) => (
            <span key={i} className="grid size-[54px] place-items-center overflow-hidden rounded-[16px] ring-[3px] ring-white/40" style={l ? { background: "white" } : { background: "linear-gradient(145deg,#4a2f27,#33201b)" }}>
              {l ? <Image src={l} alt="" width={108} height={108} className="h-full w-full object-cover" /> : <span className="bg-[linear-gradient(160deg,#ffd9b8,#ff9a5c_45%,#e8643a)] bg-clip-text text-[22px] font-black tracking-[-0.06em] text-transparent">AI</span>}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

// Navy palette for a profile photo with a blue background (Marco 2026-10-23).
const navy = "radial-gradient(70% 90% at 62% 10%, #1d2d4a 0%, #142038 35%, transparent 75%), linear-gradient(180deg, #0d1628 0%, #0a1222 55%, #0e182b 100%)";

export default async function Page({ searchParams }: { searchParams: Promise<{ v?: string; c?: string }> }) {
  const sp = await searchParams;
  const v = sp.v ?? "cert";
  const blue = sp.c === "blue";
  return (
    <div className="grid min-h-svh place-items-center bg-neutral-800 p-8">
      <div id="cover" className="relative overflow-hidden text-white" style={{ width: 1584, height: 396, background: blue ? navy : stage }}>
        <div className={`absolute inset-0 opacity-90 ${blue ? "hue-rotate-[190deg] saturate-[0.7]" : ""}`}><SilkWave /></div>
        <div aria-hidden className="absolute inset-0" style={{ background: blue ? "radial-gradient(120% 100% at 60% 40%, transparent 55%, rgba(4,8,20,0.6) 100%)" : "radial-gradient(120% 100% at 60% 40%, transparent 55%, rgba(19,6,1,0.6) 100%)" }} />
        {v === "bg" ? null : v === "ref" ? <Ref blue={blue} /> : v === "cert" ? <Cert /> : v === "chat" ? <Chat /> : <Orbit />}
        {v !== "ref" && v !== "bg" && <div className="absolute left-[520px] top-1/2 -translate-y-1/2">
          <MindforwardLogo size={34} />
          <p className="mt-6 font-display text-[50px] font-normal leading-[1.02] tracking-[-0.04em] text-white">AI-kurser med<br />veludviklet øvemiljø.</p>
          <p className="mt-4 text-[18px] text-white/70">Lær AI i praksis på dansk · mindforward.dk</p>
        </div>}
      </div>
    </div>
  );
}
