import { Bebas_Neue } from "next/font/google";
import { HeroEditor } from "@/components/lab/HeroEditor";

const bebas = Bebas_Neue({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-bebas", display: "swap" });

export default function EditorPage() {
  return (
    <div className={bebas.variable}>
      <HeroEditor />
    </div>
  );
}
