"use client";

import { useState } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { AiPicker, assistants } from "@/components/night/AiPicker";

// "Use the AI you already know": pick Copilot, Claude or ChatGPT (AiPicker), then four cards on how Fjord uses it.
const cards: { icon: IconName; title: string; body: string }[] = [
  { icon: "sparkle", title: "Et svarforslag på sekunder", body: "AI'en læser henvendelsen og skriver et udkast. Du retter det til og sender." },
  { icon: "user", title: "Det lyder som dig", body: "Fjord giver AI'en dine skabeloner og din tone, så svaret ikke lyder som en robot." },
  { icon: "lock", title: "Kun det nødvendige sendes", body: "AI'en får kun den henvendelse, du arbejder med. [Verificér: ingen træning på dine data.]" },
  { icon: "check", title: "Du godkender altid", body: "Intet bliver sendt, før du har set det. Forslag er tydeligt markeret som AI." },
];

export function NightChannels() {
  const [ai, setAi] = useState(1); // Claude in the centre by default
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <span aria-hidden className="n-horizon top-0 opacity-60" />
      <div aria-hidden className="pointer-events-none absolute inset-x-[15%] top-0 h-56 bg-[radial-gradient(ellipse_at_top,oklch(0.68_0.17_28/0.22),transparent_70%)]" />
      <div className="container-content relative text-center">
        {/* AI assistants: the chosen one sits in the centre and glows */}
        <AiPicker value={ai} onChange={setAi} />
        <p className="mt-3 text-[0.875rem] text-muted" aria-live="polite">Virker med {assistants[ai].name}</p>
        <h2 className="n-display mx-auto mt-10 max-w-[44rem]" style={{ fontSize: "clamp(2rem, 1rem + 2.4vw, 3.25rem)" }}>Brug den AI, du allerede kender</h2>
        <p className="mx-auto mt-5 max-w-[34rem] text-[1.0625rem] text-muted">Vælg Copilot, Claude eller ChatGPT. Fjord giver den henvendelsen og din tone, så forslaget lyder som dig.</p>
      </div>
      <ul className="container-content relative mt-14 grid gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <li key={c.title} className="n-glass flex gap-4 rounded-[1.5rem] p-6">
            <span className="grid size-12 shrink-0 place-items-center rounded-full text-white" style={{ background: "radial-gradient(circle at 35% 30%, oklch(0.78 0.13 36), oklch(0.5 0.15 24))" }}><Icon name={c.icon} size={20} /></span>
            <div>
              <h3 className="text-[1.0625rem] font-medium text-heading">{c.title}</h3>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{c.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
