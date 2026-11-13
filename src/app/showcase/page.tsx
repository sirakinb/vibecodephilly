import type { Metadata } from "next";
import { FormBlock, SignupForm } from "@/components/form";
import { Container, PageHeader } from "@/components/ui";
import { otherTool, stacks } from "@/data/site";

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

      <FormBlock
        eyebrow="Submit a project"
        title="Built something? Show it"
        intro={<p>Apps, agents, automations, sites, games, experiments. If you made it with AI, it belongs here.</p>}
        points={["Every project links back to you", "Works in progress welcome", "Featured projects get a demo slot"]}
      >
        <SignupForm
          kind="showcase"
          submit="Submit project"
          note="We review submissions before they go live."
          success={{ title: "Project submitted", body: "Nice work. We'll take a look and let you know when it's up." }}
          sections={[
            {
              title: "About you",
              fields: [
                { name: "name", label: "Full name", type: "text", required: true, half: true, placeholder: "Jordan Smith" },
                { name: "email", label: "Email", type: "email", required: true, half: true, placeholder: "you@email.com" },
              ],
            },
            {
              title: "The project",
              fields: [
                { name: "project", label: "Project name", type: "text", required: true, half: true, placeholder: "What's it called?" },
                { name: "url", label: "Live link", type: "url", required: true, half: true, placeholder: "yourproject.com" },
                { name: "stack", label: "Built with", type: "chips", options: stacks, other: otherTool },
                { name: "description", label: "What does it do?", type: "textarea", required: true, max: 400, placeholder: "One or two sentences." },
              ],
            },
          ]}
        />
      </FormBlock>
    </>
  );
}
