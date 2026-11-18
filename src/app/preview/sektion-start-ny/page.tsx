import { Bebas_Neue } from "next/font/google";
import { NyForside } from "@/components/lab/NyForside";

const bebas = Bebas_Neue({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-bebas", display: "swap" });

// Front page with the video section (version 8) the new "Kom i gang" cards the Færdigheder slider and the new Øv section, 2026-11-10. "/" is unchanged.
export default function Page() {
  return (
    <div className={bebas.variable}>
      <NyForside video="h" start="kort" skills="cases" oev="kort" cert={false} />
    </div>
  );
}
