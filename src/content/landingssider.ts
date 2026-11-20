// Landing pages that own the core search terms (seo/seo-fokus.md). One page per term, so blog articles can link to
// them instead of competing with them.
//
// Every claim about the product comes from the front page and src/content/priser.ts: lesson length, the practice
// environment, the certificate, the team overview, hosting and prices. Do not add figures, customers or quotes here
// that are not true on the platform. Never write "AI Act-certificering" (seo/README.md).
import { erhverv, privat } from "@/content/priser";

export type LandingPage = {
  slug: string;
  /** Short name for footer links and "related pages". */
  nav: string;
  /** Used in <title>; the layout adds " · Mindforward", so keep it at 46 characters or less. */
  metaTitle: string;
  metaDescription: string;
  label: string;
  h1: string;
  sub: string;
  points: string[];
  intro: { title: string; body: string[]; source?: { label: string; href: string } };
  cards: { title: string; items: { icon: "mail" | "doc" | "chart" | "shield" | "user" | "check" | "sparkle" | "clock" | "lock"; title: string; body: string }[] };
  proof: { title: string; body: string; note?: string };
  faq: { q: string; a: string }[];
  /** Course structured data. Off for the page about the regulation, which is an explainer, not a course page. */
  course: boolean;
  cta: { title: string; sub: string };
};

const fra = erhverv[1].price; // "55 kr"
const enkelt = erhverv[0].price; // "69 kr"
const privatPris = privat[0].price; // "69 kr"

const faqTid = { q: "Hvor lang tid tager det?", a: "En lektion tager cirka 10 minutter. Et helt kursus tager 1-2 timer, fordelt på korte lektioner, som også kan tages på mobilen." };
const faqPris = { q: "Hvad koster det?", a: `Erhverv koster ${enkelt}. pr. bruger om måneden ekskl. moms og ${fra}. fra 10 brugere. Privat koster ${privatPris}. om måneden inkl. moms. Der er ingen binding.` };
const faqBevis = { q: "Får medarbejderne et bevis?", a: "Ja. Alle får et kursusbevis med navn, score og et unikt ID, som kan tjekkes via QR-koden." };
const faqData = { q: "Er vores data sikre?", a: "Platformen er hostet i EU med data i Frankfurt, og I får en databehandleraftale med fra start." };

const opgaver = {
  mail: { icon: "mail" as const, title: "Mails og svar til kunder", body: "Skriv et kort, venligt svar med den rigtige tone, og lær at bede om det, der mangler." },
  referat: { icon: "doc" as const, title: "Referat efter et møde", body: "Gør noter til et referat med beslutninger først og en ansvarlig på hver opgave." },
  regneark: { icon: "chart" as const, title: "Overblik over et regneark", body: "Få forklaret en formel, og få skrevet en ny, uden at du skal kunne kode." },
  deling: { icon: "shield" as const, title: "Hvad må deles med AI", body: "Lær at se, hvilke oplysninger der skal fjernes fra en tekst, før den må deles." },
};

