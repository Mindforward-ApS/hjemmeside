// Mindforward logo: Marco's smiling brain with black outline (2026-11-23) + "Forward" wordmark.
// live: the header lockup that MindDirector brings to life (data-mind-spot / data-mind-word).
export function MindforwardLogo({ className = "", size = 32, live = false }: { className?: string; size?: number; live?: boolean }) {
  return (
    <span className={`flex items-center gap-2 text-white ${className}`}>
      <span className="relative inline-block shrink-0 leading-none" data-mind-spot={live ? "" : undefined}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/mindforward-logo-3.png" alt="" aria-hidden width={Math.round(size * 1.2 * 1.2)} height={Math.round(size * 1.2)} className="block shrink-0" />
      </span>
      <span data-mind-word={live ? "" : undefined} className="whitespace-nowrap font-extrabold leading-none tracking-[-0.03em]" style={{ fontSize: `min(${Math.round(size * 0.8)}px, 6vw)` }}>Forward</span>
    </span>
  );
}
