import QRCode from "qrcode";
import { MindforwardLogo } from "@/components/ui/MindforwardLogo";

// Mindforward course certificate, A4 landscape (297 × 210 mm). Rendered as HTML so the platform can fill it per learner
// and export it to PDF/PNG. The QR code points to the public verification page for the certificate ID.
export type CertData = {
  name: string;
  course: string;
  level: string;
  skills: string[];
  hours: string;
  date: string;
  id: string;
  verifyUrl: string;
  signer: string;
  signerTitle: string;
};

const ink = "#2a1b17";
const muted = "#7a6a64";
const bronze = "#b8866b";
const coralFill = "radial-gradient(circle at 35% 30%, #f6b48f, #e1603e)";

export async function Certificate({ d }: { d: CertData }) {
  const qr = await QRCode.toString(d.verifyUrl, { type: "svg", margin: 0, color: { dark: ink, light: "#00000000" } });
  return (
    <div
      className="relative overflow-hidden"
      style={{ width: "297mm", height: "210mm", background: "#fbf8f4", color: ink, fontFamily: "var(--font-text-family)" }}
    >
      {/* warm light in the corner and a faint brain watermark */}
      <div aria-hidden className="absolute -right-[60mm] -top-[70mm] size-[180mm] rounded-full" style={{ background: "radial-gradient(closest-side, rgba(236,111,69,0.16), transparent)" }} />
      {/* double frame */}
      <div className="absolute inset-[9mm] rounded-[3mm]" style={{ border: `0.5mm solid ${bronze}` }} />
      <div className="absolute inset-[11.5mm] rounded-[2mm]" style={{ border: `0.2mm solid ${bronze}66` }} />

      <div className="absolute inset-[11.5mm] flex flex-col px-[20mm] pb-[14mm] pt-[16mm]">
        <div className="flex items-start justify-between">
          <span className="[&_span:last-child]:!text-[#2a1b17]"><MindforwardLogo size={34} /></span>
          <p className="text-right text-[9pt] uppercase tracking-[0.25em]" style={{ color: muted }}>Certifikat-ID<br /><b className="tracking-[0.08em]" style={{ color: ink }}>{d.id}</b></p>
        </div>

        <div className="mt-[12mm]">
          <p className="text-[11pt] uppercase tracking-[0.42em]" style={{ color: bronze }}>Certifikat</p>
          <p className="mt-[5mm] text-[13pt]" style={{ color: muted }}>Det bekræftes hermed, at</p>
          <p className="mt-[2mm] font-display text-[46pt] font-semibold leading-[1.02] tracking-[-0.035em]">{d.name}</p>
          <p className="mt-[5mm] text-[13pt]" style={{ color: muted }}>har gennemført</p>
          <p className="mt-[1.5mm] text-[22pt] font-medium tracking-[-0.02em]">{d.course} <span style={{ color: muted }}>· {d.level}</span></p>
          <p className="mt-[5mm] max-w-[175mm] text-[11pt] leading-relaxed" style={{ color: muted }}>
            Inklusive praktiske opgaver i Mindforwards øvemiljø ({d.hours}). Kompetencer: {d.skills.join(", ")}.
          </p>
        </div>

        <div className="mt-auto grid grid-cols-[1fr_1fr_auto] items-end gap-[12mm]">
          <div>
            <p className="font-serif-accent text-[24pt] italic leading-none" style={{ color: ink }}>{d.signer}</p>
            <div className="mt-[2mm] h-px w-[62mm]" style={{ background: `${bronze}aa` }} />
            <p className="mt-[2mm] text-[9.5pt]" style={{ color: muted }}>{d.signer}, {d.signerTitle}</p>
          </div>
          <div>
            <p className="text-[14pt] font-medium">{d.date}</p>
            <div className="mt-[2mm] h-px w-[50mm]" style={{ background: `${bronze}aa` }} />
            <p className="mt-[2mm] text-[9.5pt]" style={{ color: muted }}>Udstedt</p>
          </div>
          <div className="flex items-end gap-[5mm]">
            <div className="text-right text-[8.5pt] leading-snug" style={{ color: muted }}>
              Scan for at tjekke,<br />at certifikatet er ægte<br /><span style={{ color: ink }}>{d.verifyUrl.replace(/^https?:\/\//, "")}</span>
            </div>
            <div className="size-[24mm]" dangerouslySetInnerHTML={{ __html: qr }} />
          </div>
        </div>
      </div>

      {/* seal */}
      <div className="absolute right-[34mm] top-[52mm] grid size-[36mm] place-items-center rounded-full text-white shadow-[0_6mm_14mm_-6mm_rgba(225,96,62,0.55)]" style={{ background: coralFill }}>
        <div className="grid size-[31mm] place-items-center rounded-full border border-dashed border-white/60 text-center">
          <div>
            <svg viewBox="0 0 24 24" className="mx-auto size-[9mm]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7" /></svg>
            <p className="mt-[1mm] text-[7pt] font-semibold uppercase tracking-[0.18em]">Bestået</p>
          </div>
        </div>
      </div>
    </div>
  );
}
