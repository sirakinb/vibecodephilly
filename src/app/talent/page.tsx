import type { Metadata } from "next";
import Image from "next/image";
import { FormBlock, SignupForm } from "@/components/form";
import { Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = { title: "Talent network" };

const perks = [
  { title: "A profile built around your skills", body: "Show what you're great at, whether that's development, design, marketing, operations or something else." },
  { title: "Opportunities first", body: "Roles, contract work and collaborations that come through the community reach the network first." },
  { title: "Introductions", body: "We connect you with people who need what you do, and people who can help you grow." },
  { title: "Credits & tools", body: "Perks and credits from the AI tools our partners make." },
];

const skills = ["Development", "Design", "Marketing", "Sales", "Operations", "Product", "Content / creative", "Data / analytics", "Other"];
const tools = ["Claude / Claude Code", "ChatGPT / Codex", "Cursor", "T3 Code", "Devin", "n8n / Zapier / Make", "Grok Bot", "Muse", "Other"];

const steps = [
  ["Join", "Tell us about your skills and what you're looking for. Takes two minutes."],
  ["Show up", "Come to events, meet people and let the community get to know you."],
  ["Get connected", "When an opportunity fits you, we make the intro."],
];

export default function TalentPage() {
  return (
    <>
      <PageHeader eyebrow="Talent network" title="Get known for your skills">
        <p>
          Whatever your skill set, whether you develop, design, market, sell or operate, the Vibe Code Philly
          talent network connects you with opportunities and people across the community. Free to join.
        </p>
      </PageHeader>

      <Container className="grid gap-4 pb-24 md:grid-cols-4">
        {perks.map((p, i) => (
          <div key={p.title} className="rounded-2xl border border-fg/10 bg-base-2/60 p-6">
            <p className="font-mono text-sm text-pink">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="display mt-6 text-xl">{p.title}</h3>
            <p className="mt-3 text-sm text-fg/60">{p.body}</p>
          </div>
        ))}
      </Container>

      <section className="border-y border-fg/10 bg-base-2/60 py-24">
        <Container className="grid items-center gap-12 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image src="/events/e1-13.jpg" alt="Two people working together on a laptop" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <p className="label mb-4">How it works</p>
            <ol className="space-y-8">
              {steps.map(([t, b], i) => (
                <li key={t} className="grid grid-cols-[auto_1fr] gap-6">
                  <span className="display text-3xl text-pink">{i + 1}</span>
                  <div>
                    <p className="display text-2xl">{t}</p>
                    <p className="mt-2 text-fg/60">{b}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <FormBlock
        id="join"
        eyebrow="Join the network"
        title="Create your profile"
        intro={<p>Tell us about your skills and what you&apos;re looking for. We read every one.</p>}
        points={["Free, always", "Takes about two minutes", "We only reach out when something fits"]}
      >
        <SignupForm
          kind="talent"
          submit="Join the network"
          note="We'll never share your info without asking."
          success={{ title: "Welcome to the network", body: "We'll be in touch. In the meantime, come say hi at the next event." }}
          sections={[
            {
              title: "About you",
              fields: [
                { name: "name", label: "Full name", type: "text", required: true, half: true, placeholder: "Jordan Smith" },
                { name: "email", label: "Email", type: "email", required: true, half: true, placeholder: "you@email.com" },
                { name: "linkedin", label: "LinkedIn", type: "url", half: true, placeholder: "linkedin.com/in/you" },
                { name: "portfolio", label: "Portfolio or website", type: "url", half: true, placeholder: "yoursite.com", hint: "Anywhere we can see your work." },
              ],
            },
            {
              title: "Your skills",
              fields: [
                { name: "skills", label: "What are you best at?", type: "chips", options: skills, required: true },
                { name: "level", label: "Experience", type: "chips", options: ["Just starting", "A few years", "Seasoned"], single: true },
                { name: "tools", label: "AI tools you use", type: "chips", options: tools, other: "Custom ADE, agent, another tool, etc." },
              ],
            },
            {
              title: "What you're looking for",
              fields: [
                { name: "looking", label: "Open to", type: "chips", options: ["Full-time roles", "Freelance", "Co-founders", "Collaborators", "Mentorship", "Community"] },
                { name: "about", label: "Anything else we should know?", type: "textarea", max: 500, placeholder: "What you do, what you're working on, what you'd like help with." },
              ],
            },
          ]}
        />
      </FormBlock>
    </>
  );
}
