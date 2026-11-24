"use client";

import { useActionState } from "react";
import { newsletterAction, type FormState } from "@/lib/actions";
import { GrebBtn } from "@/components/ui/GrebBtn";

// Newsletter card between the last section and the footer (Marco 2026-11-23, floating since 2026-11-24).
export function NewsletterBand() {
  const [state, action, pending] = useActionState<FormState, FormData>(newsletterAction, { ok: false });
  return (
    // Marco 2026-11-24: a floating card that lies over both the contact section above and the footer below
    // (negative margins on both sides; the footer gets matching top padding).
    <section aria-labelledby="nyhedsbrev-titel" className="relative z-10 -mb-[84px] -mt-[84px] max-sm:-mb-[60px] max-sm:-mt-[60px] text-white">
      <div className="flex w-full flex-col gap-6 px-6 py-9 sm:px-[3.5vw] lg:flex-row lg:items-center lg:justify-between" style={{ background: "radial-gradient(120% 140% at 0% 0%, #2a1c17 0%, #0f0a09 60%)", boxShadow: "inset 0 1.5px 0 rgba(255,255,255,0.18), inset 0 14px 24px -14px rgba(255,255,255,0.07), 0 -2px 4px rgba(20,13,11,0.12), 0 -14px 28px -10px rgba(20,13,11,0.28), 0 -36px 60px -30px rgba(20,13,11,0.25), 0 24px 48px -16px rgba(20,13,11,0.55)" }}>
        <div>
          <h2 id="nyhedsbrev-titel" className="text-[1.5rem] font-semibold tracking-[-0.02em]" style={{ color: "#fff" }}>Tilmeld dig vores nyhedsbrev</h2>
          <p className="mt-1.5 text-[0.9375rem] text-white/60">Nyt om AI på arbejdet, nye kurser og gode tips. Afmeld når som helst.</p>
        </div>
        {state.ok ? (
          <p role="status" className="text-[1rem] font-medium">{state.message}</p>
        ) : (
          <form action={action} noValidate className="w-full lg:max-w-[480px]">
            <input className="hidden" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden />
            <div className="flex flex-col gap-2 rounded-[22px] bg-white/[0.06] p-1.5 ring-1 ring-white/15 sm:flex-row sm:items-center sm:rounded-full">
              <label htmlFor="nl-email" className="sr-only">Din mail</label>
              <input id="nl-email" name="email" type="email" inputMode="email" autoComplete="email" required placeholder="Din mail" defaultValue={state.values?.email} aria-invalid={!!state.errors?.email} aria-describedby={state.errors?.email ? "nl-err" : undefined} className="h-11 min-w-0 flex-1 bg-transparent px-4 text-[0.9375rem] text-white outline-none placeholder:text-white/45" />
              <GrebBtn disabled={pending} className="greb-btn--light">{pending ? "Sender …" : "Tilmeld"}</GrebBtn>
            </div>
            {(state.errors?.email || state.message) && <p id="nl-err" role="alert" className="mt-2 px-2 text-[0.8125rem] text-[#ffb59e]">{state.errors?.email ?? state.message}</p>}
          </form>
        )}
      </div>
    </section>
  );
}
