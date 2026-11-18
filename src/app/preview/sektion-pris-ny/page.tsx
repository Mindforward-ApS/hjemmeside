import { Bebas_Neue } from "next/font/google";
import { PrisPreview } from "@/components/lab/PrisPreview";

const bebas = Bebas_Neue({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-bebas", display: "swap" });

export default function Page() {
  return (
    <div className={bebas.variable}>
      <PrisPreview />
    </div>
  );
}
