import Image from "next/image";

// Logo comparison (Marco 2026-11-24): today's flat logo vs the glossy 3D MIND, at the sizes a logo really lives at.
export const metadata = { robots: { index: false } };

function Lockup({ src, size, dark = true }: { src: string; size: number; dark?: boolean }) {
  return (
    <span className="flex items-center gap-2" style={{ color: dark ? "#fff" : "#201613" }}>
      <Image src={src} alt="" width={size * 1.2} height={size} className="w-auto" style={{ height: size }} />
      <span className="font-extrabold leading-none tracking-[-0.03em]" style={{ fontSize: size * 0.8 }}>Forward</span>
    </span>
  );
}

const rows = [
  ["I menuen (30 px)", 30],
  ["Footer (28 px)", 28],
  ["Mobil-menu (22 px)", 22],
] as const;

export default function Page() {
  const v = [["I dag · fladt", "/img/mindforward-logo-3.png"], ["Glossy 3D MIND", "/img/miwa-chat.png"]] as const;
  return (
    <div className="min-h-screen px-8 pb-24 pt-14" style={{ background: "#f5f2ef", color: "#201613" }}>
      <div className="mx-auto max-w-[1100px]">
        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#8a7d76]">Forslag · kun til gennemsyn</p>
        <h1 className="mt-3 text-[36px] font-semibold tracking-[-0.02em]">Logo: fladt eller glossy</h1>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {v.map(([label, src]) => (
            <div key={label} className="overflow-hidden rounded-[24px] bg-white shadow-[0_0_0_1px_rgba(32,22,19,.08)]">
              <p className="px-6 pt-5 text-[15px] font-semibold">{label}</p>
              <div className="mt-4 space-y-5 bg-[#201613] px-6 py-6">
                {rows.map(([t, s]) => (
                  <div key={t} className="flex items-center justify-between gap-4"><Lockup src={src} size={s} /><span className="text-[12px] text-white/50">{t}</span></div>
                ))}
              </div>
              <div className="flex items-center justify-between gap-4 px-6 py-5"><Lockup src={src} size={28} dark={false} /><span className="text-[12px] text-[#8a7d76]">På lys baggrund</span></div>
              <div className="flex items-center gap-4 border-t border-[rgba(32,22,19,0.08)] px-6 py-5">
                <span className="flex h-8 items-center gap-2 rounded-t-[8px] bg-[#e9e6e3] px-3 text-[12px]">
                  <Image src={src} alt="" width={32} height={32} className="size-4 object-contain" />Mindforward
                </span>
                <Image src={src} alt="" width={32} height={32} className="size-4 object-contain" />
                <span className="text-[12px] text-[#8a7d76]">Browserfane (16 px)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
