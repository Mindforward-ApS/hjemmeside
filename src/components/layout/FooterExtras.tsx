// Footer extras (Marco 2026-11-24): the payment methods as a slow carousel in the middle of the bottom bar, and the
// two app-store badges under the social icons. Logos from Simple Icons (CC0) and Wikimedia (MobilePay), all drawn in
// one colour through a mask so they sit quietly on the brown footer.
const pay = [
  ["MobilePay", "/pay/mobilepay.svg", 104, 30],
  ["Visa", "/pay/visa.svg", 52, 28],
  ["Mastercard", "/pay/mastercard.svg", 44, 30],
  ["Apple Pay", "/pay/applepay.svg", 52, 34],
  ["Google Pay", "/pay/googlepay.svg", 56, 34],
] as const;

function Mark({ src, w, h = 22 }: { src: string; w: number; h?: number }) {
  return <span aria-hidden className="block shrink-0 bg-current" style={{ width: w, height: h, maskImage: `url(${src})`, WebkitMaskImage: `url(${src})`, maskSize: "contain", WebkitMaskSize: "contain", maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat", maskPosition: "center", WebkitMaskPosition: "center" }} />;
}

export function PaymentCarousel() {
  return (
    <div className="pay-row w-full max-w-[420px] overflow-hidden md:mx-auto" aria-label="Betal med MobilePay, Visa, Mastercard, Apple Pay og Google Pay" role="img"
      style={{ maskImage: "linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent)" }}>
      <div className="pay-track flex w-max items-center">
        {[0, 1].map((half) => (
          <ul key={half} aria-hidden className="flex shrink-0 items-center gap-3 pr-3">
            {pay.map(([n, src, w, h]) => (
              <li key={n} className="grid h-11 place-items-center rounded-[10px] px-3.5 ring-1 ring-white/15" style={{ background: "rgba(255,255,255,0.06)", color: "#fff" }}>
                <Mark src={src} w={w} h={h} />
              </li>
            ))}
          </ul>
        ))}
      </div>
      <style>{`
        .pay-track { animation: pay-run 28s linear infinite; }
        .pay-row:hover .pay-track { animation-play-state: paused; }
        @keyframes pay-run { to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .pay-track { animation: none; } }
      `}</style>
    </div>
  );
}

export function AppBadges({ ios, android }: { ios?: string; android?: string }) {
  const badge = "flex h-12 items-center gap-2.5 rounded-[12px] bg-black px-3.5 text-white ring-1 ring-white/25 transition-colors hover:ring-white/50";
  const inner = (logo: string, w: number, small: string, big: string) => (
    <>
      <Mark src={logo} w={w} h={w} />
      <span className="leading-none">
        <span className="block text-[0.625rem] text-white/75">{small}</span>
        <span className="mt-0.5 block text-[1rem] font-semibold tracking-[-0.01em]">{big}</span>
      </span>
    </>
  );
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {ios ? <a href={ios} target="_blank" rel="noopener noreferrer" className={badge}>{inner("/pay/apple.svg", 22, "Hent i", "App Store")}</a>
        : <span className={badge}>{inner("/pay/apple.svg", 22, "Hent i", "App Store")}</span>}
      {android ? <a href={android} target="_blank" rel="noopener noreferrer" className={badge}>{inner("/pay/googleplay.svg", 20, "Hent den i", "Google Play")}</a>
        : <span className={badge}>{inner("/pay/googleplay.svg", 20, "Hent den i", "Google Play")}</span>}
    </div>
  );
}
