import type { Metadata, Viewport } from "next";
import { Google_Sans_Flex, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { VIS_PLADSHOLDERE } from "@/lib/pladsholdere";
import { AlertBanner } from "@/components/layout/AlertBanner";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FooterGate } from "@/components/layout/FooterGate";
import { ChatBubble } from "@/components/layout/ChatBubble";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { FitSections } from "@/components/layout/FitSections";
import { designCss } from "@/components/lab/designPass";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { SplitHeadings } from "@/components/motion/SplitHeadings";
import { SpotlightTracker } from "@/components/motion/SpotlightTracker";

// Marco 2026-11-23: Google Sans Flex (SIL OFL 1.1) for display and text, replacing Inter. The --font-inter name is
// kept so every existing reference picks it up. Full æ ø å.
const inter = Google_Sans_Flex({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

// Italic accent words in headlines (pricing page reference). Second and last family.
// Font for the dark "Tilmeld jer" pill button (Marco 2026-11-14).
// Marco 2026-11-23: the button uses Google Sans Flex as well.
const grotesk = Google_Sans_Flex({ subsets: ["latin", "latin-ext"], variable: "--font-grotesk", display: "swap" });
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
    { "@type": "Organization", name: site.company.legalName, url: site.url, email: site.company.email, ...(site.company.cvr.startsWith("[") ? {} : { vatID: site.company.cvr }) },
    { "@type": "WebSite", name: site.name, url: site.url, inLanguage: "da-DK" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="da" data-pal="sort-koral" suppressHydrationWarning className={`dp ui-real brun rytme ${inter.variable} ${serif.variable} ${grotesk.variable}${VIS_PLADSHOLDERE ? "" : " skjul-ph"}`}>
      <head>
        {/* Enables reveal styles only when JS runs, so content is never hidden without JS (§10.7). */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {/* Marco 2026-11-24: the approved design pass is live on every page. */}
        <style dangerouslySetInnerHTML={{ __html: designCss }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body>
        <a href="#main" className="skip-link btn btn-sm">
          Gå til indhold
        </a>
        <AlertBanner />
        <SiteNav />
        <main id="main">{children}</main>
        <FooterGate><SiteFooter /></FooterGate>
        <RevealObserver />
        <SplitHeadings />
        <SpotlightTracker />
        <ChatBubble />
        <CookieBanner />
        <FitSections />
      </body>
    </html>
  );
}
