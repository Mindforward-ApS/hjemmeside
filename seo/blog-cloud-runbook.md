# Cloud-runbook: automatisk blogudgivelse på mindforward.dk

Denne fil er **facit for blog-agenterne** (`mindforward-blog-trend-tirsdag` og
`mindforward-blog-keyword-torsdag-soendag`). Retter du reglerne, så ret dem
HER - så følger begge agenter med, uden at deres prompt skal ændres.

Et indlæg er en fil i repoet: `content/blog/<slug>.md`, med billeder i
`public/blog/<slug>/`. Når filen er pushet til `main`, bygger siden sig selv
igen, og indlægget er live få minutter efter. Der er ingen CMS og ingen
adgangsnøgler.

## Adskillelse (gælder altid)

- Mindforward er en selvstændig forretning. Brug aldrig AI Konsulenternes
  Strapi, repo, cases, priser, telefonnumre eller links.
- Arbejd kun i repoet `Mindforward-ApS/hjemmeside`. Miljøvariablerne
  `STRAPI_API_URL` og `STRAPI_API_TOKEN` hører til AI Konsulenterne - **rør
  dem ikke**.
- Ret kun i `content/blog/`, `public/blog/` og `seo/blog-log.md`. Rør aldrig
  sidens kode, design eller andre tekster.
- Rapportér kun i Leadlines Slack, den private kanal `#googleanalytics`
  (kanal-ID `C0CKJR2MG85`). Kan du ikke nå præcis den kanal, så post ingen
  andre steder - skriv rapporten som dit afsluttende svar i stedet.

## Forudsætninger (tjek FØRST - stop hvis noget mangler)

1. Hent repoet: tilføj `Mindforward-ApS/hjemmeside` til sessionen med
   skriveadgang, klon det, og stå på `main` med seneste ændringer.
2. Tjek, at mapperne `content/blog/` og `scripts/blog-check.mjs` findes på
   `main`. Gør de ikke det, er blog-opsætningen ikke flettet ind endnu:
   **STOP**, skriv ikke posten, og rapportér det.

## Trin 0: undgå dubletter (ALTID først)

1. Læs [`blog-log.md`](blog-log.md) - alle udgivne emner.
2. Se filnavnene i `content/blog/` - det er de live slugs.
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
`![alt-tekst](/blog/<slug>/<navn>.webp "Foto: Navn / Pexels")`.

Virker IKKE - brug aldrig: tabeller · kodeblokke med backticks · rå HTML ·
`---` · indrykkede lister · fed og link i samme udtryk (`**[x](/y)**` og
`[**x**](/y)` går begge i stykker - hold dem adskilt).

**Artiklen skal starte med `##`**, ikke `#`. Sidens H1 er `title`-feltet.
Skriv ikke JSON-LD - `Article`- og `FAQPage`-schema udsendes af siden.

## Filen: `content/blog/<slug>.md`

Slug: kebab-case, æøå → ae/oe/aa, ikke allerede brugt. Filen starter med et
felt mellem to linjer med `---`, én linje pr. felt, og så artiklen:

    ---
    title: Hvad koster et Copilot-kursus?
    date: 2026-11-24
    category: guide
    excerpt: 1-2 sætninger, ca. 150 tegn. Vises på oversigten og øverst i artiklen.
    seoTitle: Hvad koster et Copilot-kursus?
    seoDescription: 140-155 tegn med søgeordet og det, læseren får ud af at klikke.
    keywords: ["copilot kursus pris", "hvad koster et copilot kursus"]
    readingTime: 6
    image: /blog/hvad-koster-et-copilot-kursus/forside.webp
    imageAlt: To kolleger ser på en skærm i et lyst kontor
    imageCredit: Foto: Navn / Pexels
    ---

    ## Første overskrift

    Artiklen ...

- `title` - søgeordet forrest, ca. 55-65 tegn (højst 100)
- `date` - udgivelsesdatoen, `YYYY-MM-DD`
- `category` - `guide` eller `news`
- `seoTitle` - **højst 46 tegn** (siden føjer " · Mindforward" til → højst 60)
- `seoDescription` - 140-155 tegn (højst 160)
- `keywords` - liste på én linje med dobbelte anførselstegn, ca. 5 stk.
- `readingTime` - helt tal (minutter)
- `image`, `imageAlt`, `imageCredit` - forsidebilledet, se "Billeder"
- `updated` - kun når et gammelt indlæg er rettet væsentligt, `YYYY-MM-DD`

