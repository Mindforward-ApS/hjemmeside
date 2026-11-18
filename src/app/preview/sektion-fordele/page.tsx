// Preview: three versions of the feature strip under the hero (Marco 2026-11-03, "næste sektion").
// Same copy as now; only the design changes. The current strip is shown first for comparison.
import { Bebas_Neue } from "next/font/google";
import { Icon } from "@/components/ui/Icon";
import { D, E, F } from "@/components/lab/Fordele";

const bebas = Bebas_Neue({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-bebas", display: "swap" });
const c = { dark: "#201613", ink: "#201613", muted: "#5a4a44", coral: "#e8664a", sand: "#efe7e1", cream: "#f7f2ee", peach: "#f6c9b6" };
const wrap = "w-full px-5 sm:px-[3.5vw]";

const items: { icon: Parameters<typeof Icon>[0]["name"]; t: string; d: string }[] = [
  { icon: "clock", t: "Korte lektioner", d: "Video og tekst på dansk, cirka 10 minutter ad gangen. Du bestemmer selv tempoet." },
  { icon: "sparkle", t: "Øvemiljø med score", d: "Hver lektion slutter med en opgave fra din hverdag, og du får en score med det samme." },
  { icon: "doc", t: "Kursusbevis", d: "Med dit navn og et unikt ID. Sæt det på LinkedIn, eller send det til chefen." },
];

function Nu() {
  return (
    <section style={{ background: c.sand }}>
      <div className={`${wrap} grid divide-y divide-[rgba(32,22,19,0.1)] py-4 md:grid-cols-3 md:divide-x md:divide-y-0 md:py-12`}>
        {items.map((it) => (
          <div key={it.t} className="grid content-start justify-items-center gap-3 px-6 py-8 text-center md:py-0">
            <span className="grid size-12 place-items-center rounded-[14px] text-white shadow-[inset_0_-2px_0_#e8664a]" style={{ background: c.dark }}><Icon name={it.icon} size={20} /></span>
            <h3 className="text-[1.375rem] font-semibold tracking-[-0.01em]" style={{ color: c.ink }}>{it.t}</h3>
            <p className="max-w-[18rem] text-[0.9375rem] leading-relaxed" style={{ color: c.muted }}>{it.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}




export default function SektionFordele() {
  const v = [
    { t: "Nu", d: "Den nuværende stribe, til sammenligning.", n: <Nu /> },
    { t: "D · Faner med stort produkt", d: "Tre fordele til venstre. Til højre et stort udsnit af produktet, der skifter: lektionsafspiller, opgave med score, kursusbevis. Skifter selv, eller man klikker.", n: <D /> },
    { t: "E · Bento på scenen", d: "Toppens mørke scene fortsætter som en bento: stort foto med 'Korte lektioner', score-felt med 86 og fersken-felt med et bevis.", n: <E /> },
    { t: "F · Høje fotokort", d: "Tre høje fotokort som Mine kurser, med stor overskrift og et lille produktmærke på hvert.", n: <F /> },
  ];

  return (
    <div className={`${bebas.variable} bg-[#d9d2cc]`}>
      {v.map((x) => (
        <div key={x.t} className="pb-10">
          <div className="px-[3.5vw] pb-3 pt-8"><p className="text-[1rem] font-semibold text-[#201613]">{x.t}</p><p className="text-[0.8125rem] text-[#5a4a44]">{x.d}</p></div>
          {x.n}
        </div>
      ))}
    </div>
  );
}
