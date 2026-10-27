import type { Metadata } from "next";
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
import { NightCta } from "@/components/night/NightCta";
import { BrownBand } from "@/components/night/BrownBand";

export const metadata: Metadata = { title: "Preview: brune sektioner", robots: { index: false } };

// Temporary preview (delete after Marco's choice): the home page with three brown bands as rhythm.
export default function Page() {
  return (
    <div className="theme-night">
      <WarmHero />
      <NightLogos />
      <Outcomes />
      <Catalog />
      <BrownBand silk>
        <Preview />
      </BrownBand>
      <HowItWorks />
      <BrownBand>
        <Instructors />
      </BrownBand>
      <Stories />
      <Plans />
      <AcademyFaq />
      <BrownBand silk>
        <NightCta
          title="Tag det første kursus i dag"
          sub="Start med en lektion på 10 minutter. Det er gratis at se, hvordan det virker."
          primary={{ label: "Se kurserne", href: "/#kurser" }}
          secondary={{ label: "For virksomheder", href: "/priser" }}
        />
      </BrownBand>
    </div>
  );
}
