import type { Metadata } from "next";
import Image from "next/image";
import { SignupForm } from "@/components/form";
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

      <section id="join" className="py-24">
        <Container className="max-w-4xl">
          <p className="label mb-4">Join the network</p>
          <h2 className="display mb-10 text-3xl md:text-4xl">Create your profile</h2>
          <SignupForm
            kind="talent"
            submit="Join the talent network"
            fields={[
              { name: "name", label: "Name", type: "text", required: true, half: true },
              { name: "email", label: "Email", type: "email", required: true, half: true },
              { name: "linkedin", label: "LinkedIn", type: "url", placeholder: "https://linkedin.com/in/…", half: true },
              { name: "portfolio", label: "Portfolio / GitHub / website", type: "url", placeholder: "https://", half: true },
              { name: "role", label: "I'm a…", type: "chips", options: ["Developer", "Designer", "Marketer", "Founder", "Product / operator", "Creator", "Student", "Career switcher", "Other"] },
              { name: "stack", label: "Tools you use", type: "chips", options: stacks },
              { name: "looking", label: "Open to", type: "chips", options: ["Full-time roles", "Freelance / contract", "Co-founders", "Collaborators", "Just the community"] },
              { name: "project", label: "Something you've made (link)", type: "url", placeholder: "https://" },
              { name: "about", label: "Tell us about yourself", type: "textarea", placeholder: "What you do, what you're working on, what you want to learn." },
            ]}
          />
        </Container>
      </section>
    </>
  );
}
