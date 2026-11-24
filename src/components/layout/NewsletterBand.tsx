"use client";

import { useActionState } from "react";
import { newsletterAction, type FormState } from "@/lib/actions";
import { GrebBtn } from "@/components/ui/GrebBtn";

// Newsletter card between the last section and the footer (Marco 2026-11-23, floating since 2026-11-24).
export function NewsletterBand() {
  const [state, action, pending] = useActionState<FormState, FormData>(newsletterAction, { ok: false });
  return (
    // Marco 2026-11-24: part of the footer, same brown, no overlap; a hairline below separates it from the links.
    <section aria-labelledby="nyhedsbrev-titel" className="text-white" style={{ background: "#201613" }}>
      <div className="flex w-full flex-col gap-6 border-b border-white/10 px-6 pb-12 pt-16 sm:px-[3.5vw] lg:flex-row lg:items-center lg:justify-between">
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
