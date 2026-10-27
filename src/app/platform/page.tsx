import type { Metadata } from "next";
import { NightPageHero } from "@/components/night/NightPageHero";
import { NightFeature } from "@/components/night/NightFeature";
import { NightSteps } from "@/components/night/NightSteps";
import { NightChannels } from "@/components/night/NightChannels";
import { NightUseCases } from "@/components/night/NightUseCases";
import { NightFaq } from "@/components/night/NightFaq";
import { NightCta } from "@/components/night/NightCta";
import { ProductScreen } from "@/components/product/ProductScreen";

export const metadata: Metadata = {
  title: "Platform",
  description: "Saml henvendelser, svar hurtigt, send tilbud og bevar overblikket. Sådan virker Fjord.",
  alternates: { canonical: "/platform" },
};

export default function PlatformPage() {
  return (
    <div className="theme-night -mt-[5.5rem] pt-[5.5rem]">
      <NightPageHero label="Platform" title="Alt fra første mail til sendt tilbud" sub="Fjord er én skærm til hele forløbet. Ingen ekstra programmer, ingen regneark ved siden af.">
        <div className="relative">
          <div aria-hidden className="n-glow left-[10%] top-[5%] h-72 w-[80%]" />
          <div className="n-glass relative rounded-[1.75rem] p-3 sm:p-4"><ProductScreen stage={2} /></div>
        </div>
      </NightPageHero>
      <NightSteps />
      <NightFeature />
      <NightChannels />
      <NightUseCases />
      <NightFaq />
      <NightCta />
    </div>
  );
}
