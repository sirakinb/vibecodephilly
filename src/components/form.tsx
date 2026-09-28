"use client";

import { ArrowRight, AtSign, Check, Link2, Loader2 } from "lucide-react";
import { useActionState, useState, type ReactNode } from "react";
import { submitForm, type FormState } from "@/app/actions";
import { links, nextEvent } from "@/data/site";

type Base = { name: string; label: string; hint?: string; required?: boolean };

export type Field =
  | (Base & { type: "text" | "email" | "url"; placeholder?: string; half?: boolean })
  | (Base & { type: "textarea"; placeholder?: string; max?: number })
  | (Base & { type: "chips"; options: string[]; single?: boolean });

export type FormSection = { title: string; fields: Field[] };

const control =
  "w-full rounded-lg border border-fg/15 bg-white text-[15px] text-fg placeholder:text-fg/35 outline-none transition " +
  "hover:border-fg/30 focus:border-pink focus:ring-4 focus:ring-pink/10 user-invalid:border-pink user-invalid:ring-4 user-invalid:ring-pink/10";

function Label({ field, htmlFor }: { field: Field; htmlFor?: string }) {
  const Tag = htmlFor ? "label" : "legend";
  return (
    <Tag htmlFor={htmlFor} className="mb-2 flex w-full items-baseline justify-between gap-3 text-[13px] font-medium">
      <span>{field.label}</span>
      {!field.required && <span className="text-[12px] font-normal text-fg/40">Optional</span>}
    </Tag>
  );
}

function TextArea({ field }: { field: Extract<Field, { type: "textarea" }> }) {
  const [count, setCount] = useState(0);
  const max = field.max ?? 600;
  return (
    <div className="relative">
      <textarea
        id={field.name}
        name={field.name}
        required={field.required}
        placeholder={field.placeholder}
        maxLength={max}
        rows={4}
        onChange={(e) => setCount(e.target.value.length)}
        className={`${control} block resize-y px-3.5 py-3 pb-7`}
      />
      <span className="pointer-events-none absolute right-3 bottom-2 text-[11px] text-fg/35 tabular-nums">
        {count}/{max}
      </span>
    </div>
  );
}

function Chips({ field }: { field: Extract<Field, { type: "chips" }> }) {
  return (
    <div className="flex flex-wrap gap-2">
      {field.options.map((o) => (
        <label key={o} className="cursor-pointer">
          <input
            type={field.single ? "radio" : "checkbox"}
            name={field.name}
            value={o}
            required={field.single && field.required}
            className="peer sr-only"
          />
          <span
            className="inline-flex items-center gap-1.5 rounded-full border border-fg/15 bg-white px-3.5 py-1.5 text-[13px] text-fg/75 transition
              hover:border-fg/35 peer-checked:border-fg peer-checked:bg-fg peer-checked:text-white peer-focus-visible:ring-4 peer-focus-visible:ring-pink/20
              [&>svg]:hidden peer-checked:[&>svg]:block"
          >
            <Check size={13} strokeWidth={2.5} />
            {o}
          </span>
        </label>
      ))}
    </div>
  );
}

function Input({ field }: { field: Extract<Field, { type: "text" | "email" | "url" }> }) {
  const Icon = field.type === "email" ? AtSign : field.type === "url" ? Link2 : null;
  return (
    <div className="relative">
      {Icon && <Icon size={15} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-fg/35" />}
      <input
        id={field.name}
        name={field.name}
        type={field.type}
        required={field.required}
        placeholder={field.placeholder}
        className={`${control} h-11 ${Icon ? "pl-10" : "pl-3.5"} pr-3.5`}
      />
    </div>
  );
}

function FieldRow({ field }: { field: Field }) {
  const wide = field.type === "text" || field.type === "email" || field.type === "url" ? !field.half : true;
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      {field.type === "chips" ? (
        <fieldset>
          <Label field={field} />
          <Chips field={field} />
        </fieldset>
      ) : (
        <>
          <Label field={field} htmlFor={field.name} />
          {field.type === "textarea" ? <TextArea field={field} /> : <Input field={field} />}
        </>
      )}
      {field.hint && <p className="mt-1.5 text-[12px] text-fg/45">{field.hint}</p>}
    </div>
  );
}

