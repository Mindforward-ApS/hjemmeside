// The platform (the logged-in app). Every sign-in, sign-up and buy button on the website goes here.
// Live: https://app.mindforward.dk. Locally: NEXT_PUBLIC_APP_URL=http://localhost:3600 in .env.local.
export const APP_URL = (process.env.NEXT_PUBLIC_APP_URL ?? "https://app.mindforward.dk").replace(/\/$/, "");

const app = (path: string) => `${APP_URL}${path}`;
const signupThen = (next: string) => app(`/opret?next=${encodeURIComponent(next)}`);

export const appLinks = {
  login: app("/log-ind"),
  signup: app("/opret"),
  placementTest: app("/niveautest"),
  /** Privat: the app's sign-up + onboarding for private members (Marco 2026-11-11: /opret?type=privat). */
  buyPrivate: (_yearly = false) => app("/opret?type=privat"),
  /** Virksomhed: the app's sign-up + onboarding for companies (/opret?type=virksomhed). */
  startBusiness: app("/opret?type=virksomhed"),
  /** The pricing cards' ids on the website ("privat" | "virksomhed"). */
  forPlan: (id: string, yearly = false) => (id === "virksomhed" ? signupThen("/virksomhed/opret") : signupThen(yearly ? "/koeb?plan=aar" : "/koeb")),
};
