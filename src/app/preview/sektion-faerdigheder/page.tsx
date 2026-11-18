// Preview: three versions of the "Færdigheder" section (Marco 2026-11-03).
import { Bebas_Neue } from "next/font/google";
import { M, N, O } from "@/components/lab/Faerdigheder";

const bebas = Bebas_Neue({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-bebas", display: "swap" });

export default function SektionFaerdigheder() {
  const v = [
    { t: "M · Stor + tre små", d: "Som Mine kurser A3: én stor fotofærdighed med et rigtigt udkast ovenpå, tre mindre kort med hver deres mini-app.", n: <M /> },
    { t: "N · Karrusel", d: "Brede fotokort, man bladrer igennem med pile: Mails, Møder, Excel, Data. Hvert kort viser resultatet.", n: <N /> },
    { t: "O · Hvide UI-kort", d: "Som platformens dashboard: hvide kort i forskellige størrelser på creme, hvert med en lille rigtig app-visning.", n: <O /> },
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
