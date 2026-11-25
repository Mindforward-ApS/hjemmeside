# Mindforward hjemmeside (mindforward.dk)

Alle, der arbejder i dette repo (Marco, Nicholas, Claude Code lokalt og i skyen, blog-agenterne), følger denne fil. Den
er facit, så alle får det samme resultat ud af det samme spørgsmål. Ændres en regel, så ret den her.

@AGENTS.md

## Projektet

- Mindforward ApS: korte AI-kurser på dansk i ChatGPT, Copilot og Claude, med et øvemiljø og overblik til lederen.
  Mindforward er en selvstændig forretning. Brug aldrig AI Konsulenternes repo, Strapi, cases, priser eller links.
- Next.js 16 (App Router, Turbopack), React 19, Tailwind v4, Vercel. Kontaktbeskeder gemmes i Neon Postgres (EU).
- Tre repos i `Mindforward-ApS`: `hjemmeside` (dette), `platform` (app.mindforward.dk) og `operation-sensor`
  (marketing, salg, agenter). Hold dem adskilt.
- Lokalt: `npx next dev -p 3700`. Første start stopper ofte ved en Next.js-sikkerhedsbesked; start igen.

## Sådan kommer ændringer live

- Vercel-projektet `mindforward-hjemmeside` bygger fra GitHub. **Push til `main` = live på mindforward.dk.**
  Alle andre branches får et preview-link.
- Arbejd altid på en branch, og flet ind i `main` via en pull request. Læg aldrig live med `vercel deploy` fra en mappe.
- Intet går live, før Marco har sagt "læg live" til netop den ændring.
- Blog-agenterne er den eneste undtagelse: de må pushe nye indlæg direkte til `main` efter reglerne i
  `seo/blog-cloud-runbook.md`, og de må kun røre `content/blog/`, `public/blog/` og `seo/blog-log.md`.

## Sådan arbejder vi med Marco

- Skriv kort og på dansk. Max ét spørgsmål ad gangen.
- Gør præcis det, der bliver bedt om. Ingen egne "forbedringer" oveni, og ændr aldrig størrelser, tekster eller
  layout, der ikke er bedt om. Ser du en risiko, så nævn den i én linje bagefter.
- Fjern eller skjul aldrig noget uden et ja til netop den ændring.
- Når Marco siger "vi snakker bare", så lav ingenting, heller ikke småting.
- Designændringer laves som preview først (`src/app/preview/<navn>`, kun lokalt; giver 404 i produktion), og vises
  ved siden af den nuværende side. Byg ud fra rigtige referencer, ikke fra egne ideer.
- Vær ærlig: sig aldrig, at noget virker eller er live, uden at have tjekket hele siden (Mac 1512×982 og mobil 390×844).
- Nævn aldrig Linear, Stripe, Ramp eller Attio som designreferencer, og skriv aldrig i kode eller kommentarer, hvilken
  reference Marco har sendt.
- Mobilrettelser laves kun med telefon-media-queries; desktop-proportioner må ikke ændres.

## Design

- Farver: brun `#201613` (mørke flader og tekst), creme/sand til lyse flader, orange accent (logoets gradient
  `#fb970a → #f8400a`). Ingen nye accentfarver uden at spørge.
- Knapper: ét system (`src/components/ui/GrebBtn.tsx` + `greb-btn.css`). Primær = orange pille med mørk pil-cirkel.
  Sekundær = hvid pille uden cirkel. 3D-effekt kun på de orange knapper, aldrig på hvide.
- Ikoner: kun Phosphor, Bold (`src/components/ui/Icon.tsx`). Import fra `@phosphor-icons/react/dist/ssr`.
- Kort: kun to kortfarver, hvid og brun. Kort bruges til ting, man kan vælge eller købe (kurser, priser).
- Sektioner fylder sidens fulde container-bredde (`px-5 sm:px-[3.5vw]`), aldrig en smal kolonne i midten.
- Design-passet (knapper, kort, ikoner) ligger i `src/components/lab/designPass.ts` og sættes på `<html class="dp">`.
- Maskotten hedder **Miwa** (den orange, glossy avatar). Den anden avatar hedder **Sofia**. Skriv ikke "MIND".
- Kontakt: telefon 30 12 70 10, kontakt@mindforward.dk. Firma: Mindforward ApS (Esther Gruppen ApS).

## Blog og SEO

- Indlæg er markdown-filer i `content/blog/<slug>.md` med billeder i `public/blog/<slug>/`. Ingen CMS.
- Regler for blog-agenterne: `seo/blog-cloud-runbook.md`. Søgeord og fokus: `seo/`. Log over udgivne emner:
  `seo/blog-log.md`.
- SEO-landingssider: `/ai-kursus-for-virksomheder`, `/chatgpt-kursus`, `/claude-kursus`, `/copilot-kursus`
  (indhold i `src/content/landingssider.ts`). `/ai-forordningen-artikel-4` er kladde, til lovteksten er tjekket.

## Hemmeligheder

- Ingen nøgler i repoet. Lokalt `.env.local` (gitignored), i drift Vercel-miljøvariabler. Se `.env.example`.
