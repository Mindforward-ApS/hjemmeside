import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { AlertBanner } from "@/components/layout/AlertBanner";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { SplitHeadings } from "@/components/motion/SplitHeadings";
import { SpotlightTracker } from "@/components/motion/SpotlightTracker";

// Marco 2026-10-22: Inter, one family for display and text ("powerful and familiar"). Full æ ø å.
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

// Italic accent words in headlines (pricing page reference). Second and last family.
const serif = Instrument_Serif({ subsets: ["latin", "latin-ext"], weight: "400", style: ["italic"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} – ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: { siteName: site.name, locale: "da_DK", type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#1b1a17",
  viewportFit: "cover",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", name: site.company.legalName, url: site.url, email: site.company.email, vatID: site.company.cvr },
    { "@type": "WebSite", name: site.name, url: site.url, inLanguage: "da-DK" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="da" data-pal="sort-koral" suppressHydrationWarning className={`${inter.variable} ${serif.variable}`}>
      <head>
        {/* Enables reveal styles only when JS runs, so content is never hidden without JS (§10.7). */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body>
        <a href="#main" className="skip-link btn btn-sm">
          Gå til indhold
        </a>
        <AlertBanner />
        <SiteNav />
        <main id="main">{children}</main>
        <SiteFooter />
        <RevealObserver />
        <SplitHeadings />
        <SpotlightTracker />
      </body>
    </html>
  );
}
