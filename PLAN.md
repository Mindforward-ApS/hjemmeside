# PLAN — Web-skabelon (Docebo-struktur × Premium Web Build)

## Assumptions (no business given; everything is swappable)
- **PRODUCT:** "Fjord" is a demo name. A light tool for small Danish businesses that collects incoming customer requests (mail, form, phone notes) in one pipeline and makes sure every one gets an answer and a quote. It was chosen because it has a clear *before → after*, which the signature motion needs. Swap the name and copy in `src/content/site.ts` and `src/content/copy.da.ts`.
- **AUDIENCE:** owners and office staff in Danish SMBs (5–50 employees).
- **MARKET/LANGUAGE:** da-DK, using "du".
- **PRIMARY CONVERSION:** signup (free trial). Secondary: "Book 15 min".
- **ACTIVATION EVENT:** first request answered from Fjord. **CORE ACTION:** request answered. **CADENCE:** daily.
- **PRICING:** 3 tiers, monthly/annual, B2B (ex. VAT).
- **PROOF ON HAND:** none. Every logo, testimonial and number is a marked placeholder `[… NEEDED]`.
- **Out of scope for a template:** backend brain (§5), payments/invoices (§12.3), contracts (§12.10) and email (§12.4). The marketing site is built so they can be plugged in. A form posts to a server action with Zod and a honeypot, and the server action is a stub.
- **EAA:** a template is not in scope by itself; check per project.
- **AI crawlers:** allowed in `robots.ts`.

## Structure borrowed from docebo.com (mechanics only, not look or copy)
A closed library of named section patterns; every page is a composition of them.

| Pattern | Job | Docebo equivalent |
|---|---|---|
| `AlertBanner` | One piece of news, dismissible | alert-banner |
| `SiteHeader` | Utility row + floating pill nav, hides on scroll down | site-header-nav |
| `HeroHome` / `HeroInternal` | Outcome headline + real product UI | hero-home / hero-internal |
| `Explorer` (signature 1) | Tabbed feature explorer with index-card tabs | pillars |
| `ScrollStatement` | A statement fills in word by word as you scroll | headline fill |
| `StoryScroll` (signature 2) | Pinned product screen updates per step: messy inbox → ordered pipeline | how-it-works |
| `LogoWall` | Placeholder logos, monotone | social-proof-logo-grid |
| `BentoLive` | Bento grid where each tile runs a mini demo | bento-grid |
| `Testimonials` | Filterable by role, all placeholders | testimonial-cards |
| `UseCaseRail` | Horizontal scroll-snap with buttons (drag alternative) | use-case-switcher |
| `TrustGrid` | Security + integrations | security-integrations |
| `Faq` | Real purchase objections | faq-block |
| `SoftOffer` | Low-commitment second conversion | — (§4.11) |
| `FooterCta` | Every page ends here | footer-cta |
| `.section-dark` | Style variant: any section flips dark via semantic tokens | is-style-dark-section |

## Pages and the user's silent question
| Route | Question | Composition |
|---|---|---|
| `/` | "Is this for me?" | Alert, Header, HeroHome, LogoWall, ScrollStatement, Explorer, StoryScroll, BentoLive, Testimonials, UseCaseRail, TrustGrid, SoftOffer, FooterCta |
| `/platform` | "Does it work?" | HeroInternal, Explorer, BentoLive, TrustGrid, Faq, FooterCta |
| `/priser` | "Is it worth it, what's the risk?" | HeroInternal, Pricing (toggle, 3 tiers, recommended), Testimonials (1), Faq, FooterCta |
| `/kunder`, `/kunder/[slug]` | "Who like me uses it?" | HeroInternal, story grid, case template |
| `/loesninger/[slug]` | "Does it fit my industry?" | HeroInternal, value list, Testimonials, Faq, FooterCta |
| `/blog`, `/blog/[slug]` | — | Post grid, article |
| `/om-os` | "Who's behind it?" | Founder, why, direct contact (§4.12) |
| `/kontakt` | "Can I reach someone?" | Form + response-time promise |
| `/sikkerhed` | "Is my data safe?" | Hosting, encryption, sub-processors (§4.12) |
| `/tilmeld` | "How much hassle?" | Minimum form, 3 steps, proof, risk reversal |
| `/privatliv`, `/vilkaar` | — | UDKAST |
| `/design-system` | internal | Tokens and components in every state |
| 404 | — | Next step |

## Objection order (home)
1. What is it? → hero. 2. Who is it for? → logos + use cases. 3. Does it work? → explorer + story.
4. Is it hard to get started? → bento ("klar på 10 min"). 5. Can I trust you? → testimonials + trust.
6. What does it cost? → link to pricing + risk reversal.

