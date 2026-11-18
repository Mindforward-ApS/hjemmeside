// Preview: round 3 of "Øv på dine egne opgaver" and the photo band (Marco 2026-11-03). Current version first.
import Image from "next/image";
import { Bebas_Neue } from "next/font/google";
import { P as OevelseNu } from "@/components/lab/Oevelse";
import * as O from "@/components/lab/v3/Oevelse";
import * as F from "@/components/lab/v3/Fotobaand";

const bebas = Bebas_Neue({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-bebas", display: "swap" });
const display = "font-[family-name:var(--font-bebas)] uppercase leading-[0.92] tracking-[0.005em]";
const h2 = `${display} text-[clamp(2.75rem,1.9rem+2.6vw,4rem)]`;

// Copy of PhotoBand from NyForside (without the scroll motion), for comparison.
function FotoNu() {
  return (
    <section className="bg-white pb-24 lg:pb-32">
      <div className="w-full px-5 sm:px-[3.5vw]">
        <div className="relative h-[26rem] overflow-hidden rounded-[32px] sm:h-[34rem]">
          <Image src="/img/unsplash/feedback.jpg" alt="" fill sizes="100vw" className="object-cover object-[86%_30%] sm:object-[60%_30%]" />
          <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(32,22,19,0.82) 0%, rgba(32,22,19,0.45) 38%, transparent 65%), linear-gradient(0deg, rgba(32,22,19,0.55) 0%, transparent 45%)" }} />
          <div className="absolute inset-x-0 bottom-0 p-7 sm:p-12">
            <h2 className={`${h2} max-w-[11ch] !text-white`}>Ét hold. Ingen teori for teoriens skyld.</h2>
            <p className="mt-4 max-w-[26rem] text-[1rem] leading-relaxed text-white/75">Korte lektioner, opgaver fra jeres egen hverdag og feedback med det samme.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function V3OevelseFotobaand() {
  const groups = [
    { g: "Øv på dine egne opgaver", v: [
      { id: "oevelse-nu", t: "Nu", d: "Videoen alene ved siden af teksten.", n: <OevelseNu /> },
      { id: "oevelse-a", t: "A · Video + resultat", d: "Videoen stort til venstre; til højre et kort med scoren over fem forsøg (48 → 86) og et brunt feedbackkort.", n: <O.A /> },
      { id: "oevelse-b", t: "B · Trin følger videoen", d: "Tre trin til venstre (Opgaven, Du skriver prompten, Score og feedback) lyser op i takt med det, der sker på skærmen i videoen.", n: <O.B /> },
      { id: "oevelse-c", t: "C · Før og efter", d: "Mørk scene: videoen i midten, første forsøg (48) og forsøget efter feedback (86) hæftet på hjørnerne.", n: <O.C /> },
    ] },
    { g: "Ét hold. Ingen teori for teoriens skyld.", v: [
      { id: "foto-nu", t: "Nu", d: "Fotobåndet med whiteboard-billedet.", n: <FotoNu /> },
      { id: "foto-a", t: "A · Holdet på billedet", d: "Holdfotoet med overskriften på, og kortet 'Holdets top 3' fra heroen står på billedets kant.", n: <F.A /> },
      { id: "foto-b", t: "B · Holdets uge", d: "Intet foto. Ét bredt brunt kort: minutter pr. dag som søjler, hvem der er aktive, og ugens tal.", n: <F.B /> },
      { id: "foto-c", t: "C · Mosaik", d: "Overskrift på creme, derunder en mosaik: foto fra undervisningen, scorekurven og certifikatet V7.", n: <F.C /> },
    ] },
  ];
  return (
    <div className={`${bebas.variable} bg-[#d9d2cc]`}>
      {groups.map((g) => (
        <div key={g.g}>
          <p className="px-[3.5vw] pb-2 pt-12 text-[1.25rem] font-semibold text-[#201613]">{g.g}</p>
          {g.v.map((x) => (
            <div key={x.id} id={x.id} className="pb-10">
              <div className="px-[3.5vw] pb-3 pt-6"><p className="text-[1rem] font-semibold text-[#201613]">{x.t}</p><p className="text-[0.8125rem] text-[#5a4a44]">{x.d}</p></div>
              {x.n}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