export const landingPages: LandingPage[] = [
  {
    slug: "copilot-kursus",
    nav: "Copilot-kursus",
    metaTitle: "Copilot-kursus online for medarbejdere",
    metaDescription: "Online Copilot-kursus på dansk. Lektioner på 10 minutter, opgaver i øvemiljøet med score og feedback, og et kursusbevis til hver medarbejder.",
    label: "Copilot-kursus",
    h1: "Copilot-kursus for medarbejdere",
    sub: "Lær at bruge Microsoft Copilot på de opgaver, I allerede har. Korte lektioner på dansk, og en opgave i øvemiljøet efter hver lektion.",
    points: ["Lektioner på cirka 10 minutter", "Opgaver med score og feedback", "Kursusbevis til hver medarbejder"],
    intro: {
      title: "Et Copilot-kursus, der bliver brugt",
      body: [
        "Microsoft Copilot er Microsofts AI-assistent. Den findes som chat og er bygget ind i programmer som Word, Excel, Outlook og Teams.",
        "Værktøjet gør ikke arbejdet af sig selv. Forskellen ligger i, om medarbejderne ved, hvad de skal bede om, og om de kan tjekke svaret, før det går videre. Det er dét, kurset træner.",
        "Du lærer ikke Copilot ved at se video. Derfor slutter hver lektion med en opgave i øvemiljøet, hvor du skriver prompten selv og får feedback med det samme.",
      ],
    },
    cards: { title: "Det øver I med Copilot", items: [opgaver.referat, opgaver.mail, opgaver.regneark, opgaver.deling] },
    proof: { title: "Et kursusbevis, der kan tjekkes", body: "Når en medarbejder er færdig, får vedkommende et kursusbevis med navn, score og et unikt ID. QR-koden viser, at beviset er ægte, og lederen kan se, hvem på holdet der er færdige." },
    faq: [
      { q: "Er det kun et kursus i Copilot?", a: "Nej. Lektionerne viser Copilot, ChatGPT og Claude side om side, så holdet lærer det værktøj, I bruger. Bruger I Copilot, øver I i Copilot." },
      { q: "Hvor lang tid tager et Copilot-kursus?", a: faqTid.a },
      { q: "Foregår Copilot-kurset online?", a: "Ja. Alt foregår online i jeres eget tempo. I opretter holdet og sender ét link til kollegerne, og ingen skal installere noget." },
      faqPris,
      faqBevis,
      faqData,
    ],
    course: true,
    cta: { title: "Kom i gang med Copilot i dag", sub: "Første lektion tager 10 minutter. Ingen binding." },
  },
  {
    slug: "chatgpt-kursus",
    nav: "ChatGPT-kursus",
    metaTitle: "ChatGPT-kursus online på dansk",
    metaDescription: "Online ChatGPT-kursus på dansk til arbejdet. Du skriver prompten selv i øvemiljøet, får score og feedback med det samme og slutter med et kursusbevis.",
    label: "ChatGPT-kursus",
    h1: "ChatGPT-kursus til arbejdet",
    sub: "Lær at skrive prompts, der giver brugbare svar første gang. Du øver på mails, referater og tilbud, som dem du laver i forvejen.",
    points: ["På dansk, i dit eget tempo", "Du skriver prompten selv", "Score fra 0 til 100 og feedback"],
    intro: {
      title: "Fra at prøve ChatGPT til at bruge det",
      body: [
        "ChatGPT er AI-assistenten fra OpenAI. De fleste kan få et svar ud af den. Det svære er at få et svar, man kan bruge, uden at skrive det hele om bagefter.",
        "På kurset lærer du at fortælle, hvem modtageren er, hvad du vil opnå, og hvor langt svaret må være. Og du lærer at tjekke svaret, før du sender det videre.",
        "Hver lektion slutter med en opgave fra hverdagen. Du ser, hvad der virkede, og hvad du kan gøre bedre næste gang.",
      ],
    },
    cards: { title: "Det øver du med ChatGPT", items: [opgaver.mail, opgaver.referat, opgaver.deling, opgaver.regneark] },
    proof: { title: "Vis, hvad du har lært", body: "Når du er færdig, får du et kursusbevis med dit navn, din score og et unikt ID, som alle kan slå op. Sæt det på LinkedIn, eller send det til chefen." },
    faq: [
      { q: "Skal jeg kunne noget i forvejen?", a: "Nej. Du øver dig på opgaver, du kender fra din egen arbejdsdag, og du får feedback på hver prompt, du skriver." },
      { q: "Er kurset kun til ChatGPT?", a: "Nej. Lektionerne viser ChatGPT, Copilot og Claude side om side. Metoden er den samme, og du øver i det værktøj, du bruger." },
      { q: "Hvor lang tid tager et ChatGPT-kursus?", a: faqTid.a },
      { q: "Kan jeg tage kurset som privatperson?", a: `Ja. Privat koster ${privatPris}. om måneden inkl. moms, og du kan opsige, når du vil. Studerende og jobsøgende får halv pris.` },
      faqBevis,
      { q: "Kan hele holdet tage kurset?", a: `Ja. Erhverv koster ${enkelt}. pr. bruger om måneden ekskl. moms og ${fra}. fra 10 brugere, og lederen får et overblik over holdets fremskridt.` },
    ],
    course: true,
    cta: { title: "Skriv din første gode prompt i dag", sub: "Første lektion tager 10 minutter. Ingen binding." },
  },
  {
    slug: "claude-kursus",
    nav: "Claude-kursus",
    metaTitle: "Claude-kursus online på dansk",
    metaDescription: "Online kursus i Claude på dansk. Korte lektioner, opgaver i øvemiljøet med score og feedback, og et kursusbevis med unikt ID, når du er færdig.",
    label: "Claude-kursus",
    h1: "Claude-kursus på dansk",
    sub: "Lær at bruge Claude til tekster, referater og svar, du selv kan stå inde for. Korte lektioner, og en opgave efter hver.",
    points: ["Korte lektioner på dansk", "Opgaver fra din egen hverdag", "Kursusbevis med unikt ID"],
    intro: {
      title: "Kom godt i gang med Claude",
      body: [
        "Claude er AI-assistenten fra Anthropic. Den bruges blandt andet til at skrive, opsummere og gennemgå tekster.",
        "Her lærer du Claude på dansk i korte lektioner med video og tekst, og du prøver det selv med det samme i øvemiljøet.",
        "Bruger kollegerne Copilot eller ChatGPT, kan I stadig tage kurset sammen. Lektionerne viser de tre værktøjer side om side.",
      ],
    },
    cards: { title: "Det øver du med Claude", items: [opgaver.referat, opgaver.mail, opgaver.deling, opgaver.regneark] },
    proof: { title: "Et bevis med dit navn på", body: "Kursusbeviset viser, hvilket forløb du har taget, og hvornår. Det har dit navn, din score og et unikt ID, og QR-koden viser, at det er ægte." },
    faq: [
      { q: "Findes kurset i Claude på dansk?", a: "Ja. Alle lektioner er på dansk, med en kort video og tekst og en opgave i øvemiljøet bagefter." },
      { q: "Hvad er forskellen på Claude, ChatGPT og Copilot?", a: "Det er tre AI-assistenter fra tre firmaer: Anthropic, OpenAI og Microsoft. Lektionerne viser dem side om side, så du kan se forskellene på de samme opgaver." },
      { q: "Hvor lang tid tager et Claude-kursus?", a: faqTid.a },
      faqPris,
      faqBevis,
      faqData,
    ],
    course: true,
    cta: { title: "Prøv Claude på en rigtig opgave", sub: "Første lektion tager 10 minutter. Ingen binding." },
  },
  {
    slug: "ai-kursus-for-virksomheder",
    nav: "AI-kursus for virksomheder",
    metaTitle: "AI-kursus for virksomheder: online",
    metaDescription: "Online AI-kursus til hele holdet. 10 minutter om dagen på dansk, opgaver fra jeres egen hverdag, kursusbevis og et overblik til lederen. Ingen binding.",
    label: "AI-kursus for virksomheder",
    h1: "AI-kursus for virksomheder",
    sub: "AI-træning til hele holdet. Ti minutter om dagen på dansk, i det værktøj I bruger, og et overblik til lederen.",
    points: ["10 minutter om dagen, på dansk", "Opgaver fra jeres egen hverdag", "Kursusbevis og overblik til lederen"],
    intro: {
      title: "Et AI-kursus, holdet når at tage",
      body: [
        "En kursusdag er hurtigt glemt, hvis ingen bruger det bagefter. Her træner medarbejderne lidt ad gangen, mens de arbejder: en kort lektion og en opgave i øvemiljøet.",
        "I opretter holdet og sender ét link til kollegerne. Ingen skal installere noget, og lektionerne kan også tages på mobilen.",
        "Kurset dækker ChatGPT, Copilot og Claude side om side, så holdet lærer det værktøj, I allerede har.",
      ],
    },
    cards: {
      title: "Det får I som virksomhed",
      items: [
        { icon: "user", title: "Ét link til hele holdet", body: "Opret holdet, og invitér kollegerne med et link på mail. Første lektion tager 10 minutter." },
        { icon: "chart", title: "Overblik til lederen", body: "Se holdets score, hvem der er med, og hvem der er færdige. En rapport over holdet følger med." },
        { icon: "doc", title: "Kursusbevis til alle", body: "Hver medarbejder får et bevis med navn, score og et unikt ID, som kan tjekkes." },
        { icon: "lock", title: "Styr på data", body: "Hostet i EU med data i Frankfurt. I får en databehandleraftale med fra start." },
      ],
    },
    proof: { title: "Dokumentation til AI-forordningen", body: "Artikel 4 i AI-forordningen pålægger virksomheder, der bruger AI, at støtte medarbejdernes AI-kompetencer. Kursusbeviset og teamoverblikket viser, hvem der har lært hvad.", note: "artikel4" },
    faq: [
      { q: "Hvor mange skal være med?", a: `Fra 1 bruger. Erhverv koster ${enkelt}. pr. bruger om måneden ekskl. moms og ${fra}. fra 10 brugere, hvor telefonsupport også er med.` },
      { q: "Kan vi stoppe igen?", a: "Ja. Der er ingen binding, og I betaler pr. bruger pr. måned." },
      { q: "Hvilke AI-værktøjer lærer vi?", a: "ChatGPT, Copilot og Claude, side om side, så holdet lærer det værktøj, I bruger." },
      { q: "Hvor lang tid skal medarbejderne bruge?", a: faqTid.a },
      faqBevis,
      faqData,
    ],
    course: true,
    cta: { title: "Sæt holdet i gang i dag", sub: "Opret holdet, og send ét link. Ingen binding." },
  },
  {
    slug: "ai-forordningen-artikel-4",
    nav: "AI-forordningen artikel 4",
    metaTitle: "AI-forordningen artikel 4: AI-kompetencer",
    metaDescription: "Artikel 4 i AI-forordningen handler om AI-kompetencer (AI literacy) hos medarbejdere. Se hvad pligten betyder, og hvordan I dokumenterer det.",
    label: "AI-forordningen",
    h1: "AI-forordningens artikel 4: AI-kompetencer hos medarbejdere",
    sub: "Virksomheder, der bruger AI, skal støtte, at medarbejderne lærer at bruge det fornuftigt. Her er, hvad pligten betyder, og hvordan I kan vise, hvad I har gjort.",
    points: ["Pligten har gjaldt siden 2. februar 2025", "Gælder også, når I kun bruger AI", "Træning, I kan dokumentere"],
    intro: {
      title: "Hvad kræver artikel 4?",
      // VERIFY BEFORE GO-LIVE: the wording below follows the 2026 amendment (Digital Omnibus, Regulation (EU) 2026/1744)
      // as described by secondary sources on 2026-11-20. EUR-Lex could not be reached from the build environment, so
      // have the three paragraphs and the FAQ checked against the consolidated text by someone who can read it.
      body: [
        "Artikel 4 i EU's AI-forordning handler om AI-færdigheder, som mange kalder AI-kompetencer, og som hedder AI literacy på engelsk. Udbydere og idriftsættere af AI-systemer skal træffe foranstaltninger, der støtter udviklingen af AI-færdigheder hos deres personale og andre, der bruger AI-systemer på deres vegne.",
        "En idriftsætter er den, der bruger et AI-system i sit arbejde. En virksomhed, hvor medarbejderne bruger ChatGPT, Copilot eller Claude, er derfor omfattet. Pligten har gjaldt siden 2. februar 2025.",
        "Artiklen blev ændret i sommeren 2026. Den oprindelige tekst krævede et tilstrækkeligt niveau af AI-færdigheder. Det krav er taget ud, men pligten til at gøre noget står der stadig. Forordningen nævner ikke et bestemt kursus, så det er en god idé at kunne vise, hvad I har gjort.",
      ],
      source: { label: "Læs forordningen på EUR-Lex", href: "https://eur-lex.europa.eu/legal-content/DA/TXT/?uri=CELEX:32024R1689" },
    },
    cards: {
      title: "Sådan hjælper Mindforward",
      items: [
        { icon: "sparkle", title: "Træning i de værktøjer, I bruger", body: "Korte lektioner på dansk i ChatGPT, Copilot og Claude, med en opgave efter hver lektion." },
        { icon: "shield", title: "Hvad må deles med AI", body: "Medarbejderne øver sig i at fjerne navne, CPR-numre og adresser, før en tekst deles." },
        { icon: "doc", title: "Kursusbevis med ID", body: "Beviset viser navn, forløb, score og dato, og det kan tjekkes via QR-koden." },
        { icon: "chart", title: "Overblik over holdet", body: "Lederen ser, hvem der er færdige, og en rapport over holdet følger med." },
      ],
    },
    proof: { title: "Dokumentation, ikke certificering", body: "Kursusbeviset dokumenterer, at en medarbejder har gennemført træningen, og hvornår. Det er ikke en certificering efter AI-forordningen: artikel 4 indfører ikke nogen certificering. Siden her er heller ikke juridisk rådgivning: spørg jeres jurist, hvis I er i tvivl om, hvad der gælder for jer." },
    faq: [
      { q: "Hvad er AI literacy?", a: "AI literacy er det engelske ord for det, den danske lovtekst kalder AI-færdigheder, og som mange kalder AI-kompetencer: at man forstår nok om AI til at bruge det fornuftigt og kender mulighederne og risiciene." },
      { q: "Hvem gælder artikel 4 for?", a: "Udbydere og idriftsættere af AI-systemer. En virksomhed, hvor medarbejderne bruger AI-værktøjer i arbejdet, er idriftsætter og er derfor omfattet." },
      { q: "Hvornår trådte artikel 4 i kraft?", a: "Pligten har gjaldt siden 2. februar 2025. Artiklen blev ændret i sommeren 2026, men pligten er der stadig." },
      { q: "Hvad blev ændret i 2026?", a: "Den oprindelige tekst krævede et tilstrækkeligt niveau af AI-færdigheder. Efter ændringen skal virksomheder træffe foranstaltninger, der støtter udviklingen af AI-færdigheder. Pligten er altså ikke fjernet." },
      { q: "Kræver AI-forordningen et bestemt kursus eller certifikat?", a: "Nej. I skal træffe foranstaltninger, der støtter medarbejdernes AI-færdigheder, men forordningen nævner ikke et bestemt kursus eller certifikat. Det er en god idé at kunne dokumentere, hvem der har lært hvad." },
      { q: "Er Mindforwards kursusbevis en AI Act-certificering?", a: "Nej. Kursusbeviset dokumenterer gennemført træning med navn, score, dato og et unikt ID. Artikel 4 indfører ikke nogen certificering." },
    ],
    course: false,
    cta: { title: "Kom i gang med AI-kompetencerne", sub: "Opret holdet, og send ét link. Første lektion tager 10 minutter." },
  },
];

export const getLandingPage = (slug: string) => landingPages.find((p) => p.slug === slug);
