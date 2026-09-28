import type { Metadata } from "next";
import Image from "next/image";
import { SignupForm } from "@/components/form";
import { Container, PageHeader, PinkDot } from "@/components/ui";

export const metadata: Metadata = { title: "Partner" };

const paths = [
  { word: "Venues", body: "Host a meetup. We bring the builders, the programming, and the energy — you bring the room." },
  { word: "Tools & sponsors", body: "Put your product in front of people who build with AI every day. Sponsor a night, offer credits, run a workshop." },
  { word: "Schools & orgs", body: "Co-host events, open pathways for students and career switchers, and grow Philly's AI talent together." },
];

export default function PartnerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Partner with us"
        title={
          <>
            Help Philly build<PinkDot />
          </>
        }
      >
        <p>Venues, tool companies and local organizations make every meetup possible.</p>
      </PageHeader>

      <Container className="pb-24">
        <div className="relative mb-16 aspect-[21/9] overflow-hidden rounded-2xl">
          <Image src="/events/e3-02.jpg" alt="Vibe Code Philly community group photo" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="border-t border-fg/15">
          {paths.map((p) => (
            <div key={p.word} className="grid gap-3 border-b border-fg/15 py-8 md:grid-cols-2 md:items-center">
              <p className="display text-5xl md:text-6xl">{p.word}</p>
              <p className="text-fg/60 md:text-lg">{p.body}</p>
            </div>
          ))}
        </div>
      </Container>

      <section className="border-t border-fg/10 py-24">
        <Container className="max-w-4xl">
          <p className="label mb-4">Get in touch</p>
          <h2 className="display mb-10 text-5xl md:text-6xl">
            Let&apos;s talk<PinkDot />
          </h2>
          <SignupForm
            kind="partner"
            submit="Send"
            fields={[
              { name: "name", label: "Your name", type: "text", required: true, half: true },
              { name: "email", label: "Email", type: "email", required: true, half: true },
              { name: "org", label: "Organization", type: "text", required: true },
              { name: "type", label: "Interested in", type: "chips", options: ["Hosting", "Sponsoring", "Credits / perks", "Workshop", "Something else"] },
              { name: "details", label: "Tell us more", type: "textarea" },
            ]}
          />
        </Container>
      </section>
    </>
  );
}
