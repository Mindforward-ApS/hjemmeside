// The platform (the logged-in app). Every sign-in, sign-up and buy button on the website goes here.
// Live: https://app.mindforward.dk. Locally: NEXT_PUBLIC_APP_URL=http://localhost:3600 in .env.local.
export const APP_URL = (process.env.NEXT_PUBLIC_APP_URL ?? "https://app.mindforward.dk").replace(/\/$/, "");

const app = (path: string) => `${APP_URL}${path}`;
const signupThen = (next: string) => app(`/opret?next=${encodeURIComponent(next)}`);

export const appLinks = {
  login: app("/log-ind"),
  signup: app("/opret"),
  placementTest: app("/niveautest"),
  /** Privat: sign up, then straight to checkout (monthly, or yearly with 2 months free). */
  buyPrivate: (yearly = false) => signupThen(yearly ? "/koeb?plan=aar" : "/koeb"),
  /** Virksomhed: sign up, then create the company (14-day trial, min. 5 users). */
  startBusiness: signupThen("/virksomhed/opret"),
  /** The pricing cards' ids on the website ("privat" | "virksomhed"). */
  forPlan: (id: string, yearly = false) => (id === "virksomhed" ? signupThen("/virksomhed/opret") : signupThen(yearly ? "/koeb?plan=aar" : "/koeb")),
};
