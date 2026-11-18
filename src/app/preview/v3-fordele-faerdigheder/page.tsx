// Preview: round 3 for Fordele and Færdigheder (Marco 2026-11-03, "3 versioner af alle sektioner").
// The current section ("Nu") first, then A, B, C. Same copy everywhere.
import { Bebas_Neue } from "next/font/google";
import { F } from "@/components/lab/Fordele";
import { N } from "@/components/lab/Faerdigheder";
import * as Fo from "@/components/lab/v3/Fordele";
import * as Fa from "@/components/lab/v3/Faerdigheder";

const bebas = Bebas_Neue({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-bebas", display: "swap" });

const groups = [
  {
    name: "Fordele (under heroen)",
    v: [
      { t: "Nu · F Høje fotokort", d: "Den nuværende sektion, til sammenligning.", n: <F /> },
      { t: "A · Tre produktkort", d: "Hver fordel vises som produktet selv: lektionsafspiller, scorekort med graf over seks forsøg, og certifikat V7 på fersken.", n: <Fo.A /> },
      { t: "B · Redaktionelle rækker", d: "Typografisk: stor Bebas-titel, teksten og et lille bevis til højre (minutring, søjler mod 86, certifikatet).", n: <Fo.B /> },
      { t: "C · Fortælling med fast liste", d: "Listen står fast til venstre, mens produktet skifter til højre, når man scroller. På mobil står de under hinanden.", n: <Fo.C /> },
    ],
  },
  {
    name: "Færdigheder",
    v: [
      { t: "Nu · N Karrusel", d: "Den nuværende sektion, til sammenligning.", n: <N /> },
      { t: "A · Prompt → resultat", d: "Mørk scene. Vælg en færdighed til venstre; app-vinduet viser prompten og resultatet. Skifter selv hvert 6. sekund.", n: <Fa.A /> },
      { t: "B · I morgen", d: "De fire færdigheder sat på morgendagens arbejdsdag som en tidslinje, med resultatet under hvert tidspunkt.", n: <Fa.B /> },
      { t: "C · Én person, fire resultater", d: "Den fritlagte kvinde på en fersken-scene med de fire resultater svævende omkring sig.", n: <Fa.C /> },
    ],
  },
];

export default function V3FordeleFaerdigheder() {
  return (
    <div className={`${bebas.variable} bg-[#d9d2cc]`}>
      {groups.map((g) => (
        <div key={g.name}>
          <h1 className="px-[3.5vw] pb-2 pt-14 text-[1.5rem] font-bold text-[#201613]">{g.name}</h1>
          {g.v.map((x) => (
            <div key={x.t} className="pb-10">
              <div className="px-[3.5vw] pb-3 pt-6"><p className="text-[1rem] font-semibold text-[#201613]">{x.t}</p><p className="text-[0.8125rem] text-[#5a4a44]">{x.d}</p></div>
              {x.n}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
