# Mindforward CMS (Strapi 5)

Indholdskilden til bloggen på mindforward.dk. Samme opsætning som AI Konsulenternes: én collection, `blog-posts`,
som hjemmesiden læser, og som blog-agenterne skriver til.

## Sådan kommer den i drift

1. Opret et projekt på [Strapi Cloud](https://cloud.strapi.io), peg det på dette repo, og sæt **Base directory** til `cms`.
2. Når projektet kører: opret en admin-bruger, og lav to API-tokens under Settings → API Tokens:
   - et **read-only** token til hjemmesiden,
   - et token med **fuld adgang til Blog Post** til blog-agenterne.
3. Sæt på hostingen af hjemmesiden (Vercel): `STRAPI_API_URL`, `STRAPI_API_TOKEN` (read-only) og `REVALIDATE_SECRET`.
4. Lav en webhook i Strapi under Settings → Webhooks:
   `https://mindforward.dk/api/revalidate?secret=<REVALIDATE_SECRET>` med events publish, unpublish, update og delete.
5. Giv blog-agenterne skrive-tokenet. Se `seo/blog-cloud-runbook.md`.

## Lokalt

    cp .env.example .env   # udfyld nøglerne med tilfældige værdier
    npm install
    npm run develop        # http://localhost:1337/admin

Lokalt bruges SQLite (`.tmp/data.db`). Filen `types/generated` dannes automatisk og er ikke med i repoet.

## Felter på `blog-posts`

`title`, `slug`, `excerpt`, `content` (markdown), `author`, `category` (guide, case-story, tech-dive, business-case,
compliance, news), `featuredImage`, `seoTitle`, `seoDescription`, `keywords` (array), `readingTime`.
