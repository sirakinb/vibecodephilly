import type { Metadata } from "next";
import { FormBlock, SignupForm } from "@/components/form";
import { PhotoGrid } from "@/components/photo-grid";
import { Button, Container, PageHeader } from "@/components/ui";
import { events, links } from "@/data/site";

export const metadata: Metadata = { title: "Events" };

export default function EventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Events"
        title={
          <>
            Every meetup, in pictures
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
              <p className="display text-4xl text-pink">{String(e.n).padStart(2, "0")}</p>
              <p className="max-w-xl text-lg text-fg/70">{e.blurb}</p>
              <time dateTime={e.iso} className="label">
                {e.date}
              </time>
            </div>
            <PhotoGrid photos={e.photos} title={`Vibe Code Philly Meetup ${String(e.n).padStart(2, "0")}`} date={e.date} />
          </section>
        ))}
      </Container>

      <FormBlock
        id="speak"
        eyebrow="Speak or demo"
        title="Show us what you built"
        intro={<p>Five-minute demos and 10 to 15 minute talks. Rough edges welcome. The best demos are the ones that almost didn&apos;t work.</p>}
        points={["First-time speakers welcome", "We help you shape the talk", "Slides optional"]}
      >
        <SignupForm
          kind="speak"
          submit="Send application"
          note="We'll follow up about dates."
          success={{ title: "Application received", body: "Thanks for putting yourself out there. We'll reach out about a slot." }}
          sections={[
            {
              title: "About you",
              fields: [
                { name: "name", label: "Full name", type: "text", required: true, half: true, placeholder: "Jordan Smith" },
                { name: "email", label: "Email", type: "email", required: true, half: true, placeholder: "you@email.com" },
              ],
            },
            {
              title: "Your session",
              fields: [
                { name: "format", label: "Format", type: "chips", options: ["5 min demo", "10 to 15 min talk", "Workshop"], single: true, required: true },
                { name: "title", label: "Working title", type: "text", required: true, placeholder: "How I automated my entire inbox" },
                { name: "pitch", label: "What will people learn or see?", type: "textarea", required: true, max: 500, placeholder: "A few sentences is plenty." },
                { name: "link", label: "Link", type: "url", placeholder: "Project, repo or video", hint: "Helps us get a feel for it. Not required." },
              ],
            },
          ]}
        />
      </FormBlock>
    </>
  );
}
