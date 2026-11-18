import { Archivo, Geist } from "next/font/google";
import { LyseForside } from "@/components/lab/LyseForside";

// Archivo (with the width axis) takes the display role under the same variable the page already uses; Geist for body.
const display = Archivo({ subsets: ["latin", "latin-ext"], axes: ["wdth"], variable: "--font-bebas", display: "swap" });
const body = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-geist", display: "swap" });

export default function Page() {
  return (
    <div className={`${display.variable} ${body.variable}`}>
      <LyseForside />
    </div>
  );
}
