import type { Metadata } from "next";
import { Plans } from "@/components/academy/Plans";
import { AcademyFaq } from "@/components/academy/AcademyFaq";
import { NightCta } from "@/components/night/NightCta";

export const metadata: Metadata = {
  title: "Priser",
  description: "Enkeltkursus, medlemskab eller team. Priser ekskl. moms. Opsig når som helst.",
  alternates: { canonical: "/priser" },
};

export default function PricingPage() {
  return (
    <div className="theme-night -mt-[5.5rem] pt-[5.5rem]">
      <section className="pb-4 pt-16 md:pt-24">
        <div className="container-wide">
          <h1 className="font-display font-normal leading-[1.05] tracking-[-0.035em] text-heading" style={{ fontSize: "clamp(2.5rem, 1rem + 4vw, 4.5rem)" }}>
            Vi har en <span className="font-serif-accent italic">plan</span>,
            <br />
            der passer til <span className="font-serif-accent italic">dig</span>
          </h1>
        </div>
      </section>
      <Plans heading={false} />
      <AcademyFaq />
      <NightCta title="Tag det første kursus i dag" sub="Første lektion tager 10 minutter." primary={{ label: "Se kurserne", href: "/#kurser" }} secondary={{ label: "Skriv til os", href: "/kontakt" }} />
    </div>
  );
}