Skriv værdier uden anførselstegn (undtagen `keywords`). Et kolon inde i en
tekst er i orden.

## Billeder

Hvert indlæg bør have et forsidebillede og 1-3 billeder inde i teksten,
placeret mellem H2-afsnit (aldrig to billeder lige efter hinanden, aldrig før
første afsnit).

**Udseende:** rigtige mennesker i rigtige arbejdssituationer - folk ved en
skærm, et møde, et kontor. Lyst, roligt, nordisk. Liggende format, mindst
1600 px bredt. Billedet skal passe til afsnittet.

**Aldrig:** robotter, glødende hjerner, blå/lilla "AI"-grafik, kunstigt
genererede billeder, tekst eller logoer i billedet, kendte personer,
tydelige varemærker, overdrevent smilende stockfotos.

**Kilde:** Pexels (pexels.com). Licensen tillader gratis kommerciel brug.
Ingen billeder fra Google Billeder, andre hjemmesider eller nyhedsmedier.

Find et billede med websøgning (fx `site:pexels.com office meeting laptop`).
Fotoets adresse slutter på et tal, fx `pexels.com/photo/people-in-a-meeting-3184291/`.
Tallet er fotoets id, og billedfilen ligger her:

    https://images.pexels.com/photos/<id>/pexels-photo-<id>.jpeg?auto=compress&cs=tinysrgb&w=2000

Notér fotografens navn fra søgeresultatet til `imageCredit`
("Foto: Navn / Pexels"). Kender du ikke navnet, så skriv "Foto: Pexels".

Unsplash kan kun bruges, hvis du har den direkte billedadresse på
`images.unsplash.com`. Download-linket på unsplash.com er spærret af et
robot-tjek og virker ikke fra skyen (testet 20. november 2026).

**Gør billedet klar** - hotlink aldrig, og læg aldrig den rå fil i repoet:

    curl -sSL -o /tmp/billede.jpg "<download-url>"
    python3 scripts/blog-image.py /tmp/billede.jpg <slug> forside

Scriptet skalerer til højst 1600 px, gemmer som WebP på ca. 200 KB eller
mindre i `public/blog/<slug>/`, og skriver stien, du skal bruge. Brug navnet
`forside` til forsidebilledet og korte, beskrivende navne til resten.

**Hvis billederne fejler** (netværket blokerer billedsitet, eller scriptet
fejler): udgiv indlægget uden `image`-felterne og uden billeder i teksten, og
skriv **ØVERST i rapporten: "BILLEDER MANGLER"** med fejlbeskeden. Opdigt
aldrig et billede eller en sti. Forsøg aldrig at omgå en netværksblokering.

## Tjek før udgivelse (SKAL bestås)

    node scripts/blog-check.mjs

Scriptet tjekker felter, længder, markdown, der ikke kan vises, og at alle
billedfiler findes. Melder det `FEJL`, så ret filen og kør igen. Push aldrig
et indlæg, der ikke består: en fejl i filen stopper hele sidens build.

## Udgivelse

1. Tilføj en linje i [`blog-log.md`](blog-log.md): dato, spor, søgeord,
   klynge, slug.
2. Commit præcis disse ting og intet andet: `content/blog/<slug>.md`,
   `public/blog/<slug>/` og `seo/blog-log.md`. Commit-besked: `blog: <titel>`.
3. Push til `main`. Afvises pushet, fordi `main` har fået nye commits, så
   hent dem (`git pull --rebase origin main`) og push igen. Brug aldrig
   force-push.

Siden bygger sig selv efter pushet. Du kan ikke altid hente mindforward.dk
fra skyen, så et bestået tjek og et gennemført push er din bekræftelse.
**Fælde,** hvis du henter siden: en ukendt adresse under `/blog/` svarer HTTP
200 med en "ikke fundet"-side og `noindex`. Statuskoden beviser derfor intet -
kig på `<title>` og H1.

## Rapport

Rapportér i `#googleanalytics` (se "Adskillelse"): emne og begrundelse,
titel, slug, fuld URL (`https://mindforward.dk/blog/<slug>`), excerpt, om der
er billeder med, og hvor mange emner der er tilbage i køen. Gik noget galt,
så rapportér fejlen tydeligt i stedet for at pynte på den.
