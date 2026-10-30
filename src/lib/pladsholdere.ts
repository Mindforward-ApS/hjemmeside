// Placeholder proof (made-up reviews, logos, quotes, cases, figures, instructors) never reaches mindforward.dk.
// It shows in development, and in production only with NEXT_PUBLIC_VIS_PLADSHOLDERE=1 (Marco 2026-10-30).
export const VIS_PLADSHOLDERE =
  process.env.NEXT_PUBLIC_VIS_PLADSHOLDERE === "1" || process.env.NODE_ENV !== "production";
