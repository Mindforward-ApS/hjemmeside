import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} – ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, background: "#f4f2ee", color: "#141a33" }}>
        <div style={{ fontSize: 36, fontWeight: 700, display: "flex" }}>{site.name}</div>
        <div style={{ fontSize: 80, fontWeight: 700, letterSpacing: -3, lineHeight: 1.02, maxWidth: 960, display: "flex" }}>{site.tagline}</div>
        <div style={{ height: 12, width: 160, borderRadius: 6, background: "#3d5bd8", display: "flex" }} />
      </div>
    ),
    size,
  );
}
