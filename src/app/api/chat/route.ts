import { neon } from "@neondatabase/serverless";
import { z } from "zod";

// Website chat (Marco 2026-11-24). With ANTHROPIC_API_KEY set, Claude answers from the facts below. Without it, the
// chat still works: it asks for a mail address and saves the conversation as a contact message, so nobody is ignored.
const MODEL = "claude-haiku-4-5-20251001";

const FACTS = `Du er MIND, Mindforwards venlige assistent på mindforward.dk. Svar kort (højst 3–4 sætninger), på dansk, i du-form.
Fakta (opfind aldrig andet):
- Mindforward er AI-træning til hele holdet: korte lektioner på dansk (ca. 10 min), et øvemiljø med opgaver fra egen hverdag, score og feedback, kursusbevis og overblik til lederen.
- Værktøjer: ChatGPT, Microsoft Copilot og Claude, på lige fod.
- Priser: 69 kr. pr. bruger pr. måned for enkelt bruger; 55 kr. pr. bruger pr. måned fra 10 brugere; Enterprise efter aftale. Ekskl. moms. 7 dages gratis prøveperiode. Ingen binding.
- Lanceringstilbud: de første 20 virksomheder får 50 % rabat det første år.
- Data hostes i EU (Frankfurt), og virksomheder får en databehandleraftale.
- Kontakt: kontakt@mindforward.dk, telefon 30 12 70 10. Svar inden for 1 hverdag.
Hvis du ikke kender svaret, eller kunden vil have et tilbud eller en demo, så bed om navn og mail, så Marco vender tilbage.`;

const schema = z.object({
  messages: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().min(1).max(2000) })).min(1).max(30),
}).strict();

const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now(), list = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  list.push(now); hits.set(ip, list);
  return list.length > 12;
}

async function save(messages: { role: string; content: string }[]) {
  const url = process.env.DATABASE_URL;
  const email = messages.map((m) => m.content).join(" ").match(/[^\s@]+@[^\s@]+\.[^\s@]+/)?.[0];
  if (!url || !email) return;
  const transcript = messages.map((m) => `${m.role === "user" ? "Besøgende" : "MIND"}: ${m.content}`).join("\n").slice(0, 4000);
  await neon(url)`insert into contact_messages (name, email, message) values ('Chat på hjemmesiden', ${email}, ${transcript})`.catch(() => {});
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (limited(ip)) return Response.json({ reply: "Du skriver lidt hurtigt. Prøv igen om et øjeblik." }, { status: 429 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ reply: "Beskeden kunne ikke læses." }, { status: 400 });
  const { messages } = parsed.data;
  await save(messages);

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    const hasMail = /[^\s@]+@[^\s@]+\.[^\s@]+/.test(messages.map((m) => m.content).join(" "));
    return Response.json({ reply: hasMail ? "Tak! Marco har fået din besked og svarer dig inden for 1 hverdag." : "Tak for din besked! Skriv din mail her i chatten, så svarer Marco dig inden for 1 hverdag. Du kan også ringe på 30 12 70 10." });
  }
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: MODEL, max_tokens: 400, system: FACTS, messages }),
    });
    if (!r.ok) throw new Error(String(r.status));
    const data = await r.json();
    const reply = (data.content ?? []).filter((b: { type: string }) => b.type === "text").map((b: { text: string }) => b.text).join("").trim();
    return Response.json({ reply: reply || "Det må jeg lige finde ud af. Skriv din mail, så vender Marco tilbage." });
  } catch {
    return Response.json({ reply: "Jeg kan ikke svare lige nu. Skriv din mail, så vender Marco tilbage, eller ring på 30 12 70 10." });
  }
}
