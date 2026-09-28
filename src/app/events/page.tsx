import type { Metadata } from "next";
import { SignupForm } from "@/components/form";
import { Gallery } from "@/components/gallery";
import { Button, Container, PageHeader, PinkDot } from "@/components/ui";
import { events, links, talks } from "@/data/site";

export const metadata: Metadata = { title: "Events" };

export default function EventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Events"
        title={
          <>
            Every meetup, in pictures<PinkDot />
          </>
        }
      >
        <p>Demos, talks and build nights across Philly. RSVPs for the next one live on Partiful.</p>
        <div className="mt-8">
          <Button href={links.rsvp}>RSVP for the next event →</Button>
        </div>
      </PageHeader>

      <Container className="space-y-28 pb-28">
        {events.map((e) => (
          <section key={e.n} id={`event-${e.n}`} className="scroll-mt-24">
            <div className="mb-8 grid gap-4 border-t border-fg/15 pt-8 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-10">
              <p className="display text-7xl text-pink">{String(e.n).padStart(2, "0")}</p>
              <p className="max-w-xl text-lg text-fg/70">{e.blurb}</p>
              <time dateTime={e.iso} className="label">
                {e.date}
              </time>
            </div>
            <Gallery photos={e.photos} alt={`Vibe Code Philly event ${e.n}`} />
          </section>
        ))}
      </Container>

      <section className="border-t border-fg/10 bg-base-2/60 py-24">
        <Container>
          <p className="label mb-4">Recent talks</p>
          <ol className="divide-y divide-fg/10 border-y border-fg/10">
            {talks.map((t, i) => (
              <li key={t} className="flex items-baseline gap-6 py-5">
                <span className="font-mono text-sm text-pink">{String(i + 1).padStart(2, "0")}</span>
                <span className="display text-2xl md:text-3xl">{t}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section id="speak" className="py-24">
        <Container className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="label mb-4">Speak or demo</p>
            <h2 className="display text-5xl md:text-6xl">
              Show us what you built<PinkDot />
            </h2>
            <p className="mt-6 text-fg/70">
              Five-minute demos and 10–15 minute talks. Rough edges welcome — the best demos are the ones that
              almost didn&apos;t work.
            </p>
          </div>
          <SignupForm
            kind="speak"
            submit="Apply to speak"
            fields={[
              { name: "name", label: "Name", type: "text", required: true, half: true },
              { name: "email", label: "Email", type: "email", required: true, half: true },
              { name: "format", label: "Format", type: "chips", options: ["5-min demo", "10–15 min talk", "Workshop"], single: true },
              { name: "title", label: "Working title", type: "text", required: true },
              { name: "pitch", label: "What will people learn or see?", type: "textarea", required: true },
              { name: "link", label: "Link (project, repo, video)", type: "url", placeholder: "https://" },
            ]}
          />
        </Container>
      </section>
    </>
  );
}
