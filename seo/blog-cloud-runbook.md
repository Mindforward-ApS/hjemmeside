# Cloud-runbook: automatisk blogudgivelse på mindforward.dk

Denne fil er **facit for blog-agenterne** (`mindforward-blog-trend-tirsdag` og
`mindforward-blog-keyword-torsdag-soendag`). Retter du reglerne, så ret dem
HER - så følger begge agenter med, uden at deres prompt skal ændres.

Opsætningen er den samme som på ai-konsulenterne.dk: agenten skriver indlægget,
sender det til Strapi, og så er det live. Der skal hverken bygges eller deployes.

## Adskillelse (gælder altid)

- Mindforward er en selvstændig forretning. Brug aldrig AI Konsulenternes
  Strapi, repo, cases, priser, telefonnumre eller links.
- Mindforwards Strapi ligger i miljøvariablerne `MF_STRAPI_API_URL` og
  `MF_STRAPI_API_TOKEN`. Variablerne `STRAPI_API_URL` og `STRAPI_API_TOKEN`
  (uden `MF_`) hører til AI Konsulenterne - **rør dem ikke**.
- Rapportér kun i Leadlines Slack, den private kanal `#googleanalytics`
  (kanal-ID `C0CKJR2MG85`). Kan du ikke nå præcis den kanal, så post ingen
  andre steder - skriv rapporten som dit afsluttende svar i stedet.

## Forudsætninger (tjek FØRST - stop hvis noget mangler)

    test -n "$MF_STRAPI_API_URL" && test -n "$MF_STRAPI_API_TOKEN" && echo "STRAPI OK" || echo "STRAPI MANGLER"

Mangler de: **STOP med det samme**. Skriv ikke posten, og rapportér at
hemmelighederne ikke er sat. Udgiv aldrig halvfærdigt.

Kan du ikke nå Strapi over netværket (fx `curl: (56) CONNECT tunnel failed,
response 403`): stop og rapportér, at værten er blokeret. Forsøg aldrig at
omgå en blokering.

## Trin 0: undgå dubletter (ALTID først)

1. Læs [`blog-log.md`](blog-log.md) - alle udgivne emner.
2. Hent live slugs fra Strapi (`-g` er påkrævet, ellers fejler curl på `[]`):

       curl -sS -g -H "Authorization: Bearer $MF_STRAPI_API_TOKEN" \
         "$MF_STRAPI_API_URL/api/blog-posts?pagination[pageSize]=100&fields[0]=slug&fields[1]=title"

3. Jagter en eksisterende artikel **samme søgeord**, så vælg et andet søgeord.

Reglen går på søgeordet, ikke på emnet. Samme emne må gerne gå igen, hvis
hvert indlæg har sit eget søgeord, sin egen vinkel og sin egen slug, og
indlæggene linker til hinanden.

## SEO-fokus - LÆS FØR EMNEVALG

Læs [`seo-fokus.md`](seo-fokus.md). Kort:

- **Formålet er tilmeldinger, ikke trafik.** Hvert indlæg sender læseren
  videre til den side, der ejer emnets kernesøgeord.
- **Kernesøgeordene ejes af sider, ikke af blogindlæg.** Brug dem aldrig som
  et indlægs primære søgeord - skriv en long-tail-variant og link til siden:

| Kernesøgeord | Ejes af |
|---|---|
| copilot kursus, microsoft copilot kursus, copilot kursus online | `/copilot-kursus` |
| chatgpt kursus, kursus i ai og chatgpt | `/chatgpt-kursus` |
| claude kursus | `/claude-kursus` |
| ai kursus, ai kursus online, ai kursus for virksomheder | `/ai-kursus-for-virksomheder` |
| ai literacy, ai act kursus, ai-kompetencer | `/ai-forordningen-artikel-4` |

Regler for hvert indlæg:

1. Notér i `blog-log.md`, hvilken klynge indlægget støtter.
2. Link til den side, der ejer kernesøgeordet, i artiklens første tredjedel -
   med søgeordet som linktekst, hvor det falder naturligt.
3. CTA til sidst: samme side eller `/priser`.
4. Spring over: rene modellanceringer, forbrugerprodukter, AI-billeder/video
   og emner, der ikke kan kobles til en klynge.

## Emnevalg

**Spor TREND (tirsdag):** find via websøgning, hvad der er sket i AI de
seneste 7 dage, og som betyder noget for medarbejdere og ledere i en dansk
virksomhed. Prioritér: (a) Microsoft Copilot-nyt og adoption, (b) ChatGPT- og
Claude-nyt, der ændrer hverdagen på kontoret, (c) AI-forordningen, især
artikel 4 om AI-kompetencer, (d) danske tal om AI på arbejdspladsen. To
tests: vil nogen google det om 14 dage, og kan det kobles til en klynge?
Består intet emne begge tests, så skriv det øverste ikke-udgivne emne fra
[`blog-backlog.md`](blog-backlog.md) som `guide`, og sig det i rapporten.
Vinkl til "hvad betyder det for en dansk virksomhed med 20 ansatte" - ikke
"OpenAI lancerer X". Kildehenvis alle nyheder med link, og brug kun kilder,
du faktisk har læst. `category: "news"`.

**Spor KEYWORD (torsdag og søndag):** tag det øverste emne i
[`blog-backlog.md`](blog-backlog.md), som ikke allerede er udgivet.
`category: "guide"`.

## Skriveregler

