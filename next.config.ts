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
      // Pages still written for the template product are off until rewritten for Mindforward (Marco 2026-10-30, option A).
      // Legal texts live on the platform, which has the finished versions.
      { source: "/privatliv", destination: `${APP_URL}/privatliv`, permanent: false },
      { source: "/vilkaar", destination: `${APP_URL}/handelsbetingelser`, permanent: false },
      { source: "/cookies", destination: `${APP_URL}/cookies`, permanent: false },
      ...["/sikkerhed", "/platform", "/kunder", "/kunder/:path*", "/om-os", "/blog", "/blog/:path*", "/kurser/:path*", "/loesninger/:path*"].map((source) => ({ source, destination: "/", permanent: false })),
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
