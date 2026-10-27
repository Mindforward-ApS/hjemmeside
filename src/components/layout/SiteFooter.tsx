import Link from "next/link";
import { site } from "@/content/site";
import { MindforwardLogo } from "@/components/ui/MindforwardLogo";

// Site-wide footer (Marco 2026-10-22: E1, without the giant wordmark). It is brown like the hero's stage, so it continues
// the home page's StageCta without a seam. Company details are on every page (§8, §12.7).
export function SiteFooter() {
  const c = site.company;
  return (
    <footer className="text-white" style={{ background: "linear-gradient(180deg, #201613 0%, #1a0f0c 100%)" }}>
      <div className="px-6 pb-10 md:px-[3.5vw]">
        <div className="border-t border-white/10 pt-14">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
            <div>
              <MindforwardLogo size={30} />
              <p className="mt-4 max-w-[20rem] text-[0.9375rem] text-white/55">{site.description}</p>
              <p className="mt-5 text-[0.9375rem]">
                <a href={`mailto:${c.email}`} className="text-white hover:underline">{c.email}</a>
                <span className="text-white/45"> · {c.responsePromise}</span>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {site.footer.map((col) => (
                <div key={col.title}>
                  <h2 className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-white/45">{col.title}</h2>
                  <ul className="mt-4 grid gap-1">
                    {col.links.map((l) => (
                      <li key={l.href + l.label}>
                        <Link href={l.href} className="inline-flex min-h-11 items-center text-[0.9375rem] text-white/75 transition-colors hover:text-white">{l.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-[0.8125rem] text-white/45 md:flex-row md:items-center md:justify-between">
            <p>© {c.year} {c.legalName} · {c.cvr} · {c.address}</p>
            <p>Hostet i EU · Data i Frankfurt</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
