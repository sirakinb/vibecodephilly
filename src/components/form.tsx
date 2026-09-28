"use client";

import { useActionState } from "react";
import { submitForm, type FormState } from "@/app/actions";

export type Field =
  | { name: string; label: string; type: "text" | "email" | "url"; required?: boolean; placeholder?: string; half?: boolean }
  | { name: string; label: string; type: "textarea"; required?: boolean; placeholder?: string }
  | { name: string; label: string; type: "chips"; options: string[]; single?: boolean };

const input =
  "w-full rounded-lg border border-fg/15 bg-base-2 px-4 py-3 text-fg placeholder:text-fg/30 outline-none transition focus:border-pink";

export function SignupForm({ kind, fields, submit }: { kind: string; fields: Field[]; submit: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(submitForm, null);

  if (state?.ok) {
    return (
      <div className="rounded-2xl border border-fg/10 bg-base-2 p-10 text-center">
        <p className="display text-4xl">
          You&apos;re in<span className="text-pink">.</span>
        </p>
        <p className="mt-3 text-fg/60">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="grid gap-5 rounded-2xl border border-fg/10 bg-base-2/50 p-6 md:grid-cols-2 md:p-10">
      <input type="hidden" name="kind" value={kind} />
      {fields.map((f) => {
        const span = f.type === "text" || f.type === "email" || f.type === "url" ? (f.half ? "" : "md:col-span-2") : "md:col-span-2";
        return (
          <div key={f.name} className={span}>
            {f.type === "chips" ? (
              <fieldset>
                <legend className="label mb-3">{f.label}</legend>
                <div className="flex flex-wrap gap-2">
                  {f.options.map((o) => (
                    <label key={o} className="cursor-pointer">
                      <input type={f.single ? "radio" : "checkbox"} name={f.name} value={o} className="peer sr-only" />
                      <span className="inline-block rounded-full border border-fg/15 px-4 py-2 text-sm text-fg/70 transition peer-checked:border-pink peer-checked:bg-pink peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-pink">
                        {o}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ) : (
              <label className="block">
                <span className="label mb-2 block">
                  {f.label}
                  {f.required && <span className="text-pink"> *</span>}
                </span>
                {f.type === "textarea" ? (
                  <textarea name={f.name} required={f.required} placeholder={f.placeholder} rows={4} className={input} />
                ) : (
                  <input name={f.name} type={f.type} required={f.required} placeholder={f.placeholder} className={input} />
                )}
              </label>
            )}
          </div>
        );
      })}
      <div className="flex flex-col items-start gap-3 md:col-span-2">
        {state && !state.ok && <p className="text-sm text-pink">{state.message}</p>}
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-pink px-7 py-3 text-sm font-medium text-white transition hover:brightness-110 disabled:opacity-50"
        >
          {pending ? "Sending…" : submit}
        </button>
      </div>
    </form>
  );
}