## Message map
- **Core promise:** No customer request is forgotten.
- **Pillars:** (1) Everything in one place (proof: integrations). (2) Fast answers (proof: templates, [PROOF NEEDED: response time]). (3) Overview without meetings (proof: pipeline view).

## Motion specs
```
NAME: Hero product
JOB: explain · TRIGGER: load · WHAT MOVES: new request cards slide into the inbox list (not the headline; LCP is protected)
FROM→TO: y 12px, opacity 0 → 0, 1 · TIMING: 420ms enter-ease, stagger 80ms, max 4
REDUCED: static list · MOBILE: same, 3 cards
```
```
NAME: ScrollStatement
JOB: direct · TRIGGER: scroll-scrubbed (CSS animation-timeline: view(), in @supports)
WHAT MOVES: the colour of each word, muted → ink · REDUCED/UNSUPPORTED: all words ink
```
```
NAME: StoryScroll (signature)
JOB: explain/delight · TRIGGER: pinned (sticky) + IntersectionObserver per step
WHAT MOVES: the product screen state: 1 chaotic inbox → 2 sorted → 3 quote sent → 4 overview
TIMING: 420ms enter-ease per state change · REDUCED: crossfade 0ms · MOBILE: screen above each step, not pinned
```
```
NAME: Explorer tabs
JOB: explain · TRIGGER: click/keys (tablist) · panel crossfade 260ms · REDUCED: instant
```
```
NAME: Reveal (level 2)
JOB: direct · TRIGGER: enters view, once · 12px + opacity, 420ms enter-ease · only section heads, not everything
REDUCED: none
```

---

## Reference research (§9), 2026-10-21
Browsed supahero.io, navbar.gallery, pricingpages.design, socialproofexamples.com and land-book.com. Patterns are named here; we borrow mechanics, never the look, copy or assets.

### Patterns found
| Library | Pattern | Example (site) | What makes it work |
|---|---|---|---|
| supahero | **Type poster hero** | Habito ("WE BUILD SEAMLESS IDENTITY"), Payy, "Your Creative" | The headline is the visual: edge to edge, huge, with one image/product cutting into it |
| supahero | **Bento hero** | CoLabs | The hero is a grid: big main tile + side tiles with stats/proof/image |
| supahero | **Editorial split + category tabs** | Packaging (Yucca) | Headline left, product photo right, category tiles overlapping the bottom edge |
| supahero | **Contained hero card** | spectrum.life | The hero sits in a large rounded tinted panel inside the page |
| supahero | Dark gradient + centred screenshot | Wope, BetterStack | Common; risks feeling generic, so used only with a real product |
| navbar.gallery | **Mega menu with preview card** | Velt, Cloudflare | Columns of links + a featured card (product/customer story) |
| navbar.gallery | **Full-screen menu** | Zentro | Huge links, featured case and contact info in the overlay |
| navbar.gallery | **Side-panel menu with image** | Avéon | Menu slides in beside a photo |
| pricingpages | **Email field in the tier card** | Ramp | Start right in the card: fewer steps |
| pricingpages | **Usage slider → recommended plan** | Dynamic | The visitor's own number picks the plan |
| pricingpages | **Self-serve vs annual split** | OneSignal | Two clear paths: buy now vs talk to us |
| pricingpages | **Single giant price** | Fey | One plan, one number as a statement |
| socialproof | **Wall of impact** | Ramp, Zapier | Grid of result numbers + micro case studies |
| socialproof | **Menu social proof** | Deel, ClickUp | A customer story inside the mega menu |
| socialproof | **Impact carousel by use case** | Gong, ClickUp | Tabs per industry, each with a quote + metric |
| socialproof | **Before and after** | Basecamp | The chaos in the customer's words, then the calm |
| socialproof | **Wall of love on signup** | Memberstack, Leadpages | Proof at the moment of commitment |
| socialproof | **Story hub with filters** | Ramp, Toggl | Filter cases by industry/size |
| land-book | **Rich single-colour product page** | Runner | The whole page in one deep brand colour, numbered steps, dense real UI |
| land-book | **Giant wordmark + work bento** | Halaska | Brand name as hero, logos strip, then bento |

### Chosen pattern per section (to be confirmed through variants)
| Section | Pattern | Why |
|---|---|---|
| Nav | Mega menu with preview card + customer story (menu social proof) | Proof while browsing; premium feel |
| Hero | **3 variants, Marco chooses:** A type poster · B bento hero · C live demo | See /preview/hero/a, b, c |
| Logos | Marquee (built) | — |
| How it works | Kaos → orden (built, signature A) | Before → after |
| Proof | Wall of impact + impact carousel per industry | Specific numbers per segment (placeholders until real) |
| Industries | Horizontal journey (built, signature C) | — |
| Pricing | Usage slider → recommended plan + self-serve/annual split | The visitor's own number |
| Signup | Wall of love beside the form | Proof at commitment |
| Customers | Story hub with filters | — |
