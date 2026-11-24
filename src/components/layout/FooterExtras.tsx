// Footer extras (Marco 2026-11-24): the payment methods as a carousel in the middle of the bottom bar, and the two
// official app-store badges under "Kontakt os". Official colour logos from Wikimedia Commons, on white chips like
// the payment badges at a checkout.
const pay = [
  ["MobilePay", "/pay/mobilepay.svg", 78],
  ["Visa", "/pay/visa-c.svg", 46],
  ["Mastercard", "/pay/mastercard-c.svg", 34],
  ["Apple Pay", "/pay/applepay-c.svg", 46],
  ["Google Pay", "/pay/googlepay-c.svg", 50],
] as const;

export function PaymentCarousel() {
  return (
    <div className="pay-row w-full overflow-hidden md:max-w-[640px] md:flex-[2]" aria-label="Betal med MobilePay, Visa, Mastercard, Apple Pay og Google Pay" role="img"
      style={{ maskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)" }}>
      <div className="pay-track flex w-max items-center">
        {[0, 1, 2].map((part) => (
          <ul key={part} aria-hidden className="flex shrink-0 items-center gap-3 pr-3">
            {pay.map(([n, src, w]) => (
              <li key={n} className="grid h-11 w-[92px] place-items-center">
                {/* No frame (Marco 2026-11-24). On the brown footer the dark logos are drawn white; Mastercard keeps its colours. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" width={w} height={24} className="h-auto max-h-[28px] object-contain" style={{ width: w, filter: n === "Mastercard" ? undefined : "brightness(0) invert(1)", opacity: 0.9 }} />
              </li>
            ))}
          </ul>
        ))}
      </div>
      <style>{`
        .pay-track { animation: pay-run 36s linear infinite; }
        .pay-row:hover .pay-track { animation-play-state: paused; }
        @keyframes pay-run { to { transform: translateX(-33.333%); } }
        @media (prefers-reduced-motion: reduce) { .pay-track { animation: none; } }
      `}</style>
    </div>
  );
}

// The official store badges (Apple / Google artwork). Clickable once the store links are set in site.ts.
export function AppBadges({ ios, android }: { ios?: string; android?: string }) {
  const img = (src: string, alt: string) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={135} height={40} className="h-9 w-auto" />
  );
  const wrap = (href: string | undefined, child: React.ReactNode, k: string) =>
    href ? <a key={k} href={href} target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-85">{child}</a> : <span key={k}>{child}</span>;
  return (
    <div className="mt-6 flex gap-2.5">
      {wrap(ios, img("/pay/appstore-badge.svg", "Hent i App Store"), "ios")}
      {wrap(android, img("/pay/googleplay-badge.svg", "Nu på Google Play"), "android")}
    </div>
  );
}
