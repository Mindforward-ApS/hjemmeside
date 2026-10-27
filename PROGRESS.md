# PROGRESS

## Done
- Tokens (OKLCH, semantic, dark-section variant, light-scope), type scale, spacing, radius, shadows, motion tokens
- Section library: AlertBanner, SiteHeader (pill, hides on scroll), HeroHome/HeroInternal, LogoWall, ScrollStatement, Explorer, StoryScroll, BentoLive, Testimonials (filter), UseCaseRail, TrustGrid, Faq (+JSON-LD), SoftOffer, Pricing, FooterCta, MobileStickyCta, LegalPage
- Pages: / · /platform · /priser · /kunder · /kunder/[slug] · /loesninger/[slug] · /blog · /blog/[slug] · /om-os · /kontakt · /sikkerhed · /tilmeld · /privatliv · /vilkaar · 404 · /design-system
- sitemap.ts, robots.ts, opengraph-image, Organization/WebSite/FAQPage/SoftwareApplication/Article JSON-LD
- `tsc`, lint and `next build` pass; screenshots at 375/768/1440 with no horizontal overflow

## v3 (2026-10-21, "just finish it")
- Direction "Bento-demo" (design/DNA.md):
  - the hero's main tile is a working inbox demo (InboxDemo);
  - one tile system: 24/32 px padding, 28/16 px radius, 16 px gap.
- MegaNav site-wide: mega menu with a preview card + menu social proof; full-screen menu on mobile.
- Motion: A (Kaos → orden) on home, C (sideways journey) on home Løsninger + Platform; headlines split-reveal site-wide.
- Pricing: PlanFinder (sliders → recommended plan, computed from the listed prices).
- Critic fixes:
  - headlines break at sentence boundaries;
  - no button glow;
  - product chrome instead of browser dots;
  - equal mobile CTAs;
  - Pause chip on its own row;
  - neutral placeholder outline;
  - chaos visible from the first frame.
- design-director workflow: `scripts/shots.sh`, `design/shots/`, design-critic rubric.
- The /preview routes and the unused variants have been removed.

## Critic rounds (design-director §4, max 3)
| Page | Round 1 (lowest) | Round 2 (lowest) | Round 3 |
|---|---|---|---|
| Home | 6 | 6 | Fixes applied, not re-scored (round limit) |
| Priser | 5 | 5 | Fixes applied, not re-scored |

Fixes in round 3:
- Home:
  - demo tile the same height as the message tile, with no halo and no empty space;
  - proof row full width;
  - waves clear of the CTAs;
  - chips 12 px;
  - blue only for actions;
  - shorter announcement bar.
- Priser:
  - toggle above the finder, active state ink;
  - finder result outlined, with a link to the plan (one ink block per view);
  - designed range sliders;
  - product UI tile for Team;
  - bigger card text;
  - trust row without repetition.

Still open:
- Distinctiveness below the hero: sections share the eyebrow + H2-left template.
- The static/no-JS frames of the pinned sections leave large empty areas.
- Mobile: the eyebrow wraps.

## Open placeholders (§7), all marked with a dashed outline `.ph`
- Proof microcopy under the hero CTA · 6 customer logos · 4 testimonials · 3 cases · signup quote
- Statement claim [C1] has no source: find a primary source or rewrite
- Company details: name, CVR, address, phone, founder name/email/photo/"why"
- Integration list is an example; sub-processor regions; backup test date
- Legal pages are UDKAST and need lawyer review

## Not in the template (per project)
- Backend brain (§5), payments/invoices (§12.3), contracts (§12.10), email (§12.4), cookie consent banner (none needed until non-essential scripts are added)
- Research files (§11.1), SOURCES.md, LIX/spell-check scripts
