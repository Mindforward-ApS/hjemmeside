"use client";

import { useActionState, useState } from "react";
import { copy } from "@/content/copy.da";
import { leadMagnetAction, type FormState } from "@/lib/actions";
import { Icon } from "@/components/ui/Icon";

// Second conversion for not-ready visitors (§4.11). Inline, never a popup.
export function SoftOffer() {
  const o = copy.home.offer;
  const [state, action, pending] = useActionState<FormState, FormData>(leadMagnetAction, { ok: false });
  const [touched, setTouched] = useState(false);
  const err = state.errors?.email;

  return (
    <section className="pad-dense" aria-labelledby="offer-title">
      <div className="container-wide">
        <div className="grid gap-8 rounded-[var(--r-2xl)] border border-line-strong bg-surface p-6 md:grid-cols-[1fr_1.1fr] md:items-center md:p-10">
          <div className="flex gap-5">
            <span className="hidden size-14 shrink-0 place-items-center rounded-[var(--r-lg)] bg-accent-soft text-accent sm:grid" aria-hidden>
              <Icon name="doc" size={26} />
            </span>
            <div>
              <h2 id="offer-title" className="t-h3">{o.title}</h2>
              <p className="mt-2 t-body text-muted">{o.body}</p>
            </div>
          </div>
          {state.ok ? (
            <p role="status" className="flex items-center gap-3 rounded-[var(--r-md)] bg-accent-soft p-4 t-body font-medium text-heading">
              <Icon name="check" className="text-success" /> {state.message}
            </p>
          ) : (
            <form action={action} noValidate className="grid gap-2">
              <div className="flex flex-col gap-2 sm:flex-row">
                <label htmlFor="offer-email" className="sr-only">Mail</label>
                <input
                  id="offer-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  placeholder={o.placeholder}
                  defaultValue={state.values?.email}
                  aria-invalid={!!err && !touched}
                  aria-describedby={err ? "offer-err" : "offer-note"}
                  onChange={() => setTouched(true)}
                  className="input flex-1"
                />
                <input className="hp" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden />
                <button type="submit" className="btn btn-primary" data-loading={pending} disabled={pending} onClick={() => setTouched(false)}>
                  {pending ? "Sender …" : o.cta}
                </button>
              </div>
              <p aria-live="polite" className="min-h-5">
                {err && !touched ? <span id="offer-err" className="field-error">{err}</span> : <span id="offer-note" className="field-hint">{state.message ?? o.note}</span>}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
