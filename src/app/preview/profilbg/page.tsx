import type { Metadata } from "next";
import { SilkWave } from "@/components/night/SilkWave";

export const metadata: Metadata = { title: "Profil-baggrund", robots: { index: false } };

// Square brown background for Marco's LinkedIn profile photo (to place a cut-out portrait on in Canva). Same stage as
// the site and cover; the light is centred where a head sits.
const stage =
  "radial-gradient(60% 55% at 50% 38%, #4a3430 0%, #2e1f1c 45%, transparent 85%), linear-gradient(180deg, #1f120f 0%, #1c100d 55%, #201613 100%)";

export default async function Page({ searchParams }: { searchParams: Promise<{ wave?: string }> }) {
  const wave = (await searchParams).wave !== "0";
  return (
    <div className="grid min-h-svh place-items-center bg-neutral-800 p-8">
      <div id="sq" className="relative overflow-hidden" style={{ width: 800, height: 800, background: stage }}>
        {wave && <div className="absolute inset-0 opacity-70"><SilkWave /></div>}
        <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(90% 90% at 50% 40%, transparent 55%, rgba(19,6,1,0.55) 100%)" }} />
        <div aria-hidden className="absolute left-1/2 top-[38%] size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,oklch(0.68_0.1_50/0.35),transparent)] blur-2xl" />
      </div>
    </div>
  );
}
