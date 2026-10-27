"use client";

import { useActionState } from "react";
import { copy } from "@/content/copy.da";
import { contactAction, type FormState } from "@/lib/actions";
import { Icon } from "@/components/ui/Icon";

export function ContactForm() {
  const c = copy.contact;
  const [state, action, pending] = useActionState<FormState, FormData>(contactAction, { ok: false });
  const e = state.errors ?? {};

  if (state.ok) {
    return (
      <p role="status" className="flex items-center gap-3 rounded-[var(--r-xl)] border border-line bg-surface-raised p-8 t-h4 shadow-2">
        <Icon name="check" className="text-success" /> {state.message}
      </p>
    );
  }

  const field = (name: "name" | "email" | "message", label: string, props: Record<string, unknown>) => (
    <div className="field">
      <label htmlFor={`c-${name}`}>{label}</label>
      {name === "message" ? (
        <textarea id={`c-${name}`} name={name} className="input" defaultValue={state.values?.[name]} aria-invalid={!!e[name]} aria-describedby={e[name] ? `c-${name}-err` : undefined} {...props} />
      ) : (
        <input id={`c-${name}`} name={name} className="input" defaultValue={state.values?.[name]} aria-invalid={!!e[name]} aria-describedby={e[name] ? `c-${name}-err` : undefined} {...props} />
      )}
      {e[name] && <p id={`c-${name}-err`} className="field-error">{e[name]}</p>}
    </div>
  );

  return (
    <form action={action} noValidate className="grid gap-5 rounded-[var(--r-xl)] border border-line bg-surface-raised p-6 shadow-2 md:p-8">
      {field("name", c.name, { autoComplete: "name", required: true })}
      {field("email", c.email, { type: "email", inputMode: "email", autoComplete: "email", required: true })}
      {field("message", c.message, { required: true })}
      <input className="hp" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden />
      <button type="submit" className="btn btn-primary" disabled={pending} data-loading={pending}>{pending ? "Sender …" : c.button}</button>
      {state.message && !state.ok && <p role="alert" className="field-error">{state.message}</p>}
      <p className="t-small text-muted">{"Vi svarer inden for 1 hverdag."}</p>
    </form>
  );
}
