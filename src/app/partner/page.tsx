import type { Metadata } from "next";
import Image from "next/image";
import { FormBlock, SignupForm } from "@/components/form";
import { Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = { title: "Partner" };

const paths = [
  { word: "Venues", body: "Host a meetup. We bring the community, the programming, and the energy. You bring the room." },
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
            Help Philly build
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
              <p className="display text-3xl md:text-4xl">{p.word}</p>
              <p className="text-fg/60 md:text-lg">{p.body}</p>
            </div>
          ))}
        </div>
      </Container>

      <FormBlock
        eyebrow="Get in touch"
        title="Let's talk"
        intro={<p>Tell us a little about your organization and what you have in mind. We&apos;ll get back to you within a few days.</p>}
        points={["Venues and hosts", "Tool companies and sponsors", "Schools and community orgs"]}
      >
        <SignupForm
          kind="partner"
          submit="Send message"
          note="We usually reply within a few days."
          success={{ title: "Message sent", body: "Thanks for reaching out. We'll be in touch soon." }}
          sections={[
            {
              title: "About you",
              fields: [
                { name: "name", label: "Full name", type: "text", required: true, half: true, placeholder: "Jordan Smith" },
                { name: "email", label: "Email", type: "email", required: true, half: true, placeholder: "you@company.com" },
                { name: "org", label: "Organization", type: "text", required: true, half: true, placeholder: "Company or group" },
                { name: "website", label: "Website", type: "url", half: true, placeholder: "company.com" },
              ],
            },
            {
              title: "The idea",
              fields: [
                { name: "type", label: "Interested in", type: "chips", options: ["Hosting a meetup", "Sponsoring", "Credits / perks", "Running a workshop", "Something else"] },
                { name: "details", label: "Tell us more", type: "textarea", max: 800, placeholder: "Dates, audience, what you'd like to do together." },
              ],
            },
          ]}
        />
      </FormBlock>
    </>
  );
}
