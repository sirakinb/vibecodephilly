"use server";

export type FormState = { ok: boolean; message: string } | null;

const kinds = ["talent", "partner", "speak", "showcase"] as const;
type Kind = (typeof kinds)[number];

export async function submitForm(_prev: FormState, formData: FormData): Promise<FormState> {
  const kind = formData.get("kind") as Kind;
  if (!kinds.includes(kind)) return { ok: false, message: "Unknown form." };

  const email = String(formData.get("email") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  if (!name || !/^\S+@\S+\.\S+$/.test(email)) {
    return { ok: false, message: "Add your name and a valid email." };
  }

  const entry: Record<string, string | string[]> = { kind, submittedAt: new Date().toISOString() };
  for (const key of new Set(formData.keys())) {
    if (key.startsWith("$") || key === "kind") continue;
    const values = formData.getAll(key).map(String);
    entry[key] = values.length > 1 ? values : values[0];
  }

  // TODO: persist to the database once one is provisioned (see README).
  console.log("[form submission]", JSON.stringify(entry));

  return { ok: true, message: "Got it. We'll be in touch." };
}
