"use client";

import Image from "next/image";
import { useActionState } from "react";
import { contactAction, type FormState } from "@/lib/actions";

// Contact page (Marco 2026-11-23): heading and intro top left, three promises and Marco's card bottom left, the form
// in a soft panel on the right with topic checkboxes. Same type scale and container as the price section.
const ink = "#0f0d0c";
const muted = "#4a4440";
const topics = ["AI-kursus til holdet", "Pilotforløb", "Priser og tilbud", "Demo af platformen", "Enterprise-aftale", "Andet"];
const promises = ["Svar inden for 1 hverdag", "Data i EU med databehandleraftale", "Ingen binding, I kan stoppe, når I vil"];
const input = "w-full rounded-[10px] border bg-white px-3.5 text-[0.9375rem] outline-none transition placeholder:text-[#6b625d] focus:border-[#f8400a] focus:ring-2 focus:ring-[#f8400a]/20";

export function KontaktSide() {
  const [state, action, pending] = useActionState<FormState, FormData>(contactAction, { ok: false });
  const e = state.errors ?? {};
  const err = (n: "name" | "email" | "message") => e[n] && <p id={`k-${n}-err`} className="mt-1.5 text-[0.8125rem]" style={{ color: "#b8452c" }}>{e[n]}</p>;
  return (
    <section className="py-[100px]" style={{ background: "#fff" }}>
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-12 px-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:gap-x-20 lg:px-[3.5vw]">
        <div className="flex min-w-0 flex-col">
          <h1 className="font-semibold leading-[1.05] tracking-[-0.03em] text-[clamp(2.25rem,1.6rem+1.8vw,3rem)]" style={{ color: ink }}>Kom i kontakt</h1>
          <p className="mt-4 max-w-[26rem] text-[1rem] leading-6" style={{ color: muted }}>Fortæl lidt om jeres hold, og hvad I gerne vil blive bedre til med AI. Så vender jeg tilbage.</p>
          <div className="mt-12 lg:mt-auto">
            <ul className="grid gap-3">
              {promises.map((t) => (
                <li key={t} className="flex items-center gap-3 text-[1rem]" style={{ color: muted }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden className="shrink-0" style={{ color: "#f8400a" }}><path d="m3 8.5 3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex items-center gap-4">
              <Image src="/img/marco-nielsen.jpg" alt="" width={52} height={52} className="size-[52px] rounded-full object-cover" />
              <div>
                <p className="text-[1.0625rem] font-medium" style={{ color: ink }}>Marco Nielsen</p>
                <p className="text-[0.9375rem]" style={{ color: muted }}>Founder og Succes Manager</p>
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-0 rounded-[16px] p-6 sm:p-7" style={{ background: "#f5f2ef" }}>
          {state.ok ? (
            <p role="status" className="flex min-h-[320px] items-center justify-center text-center text-[1.125rem] font-medium" style={{ color: ink }}>{state.message}</p>
          ) : (
            <form action={action} noValidate className="grid gap-5">
              <input className="hidden" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden />
              <div>
                <label htmlFor="k-name" className="sr-only">Navn</label>
                <input id="k-name" name="name" autoComplete="name" required placeholder="Navn *" defaultValue={state.values?.name} aria-invalid={!!e.name} aria-describedby={e.name ? "k-name-err" : undefined} className={`${input} h-11`} style={{ borderColor: "#e3ddd8", color: ink }} />
                {err("name")}
              </div>
              <div>
                <label htmlFor="k-email" className="sr-only">Mail</label>
                <input id="k-email" name="email" type="email" inputMode="email" autoComplete="email" required placeholder="Mail *" defaultValue={state.values?.email} aria-invalid={!!e.email} aria-describedby={e.email ? "k-email-err" : undefined} className={`${input} h-11`} style={{ borderColor: "#e3ddd8", color: ink }} />
                {err("email")}
              </div>
              <div>
                <label htmlFor="k-message" className="sr-only">Fortæl os om jeres hold</label>
                <textarea id="k-message" name="message" required rows={3} placeholder="Fortæl os lidt om jeres hold" defaultValue={state.values?.message} aria-invalid={!!e.message} aria-describedby={e.message ? "k-message-err" : undefined} className={`${input} resize-y py-3`} style={{ borderColor: "#e3ddd8", color: ink }} />
                {err("message")}
              </div>
              <fieldset className="mt-1">
                <legend className="text-[0.9375rem] font-medium" style={{ color: ink }}>Hvad kan vi hjælpe med?</legend>
                <div className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {topics.map((t) => (
                    <label key={t} className="flex cursor-pointer items-center gap-3 text-[0.9375rem]" style={{ color: ink }}>
                      <input type="checkbox" name="topics" value={t} className="size-[18px] shrink-0 cursor-pointer rounded-[5px] border accent-[#f8400a]" style={{ borderColor: "#d8d2cd" }} />
                      {t}
                    </label>
                  ))}
                </div>
              </fieldset>
              <button type="submit" disabled={pending} className="mt-1 h-11 w-full rounded-full text-[0.9375rem] font-semibold text-white transition hover:bg-black disabled:opacity-60" style={{ background: ink }}>{pending ? "Sender …" : "Send besked"}</button>
              {state.message && !state.ok && <p role="alert" className="text-[0.875rem]" style={{ color: "#b8452c" }}>{state.message}</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
