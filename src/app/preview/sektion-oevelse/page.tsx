// Preview: three versions of "Øv på dine egne opgaver" (Marco 2026-11-03). No photos.
import { Bebas_Neue } from "next/font/google";
import { P, Q, R } from "@/components/lab/Oevelse";

const bebas = Bebas_Neue({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-bebas", display: "swap" });

export default function SektionOevelse() {
  const v = [
    { t: "P · Øvemiljøet live", d: "Et stort app-vindue: prompten skriver sig selv, svaret kommer, og scoren lander med feedback.", n: <P /> },
    { t: "Q · Tre trin", d: "Opgaven → din prompt → feedback som tre hvide kort på række med pile imellem.", n: <Q /> },
    { t: "R · Før og efter prompten", d: "Mørk baggrund: samme opgave med en svag prompt (34) og en stærk prompt (86) side om side.", n: <R /> },
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
