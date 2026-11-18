// Preview: three versions of the team section at the bottom (Marco 2026-11-03, after his "Meet Our Team" reference).
import { Bebas_Neue } from "next/font/google";
import { A, B, C } from "@/components/lab/Team";

const bebas = Bebas_Neue({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-bebas", display: "swap" });

export default function SektionTeam() {
  const v = [
    { t: "A · Som referencen (målt)", d: "Lille overskrift tæt over hovederne, store fritlagte personer i varme piller, båndet fra pillernes midte og ned med prikkerne i, skrå koral-ellipse om det midterste kort. Tre ad gangen; prikkerne skifter.", n: <A /> },
    { t: "B · Mørk scene", d: "Samme idé på en mørk flade med fire personer; navne i hvidt.", n: <B /> },
    { t: "C · Lys og rolig", d: "Cremebaggrund, lyse piller uden skygge, navn og LinkedIn under hvert kort.", n: <C /> },
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
