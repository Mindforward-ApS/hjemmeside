// v4: the sections under the hero, translated 1:1 from the MoneyHub reference (Marco 2026-11-03).
import { Bebas_Neue } from "next/font/google";
import { N as Faerdigheder } from "@/components/lab/Faerdigheder";
import { Bento, Oevelse, Certifikat, Citater, Tal, Cta } from "@/components/lab/v4/Sektioner";

const bebas = Bebas_Neue({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-bebas", display: "swap" });

export default function V4() {
  return (
    <div className={`${bebas.variable} bg-white`}>
      <Bento />
      <Faerdigheder />
      <Oevelse />
      <Certifikat />
      <Citater />
      <Tal />
      <Cta />
    </div>
  );
}
