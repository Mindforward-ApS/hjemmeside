import type { ReactNode } from "react";

// Section heading used by all academy sections: small glass label, thin gradient headline, optional lead.
export function Head({ label, title, sub, center = false }: { label: string; title: ReactNode; sub?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-[44rem] text-center" : "max-w-[44rem]"}>
      <span className="n-glass inline-flex rounded-full px-4 py-1.5 text-[0.8125rem] text-heading">{label}</span>
      <h2 className="n-display mt-6" style={{ fontSize: "clamp(2rem, 1rem + 2.4vw, 3.25rem)" }}>{title}</h2>
      {sub && <p className={`mt-5 text-[1.0625rem] leading-relaxed text-muted ${center ? "mx-auto max-w-[34rem]" : "max-w-[36rem]"}`}>{sub}</p>}
    </div>
  );
}

// Abstract course cover (original, code-generated): warm gradient with silk lines, tinted per course.
export function Cover({ hue, className = "" }: { hue: number; className?: string }) {
  return (
    <div aria-hidden className={`relative overflow-hidden ${className}`} style={{ background: `radial-gradient(120% 120% at 20% 0%, oklch(0.42 0.06 ${hue}), oklch(0.2 0.025 ${hue}) 70%)` }}>
      <svg viewBox="0 0 400 240" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" fill="none">
        {Array.from({ length: 22 }, (_, i) => {
          const o = i / 21;
          return <path key={i} d={`M-20 ${(200 - o * 40).toFixed(1)} C 120 ${(120 - o * 60).toFixed(1)}, 220 ${(260 - o * 90).toFixed(1)}, 420 ${(70 + o * 30).toFixed(1)}`} stroke={`oklch(0.85 0.08 ${hue + 15})`} strokeOpacity={Number((0.06 + Math.sin(o * Math.PI) * 0.22).toFixed(3))} strokeWidth="1" />;
        })}
      </svg>
    </div>
  );
}

export const coralFill = "radial-gradient(circle at 35% 30%, oklch(0.8 0.12 38), oklch(0.6 0.17 24))";
