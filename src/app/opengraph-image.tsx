import { ImageResponse } from "next/og";

// Share image in the waitlist's look (Marco 2026-11-19): dark brown, a coral glow, the logo and the headline.
export const alt = "Mindforward – AI-kurser på dansk. Forestil dig, hvad du kunne, hvis du begyndte at udnytte mulighederne.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, color: "#faf6f2",
        background: "radial-gradient(60% 80% at 15% 75%, rgba(232,102,74,0.75), transparent 70%), radial-gradient(55% 70% at 90% 90%, rgba(140,52,38,0.8), transparent 70%), #120c0a" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 40, fontWeight: 700 }}>
          <svg width="46" height="46" viewBox="0 0 256 256"><path fill="#e8664a" d="M248 124a56.11 56.11 0 0 0-32-50.61V72a48 48 0 0 0-88-26.49A48 48 0 0 0 40 72v1.39a56 56 0 0 0 0 101.2V176a48 48 0 0 0 88 26.49A48 48 0 0 0 216 176v-1.41A56.09 56.09 0 0 0 248 124Z" opacity=".35" /><path fill="#e8664a" d="M248 124a56.11 56.11 0 0 0-32-50.61V72a48 48 0 0 0-88-26.49A48 48 0 0 0 40 72v1.39a56 56 0 0 0 0 101.2V176a48 48 0 0 0 88 26.49A48 48 0 0 0 216 176v-1.41A56.09 56.09 0 0 0 248 124ZM88 208a32 32 0 0 1-31.81-28.56A55.87 55.87 0 0 0 64 180h8a8 8 0 0 0 0-16h-8a40 40 0 0 1-13.33-77.73A8 8 0 0 0 56 78.73V72a32 32 0 0 1 64 0v68.26A47.8 47.8 0 0 0 88 128a8 8 0 0 0 0 16a32 32 0 0 1 0 64Zm104-44h-8a8 8 0 0 0 0 16h8a55.87 55.87 0 0 0 7.81-.56A32 32 0 1 1 168 144a8 8 0 0 0 0-16a47.8 47.8 0 0 0-32 12.26V72a32 32 0 0 1 64 0v6.73a8 8 0 0 0 5.33 7.54A40 40 0 0 1 192 164Z" /></svg>
          Forward
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 22, letterSpacing: 5, textTransform: "uppercase", color: "rgba(250,246,242,0.65)" }}>AI ændrer måden, vi lever og arbejder på</div>
          <div style={{ fontSize: 68, fontWeight: 600, letterSpacing: -2.5, lineHeight: 1.05, maxWidth: 1000 }}>Forestil dig, hvad du kunne, hvis du begyndte at udnytte mulighederne.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 26, color: "rgba(250,246,242,0.8)" }}>
          <span>AI-kurser på dansk · ChatGPT, Copilot og Claude</span>
          <span style={{ background: "#0a0a0b", color: "#fff", padding: "14px 26px", borderRadius: 999, fontWeight: 600 }}>Åbner 1. december</span>
        </div>
      </div>
    ),
    size,
  );
}
