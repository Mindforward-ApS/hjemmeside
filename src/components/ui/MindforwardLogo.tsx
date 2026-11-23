// Mindforward logo: the smiling brain (Marco 2026-11-23, replaces the M wave).
export function MindforwardLogo({ className = "", size = 32 }: { className?: string; size?: number }) {
  return (
    <span className={`flex items-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/img/mindforward-logo.png" alt="Mindforward" width={Math.round(size * 1.5 * 1.19)} height={Math.round(size * 1.5)} className="shrink-0" />
    </span>
  );
}
