// "Data i EU" badge (Marco 2026-11-24: keep the old badge, just nicer). The dark tile in the logo-gradient frame, now
// with faint white dots over the whole tile, "Frankfurt" as the big word, a top gloss and the buttons' depth.

// A 10 px grid; the radius grows from 0.5 in the middle to 2.1 at the corners (halftone towards the edge).
const dots = Array.from({ length: 16 * 16 }, (_, k) => {
  const x = 5 + (k % 16) * 10, y = 5 + Math.floor(k / 16) * 10;
  const t = Math.min(1, Math.hypot(x - 80, y - 80) / 105);
  return { x, y, r: +(0.5 + t * t * 1.6).toFixed(2) };
});

export function EuBadge() {
  return (
    // Marco 2026-11-24: more 3D (raised tile: light top rim, inner shade at the bottom, layered drop shadow) and the
    // orange frame runs round (a conic gradient whose angle turns, like the price card and the buttons' hover glow).
    <div className="eu-frame relative rounded-[26px] p-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.25),0_4px_8px_-2px_rgba(32,22,19,0.3),0_14px_24px_-10px_rgba(248,64,10,0.5),0_34px_50px_-24px_rgba(32,22,19,0.6)]">
      <div className="relative grid size-[160px] place-items-center overflow-hidden rounded-[23px]" style={{ background: "radial-gradient(110% 80% at 50% -5%, #4a332a 0%, #2a1c17 40%, #1a110e 72%, #0d0807 100%)", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.26), inset 0 0 0 1px rgba(255,255,255,0.06), inset 3px 0 6px -3px rgba(255,255,255,0.08), inset -3px 0 6px -3px rgba(0,0,0,0.5), inset 0 -18px 28px rgba(0,0,0,0.6), inset 0 12px 20px -10px rgba(255,255,255,0.1)" }}>
        {/* gloss */}
        <span aria-hidden className="pointer-events-none absolute -inset-x-6 -top-[55%] h-[95%] rounded-[50%]" style={{ background: "radial-gradient(closest-side, rgba(255,255,255,0.11), rgba(255,255,255,0.03) 70%, transparent)" }} />
        <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3" style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.35), transparent)" }} />
        {/* Marco 2026-11-24: faint white dots over the whole brown tile, standing still, growing towards the edges. */}
        <svg viewBox="0 0 160 160" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
          {dots.map((d, k) => <circle key={k} cx={d.x} cy={d.y} r={d.r} fill="#fff" fillOpacity="0.22" />)}
        </svg>
        <div className="relative text-center">
          <p className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-white/55">Hostet i EU</p>
          <p className="mt-1 text-[1.375rem] font-semibold leading-none tracking-[-0.02em] text-white [text-shadow:0_1px_0_rgba(0,0,0,0.6),0_6px_14px_rgba(0,0,0,0.5)]">Frankfurt</p>
          <p className="mt-1.5 text-[0.6875rem] tabular-nums text-white/45">eu-central-1</p>
        </div>
      </div>
      <style>{`
        @property --eu-a { syntax: "<angle>"; inherits: false; initial-value: 0deg; }
        .eu-frame { background: conic-gradient(from var(--eu-a), #f8400a, #fb970a 25%, #ffd86b 38%, #fb970a 50%, #f8400a 75%, #f8400a); animation: eu-run 6s linear infinite; }
        @keyframes eu-run { to { --eu-a: 360deg; } }
        @media (prefers-reduced-motion: reduce) { .eu-frame { animation: none; } }
      `}</style>
    </div>
  );
}
