"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { neon } from "@neondatabase/serverless";
import { copy } from "@/content/copy.da";

// Server actions for the marketing forms. Wire to email/CRM/event log per project (§5.1).
// Honeypot + naive per-IP rate limit; swap the limiter for a shared store (e.g. Upstash) in production.

export type FormState = { ok: boolean; message?: string; errors?: Record<string, string>; values?: Record<string, string> };

const hits = new Map<string, number[]>();
async function rateLimited(key: string, max = 5, windowMs = 60_000) {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const k = `${key}:${ip}`;
  const now = Date.now();
  const list = (hits.get(k) ?? []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(k, list);
  return list.length > max;
}

const email = z.string().trim().email(copy.signup.errors.email);

const signupSchema = z.object({
  email,
  role: z.string().max(60).optional(),
  marketing: z.literal("on").optional(),
});

export async function signupAction(_: FormState, data: FormData): Promise<FormState> {
  if (data.get("company_website")) return { ok: true, message: copy.signup.sent }; // honeypot: pretend success
  const values = { email: String(data.get("email") ?? "") };
  if (await rateLimited("signup")) return { ok: false, message: "For mange forsøg. Prøv igen om et minut.", values };
  const parsed = signupSchema.safeParse(Object.fromEntries(data));
  if (!parsed.success) return { ok: false, errors: flatten(parsed.error), values };
  // TODO(project): create user, send magic link, log `user_signed_up` server-side, store first-touch UTM (§12.2).
  return { ok: true, message: copy.signup.sent };
}

const contactSchema = z.object({
  name: z.string().trim().min(1, copy.contact.errors.name).max(120),
  email: z.string().trim().email(copy.contact.errors.email),
  message: z.string().trim().min(5, copy.contact.errors.message).max(4000),
  company: z.string().trim().max(200).optional(),
  phone: z.string().trim().max(40).optional(),
  team_size: z.string().trim().max(40).optional(),
});

export async function contactAction(_: FormState, data: FormData): Promise<FormState> {
  if (data.get("company_website")) return { ok: true, message: copy.contact.sent };
  const values = { name: String(data.get("name") ?? ""), email: String(data.get("email") ?? ""), message: String(data.get("message") ?? "") };
  if (await rateLimited("contact")) return { ok: false, message: "For mange forsøg. Prøv igen om et minut.", values };
  const parsed = contactSchema.safeParse(Object.fromEntries(data));
  if (!parsed.success) return { ok: false, errors: flatten(parsed.error), values };
  // Marco 2026-11-11: messages are stored in the database (Neon project "mindforward-hjemmeside", table contact_messages).
  const url = process.env.DATABASE_URL;
  if (!url) return { ok: false, message: "Beskeden kunne ikke sendes lige nu. Skriv til kontakt@mindforward.dk.", values };
  const m = parsed.data;
  // Contact page (Marco 2026-11-23): the ticked "Hvad kan vi hjælpe med?" topics go in front of the message.
  const topics = data.getAll("topics").map(String).filter(Boolean).slice(0, 10);
  if (topics.length) m.message = `Emner: ${topics.join(", ")}\n\n${m.message}`.slice(0, 4200);
  try {
    const sql = neon(url);
    await sql`insert into contact_messages (name, email, company, phone, team_size, message)
      values (${m.name}, ${m.email}, ${m.company || null}, ${m.phone || null}, ${m.team_size || null}, ${m.message})`;
  } catch (err) {
    console.error("contact_messages insert failed", err);
    return { ok: false, message: "Beskeden kunne ikke sendes lige nu. Skriv til kontakt@mindforward.dk.", values };
  }
  return { ok: true, message: copy.contact.sent };
}

const leadSchema = z.object({ email });

export async function leadMagnetAction(_: FormState, data: FormData): Promise<FormState> {
  if (data.get("company_website")) return { ok: true, message: "Tjeklisten er på vej til din indbakke." };
  const values = { email: String(data.get("email") ?? "") };
  if (await rateLimited("lead")) return { ok: false, message: "For mange forsøg. Prøv igen om et minut.", values };
  const parsed = leadSchema.safeParse(Object.fromEntries(data));
  if (!parsed.success) return { ok: false, errors: flatten(parsed.error), values };
  // TODO(project): send the checklist (service mail only, no marketing without opt-in), log `lead_magnet_requested`.
  return { ok: true, message: "Tjeklisten er på vej til din indbakke." };
}

function flatten(err: z.ZodError) {
  const out: Record<string, string> = {};
  for (const i of err.issues) {
    const k = String(i.path[0] ?? "form");
    if (!out[k]) out[k] = i.message;
  }
  return out;
}
