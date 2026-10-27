import type { Metadata } from "next";
import { WarmHero } from "@/components/night/WarmHero";

export const metadata: Metadata = { title: "Editor: flyt AI-ikonerne", robots: { index: false } };

// Temporary editor (delete when done): Marco drags the AI tiles; saved to design/tile-positions.json.
export default function Page() {
  return (
    <div className="theme-night">
      <WarmHero tiles="edit" />
    </div>
  );
}
