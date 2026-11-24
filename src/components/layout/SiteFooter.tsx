import Link from "next/link";
import { EnvelopeSimpleIcon, FacebookLogoIcon, InstagramLogoIcon, LinkedinLogoIcon, PhoneIcon, TiktokLogoIcon, YoutubeLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/content/site";
import { appLinks } from "@/lib/app";
import { MindforwardLogo } from "@/components/ui/MindforwardLogo";
import { NewsletterBand } from "@/components/layout/NewsletterBand";

// Site-wide footer (Marco 2026-11-24, from his reference): light footer with logo and short text on the left, three
// link columns and a contact column, then a hairline and a bottom row with © left and the legal links right.
// No social icons or phone number until real ones exist. Top padding leaves room for the newsletter band on top.
// Marco 2026-11-24: brown like before, white text.
const ink = "#ffffff";
const muted = "rgba(255,255,255,0.6)";
const cols = [
  { title: "Kurser", links: [["ChatGPT", "/#kurser"], ["Copilot", "/#kurser"], ["Claude", "/#kurser"], ["Alle kurser", "/#kurser"]] },
  { title: "Mindforward", links: [["Sådan virker det", "/#saadan"], ["Priser", "/#priser"], ["For virksomheder", "/priser#priser"], ["Kontakt", "/#kontakt"]] },
  { title: "Hjælp", links: [["Spørgsmål og svar", "/#faq"], ["Log ind", appLinks.login], ["Opret konto", appLinks.startBusiness]] },
] as const;
const legal = [["Privatlivspolitik", "/privatliv"], ["Handelsbetingelser", "/vilkaar"], ["Cookies", "/cookies"]] as const;

export function SiteFooter() {
  const c = site.company;
  const socials = ([["Instagram", c.social.instagram, InstagramLogoIcon], ["Facebook", c.social.facebook, FacebookLogoIcon], ["LinkedIn", c.social.linkedin, LinkedinLogoIcon], ["TikTok", c.social.tiktok, TiktokLogoIcon], ["YouTube", c.social.youtube, YoutubeLogoIcon]] as const);
  return (
    <>
      <footer style={{ color: ink, background: "linear-gradient(180deg, #201613 0%, #1a0f0c 100%)" }}>
        <NewsletterBand />
        <div className="px-6 pt-14 md:px-[3.5vw]">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 pb-14 lg:grid-cols-[1.3fr_repeat(3,1fr)_1.2fr] lg:gap-8">
            <div className="col-span-2 lg:col-span-1">
              <MindforwardLogo size={28} />
              <p className="mt-5 max-w-[19rem] text-[0.9375rem] leading-relaxed" style={{ color: muted }}>{site.description}</p>
              {socials.length > 0 && (
                <ul className="mt-6 flex gap-4">
                  {socials.map(([label, href, I]) => (
                    <li key={label}>{href
                      ? <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="transition-colors hover:text-[#fb970a]"><I size={24} weight="fill" aria-hidden /></a>
                      // Shown now (Marco 2026-11-24); becomes a link as soon as the profile URL is set in site.ts.
                      : <span title={label}><I size={24} weight="fill" aria-hidden /></span>}</li>
                  ))}
                </ul>
              )}
            </div>
            {cols.map((col) => (
              <div key={col.title}>
                <h2 className="text-[1.0625rem] font-semibold tracking-[-0.01em]" style={{ color: ink }}>{col.title}</h2>
                <ul className="mt-5 grid gap-3.5">
                  {col.links.map(([label, href]) => (
                    <li key={label}><Link href={href} className="text-[0.9375rem] transition-colors hover:text-[#fb970a]" style={{ color: ink }}>{label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="col-span-2 lg:col-span-1">
              <h2 className="text-[1.0625rem] font-semibold tracking-[-0.01em]" style={{ color: ink }}>Kontakt os</h2>
              <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="mt-5 flex items-center gap-2.5 text-[0.9375rem] tabular-nums transition-colors hover:text-[#fb970a]" style={{ color: ink }}>
                <PhoneIcon size={20} weight="bold" aria-hidden />30 12 70 10
              </a>
              <a href={`mailto:${c.email}`} className="mt-3.5 flex items-center gap-2.5 text-[0.9375rem] transition-colors hover:text-[#fb970a]" style={{ color: ink }}>
                <EnvelopeSimpleIcon size={20} weight="bold" aria-hidden />{c.email}
              </a>
              <p className="mt-3 text-[0.875rem]" style={{ color: muted }}>{c.responsePromise}</p>
            </div>
          </div>
        </div>
        <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <div className="flex flex-col gap-4 px-6 py-7 text-[0.9375rem] md:flex-row md:items-center md:justify-between md:px-[3.5vw]">
            <p style={{ color: muted }}>© {c.year} Mindforward</p>
            <ul className="flex flex-wrap gap-x-7 gap-y-2">
              {legal.map(([label, href]) => <li key={label}><Link href={href} className="transition-colors hover:text-[#fb970a]">{label}</Link></li>)}
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
