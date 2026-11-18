// Preview: three new versions each of Certifikat and Citater (Marco 2026-11-03, "3 versioner af alle sektioner").
// The current sections are shown first as "Nu" for comparison.
import { Bebas_Neue } from "next/font/google";
import { NuCertifikat, NuCitater } from "./Nu";
import * as Cert from "@/components/lab/v3/Certifikat";
import * as Cit from "@/components/lab/v3/Citater";

const bebas = Bebas_Neue({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-bebas", display: "swap" });

export default function V3CertifikatCitater() {
  const groups = [
    {
      h: "Certifikat",
      v: [
        { t: "Nu", d: "Den nuværende sektion, til sammenligning.", n: <NuCertifikat /> },
        { t: "A · Papir på bordet", d: "Det rigtige certifikat ligger i perspektiv på et varmt bord med skygge; et lille kort siger, at det er ægte.", n: <Cert.A /> },
        { t: "B · Bevis-kittet", d: "Certifikatet stort i en brun flise; rundt om: LinkedIn-opslaget, QR/ID-tjek og scoren uge for uge.", n: <Cert.B /> },
        { t: "C · I ramme", d: "Certifikatet i en mørk ramme på en sandfarvet væg; ved siden af punkterne og et live opslag af ID'et.", n: <Cert.C /> },
      ],
    },
    {
      h: "Citater",
      v: [
        { t: "Nu", d: "Den nuværende sektion, til sammenligning.", n: <NuCitater /> },
        { t: "A · Video + resultatkort", d: "Eksempelvideoen stort (afspilles med lyd og undertekster ved klik), de tre citater som kort med før/efter-bjælker.", n: <Cit.A /> },
        { t: "B · Resultatet først", d: "Tre mørke kort, der åbner med tallet der ændrede sig (−73 %, −56 %, +12) og en lille graf, derefter citatet.", n: <Cit.B /> },
        { t: "C · Vælg en person", d: "Personer som faner til venstre; ét stort hvidt kort med citatet og en kurve fra før til nu.", n: <Cit.C /> },
      ],
    },
  ];
  return (
    <div className={`${bebas.variable} bg-[#d9d2cc]`}>
      {groups.map((g) => (
        <div key={g.h}>
          <h1 className="px-[3.5vw] pt-12 text-[1.5rem] font-semibold text-[#201613]">{g.h}</h1>
          {g.v.map((x) => (
            <div key={x.t} className="pb-10">
              <div className="px-[3.5vw] pb-3 pt-8"><p className="text-[1rem] font-semibold text-[#201613]">{x.t}</p><p className="text-[0.8125rem] text-[#5a4a44]">{x.d}</p></div>
              {x.n}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
