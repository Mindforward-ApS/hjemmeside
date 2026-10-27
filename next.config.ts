import type { NextConfig } from "next";

// The platform (sign-in, sign-up, checkout). Same value as src/lib/app.ts.
const APP_URL = (process.env.NEXT_PUBLIC_APP_URL ?? "https://app.mindforward.dk").replace(/\/$/, "");

const nextConfig: NextConfig = {
  // The website has no accounts of its own: old sign-up/sign-in addresses go to the platform.
  async redirects() {
    return [
      { source: "/tilmeld", destination: `${APP_URL}/opret`, permanent: false },
      { source: "/login", destination: `${APP_URL}/log-ind`, permanent: false },
      { source: "/log-ind", destination: `${APP_URL}/log-ind`, permanent: false },
    ];
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
