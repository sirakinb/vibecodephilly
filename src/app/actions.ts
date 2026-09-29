"use server";

export type FormState = { ok: boolean; message: string } | null;

const kinds = ["talent", "partner", "speak", "showcase"] as const;
type Kind = (typeof kinds)[number];

const tagFor: Record<Kind, string> = {
  talent: "talent",
  partner: "partner",
  speak: "speaker",
  showcase: "showcase",
};

const list = (v: string | string[] | undefined) => (Array.isArray(v) ? v.join(", ") : v);

const kindTitle: Record<Kind, string> = {
  talent: "Talent network",
  partner: "Partner inquiry",
  speak: "Speaker application",
  showcase: "Showcase submission",
};

const labels: Record<string, string> = {
  linkedin: "LinkedIn",
  portfolio: "Portfolio",
  skills: "Skills",
  level: "Experience",
  tools: "AI tools",
  looking: "Open to",
  about: "About",
  org: "Organization",
  website: "Website",
  type: "Interested in",
  details: "Details",
  format: "Format",
  title: "Talk title",
  pitch: "Pitch",
  link: "Link",
  project: "Project",
  url: "Live link",
  stack: "Built with",
  description: "Description",
};

// One "Label: value" line per answer, under a dated heading for the form.
function buildNotes(kind: Kind, entry: Record<string, string | string[]>) {
  const skip = new Set(["name", "email", "kind", "submittedAt"]);
  const lines = Object.entries(entry)
    .filter(([k, v]) => !skip.has(k) && list(v))
    .map(([k, v]) => `${labels[k] ?? k}: ${list(v)}`);
  const date = new Date(String(entry.submittedAt)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  });
  return { body: lines.join("\n"), text: [`${kindTitle[kind]}, ${date}`, ...lines].join("\n") };
}

async function syncToCrm(kind: Kind, name: string, email: string, entry: Record<string, string | string[]>) {
  const token = process.env.MANOR_API_TOKEN;
  const base = process.env.MANOR_API_URL ?? "https://vibecodephilly.agentworkspace.cloud";
  if (!token) {
    console.error("[crm] MANOR_API_TOKEN is not set, skipping sync");
    return;
  }

  const [first, ...rest] = name.split(/\s+/);
  const company = kind === "partner" ? String(entry.org ?? "") : undefined;

  const call = async (body: object, key?: string) => {
    const res = await fetch(`${base}/v1/crm/contacts/upsert`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...(key && { "Idempotency-Key": key }),
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`${res.status} ${(await res.text()).slice(0, 300)}`);
    return (await res.json()) as { contact: { tags?: string[]; notes?: string | null } };
  };

  try {
    // The upsert replaces tags and notes, so read the current contact first (an
    // identifier-only upsert changes nothing) and merge, so someone who joins as talent
    // and later submits a showcase keeps both tags and both notes.
    const id = { source: "website", external_id: email.toLowerCase(), email };
    const { contact } = await call(id);
    const block = buildNotes(kind, entry);
    // Skip the block if this exact submission is already in the notes (a resubmit).
    const notes = block.body && contact.notes?.includes(block.body) ? contact.notes : [contact.notes, block.text].filter(Boolean).join("\n\n");
    await call(
      {
        ...id,
        first_name: first,
        last_name: rest.join(" ") || undefined,
        company: company || undefined,
        tags: [...new Set([...(contact.tags ?? []), "website", tagFor[kind]])],
        notes,
      },
      `${kind}:${email.toLowerCase()}:${entry.submittedAt}`,
    );
  } catch (err) {
    console.error("[crm] sync failed", err);
  }
}

export async function submitForm(_prev: FormState, formData: FormData): Promise<FormState> {
  const kind = formData.get("kind") as Kind;
  if (!kinds.includes(kind)) return { ok: false, message: "Unknown form." };

  const email = String(formData.get("email") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  if (!name || !/^\S+@\S+\.\S+$/.test(email)) {
    return { ok: false, message: "Add your name and a valid email." };
  }
  if (kind === "talent" && formData.getAll("skills").length === 0) {
    return { ok: false, message: "Pick at least one skill." };
  }

  const entry: Record<string, string | string[]> = { kind, submittedAt: new Date().toISOString() };
  for (const key of new Set(formData.keys())) {
    if (key.startsWith("$") || key === "kind") continue;
    const values = formData.getAll(key).map(String);
    entry[key] = values.length > 1 ? values : values[0];
  }

  // Always keep a copy in the logs so a CRM outage never loses a lead.
  console.log("[form submission]", JSON.stringify(entry));
  await syncToCrm(kind, name, email, entry);

  return { ok: true, message: "Got it. We'll be in touch." };
}
