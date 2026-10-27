import type { ReactNode } from "react";
import { SilkWave } from "@/components/night/SilkWave";

// A full-bleed section in the hero's brown (same sampled colours), with the dark token scope so the
// section's text, glass cards and buttons flip to their dark versions. Optional silk ribbon.
const stage =
  "radial-gradient(70% 55% at 50% 8%, #3d2c28 0%, #2e1f1c 35%, transparent 75%), radial-gradient(60% 70% at 72% 85%, #271d19 0%, transparent 70%), linear-gradient(180deg, #1f120f 0%, #1c100d 55%, #201613 100%)";

export function BrownBand({ children, silk = false }: { children: ReactNode; silk?: boolean }) {
  return (
    <div className="night-dark relative overflow-hidden [--panel:oklch(1_0_0/0.04)]" style={{ background: stage }}>
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(120deg, transparent 18%, rgba(120, 92, 84, 0.12) 30%, rgba(160, 128, 118, 0.08) 36%, transparent 48%)" }} />
      {silk && <SilkWave className="opacity-60" />}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(120% 100% at 40% 40%, transparent 55%, rgba(19, 6, 1, 0.5) 100%)" }} />
      <div className="relative">{children}</div>
    </div>
  );
}
