"use client";

import { useActionState, useState } from "react";
import { copy } from "@/content/copy.da";
import { signupAction, type FormState } from "@/lib/actions";
import { Icon } from "@/components/ui/Icon";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

// Ask for the minimum (§4.4). Validate on blur; consent unticked; outcome-named button.
export function SignupForm() {
  const s = copy.signup;
  const [state, action, pending] = useActionState<FormState, FormData>(signupAction, { ok: false });
  const [blurErr, setBlurErr] = useState<string | null>(null);
  const err = blurErr ?? state.errors?.email ?? null;

  if (state.ok) {
    return (
      <div role="status" className="rounded-[var(--r-xl)] border border-line bg-surface-raised p-8 text-center shadow-2">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-accent-soft text-accent"><Icon name="mail" size={26} /></span>
        <p className="mt-5 t-h3">{state.message}</p>
        <p className="mt-2 t-small text-muted">Kan du ikke finde den? Kig i spam, eller skriv til os.</p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="grid gap-6 rounded-[var(--r-xl)] border border-line bg-surface-raised p-6 shadow-2 md:p-8">
      <div className="field">
        <label htmlFor="su-email">{s.email}</label>
        <input
          id="su-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="off"
          spellCheck={false}
          required
          defaultValue={state.values?.email}
          aria-invalid={!!err}
          aria-describedby={err ? "su-email-err" : "su-email-hint"}
          onBlur={(e) => setBlurErr(e.currentTarget.value && !isEmail(e.currentTarget.value) ? s.errors.email : null)}
          onChange={() => blurErr && setBlurErr(null)}
          className="input"
        />
        {err ? <p id="su-email-err" className="field-error">{err}</p> : <p id="su-email-hint" className="field-hint">{s.emailHint}</p>}
      </div>

      <div className="field">
        <label htmlFor="su-role">{s.role}</label>
        <select id="su-role" name="role" className="input appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23667%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[right_14px_center] bg-no-repeat pr-10" defaultValue="">
          <option value="">Vælg …</option>
          {s.roles.map((r) => <option key={r}>{r}</option>)}
        </select>
      </div>

      <label className="flex cursor-pointer items-start gap-3 t-small text-text">
        <input type="checkbox" name="marketing" className="mt-0.5 size-5 shrink-0 accent-[var(--accent)]" />
        {s.consent}
      </label>

      <input className="hp" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden />

      <button type="submit" className="btn btn-primary w-full" disabled={pending} data-loading={pending}>
        {pending ? s.sending : s.button}
      </button>
      {state.message && !state.ok && <p role="alert" className="field-error">{state.message}</p>}

      <ol className="grid gap-2 border-t border-line pt-5">
        {s.steps.map((step, i) => (
          <li key={step} className="flex items-center gap-3 t-small text-muted">
            <span className="tnum grid size-6 shrink-0 place-items-center rounded-full bg-surface-sunk text-[0.75rem] font-semibold text-heading">{i + 1}</span>
            {step}
          </li>
        ))}
      </ol>
    </form>
  );
}