- Dansk. Mindforwards stemme: enkel og klar, jordnær, ingen jargon. Skriv til
  "du" eller "I", som passer til emnet. Ingen ordspil.
- **Tegnsætning: BINDESTREG (-), aldrig tankestreg.** Komma foran ledsætninger
  ("…, der …"), ikke startkomma.
- 800-1.400 ord. Åbn med 2-4 sætninger, der besvarer kernespørgsmålet direkte
  (det er blokken, AI-svar citerer). H2'er som spørgsmål, hvor det er naturligt.
- FAQ-sektion nederst: `## Ofte stillede spørgsmål` med hvert spørgsmål som
  `###` og svaret som almindelig tekst lige under. Siden laver selv
  FAQ-schema ud fra præcis den form.
- Mindst 2 interne links + CTA til sidst.

### Intet falsk bevis

Ingen opdigtede tal, citater, kunder, cases eller priser. Mindforward har
ingen offentlige kundecases endnu - nævn ingen kunder.

Det må du sige om Mindforward (og kun det):

- Online AI-træning på dansk. En lektion tager cirka 10 minutter, et helt
  kursus 1-2 timer.
- Hver lektion slutter med en opgave i øvemiljøet: man skriver prompten selv
  og får en score fra 0 til 100 og feedback med det samme.
- ChatGPT, Copilot og Claude vises side om side.
- Kursusbevis med navn, score og unikt ID, som kan tjekkes via QR-kode.
- Lederen får et overblik over holdets fremskridt og en rapport.
- Hostet i EU med data i Frankfurt. Databehandleraftale følger med.
- Priser: se `/priser` - skriv ikke tal ind i artikler, link i stedet.

Generelle tal kun med kilde og link.

**AI-forordningen:** påstå aldrig "AI Act-certificering". Kursusbeviset er
dokumentation for gennemført træning, ikke en certificering. Artikel 4 blev
ændret i sommeren 2026 (kravet om et "tilstrækkeligt niveau" er taget ud,
pligten til at træffe foranstaltninger består) - tjek den gældende ordlyd i
en kilde, før du skriver om den.

### Link-mål, der findes

`/copilot-kursus` `/chatgpt-kursus` `/claude-kursus`
`/ai-kursus-for-virksomheder` `/ai-forordningen-artikel-4` `/priser`
`/kontakt` `/blog` samt artikler under `/blog/`.

Sider som `/platform`, `/kunder`, `/om-os` og `/kurser/...` sender videre til
forsiden - link aldrig til dem.

### Markdown-begrænsninger (rendereren er minimal)

Virker: `##`-`######`, afsnit, `-`/`*`-lister, `1.`-lister, `**fed**`,
`*kursiv*`, `[tekst](url)`, `` `kode` ``, `>` citat, og billeder på egen linje:
`![alt-tekst](https://...media.strapiapp.com/... "Foto: Navn / Unsplash")`
(kun billeder fra Strapis mediebibliotek vises - andre URL'er springes over).

Virker IKKE - brug aldrig: tabeller · kodeblokke med backticks · rå HTML ·
`---` · indrykkede lister · fed og link i samme udtryk (`**[x](/y)**` og
`[**x**](/y)` går begge i stykker - hold dem adskilt).

**Content skal starte med `##`**, ikke `#`. Sidens H1 er `title`-feltet.
Skriv ikke JSON-LD - `Article`- og `FAQPage`-schema udsendes af siden.

## Strapi-felter (collection `blog-posts`)

POST til `$MF_STRAPI_API_URL/api/blog-posts?status=published` med
`{"data": {...}}` og `Authorization: Bearer $MF_STRAPI_API_TOKEN`:

- `title` - søgeordet forrest, ca. 55-65 tegn
- `slug` - kebab-case, æøå → ae/oe/aa, ikke allerede brugt
- `category` - `"guide"` eller `"news"`
- `excerpt` - 1-2 sætninger, ca. 150 tegn
- `content` - markdown, starter med `##`
- `seoTitle` - **højst 46 tegn** (siden føjer " · Mindforward" til → højst 60)
- `seoDescription` - 140-155 tegn, søgeord + værdi
- `keywords` - array med 5 relevante
- `readingTime` - tal (minutter)
- `author` - `"Mindforward"`

Svarer Strapi ikke HTTP 201: stop og rapportér fejlen.

## Efter udgivelse

Der skal hverken bygges eller deployes. Sitemappet henter indlæggene fra
Strapi ved hver forespørgsel, og blogsiderne opdaterer sig selv inden for få
minutter (straks, hvis Strapi-webhooken til `/api/revalidate` er sat op).

Verificér via Strapi (`?filters[slug][$eq]=<slug>&status=published` og at
`publishedAt` er sat). **Fælde:** en ukendt slug under `/blog/` svarer HTTP
200 med en "ikke fundet"-side og `noindex`. Statuskoden beviser derfor intet -
kig på `<title>` og H1, hvis du kan hente siden.

## Til sidst

1. Tilføj en linje i [`blog-log.md`](blog-log.md): dato, spor, søgeord,
   klynge, slug.
2. Commit kun den fil, og push til `main`.
3. Rapportér i `#googleanalytics` (se "Adskillelse"): emne og begrundelse,
   titel, slug, fuld URL, excerpt, og hvor mange emner der er tilbage i køen.
   Gik noget galt, så rapportér fejlen tydeligt i stedet for at pynte på den.
