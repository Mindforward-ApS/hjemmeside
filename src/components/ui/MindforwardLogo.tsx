// Mindforward logo: the orange M wave (Marco 2026-11-22, replaces the brain icon) + "Forward" wordmark.
export function MindforwardLogo({ className = "", size = 32 }: { className?: string; size?: number }) {
  return (
    <span className={`flex items-center gap-1.5 text-white ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/img/mindforward-m.png" alt="" aria-hidden width={Math.round(size * 0.8 * 2.48)} height={Math.round(size * 0.8)} className="shrink-0" />
      <span className="whitespace-nowrap font-extrabold leading-none tracking-[-0.03em]" style={{ fontSize: `min(${Math.round(size * 0.8)}px, 6vw)` }}>Forward</span>
    </span>
  );
}
