"use server";

import { z } from "zod";
import { headers } from "next/headers";
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
});

export async function contactAction(_: FormState, data: FormData): Promise<FormState> {
  if (data.get("company_website")) return { ok: true, message: copy.contact.sent };
  const values = { name: String(data.get("name") ?? ""), email: String(data.get("email") ?? ""), message: String(data.get("message") ?? "") };
  if (await rateLimited("contact")) return { ok: false, message: "For mange forsøg. Prøv igen om et minut.", values };
  const parsed = contactSchema.safeParse(Object.fromEntries(data));
  if (!parsed.success) return { ok: false, errors: flatten(parsed.error), values };
  // TODO(project): send to inbox/CRM, log `contact_submitted`.
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
