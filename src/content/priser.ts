// Prices on the front page (Marco 2026-11-11). Same content in every package; only the support differs.
// Erhverv: ekskl. moms. Privat: inkl. moms.
export type Plan = { id: string; name: string; price: string; unit: string; tab?: string; badge?: string; items: string[]; support: string; cta: string; href: "business" | "private" | "contact"; featured?: boolean };

const same = ["Alle moduler i niveau 1", "Øvemiljø med opgaver og score", "Kursusbevis med ID", "Teamoverblik og rapport", "Databehandleraftale", "Opsig, når I vil"];

export const erhverv: Plan[] = [
  { id: "enkelt", name: "Enkelt bruger", price: "69 kr", unit: "/ bruger/md. ekskl. moms", items: same, support: "Chat-support", cta: "Kom i gang", href: "business" },
  { id: "ti", name: "10 brugere", price: "55 kr", unit: "/ bruger/md. ekskl. moms", tab: "Rabat fra 10 brugere", badge: "Spar 20 %", items: same, support: "Telefonsupport", cta: "Kom i gang", href: "business", featured: true },
  { id: "enterprise", name: "Enterprise", price: "Efter aftale", unit: "", items: same, support: "Telefonsupport", cta: "Tal med os", href: "contact" },
];

const samePrivat = ["Alle moduler i niveau 1", "Øvemiljø med opgaver og score", "Kursusbevis med ID", "Opsig, når du vil"];

export const privat: Plan[] = [
  { id: "enkelt", name: "Enkelt bruger", price: "69 kr", unit: "/ md. inkl. moms", items: samePrivat, support: "Chat-support", cta: "Kom i gang", href: "private" },
  { id: "ven", name: "Med en ven", price: "109 kr", unit: "/ md. for 2 inkl. moms", tab: "To personer · 54,50 kr. hver", badge: "Spar 21 %", items: [...samePrivat, "Jeres egen konto hver"], support: "Chat-support", cta: "Kom i gang", href: "private", featured: true },
  { id: "studie", name: "Studerende og jobsøgende", price: "34,50 kr", unit: "/ md. inkl. moms", items: [...samePrivat, "Halv pris med studiemail eller bevis"], support: "Chat-support", cta: "Kom i gang", href: "private" },
];
