import QRCode from "qrcode";
import { MindforwardLogo } from "@/components/ui/MindforwardLogo";
import { SilkWave } from "@/components/night/SilkWave";
import type { CertData } from "./Certificate";

// Three certificate directions after Marco's "det skal være meget bedre" (2026-10-23). All A4 landscape (297 × 210 mm).
// V1 classic diploma (guilloche frame, centred), V2 dark brand stage, V3 modern split credential.

const ink = "#2a1b17";
const muted = "#7a6a64";
const bronze = "#b8866b";
const bronzeHi = "#e2b796";

async function qrSvg(url: string, dark: string) {
  return QRCode.toString(url, { type: "svg", margin: 0, color: { dark, light: "#00000000" } });
}

// Guilloche: many phase-shifted sine rings drawn as one band, like the pattern on banknotes.
function Guilloche({ w, h, inset, color, lines = 18 }: { w: number; h: number; inset: number; color: string; lines?: number }) {
  const paths: string[] = [];
  const x0 = inset, y0 = inset, x1 = w - inset, y1 = h - inset;
  const per = (x1 - x0) * 2 + (y1 - y0) * 2;
  const N = 1400;
  for (let k = 0; k < lines; k++) {
    const ph = (k / lines) * Math.PI * 2;
    let d = "";
    for (let i = 0; i <= N; i++) {
      const t = (i / N) * per;
      let x: number, y: number, nx: number, ny: number;
      if (t < x1 - x0) { x = x0 + t; y = y0; nx = 0; ny = 1; }
      else if (t < x1 - x0 + (y1 - y0)) { x = x1; y = y0 + (t - (x1 - x0)); nx = -1; ny = 0; }
      else if (t < 2 * (x1 - x0) + (y1 - y0)) { x = x1 - (t - (x1 - x0) - (y1 - y0)); y = y1; nx = 0; ny = -1; }
      else { x = x0; y = y1 - (t - 2 * (x1 - x0) - (y1 - y0)); nx = 1; ny = 0; }
      const a = Math.sin((t / per) * Math.PI * 2 * 64 + ph) * 3.2 + Math.sin((t / per) * Math.PI * 2 * 9 - ph) * 1.4;
      d += `${i ? "L" : "M"}${(x + nx * (4 + a)).toFixed(2)} ${(y + ny * (4 + a)).toFixed(2)}`;
    }
    paths.push(d);
  }
  return (
    <svg className="absolute inset-0" width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} fill="none" aria-hidden>
      {paths.map((d, i) => <path key={i} d={d} stroke={color} strokeOpacity={0.38} strokeWidth={0.18} />)}
    </svg>
  );
}

