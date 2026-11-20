# SEO for mindforward.dk

Overført fra AI Konsulenternes SEO-setup den 20. november 2026. Kun
undervisnings-søgeordene er taget med - rådgivning og udvikling hører ikke
til på en kursusplatform.

| Fil | Indhold |
|---|---|
| [`seo-fokus.md`](seo-fokus.md) | Kernesøgeord, klynger og regler. Læs den før emnevalg. |
| [`blog-cloud-runbook.md`](blog-cloud-runbook.md) | Facit for blog-agenterne: regler, filformat, billeder og udgivelse. |
| [`blog-backlog.md`](blog-backlog.md) | Emnekøen til blogindlæg. Øverst skrives først. |
| [`blog-log.md`](blog-log.md) | Log over udgivne indlæg. Læs den før hvert nyt indlæg. |
| [`soegeord-undervisning.csv`](soegeord-undervisning.csv) | 240 søgeord om kurser, uddannelse, workshops og foredrag med volumen. |

## Faste regler

- **Rapportering:** alle SEO-rapporter postes i den private kanal
  `#googleanalytics` i Leadlines Slack (kanal-ID `C0CKJR2MG85`, workspace
  `leadlinedkworkspace`). Post aldrig i AI Konsulenternes Slack.
  Er du i tvivl om en kanal, så spørg Nicholas i stedet for at poste.
- **Adskillelse:** Mindforward er en selvstændig forretning. Brug ikke AIK's
  cases, priser, telefonnumre eller links i indhold til mindforward.dk.
- **Intet falsk bevis:** ingen opdigtede tal, citater, kunder eller priser.
- **AI-forordningen:** påstå aldrig "AI Act-certificering". Budskabet er
  "dokumenteret, rollebaseret tiltag efter artikel 4".

## Sådan hænger det sammen

Samme tankegang som på ai-konsulenterne.dk, men uden CMS:

- **Undersider** ejer kernesøgeordene: `/copilot-kursus`, `/chatgpt-kursus`,
  `/claude-kursus`, `/ai-kursus-for-virksomheder` og
  `/ai-forordningen-artikel-4`. Teksterne ligger i
  `src/content/landingssider.ts`.
- **Bloggen** (`/blog`) læser indlæg som filer i `content/blog/`, med
  billeder i `public/blog/`. Et indlæg er live, når filen er pushet til
  `main`, og siden har bygget sig selv igen.
- **Blog-agenterne** følger [`blog-cloud-runbook.md`](blog-cloud-runbook.md).

## Mangler før agenterne kan køre (status 20. november 2026)

1. Blog-opsætningen skal flettes ind i `main`, og siden skal bygge sig selv
   ved push til `main` (Vercel → Settings → Git). Først derefter kan
   blog-agenterne udgive.
2. mindforward.dk er ikke i Search Console med adgang for servicekontoen, så
   der er ingen tal til quick wins og rapporter.
3. Teksten på `/ai-forordningen-artikel-4` skal tjekkes mod den gældende
   lovtekst, før siden går live (se kommentaren i `landingssider.ts`).
