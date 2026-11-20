# SEO-fokus: undervisning

Kilde: AI Konsulenternes SEO-strategi (Google Keyword Planner og Search
Console, oktober 2026) og søgeordsarket "Keywords AI Konsulenterne" (Ahrefs,
maj 2026). Overført 20. november 2026.

**Læs tallene rigtigt:** Search Console-tallene nedenfor er fra
ai-konsulenterne.dk. De viser, at folk søger på ordene - ikke hvor
mindforward.dk ligger. Mindforward har ingen egne tal endnu.

## Kernesøgeord

Volumen = gennemsnitlige månedlige søgninger i Danmark.

| Søgeord | Keyword Planner (okt. 2026) | Ahrefs (maj 2026) | Note |
|---|---|---|---|
| ai kursus | - | 700 | Sværhedsgrad 52. Hovedordet i hele klyngen. |
| copilot kursus | 100-1.000 (+900% på 3 mdr.) | - | Hurtigst voksende. |
| copilot excel | 100-1.000 (+900%) | - | |
| ai literacy | 100-1.000 (+900%) | - | AI-forordningens artikel 4. |
| kursus i ai | - | 200 | Variant af "ai kursus". |
| ai uddannelse | - | 200 | Sværhedsgrad 51. |
| ai kursus online | 10-100 | 150 | Sværhedsgrad 48. Passer direkte til produktet. |
| ai kursus for virksomheder | - | 90 | |
| ai kursus for ledere | - | 80 | "ai kursus leder": 100. |
| generativ ai kursus | - | 100 | |
| kursus i ai og chatgpt | - | 80 | |
| ai act kursus | - | 60 | |
| microsoft copilot kursus | 10-100 | - | |
| copilot kursus online | 10-100 | - | |
| copilot workshop | 10-100 | - | Fysisk format - se "Workshop" nedenfor. |
| ai workshop | 10-100 | 150 | Fysisk format. |
| ai workshop for virksomheder | under 10 | 10 | 474 visninger på 90 dage i AIK's Search Console. |

Hele listen med 240 søgeord ligger i
[`soegeord-undervisning.csv`](soegeord-undervisning.csv).

## Klynger

1. **Copilot-undervisning:** copilot kursus, microsoft copilot kursus, copilot
   kursus online, copilot excel, hvad koster et copilot-kursus, hvorfor bruger
   medarbejderne ikke copilot, copilot vs chatgpt.
2. **AI-kursus generelt:** ai kursus, kursus i ai, ai kursus online, ai kursus
   for virksomheder, ai kursus for ledere, ai kursus for begyndere, generativ
   ai kursus, kursus i ai og chatgpt, ai uddannelse.
3. **AI-forordningen artikel 4:** ai literacy, ai act kursus, AI-kompetencer
   hos medarbejdere, dokumentation.
4. **Workshop og foredrag:** ai workshop, ai workshop for virksomheder, copilot
   workshop, ai workshop 1 dag, branche-workshops, ai foredrag. Mindforward
   sælger online kurser, ikke fysiske workshops. Brug kun klyngen til indlæg,
   der sammenligner formaterne og leder læseren til et online kursus.

## Sider, der skal eje kernesøgeordene

Et kernesøgeord skal ejes af én side, ikke af et blogindlæg. Siderne er
bygget, og teksterne ligger i `src/content/landingssider.ts`:

| Side | Søgeord den ejer |
|---|---|
| `/copilot-kursus` | copilot kursus, microsoft copilot kursus, copilot kursus online |
| `/chatgpt-kursus` | chatgpt kursus, kursus i ai og chatgpt, ai og chatgpt kursus |
| `/claude-kursus` | claude kursus (ingen volumen i arket endnu) |
| `/ai-kursus-for-virksomheder` | ai kursus, ai kursus online, ai kursus for virksomheder |
| `/ai-forordningen-artikel-4` | ai literacy, ai act kursus |
| `/priser` | priser |

Der er ingen selvstændig side om kursusbeviset endnu.

## Regler for blogindlæg

1. Brug aldrig et kernesøgeord som et indlægs primære søgeord. Skriv en
   long-tail-variant og link til siden, der ejer søgeordet.
2. Dublet-reglen går på søgeordet, ikke på emnet. Samme emne må gerne dækkes
   flere gange, hvis hvert indlæg har sit eget søgeord, sin egen vinkel og sin
   egen slug, og indlæggene linker til hinanden.
3. Åbn med 2-4 sætninger, der svarer direkte på spørgsmålet. H2'er som
   spørgsmål, hvor det er naturligt. FAQ-sektion nederst.
4. Trend-indlæg: vinkl til "hvad betyder det for en dansk virksomhed med 20
   ansatte". Prioritér Copilot-nyt og AI-forordningens artikel 4. Kildehenvis
   med links. Består emnet ikke testen "vil nogen google det om 14 dage", så
   tag det øverste emne fra emnekøen i stedet.
5. Formålet er tilmeldinger, ikke trafik. Hvert indlæg slutter med en CTA til
   det kursus eller den side, emnet hører til.
