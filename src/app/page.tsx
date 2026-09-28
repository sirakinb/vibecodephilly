import Image from "next/image";
import Link from "next/link";
import { Gallery } from "@/components/gallery";
import { Button, Container, PinkDot } from "@/components/ui";
import { events, links, talks } from "@/data/site";

const mosaic = [
  { src: "/events/e3-01.jpg", cls: "col-span-2 row-span-2" },
  { src: "/events/e1-17.jpg", cls: "" },
  { src: "/events/e3-05.jpg", cls: "row-span-2" },
  { src: "/events/e4-01.jpg", cls: "col-span-2 row-span-2" },
  { src: "/events/e2-11.jpg", cls: "" },
];

const formats = [
  { n: "01", title: "Demos", body: "Builders put what they shipped this month on the big screen — working apps, half-finished experiments, all of it." },
  { n: "02", title: "Talks", body: "Short, practical sessions on the tools and workflows people are actually using: agents, local dev, hosting, shipping fast." },
  { n: "03", title: "Build time", body: "Laptops open. Bring an idea, pair with someone who's done it before, and leave with something that runs." },
];

const audiences = [
  {
    word: "Builders",
    href: "/builders",
    tag: "For talent",
    body: "Join the network. Get a profile that shows what you've shipped, first dibs on jobs and gigs, demo slots, and tool credits.",
  },
  {
    word: "Hiring",
    href: "/hire",
    tag: "For employers",
    body: "Need someone who can take an idea to a working product in days, not quarters? We'll introduce you to builders we've watched ship.",
  },
  {
    word: "Partners",
    href: "/partner",
    tag: "For sponsors, venues & tools",
    body: "Host a meetup, sponsor a build night, or put your product in the hands of Philly's most active AI builders.",
  },
];

export default function Home() {
  const latest = events[0];

  return (
    <>
      {/* Hero */}
      <Container className="pt-16 pb-12 md:pt-24">
        <p className="label mb-8">
          <span className="text-pink">●</span> Philadelphia · Since Sept 2025
        </p>
        <h1 className="display text-[15vw] leading-[0.88] md:text-[8.5rem]">
          Where Philly
          <br />
          builds with <em className="text-pink not-italic">AI</em>
          <PinkDot />
        </h1>
        <div className="mt-10 grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
          <p className="max-w-xl text-lg text-fg/70 md:text-xl">
            Meetups, talks and build nights for vibe coders, founders and engineers shipping with Cursor, Claude
            Code, Lovable and whatever drops next — plus a talent network that turns builders into hires.
          </p>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Button href={links.rsvp}>RSVP for the next event →</Button>
            <Button href="/builders" variant="ghost">
              Join the builder network
            </Button>
          </div>
        </div>
      </Container>

      {/* Photo mosaic */}
      <Container className="pb-24">
        <div className="grid grid-flow-dense auto-rows-[150px] grid-cols-2 gap-3 md:auto-rows-[200px] md:grid-cols-6">
          {mosaic.map((m, i) => (
            <div key={m.src} className={`relative overflow-hidden rounded-xl bg-base-2 ${m.cls}`}>
              <Image
                src={m.src}
                alt="Vibe Code Philly meetup"
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition duration-700 hover:scale-105"
                priority={i < 2}
              />
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-x-10 gap-y-3 border-t border-fg/10 pt-6">
          {[
            [`${String(events.length).padStart(2, "0")}`, "meetups hosted"],
            ["All levels", "first-timers welcome"],
          ].map(([a, b]) => (
            <p key={b} className="text-sm text-fg/60">
              <span className="display mr-2 text-2xl text-fg">{a}</span>
              {b}
            </p>
          ))}
        </div>
      </Container>

      {/* What happens */}
      <section className="border-y border-fg/10 bg-base-2/60 py-24">
        <Container>
          <p className="label mb-4">What happens at a meetup</p>
          <h2 className="display max-w-3xl text-5xl md:text-6xl">
            Less talking about AI. More building with it<PinkDot />
          </h2>
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {formats.map((f) => (
              <div key={f.n} className="border-t border-fg/15 pt-6">
                <p className="font-mono text-sm text-pink">{f.n}</p>
                <h3 className="display mt-3 text-3xl">{f.title}</h3>
                <p className="mt-3 text-fg/60">{f.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Talks marquee */}
      <section className="overflow-hidden py-10" aria-label="Recent talks">
        <div className="marquee flex w-max gap-10 whitespace-nowrap">
          {[...talks, ...talks].map((t, i) => (
            <span key={i} className="display text-3xl text-fg/40 md:text-4xl">
              {t} <span className="text-pink">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* Audiences */}
      <section className="py-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
            <div>
              <p className="label mb-4">Get involved</p>
              <h2 className="display text-5xl md:text-6xl">
                One community.
                <br />
                Three ways in<PinkDot />
              </h2>
            </div>
            <div className="border-t border-fg/15">
              {audiences.map((a) => (
                <Link
                  key={a.word}
                  href={a.href}
                  className="group grid gap-3 border-b border-fg/15 py-8 md:grid-cols-[1fr_1.1fr] md:items-center"
                >
                  <div>
                    <p className="label mb-2">{a.tag}</p>
                    <p className="display text-6xl transition-colors group-hover:text-pink md:text-7xl">{a.word}</p>
                  </div>
                  <div className="flex items-end justify-between gap-6">
                    <p className="text-fg/60">{a.body}</p>
                    <span className="text-2xl text-fg/40 transition group-hover:translate-x-1 group-hover:text-pink">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Latest recap */}
      <section className="border-t border-fg/10 py-24">
        <Container>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label mb-4">
                Latest recap · Event {String(latest.n).padStart(2, "0")} · {latest.date}
              </p>
              <h2 className="display max-w-2xl text-5xl">{latest.blurb}</h2>
            </div>
            <Button href="/events" variant="ghost">
              All events →
            </Button>
          </div>
          <Gallery photos={latest.photos.slice(0, 8)} alt={`Vibe Code Philly event ${latest.n}`} />
        </Container>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-fg text-white">
        <Image src="/events/e5-01.jpg" alt="" fill sizes="100vw" className="object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-fg via-fg/70 to-fg/30" />
        <Container className="relative py-32 text-center">
          <h2 className="display text-6xl md:text-8xl">
            Come build with us<PinkDot />
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-lg text-white/70">
            Next meetup details and RSVPs live on Partiful. Follow along on Instagram for recaps.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href={links.rsvp}>RSVP on Partiful →</Button>
            <Button href={links.instagram} variant="inverse">
              @vibecodephilly
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
