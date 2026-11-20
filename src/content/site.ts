// Everything brand- and company-specific lives here. Swap per project.
// Values in [BRACKETS] are placeholders that must be filled before launch (§7).

export const site = {
  name: "Mindforward",
  url: "https://mindforward.dk",
  locale: "da-DK",
  tagline: "Lær AI, der virker i din hverdag.",
  description:
    "Korte online kurser i AI og digitalt arbejde for medarbejdere i danske virksomheder.",
  company: {
    legalName: "Mindforward (Esther Gruppen ApS)",
    cvr: "[CVR 00000000]",
    address: "[Gadenavn 1, 8000 Aarhus C]",
    email: "kontakt@mindforward.dk",
    phone: "[+45 00 00 00 00]",
    responsePromise: "Svar inden for 1 hverdag",
    year: 2026,
  },
  founder: {
    name: "[Stifterens navn]",
    role: "Stifter",
    email: "[stifter@example.dk]",
  },
  // Off: the old alert was about the template's mail product (Marco 2026-10-30, option A).
  alert: {
    vis: false,
    id: "alert-2026-10",
    text: "Nyt: forslag til svar med AI.",
    linkLabel: "Se hvordan",
    href: "/platform#svar",
  },
  nav: [
    { label: "Kurser", href: "/#kurser" },
    { label: "Sådan virker det", href: "/#saadan" },
    { label: "Priser", href: "/#priser" },
  ],
  utilityNav: [
    { label: "Kontakt", href: "/kontakt" },
  ],
  footer: [
    {
      title: "Kurser",
      links: [
        { label: "Alle kurser", href: "/#kurser" },
        { label: "Copilot-kursus", href: "/copilot-kursus" },
        { label: "ChatGPT-kursus", href: "/chatgpt-kursus" },
        { label: "Claude-kursus", href: "/claude-kursus" },
      ],
    },
    {
      title: "Akademiet",
      links: [
        { label: "Sådan virker det", href: "/#saadan" },
        { label: "Priser", href: "/priser" },
        { label: "For virksomheder", href: "/ai-kursus-for-virksomheder" },
        { label: "AI-forordningen artikel 4", href: "/ai-forordningen-artikel-4" },
        { label: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Virksomhed",
      links: [
        { label: "Kontakt", href: "/kontakt" },
      ],
    },
    {
      title: "Juridisk",
      links: [
        { label: "Privatlivspolitik", href: "/privatliv" },
        { label: "Handelsbetingelser", href: "/vilkaar" },
        { label: "Cookies", href: "/cookies" },
      ],
    },
  ],
} as const;
