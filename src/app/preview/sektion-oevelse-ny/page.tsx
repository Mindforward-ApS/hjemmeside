import { Bebas_Neue } from "next/font/google";
import { OevelsePreview } from "@/components/lab/OevelsePreview";

const bebas = Bebas_Neue({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-bebas", display: "swap" });

export default function Page() {
  return (
    <div className={bebas.variable}>
      <OevelsePreview />
    </div>
  );
}