function Success({ title, body }: { title: string; body: string }) {
  return (
    <div className="px-6 py-14 text-center sm:px-10">
      <div className="mx-auto grid size-12 place-items-center rounded-full bg-pink/10 text-pink">
        <Check size={22} strokeWidth={2.5} />
      </div>
      <p className="display mt-5 text-2xl">{title}</p>
      <p className="mx-auto mt-2 max-w-sm text-[15px] text-fg/60">{body}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <a
          href={links.rsvp}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-fg px-4 py-2 text-[13px] font-medium text-white transition hover:bg-fg/85"
        >
          RSVP for {nextEvent.date}
        </a>
        <a
          href={links.instagram}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-fg/15 px-4 py-2 text-[13px] font-medium transition hover:border-fg/35"
        >
          Follow @vibecodephilly
        </a>
      </div>
    </div>
  );
}

export function SignupForm({
  kind,
  sections,
  submit,
  note,
  success,
}: {
  kind: string;
  sections: FormSection[];
  submit: string;
  note?: string;
  success: { title: string; body: string };
}) {
  const [state, action, pending] = useActionState<FormState, FormData>(submitForm, null);

  return (
    <div className="overflow-hidden rounded-2xl border border-fg/10 bg-white shadow-[0_1px_2px_rgba(17,19,24,0.04),0_24px_48px_-24px_rgba(17,19,24,0.18)]">
      {state?.ok ? (
        <Success {...success} />
      ) : (
        <form action={action}>
          <input type="hidden" name="kind" value={kind} />
          {sections.map((section, i) => (
            <div key={section.title} className="border-b border-fg/[0.07] px-5 py-7 sm:px-8">
              <p className="mb-5 flex items-center gap-2.5 text-[13px] font-medium">
                <span className="grid size-5 place-items-center rounded-full bg-fg/[0.06] font-mono text-[10px] text-fg/60">
                  {i + 1}
                </span>
                {section.title}
              </p>
              <div className="grid gap-5 sm:grid-cols-2">
                {section.fields.map((f) => (
                  <FieldRow key={f.name} field={f} />
                ))}
              </div>
            </div>
          ))}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-base-2/70 px-5 py-4 sm:px-8">
            <p className="text-[12px] text-fg/50">
              {state && !state.ok ? <span className="text-pink">{state.message}</span> : note}
            </p>
            <button
              type="submit"
              disabled={pending}
              className="inline-flex items-center gap-2 rounded-full bg-pink px-5 py-2.5 text-[13px] font-medium text-white transition hover:brightness-110 disabled:opacity-60"
            >
              {pending && <Loader2 size={15} className="animate-spin" />}
              {pending ? "Sending" : submit}
              {!pending && <ArrowRight size={15} />}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// Two-column block: intro on the left, the form card on the right.
export function FormBlock({
  id,
  eyebrow,
  title,
  intro,
  points,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  intro: ReactNode;
  points?: string[];
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-fg/10 bg-base-2/50 py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:px-8 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="label mb-3">{eyebrow}</p>
          <h2 className="display text-3xl md:text-4xl">{title}</h2>
          <div className="mt-4 text-[15px] text-fg/65">{intro}</div>
          {points && (
            <ul className="mt-8 space-y-3 border-t border-fg/10 pt-6 text-[14px]">
              {points.map((p) => (
                <li key={p} className="flex gap-2.5">
                  <Check size={16} className="mt-0.5 shrink-0 text-pink" strokeWidth={2.5} />
                  <span className="text-fg/75">{p}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
