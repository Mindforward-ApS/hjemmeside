// Mindforward logo: the orange M wave on its own (Marco 2026-11-22, replaces brain + "Forward").
export function MindforwardLogo({ className = "", size = 32 }: { className?: string; size?: number }) {
  return (
    <span className={`flex items-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/img/mindforward-m.png" alt="Mindforward" width={Math.round(size * 2.48)} height={size} className="shrink-0" />
    </span>
  );
}
