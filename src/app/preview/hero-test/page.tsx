import { HeroTest } from "@/components/lab/HeroTest";
import { NightLogos } from "@/components/night/NightLogos";
import { Outcomes } from "@/components/academy/Outcomes";

// Hero test: A / B / C with a switcher at the bottom. The rest of the page below is the live home, for context.
export default function HeroTestPage() {
  return <HeroTest below={<><NightLogos /><Outcomes /></>} />;
}
