"use client";

// Video testimonials right after the hero (Marco 2026-11-14): a dark section with the heading on the left and a short
// text on the right, then a slow row of tall video cards that pauses on hover. No videos yet, so every card is a
// marked placeholder; no names, companies or logos until real test users have said yes.
const cards = Array.from({ length: 10 }, (_, k) => `Testbruger ${k + 1}`);

function Card({ name }: { name: string }) {
  return (
    <li className="relative aspect-[501/826] w-[260px] flex-none overflow-hidden rounded-[24px] lg:w-[min(20vw,400px)]" style={{ background: "#2c1f1b" }}>
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[42%]" style={{ background: "linear-gradient(180deg, transparent, rgba(31,22,17,0.4) 35%, #2c1f1b 85%)" }} />
      <button type="button" disabled aria-label={`Video med ${name} kommer snart`} className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white lg:size-[70px]">
        <svg viewBox="0 0 24 24" aria-hidden className="ml-1 size-6 fill-[#201613] lg:size-[30px]"><path d="M8 5.5v13l11-6.5z" /></svg>
      </button>
      <div className="absolute bottom-6 left-[22px] right-5 text-white lg:bottom-9 lg:left-[42px]">
        <b className="block text-[1.25rem] font-semibold tracking-[-0.01em] lg:text-[1.75rem]">{name}</b>
        <span className="mt-2.5 block text-[0.875rem] text-white/85 lg:text-[1.25rem]">Video kommer snart</span>
      </div>
    </li>
  );
}

export function Udtalelser() {
  return (
    <section aria-labelledby="udtalelser-title" className="overflow-hidden py-20 text-white lg:py-14" style={{ background: "#201613" }}>
      <div className="mx-auto grid w-full max-w-[1216px] items-center gap-10 px-5 lg:grid-cols-2 lg:px-0 lg:pl-[8%]">
        <h2 id="udtalelser-title" className="text-[2.125rem] font-medium leading-[1.08] tracking-[-0.02em] lg:text-[3.25rem]" style={{ color: "#fff" }}>Det siger<br />vores testbrugere</h2>
        <p className="max-w-[460px] text-[1.0625rem] leading-[26px] text-white/65">Vi tester Mindforward med rigtige hold. Her kommer deres egne ord på video.</p>
      </div>
      <div data-mind="peek" className="ud-row mt-[72px] overflow-hidden lg:mt-10">
        <ul className="ud-track flex w-max gap-[22px] lg:gap-7">
          {[...cards, ...cards].map((n, k) => <Card key={k} name={n} />)}
        </ul>
      </div>
      <style>{`
        .ud-track { padding-left: max(20px, calc((100vw - 1216px) / 2)); animation: ud-marquee 70s linear infinite; }
        .ud-row:hover .ud-track, .ud-row:focus-within .ud-track { animation-play-state: paused; }
        @keyframes ud-marquee { to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .ud-track { animation: none; } .ud-row { overflow-x: auto; } }
      `}</style>
    </section>
  );
}
