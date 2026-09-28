import type { Metadata } from "next";
import { SignupForm } from "@/components/form";
import { Container, PageHeader } from "@/components/ui";
import { stacks } from "@/data/site";

export const metadata: Metadata = { title: "Showcase" };

export default function ShowcasePage() {
  return (
    <>
      <PageHeader
        eyebrow="Showcase"
        title={
          <>
            Built in Philly
          </>
        }
      >
        <p>
          Apps, agents, tools and experiments from the Vibe Code Philly community. Every project links back to
          the person who made it.
        </p>
      </PageHeader>

      <Container className="pb-16">
        <div className="grid gap-4 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex aspect-[4/3] flex-col justify-end rounded-2xl border border-dashed border-fg/15 p-6"
            >
              <p className="label">Your project here</p>
            </div>
          ))}
        </div>
      </Container>

      <section className="py-16">
        <Container className="max-w-4xl">
          <p className="label mb-4">Submit a project</p>
          <h2 className="display mb-10 text-3xl md:text-4xl">
            Built something? Show it
          </h2>
          <SignupForm
            kind="showcase"
            submit="Submit project"
            fields={[
              { name: "name", label: "Your name", type: "text", required: true, half: true },
              { name: "email", label: "Email", type: "email", required: true, half: true },
              { name: "project", label: "Project name", type: "text", required: true, half: true },
              { name: "url", label: "Live link", type: "url", required: true, placeholder: "https://", half: true },
              { name: "stack", label: "Built with", type: "chips", options: stacks },
              { name: "description", label: "What does it do?", type: "textarea", required: true },
            ]}
          />
        </Container>
      </section>
    </>
  );
}
