// Everything brand- and company-specific lives here. Swap per project.
// Values in [BRACKETS] are placeholders that must be filled before launch (§7).

export const site = {
  name: "Mindforward",
  url: "https://example.dk",
  locale: "da-DK",
  tagline: "Lær AI, der virker i din hverdag.",
  description:
    "Korte online kurser i AI og digitalt arbejde for medarbejdere i danske virksomheder.",
  company: {
    legalName: "[Firmanavn ApS]",
    cvr: "[CVR 00000000]",
    address: "[Gadenavn 1, 8000 Aarhus C]",
    email: "hej@example.dk",
    phone: "[+45 00 00 00 00]",
    responsePromise: "Svar inden for 1 hverdag",
    year: 2026,
  },
  founder: {
    name: "[Stifterens navn]",
    role: "Stifter",
    email: "[stifter@example.dk]",
  },
  alert: {
    id: "alert-2026-10",
    text: "Nyt: forslag til svar med AI.",
    linkLabel: "Se hvordan",
    href: "/platform#svar",
  },
  nav: [
    { label: "Kurser", href: "/#kurser" },
    { label: "Sådan virker det", href: "/#saadan" },
    { label: "Priser", href: "/#priser" },
    { label: "Om os", href: "/#om-os" },
  ],
  utilityNav: [
    { label: "Blog", href: "/blog" },
    { label: "Sikkerhed", href: "/sikkerhed" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  footer: [
    {
      title: "Kurser",
      links: [
        { label: "Alle kurser", href: "/#kurser" },
        { label: "AI på arbejdet", href: "/kurser/ai-paa-arbejdet" },
        { label: "Gode prompts", href: "/kurser/gode-prompts" },
        { label: "AI og GDPR", href: "/kurser/data-og-gdpr" },
      ],
    },
    {
      title: "Akademiet",
      links: [
        { label: "Sådan virker det", href: "/#saadan" },
        { label: "Priser", href: "/priser" },
        { label: "For virksomheder", href: "/priser#priser" },
      ],
    },
    {
      title: "Virksomhed",
      links: [
        { label: "Om os", href: "/om-os" },
        { label: "Kunder", href: "/kunder" },
        { label: "Kontakt", href: "/kontakt" },
        { label: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Juridisk",
      links: [
        { label: "Privatlivspolitik", href: "/privatliv" },
        { label: "Vilkår", href: "/vilkaar" },
        { label: "Cookies", href: "/privatliv#cookies" },
      ],
    },
  ],
} as const;