// Rosette seal: scalloped rim, fine radial engraving, a ribbon text ring and a check in the middle.
function Seal({ size, light = false, label = "BESTÅET · MINDFORWARD · AI I PRAKSIS · " }: { size: string; light?: boolean; label?: string }) {
  const teeth = 36;
  let rim = "";
  for (let i = 0; i <= teeth * 2; i++) {
    const a = (i / (teeth * 2)) * Math.PI * 2;
    const r = i % 2 ? 46 : 49.5;
    rim += `${i ? "L" : "M"}${(50 + Math.cos(a) * r).toFixed(2)} ${(50 + Math.sin(a) * r).toFixed(2)}`;
  }
  const g = light ? ["#f3d3b8", "#c98d6a", "#8a5638"] : ["#f6b48f", "#e1603e", "#a8432a"];
  return (
    <svg viewBox="0 0 100 100" style={{ width: size, height: size }} aria-hidden>
      <defs>
        <radialGradient id={`s${light}`} cx="35%" cy="30%" r="80%"><stop offset="0" stopColor={g[0]} /><stop offset="0.55" stopColor={g[1]} /><stop offset="1" stopColor={g[2]} /></radialGradient>
        <path id={`ring${light}`} d="M50,50 m-33,0 a33,33 0 1,1 66,0 a33,33 0 1,1 -66,0" />
      </defs>
      <path d={rim + "Z"} fill={`url(#s${light})`} />
      {Array.from({ length: 90 }, (_, i) => {
        const a = (i / 90) * Math.PI * 2;
        return <line key={i} x1={50 + Math.cos(a) * 40} y1={50 + Math.sin(a) * 40} x2={50 + Math.cos(a) * 44} y2={50 + Math.sin(a) * 44} stroke="white" strokeOpacity="0.35" strokeWidth="0.35" />;
      })}
      <circle cx="50" cy="50" r="39" fill="none" stroke="white" strokeOpacity="0.55" strokeWidth="0.5" />
      <circle cx="50" cy="50" r="27" fill="none" stroke="white" strokeOpacity="0.55" strokeWidth="0.5" />
      <text fontSize="5.2" fontWeight="700" letterSpacing="1.15" fill="white" fillOpacity="0.92"><textPath href={`#ring${light}`}>{label}</textPath></text>
      <path d="M40 51l7 7 14-15" fill="none" stroke="white" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const page = { width: "297mm", height: "210mm" } as const;

// V1 · Klassisk diplom: cream paper, guilloche frame, everything centred, two signature lines, seal at the foot.
export async function CertV1({ d }: { d: CertData }) {
  const qr = await qrSvg(d.verifyUrl, ink);
  return (
    <div className="relative overflow-hidden" style={{ ...page, background: "radial-gradient(120% 90% at 50% 0%, #fffdf9, #f6efe6)", color: ink }}>
      <Guilloche w={297} h={210} inset={8} color={bronze} />
      <div className="absolute inset-[15mm]" style={{ border: `0.25mm solid ${bronze}` }} />
      <div className="absolute inset-[16.2mm]" style={{ border: `0.15mm solid ${bronze}88` }} />
      <div className="absolute inset-[16mm] flex flex-col items-center px-[24mm] pt-[13mm] text-center">
        <span className="[&_span:last-child]:!text-[#2a1b17]"><MindforwardLogo size={30} /></span>
        <p className="mt-[8mm] text-[10pt] font-medium uppercase tracking-[0.55em]" style={{ color: bronze }}>Certifikat for gennemførelse</p>
        <p className="mt-[6mm] text-[12pt]" style={{ color: muted }}>Det bekræftes hermed, at</p>
        <p className="mt-[3mm] font-display text-[44pt] font-semibold leading-none tracking-[-0.03em]">{d.name}</p>
        <div className="mt-[4mm] flex items-center gap-[4mm]" style={{ color: bronze }}><span className="h-px w-[28mm] bg-current" /><span className="text-[9pt]">◆</span><span className="h-px w-[28mm] bg-current" /></div>
        <p className="mt-[4mm] text-[12pt]" style={{ color: muted }}>har med succes gennemført forløbet</p>
        <p className="mt-[2mm] text-[20pt] font-medium tracking-[-0.015em]">{d.course} · {d.level}</p>
        <p className="mt-[3mm] max-w-[170mm] text-[10pt] leading-relaxed" style={{ color: muted }}>{d.hours} med praktiske opgaver i Mindforwards øvemiljø · {d.skills.join(" · ")}</p>
        <div className="mt-auto grid w-full grid-cols-[1fr_auto_1fr] items-end gap-[10mm] pb-[9mm]">
          <div className="text-left">
            <p className="font-serif-accent text-[22pt] italic leading-none">{d.signer}</p>
            <div className="mt-[1.5mm] h-px w-[60mm]" style={{ background: bronze }} />
            <p className="mt-[1.5mm] text-[8.5pt] uppercase tracking-[0.18em]" style={{ color: muted }}>{d.signer} · {d.signerTitle}</p>
          </div>
          <Seal size="30mm" />
          <div className="flex items-end justify-end gap-[4mm] text-right">
            <div>
              <p className="text-[12pt] font-medium">{d.date}</p>
              <div className="ml-auto mt-[1.5mm] h-px w-[44mm]" style={{ background: bronze }} />
              <p className="mt-[1.5mm] text-[8.5pt] uppercase tracking-[0.18em]" style={{ color: muted }}>Udstedt · ID {d.id}</p>
            </div>
            <div className="size-[17mm] shrink-0" dangerouslySetInnerHTML={{ __html: qr }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// V2 · Mørk scene: the site's brown stage and silk lines, bronze type, a glowing seal. Feels like the product.
export async function CertV2({ d }: { d: CertData }) {
  const qr = await qrSvg(d.verifyUrl, "#f3e3d6");
  return (
    <div className="relative overflow-hidden text-white" style={{ ...page, background: "radial-gradient(80% 90% at 70% 0%, #3d2c28 0%, #2a1c19 40%, transparent 80%), linear-gradient(180deg, #1f120f, #170d0b)" }}>
      <div className="absolute inset-0 opacity-70"><SilkWave /></div>
      <div aria-hidden className="absolute -right-[40mm] -top-[50mm] size-[150mm] rounded-full" style={{ background: "radial-gradient(closest-side, rgba(236,111,69,0.28), transparent)" }} />
      <div className="absolute inset-[10mm] rounded-[2mm]" style={{ border: `0.25mm solid ${bronzeHi}55` }} />
      <div className="absolute inset-[10mm] flex flex-col px-[20mm] pb-[15mm] pt-[16mm]">
        <div className="flex items-center justify-between">
          <MindforwardLogo size={30} />
          <p className="text-[8.5pt] uppercase tracking-[0.3em] text-white/50">Certifikat-ID <span className="tracking-[0.08em] text-white/85">{d.id}</span></p>
        </div>
        <p className="mt-[16mm] text-[10pt] font-medium uppercase tracking-[0.5em]" style={{ color: bronzeHi }}>Certifikat</p>
        <p className="mt-[5mm] text-[12pt] text-white/60">Tildelt</p>
        <p className="mt-[1mm] font-display text-[54pt] font-semibold leading-none tracking-[-0.04em]">{d.name}</p>
        <p className="mt-[6mm] max-w-[150mm] text-[13pt] leading-snug text-white/75">for at have gennemført <span className="text-white">{d.course} · {d.level}</span> med {d.hours} praktiske opgaver i Mindforwards øvemiljø.</p>
        <div className="mt-[6mm] flex flex-wrap gap-[2.5mm]">
          {d.skills.map((s) => <span key={s} className="rounded-full px-[3.5mm] py-[1.2mm] text-[8.5pt] text-white/80" style={{ border: `0.2mm solid ${bronzeHi}55` }}>{s}</span>)}
        </div>
        <div className="mt-auto flex items-end gap-[14mm]">
          <div>
            <p className="font-serif-accent text-[22pt] italic leading-none text-white">{d.signer}</p>
            <div className="mt-[1.5mm] h-px w-[58mm]" style={{ background: `${bronzeHi}88` }} />
            <p className="mt-[1.5mm] text-[8.5pt] uppercase tracking-[0.16em] text-white/50">{d.signerTitle}</p>
          </div>
          <div>
            <p className="text-[12pt]">{d.date}</p>
            <div className="mt-[1.5mm] h-px w-[40mm]" style={{ background: `${bronzeHi}88` }} />
            <p className="mt-[1.5mm] text-[8.5pt] uppercase tracking-[0.16em] text-white/50">Udstedt</p>
          </div>
          <div className="ml-auto flex items-end gap-[4mm] text-right text-[8pt] leading-snug text-white/55">
            <p>Tjek ægtheden<br /><span className="text-white/85">{d.verifyUrl.replace(/^https?:\/\//, "")}</span></p>
            <div className="size-[18mm]" dangerouslySetInnerHTML={{ __html: qr }} />
          </div>
        </div>
      </div>
      <div className="absolute right-[30mm] top-[48mm] drop-shadow-[0_0_12mm_rgba(236,111,69,0.45)]"><Seal size="40mm" /></div>
    </div>
  );
}

// V3 · Moderne credential: a dark brand column on the left (logo, seal, ID, QR), the cream page on the right with the name huge.
export async function CertV3({ d }: { d: CertData }) {
  const qr = await qrSvg(d.verifyUrl, "#f3e3d6");
  return (
    <div className="relative grid overflow-hidden" style={{ ...page, gridTemplateColumns: "92mm 1fr", background: "#fbf8f4", color: ink }}>
      <div className="relative flex flex-col overflow-hidden px-[12mm] py-[14mm] text-white" style={{ background: "radial-gradient(90% 60% at 50% 0%, #3d2c28, #1c100d 75%)" }}>
        <div className="absolute inset-0 opacity-60"><SilkWave /></div>
        <div className="relative"><MindforwardLogo size={28} /></div>
        <div className="relative mt-[16mm] drop-shadow-[0_0_10mm_rgba(236,111,69,0.45)]"><Seal size="46mm" /></div>
        <div className="relative mt-auto">
          <div className="size-[22mm] rounded-[2mm] bg-white/5 p-[2mm]" dangerouslySetInnerHTML={{ __html: qr }} />
          <p className="mt-[3mm] text-[8pt] uppercase tracking-[0.22em] text-white/45">Certifikat-ID</p>
          <p className="text-[11pt] font-medium tracking-[0.06em]">{d.id}</p>
          <p className="mt-[1.5mm] text-[8pt] text-white/55">{d.verifyUrl.replace(/^https?:\/\//, "")}</p>
        </div>
      </div>
      <div className="relative flex flex-col px-[18mm] py-[16mm]">
        <div aria-hidden className="absolute -right-[30mm] -top-[40mm] size-[120mm] rounded-full" style={{ background: "radial-gradient(closest-side, rgba(236,111,69,0.14), transparent)" }} />
        <p className="text-[10pt] font-medium uppercase tracking-[0.45em]" style={{ color: bronze }}>Certifikat · {d.level}</p>
        <p className="mt-[18mm] font-display text-[58pt] font-semibold leading-[0.95] tracking-[-0.045em]">{d.name}</p>
        <p className="mt-[8mm] text-[14pt] leading-snug" style={{ color: muted }}>har gennemført</p>
        <p className="mt-[1mm] text-[24pt] font-medium tracking-[-0.02em]">{d.course}</p>
        <p className="mt-[4mm] max-w-[150mm] text-[11pt] leading-relaxed" style={{ color: muted }}>Forløbet er bestået med praktiske opgaver i Mindforwards øvemiljø. Certifikatet dokumenterer følgende kompetencer:</p>
        <div className="mt-[6mm] grid grid-cols-2 gap-x-[8mm] gap-y-[2.5mm] text-[10pt]">
          {d.skills.map((s) => <p key={s} className="flex items-center gap-[2.5mm]"><span className="size-[1.6mm] rounded-full" style={{ background: "#e1603e" }} />{s}</p>)}
        </div>
        <div className="mt-auto grid grid-cols-3 gap-[8mm] border-t pt-[5mm] text-[9pt]" style={{ borderColor: `${bronze}66`, color: muted }}>
          <div><p className="font-serif-accent text-[19pt] italic leading-none" style={{ color: ink }}>{d.signer}</p><p className="mt-[2mm]">{d.signerTitle}</p></div>
          <div><p className="text-[12pt] font-medium" style={{ color: ink }}>{d.date}</p><p className="mt-[2mm]">Udstedt</p></div>
          <div><p className="text-[12pt] font-medium" style={{ color: ink }}>{d.hours}</p><p className="mt-[2mm]">Praksis i øvemiljøet</p></div>
        </div>
      </div>
    </div>
  );
}
