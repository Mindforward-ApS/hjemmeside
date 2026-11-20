"use server";

// Waitlist (Marco 2026-11-19): every email counts as a sign-up; name and phone can be added afterwards. Hold 1 has
// 100 places. Stored in Neon (DATABASE_URL, project mindforward-hjemmeside, table waitlist).
import { neon } from "@neondatabase/serverless";
import { after } from "next/server";
import { z } from "zod";
import { SPOTS } from "./spots";

const db = () => {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL missing");
  return neon(url);
};

// Slack message for every new sign-up and every added name/phone (Marco 2026-11-19). Incoming webhook in
// SLACK_WAITLIST_WEBHOOK_URL; sent after the response so the visitor never waits on Slack, and a Slack outage
// never blocks a sign-up.
function notifySlack(text: string) {
  const url = process.env.SLACK_WAITLIST_WEBHOOK_URL;
  if (!url) return;
  after(async () => {
    try {
      await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }) });
    } catch (err) {
      console.error("waitlist slack notify failed", err);
    }
  });
}

export async function waitlistCount(): Promise<number> {
  const rows = (await db()`select count(*)::int as n from waitlist`) as { n: number }[];
  return rows[0]?.n ?? 0;
}

const joinSchema = z.object({ email: z.string().trim().toLowerCase().email().max(254) });
export async function joinWaitlist(input: { email: string }): Promise<{ ok: boolean; count: number; position?: number; error?: string }> {
  const parsed = joinSchema.safeParse(input);
  if (!parsed.success) return { ok: false, count: await waitlistCount(), error: "Skriv en gyldig e-mailadresse." };
  const sql = db();
  // Idempotent: the same email twice keeps its first place.
  const inserted = (await sql`insert into waitlist (email, source) values (${parsed.data.email}, 'venteliste') on conflict (email) do nothing returning id`) as { id: number }[];
  const rows = (await sql`select count(*)::int as position from waitlist where id <= (select id from waitlist where email = ${parsed.data.email})`) as { position: number }[];
  const count = await waitlistCount();
  if (inserted.length) notifySlack(`:tada: Ny på ventelisten (nr. ${rows[0]?.position ?? "?"}): ${parsed.data.email} · ${Math.max(0, SPOTS - count)} af ${SPOTS} pladser tilbage`);
  return { ok: true, count, position: rows[0]?.position };
}

const detailsSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  name: z.string().trim().max(120).optional(),
  phone: z.string().trim().max(40).regex(/^[+\d\s()-]*$/).optional(),
});
export async function addDetails(input: { email: string; name?: string; phone?: string }): Promise<{ ok: boolean; error?: string }> {
  const parsed = detailsSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Tjek navn og telefonnummer." };
  const d = parsed.data;
  if (d.name || d.phone) notifySlack(`:bust_in_silhouette: ${d.email} tilføjede${d.name ? ` navn: ${d.name}` : ""}${d.phone ? ` · tlf: ${d.phone}` : ""}`);
  await db()`update waitlist set name = coalesce(nullif(${d.name ?? ""}, ''), name), phone = coalesce(nullif(${d.phone ?? ""}, ''), phone) where email = ${d.email}`;
  return { ok: true };
}
