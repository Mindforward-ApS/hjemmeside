// All section versions on one page (Marco 2026-11-03: "3 versioner af alle sektioner undtaget heroen"). Pick per section.
import FordeleFaerdigheder from "../v3-fordele-faerdigheder/page";
import OevelseFotobaand from "../v3-oevelse-fotobaand/page";
import CertifikatCitater from "../v3-certifikat-citater/page";
import TalCta from "../v3-tal-cta/page";

const nav = [["#ff", "Fordele · Færdigheder"], ["#of", "Øvelse · Fotobånd"], ["#cc", "Certifikat · Citater"], ["#tc", "Tal · CTA"]];

export default function V3Alle() {
  return (
    <div className="bg-[#d9d2cc]">
      <nav className="sticky top-0 z-50 flex flex-wrap gap-2 bg-[#201613] px-[3.5vw] py-3 text-[0.8125rem]">
        {nav.map(([h, t]) => <a key={h} href={h} className="rounded-full bg-white/10 px-3 py-1.5 text-white hover:bg-white/20">{t}</a>)}
      </nav>
      <div id="ff" className="scroll-mt-14"><FordeleFaerdigheder /></div>
      <div id="of" className="scroll-mt-14"><OevelseFotobaand /></div>
      <div id="cc" className="scroll-mt-14"><CertifikatCitater /></div>
      <div id="tc" className="scroll-mt-14"><TalCta /></div>
    </div>
  );
}
