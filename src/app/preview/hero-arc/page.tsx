import type { Metadata } from "next";
import { WarmHero } from "@/components/night/WarmHero";

export const metadata: Metadata = { title: "Preview: AI-ikoner i halvcirkel", robots: { index: false } };

// Temporary preview (delete after Marco's choice): AI tiles on a half circle, lines while she waves.
export default function Page() {
  return (
    <div className="theme-night">
      <WarmHero tiles="arc" />
    </div>
  );
}
