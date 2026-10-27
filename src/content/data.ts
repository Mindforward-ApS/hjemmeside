// Structured content. Proof entries are placeholders until real, consented data exists (§7, §12.6).

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  result: string;
  segment: "Ejer" | "Kontor" | "Sælger";
  placeholder: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote: "[TESTIMONIAL NEEDED: ejer, håndværksvirksomhed, konkret resultat — fx færre tabte opgaver]",
    name: "[Navn]",
    role: "Ejer",
    company: "[Firma]",
    result: "[Resultat, fx “svartid fra 2 dage til 3 timer”]",
    segment: "Ejer",
    placeholder: true,
  },
  {
    id: "t2",
    quote: "[TESTIMONIAL NEEDED: kontor/administration, hvordan overblikket har ændret hverdagen]",
    name: "[Navn]",
    role: "Kontorchef",
    company: "[Firma]",
    result: "[Resultat]",
    segment: "Kontor",
    placeholder: true,
  },
  {
    id: "t3",
    quote: "[TESTIMONIAL NEEDED: sælger, tilbud sendt hurtigere — med et tal]",
    name: "[Navn]",
    role: "Sælger",
    company: "[Firma]",
    result: "[Resultat]",
    segment: "Sælger",
    placeholder: true,
  },
  {
    id: "t4",
    quote: "[TESTIMONIAL NEEDED: ejer, rådgivningsvirksomhed, tid sparet om ugen]",
    name: "[Navn]",
    role: "Partner",
    company: "[Firma]",
    result: "[Resultat]",
    segment: "Ejer",
    placeholder: true,
  },
];

export type UseCase = {
  slug: string;
  name: string;
  title: string;
  body: string;
  pains: string[];
  answers: { title: string; body: string }[];
};

export const useCases: UseCase[] = [
  {
    slug: "haandvaerk",
    name: "Håndværk",
    title: "Til håndværkere, der hellere vil være på pladsen end ved skrivebordet",
    body: "Forespørgsler kommer, mens du står på en stige. Fjord holder styr på dem, til du har hænderne fri.",
    pains: ["Opkald, du ikke kan tage", "Tilbud, der bliver sendt for sent", "Sedler i bilen"],
    answers: [
      { title: "Noter fra telefonen", body: "Indtal eller skriv en note efter opkaldet. Den lander i listen med kundens nummer." },
      { title: "Tilbud fra mobilen", body: "Brug din prisliste og send tilbuddet, før du kører fra kunden." },
      { title: "Påmindelse om opfølgning", body: "Har kunden ikke svaret efter 3 dage, får du besked." },
    ],
  },
  {
    slug: "raadgivning",
    name: "Rådgivning",
    title: "Til rådgivere, hvor hver henvendelse kan blive en kunde",
    body: "En ubesvaret mail kan være næste års største kunde. Fjord sørger for, at alle får svar.",
    pains: ["Henvendelser i flere indbakker", "Uklart hvem der svarer", "Opfølgning, der glipper"],
    answers: [
      { title: "Fælles indbakke", body: "Alle partnere ser de samme henvendelser og hvem, der har dem." },
      { title: "Skabeloner til første svar", body: "Et hurtigt, personligt første svar, mens du forbereder det lange." },
      { title: "Overblik over pipeline", body: "Se hvor mange henvendelser der er blevet til opgaver." },
    ],
  },
  {
    slug: "klinik",
    name: "Klinikker",
    title: "Til klinikker, hvor receptionen har travlt",
    body: "Bookinger, spørgsmål og aflysninger kommer fra alle kanter. Fjord lægger dem i rækkefølge.",
    pains: ["Telefonen ringer i behandlingstiden", "Spørgsmål om priser igen og igen", "Aflysninger, der ikke bliver fyldt ud"],
    answers: [
      { title: "Formular til hjemmesiden", body: "Patienter skriver i stedet for at ringe, og du svarer, når du har tid." },
      { title: "Svar på de faste spørgsmål", body: "Skabeloner til priser, åbningstider og forberedelse." },
      { title: "Venteliste", body: "Når en tid bliver ledig, kan du skrive til de næste på listen." },
    ],
  },
  {
    slug: "service",
    name: "Service",
    title: "Til servicevirksomheder med mange små opgaver",
    body: "Mange små henvendelser bliver hurtigt til én stor bunke. Fjord deler bunken op.",
    pains: ["Samme spørgsmål mange gange", "Opgaver uden ansvarlig", "Ingen ved, hvad der er lovet"],
    answers: [
      { title: "Fordeling", body: "Henvendelser fordeles automatisk efter type eller område." },
      { title: "Historik pr. kunde", body: "Se alt, kunden har skrevet og fået lovet, ét sted." },
      { title: "Ugentligt overblik", body: "Hver mandag en mail med det, der er åbent." },
    ],
  },
];

export type CaseStudy = {
  slug: string;
  company: string;
  industry: string;
  title: string;
  result: string;
  placeholder: boolean;
};

export const caseStudies: CaseStudy[] = [
  { slug: "kunde-1", company: "[Kunde 1]", industry: "Håndværk", title: "[CASE NEEDED: overskrift med konkret resultat]", result: "[Tal]", placeholder: true },
  { slug: "kunde-2", company: "[Kunde 2]", industry: "Rådgivning", title: "[CASE NEEDED: overskrift med konkret resultat]", result: "[Tal]", placeholder: true },
  { slug: "kunde-3", company: "[Kunde 3]", industry: "Klinik", title: "[CASE NEEDED: overskrift med konkret resultat]", result: "[Tal]", placeholder: true },
];

export type Post = { slug: string; title: string; excerpt: string; date: string; category: string; readMinutes: number };

export const posts: Post[] = [
  { slug: "svar-inden-for-en-time", title: "Hvorfor den første time betyder mest", excerpt: "Hvad der sker med en forespørgsel, der ligger natten over — og hvad du kan gøre ved det.", date: "2026-10-14", category: "Guide", readMinutes: 5 },
  { slug: "skabeloner-der-ikke-lyder-som-skabeloner", title: "Skabeloner, der ikke lyder som skabeloner", excerpt: "Tre regler for faste svar, som kunden ikke kan se er faste.", date: "2026-10-02", category: "Guide", readMinutes: 4 },
  { slug: "nyt-i-oktober", title: "Nyt i oktober: forslag til svar", excerpt: "Fjord kan nu læse en mail og foreslå et svar. Sådan virker det, og sådan slår du det fra.", date: "2026-10-01", category: "Opdatering", readMinutes: 3 },
];

export const integrations = ["Gmail", "Outlook", "Google Kalender", "Dinero", "e-conomic", "Billy", "Zapier", "Slack"];
