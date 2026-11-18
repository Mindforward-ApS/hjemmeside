import { WarmHero } from "@/components/night/WarmHero";
import { NightLogos } from "@/components/night/NightLogos";
import { Outcomes } from "@/components/academy/Outcomes";
import { Catalog } from "@/components/academy/Catalog";
import { Preview } from "@/components/academy/Preview";
import { HowItWorks } from "@/components/academy/HowItWorks";
import { Instructors } from "@/components/academy/Instructors";
import { Stories } from "@/components/academy/Stories";
import { Plans } from "@/components/academy/Plans";
import { AcademyFaq } from "@/components/academy/AcademyFaq";
import { StageCta } from "@/components/night/StageCta";

// Home for the course platform ("Fjord Akademi"), 13 sections in Marco's order:
// 1 header + 2 hero (WarmHero) · 3 logos · 4 outcomes · 5 catalog · 6 sample lesson · 7 how it works
// 8 why us + instructors · 9 learner stories · 10 plans · 11 FAQ · 12 final CTA (StageCta) · 13 footer (layout)
export default function Home() {
  return (
    <div className="theme-night">
      {/* Heading: laptops get two lines at a smaller size, big monitors (≥1600 px wide and ≥1060 px tall) get three lines at full size. */}
      <WarmHero
        person="touch"
        cert
        titleClass="text-[clamp(2.125rem,0.1rem+2.75vw,3.75rem)] [@media(min-width:1600px)_and_(min-height:1060px)]:text-[clamp(2.5rem,0.6rem+3.1vw,4.25rem)]"
        title={<>AI-kurser med<br /><span className="lg:whitespace-nowrap [@media(min-width:1600px)_and_(min-height:1060px)]:whitespace-normal">veludviklet<br className="hidden [@media(min-width:1600px)_and_(min-height:1060px)]:inline" /> øvemiljø.</span></>}
        eyebrow="Lær AI ved at bruge det"
        points={["Korte lektioner på dansk", "Opgaver i øvemiljøet med score", "Overblik for hele teamet"]}
      />
      <NightLogos />
      <Outcomes />
      <Catalog />
      <Preview />
      <HowItWorks />
      <Instructors />
      <Stories />
      <Plans />
      <AcademyFaq />
      <StageCta />
    </div>
  );
}
