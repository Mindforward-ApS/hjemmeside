// "Data i EU" badge (Marco 2026-11-24: keep the old badge, just nicer). The dark tile in the logo-gradient frame, now
// with faint white dots over the whole tile, "Frankfurt" as the big word, a top gloss and the buttons' depth.
const grad = "linear-gradient(135deg, #ffc53d, #fb970a 35%, #f8400a)";

// A 10 px grid; the radius grows from 0.5 in the middle to 2.1 at the corners (halftone towards the edge).
const dots = Array.from({ length: 16 * 16 }, (_, k) => {
  const x = 5 + (k % 16) * 10, y = 5 + Math.floor(k / 16) * 10;
  const t = Math.min(1, Math.hypot(x - 80, y - 80) / 105);
  return { x, y, r: +(0.5 + t * t * 1.6).toFixed(2) };
});

export function EuBadge() {
  return (
    <div className="rounded-[26px] p-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.2),0_10px_20px_-8px_rgba(248,64,10,0.45),0_28px_40px_-20px_rgba(32,22,19,0.5)]" style={{ background: grad }}>
      <div className="relative grid size-[160px] place-items-center overflow-hidden rounded-[23px]" style={{ background: "radial-gradient(120% 90% at 50% 0%, #3a2822 0%, #201613 55%, #160f0d 100%)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -10px 20px rgba(0,0,0,0.35)" }}>
        {/* gloss */}
        <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.08), transparent)" }} />
        {/* Marco 2026-11-24: faint white dots over the whole brown tile, standing still, growing towards the edges. */}
        <svg viewBox="0 0 160 160" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
          {dots.map((d, k) => <circle key={k} cx={d.x} cy={d.y} r={d.r} fill="#fff" fillOpacity="0.22" />)}
        </svg>
        <div className="relative text-center">
          <p className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-white/55">Hostet i EU</p>
          <p className="mt-1 text-[1.375rem] font-semibold leading-none tracking-[-0.02em] text-white">Frankfurt</p>
          <p className="mt-1.5 text-[0.6875rem] tabular-nums text-white/45">eu-central-1</p>
        </div>
      </div>
    </div>
  );
}
