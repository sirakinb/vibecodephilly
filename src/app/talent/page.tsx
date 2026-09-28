import type { Metadata } from "next";
import Image from "next/image";
import { FormBlock, SignupForm } from "@/components/form";
import { Container, PageHeader } from "@/components/ui";
import { stacks } from "@/data/site";

export const metadata: Metadata = { title: "Talent network" };

const perks = [
  { title: "A profile that shows your work", body: "Not a résumé. A page of what you've actually made, linked to demos, projects and live apps." },
  { title: "Opportunities first", body: "Roles, contract work and collaborations that come through the community reach the network first." },
  { title: "The stage", body: "Priority demo and talk slots at meetups, so the right people see what you do." },
  { title: "Credits & tools", body: "Perks and credits from the AI tools our partners make." },
];

const steps = [
  ["Join", "Tell us who you are and what you work on. Takes two minutes."],
  ["Show up", "Come to meetups, demo something, add your work to the showcase."],
  ["Get connected", "When an opportunity fits you, we make the intro."],
];

export default function TalentPage() {
  return (
    <>
      <PageHeader eyebrow="Talent network" title="Get seen for what you make">
        <p>
          Developers, designers, marketers, founders, operators, students and career switchers. If you use AI to
          make things, the Vibe Code Philly talent network is for you. Free to join.
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
        intro={<p>Tell us who you are and what you work on. We read every one.</p>}
        points={["Free, always", "Takes about two minutes", "We only reach out when something fits"]}
      >
        <SignupForm
          kind="talent"
          submit="Join the network"
          note="We'll never share your info without asking."
          success={{ title: "Welcome to the network", body: "We'll be in touch. In the meantime, come say hi at the next meetup." }}
          sections={[
            {
              title: "About you",
              fields: [
                { name: "name", label: "Full name", type: "text", required: true, half: true, placeholder: "Jordan Smith" },
                { name: "email", label: "Email", type: "email", required: true, half: true, placeholder: "you@email.com" },
                { name: "role", label: "What best describes you?", type: "chips", options: ["Developer", "Designer", "Marketer", "Founder", "Product / operator", "Creator", "Student", "Career switcher", "Other"] },
              ],
            },
            {
              title: "Your work",
              fields: [
                { name: "linkedin", label: "LinkedIn", type: "url", half: true, placeholder: "linkedin.com/in/you" },
                { name: "portfolio", label: "Portfolio or website", type: "url", half: true, placeholder: "yoursite.com" },
                { name: "project", label: "Something you've made", type: "url", placeholder: "Link to a project, demo or video", hint: "Anything counts: an app, an automation, a site, a prototype." },
                { name: "stack", label: "Tools you use", type: "chips", options: stacks },
              ],
            },
            {
              title: "What you're looking for",
              fields: [
                { name: "looking", label: "Open to", type: "chips", options: ["Full-time roles", "Freelance", "Co-founders", "Collaborators", "Learning", "Community"] },
                { name: "about", label: "Anything else we should know?", type: "textarea", max: 500, placeholder: "What you're working on, what you want to learn, what you'd like help with." },
              ],
            },
          ]}
        />
      </FormBlock>
    </>
  );
}
