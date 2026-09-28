import type { Metadata } from "next";
import { SignupForm } from "@/components/form";
import { Container, PageHeader, PinkDot } from "@/components/ui";

export const metadata: Metadata = { title: "Hire builders" };

const offers = [
  { title: "Builders we've seen ship", body: "Everyone we introduce has demoed real work at our meetups or in our showcase. You see the product before the person." },
  { title: "Full-time, contract or a project", body: "Hire someone onto the team, bring on a contractor, or get a specific tool or prototype built." },
  { title: "Post a bounty or challenge", body: "Put a real problem in front of the room at a build night and see who solves it." },
];

export default function HirePage() {
  return (
    <>
      <PageHeader
        eyebrow="For employers"
        title={
          <>
            Hire people who ship<PinkDot />
          </>
        }
      >
        <p>
          AI changed how fast software gets built. The people who&apos;ve figured that out are in our room every
          month. Tell us what you need and we&apos;ll make the intro.
        </p>
      </PageHeader>

      <Container className="grid gap-4 pb-24 md:grid-cols-3">
        {offers.map((o) => (
          <div key={o.title} className="border-t border-fg/15 pt-6">
            <h3 className="display text-3xl">{o.title}</h3>
            <p className="mt-3 text-fg/60">{o.body}</p>
          </div>
        ))}
      </Container>

      <section className="border-t border-fg/10 py-24">
        <Container className="max-w-4xl">
          <p className="label mb-4">Tell us what you need</p>
          <h2 className="display mb-10 text-5xl md:text-6xl">
            Find a builder<PinkDot />
          </h2>
          <SignupForm
            kind="hire"
            submit="Send request"
            fields={[
              { name: "name", label: "Your name", type: "text", required: true, half: true },
              { name: "email", label: "Work email", type: "email", required: true, half: true },
              { name: "company", label: "Company", type: "text", required: true, half: true },
              { name: "website", label: "Website", type: "url", placeholder: "https://", half: true },
              { name: "type", label: "Looking for", type: "chips", options: ["Full-time hire", "Contractor", "A project built", "Bounty / challenge"] },
              { name: "details", label: "What are you trying to build or hire for?", type: "textarea", required: true },
            ]}
          />
        </Container>
      </section>
    </>
  );
}
