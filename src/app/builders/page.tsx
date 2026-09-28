import type { Metadata } from "next";
import Image from "next/image";
import { SignupForm } from "@/components/form";
import { Container, PageHeader, PinkDot } from "@/components/ui";
import { stacks } from "@/data/site";

export const metadata: Metadata = { title: "Builders" };

const perks = [
  { title: "A profile that shows your work", body: "Not a résumé — a page of what you've actually shipped, linked to demos and live apps." },
  { title: "Jobs & gigs, first", body: "Full-time roles, contract work and one-off builds from teams who come to us looking for builders." },
  { title: "The stage", body: "Priority demo and talk slots at meetups. Getting seen is half of getting hired." },
  { title: "Credits & tools", body: "Perks and credits from the AI tools our partners make, so you can build more for less." },
];

const steps = [
  ["Join", "Tell us who you are and what you build with. Takes two minutes."],
  ["Show up & ship", "Come to meetups, demo something, add projects to the showcase."],
  ["Get matched", "When a team needs someone like you, we make the intro."],
];

export default function BuildersPage() {
  return (
    <>
      <PageHeader
        eyebrow="For builders"
        title={
          <>
            Get seen for what you ship<PinkDot />
          </>
        }
      >
        <p>
          The Vibe Code Philly builder network connects people who build with AI to the teams, clients and
          collaborators who need them. Free to join.
        </p>
      </PageHeader>

      <Container className="grid gap-4 pb-24 md:grid-cols-4">
        {perks.map((p, i) => (
          <div key={p.title} className="rounded-2xl border border-fg/10 bg-base-2/60 p-6">
            <p className="font-mono text-sm text-pink">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="display mt-6 text-2xl">{p.title}</h3>
            <p className="mt-3 text-sm text-fg/60">{p.body}</p>
          </div>
        ))}
      </Container>

      <section className="border-y border-fg/10 bg-base-2/60 py-24">
        <Container className="grid items-center gap-12 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image src="/events/e1-13.jpg" alt="Two builders pairing on a laptop" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <p className="label mb-4">How it works</p>
            <ol className="space-y-8">
              {steps.map(([t, b], i) => (
                <li key={t} className="grid grid-cols-[auto_1fr] gap-6">
                  <span className="display text-5xl text-pink">{i + 1}</span>
                  <div>
                    <p className="display text-3xl">{t}</p>
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
          <h2 className="display mb-10 text-5xl md:text-6xl">
            Create your builder profile<PinkDot />
          </h2>
          <SignupForm
            kind="builder"
            submit="Join the network"
            fields={[
              { name: "name", label: "Name", type: "text", required: true, half: true },
              { name: "email", label: "Email", type: "email", required: true, half: true },
              { name: "linkedin", label: "LinkedIn", type: "url", placeholder: "https://linkedin.com/in/…", half: true },
              { name: "portfolio", label: "Portfolio / GitHub / X", type: "url", placeholder: "https://", half: true },
              { name: "stack", label: "What do you build with?", type: "chips", options: stacks },
              { name: "role", label: "I'm a…", type: "chips", options: ["Developer", "Designer", "Founder", "PM / operator", "Student", "Career switcher"] },
              { name: "looking", label: "Open to", type: "chips", options: ["Full-time roles", "Freelance / contract", "Co-founders", "Collaborators", "Just the community"] },
              { name: "project", label: "Best thing you've shipped (link)", type: "url", placeholder: "https://" },
              { name: "about", label: "Tell us about it", type: "textarea", placeholder: "What it does, who uses it, how you built it." },
            ]}
          />
        </Container>
      </section>
    </>
  );
}
