import { Bebas_Neue } from "next/font/google";
import { PersonKortPreview } from "@/components/lab/PersonKort";

const bebas = Bebas_Neue({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-bebas", display: "swap" });

export default function PersonKortPage() {
  return <div className={bebas.variable}><PersonKortPreview /></div>;
}
