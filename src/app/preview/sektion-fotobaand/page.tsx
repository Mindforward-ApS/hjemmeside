// Preview: three versions of the photo band (Marco 2026-11-03).
import { Bebas_Neue } from "next/font/google";
import { J, K, L } from "@/components/lab/Fotobaand";

const bebas = Bebas_Neue({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-bebas", display: "swap" });

export default function SektionFotobaand() {
  const v = [
    { t: "J · Kant til kant", d: "Fotoet går i hele bredden med en kæmpe overskrift henover.", n: <J /> },
    { t: "K · Delt", d: "Overskrift på creme til venstre, højt foto af holdet til højre med et lille '12 kolleger'-mærke.", n: <K /> },
    { t: "L · Tre fotos", d: "Overskrift over en række med tre fotos fra en arbejdsdag, hver med et kort mærke.", n: <L /> },
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
