import Image from "next/image";
import Link from "next/link";
import { HeroVideo } from "@/components/hero-video";
import { events, links } from "@/data/site";

const involved = [
  { href: "/builders", title: "Join the builder network", body: "Profile, jobs, demo slots" },
  { href: "/hire", title: "Hire a builder", body: "Full-time, contract or projects" },
  { href: "/partner", title: "Partner with us", body: "Host, sponsor, give credits" },
  { href: "/events#speak", title: "Speak or demo", body: "Apply for a slot" },
];

function Sidebar() {
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-fg/10">
        <div className="flex items-center justify-between border-b border-fg/10 px-4 py-3 text-[13px]">
          <span className="flex items-center gap-2 font-medium">
            <span className="size-2 rounded-full bg-pink" /> Next meetup
          </span>
          <span className="text-fg/50">RSVP on Partiful</span>
        </div>
        <div className="space-y-4 bg-fg p-4 text-white">
          <p className="text-[15px] leading-snug text-white/80">
            Demos, talks and build time with Philly&apos;s AI builders. Spots are limited.
          </p>
          <a
            href={links.rsvp}
            target="_blank"
            rel="noreferrer"
            className="block rounded-lg bg-pink px-4 py-2.5 text-center text-sm font-medium transition hover:brightness-110"
          >
            Save your spot
          </a>
        </div>
      </div>

      <a
        href={links.instagram}
        target="_blank"
        rel="noreferrer"
        className="block rounded-lg border border-fg/10 bg-base-2 px-4 py-2.5 text-center text-[13px] font-medium text-fg/80 transition hover:border-fg/25"
      >
        Follow @vibecodephilly
      </a>

      <div className="pt-4">
        <p className="label mb-2">Get involved</p>
        <ul>
          {involved.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex items-center justify-between border-b border-fg/10 py-3 text-[13px]"
              >
                <span>
                  <span className="block font-medium">{item.title}</span>
                  <span className="text-fg/50">{item.body}</span>
                </span>
                <span className="text-fg/30 transition group-hover:translate-x-0.5 group-hover:text-pink">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-5 py-8 md:px-8 lg:grid-cols-[1fr_280px] lg:gap-10">
      <div className="min-w-0 space-y-6">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-base-2 sm:aspect-[17/10]">
          <HeroVideo />
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-2 text-[13px] text-fg/50">
          <p>
            <span className="mr-1.5 text-xl font-semibold text-pink">{String(events.length).padStart(2, "0")}</span>
            meetups so far
          </p>
          <p>
            <span className="mr-1.5 text-xl font-semibold text-pink">All</span>
            skill levels welcome
          </p>
        </div>
      </div>

      <aside className="lg:row-span-2">
        <div className="lg:sticky lg:top-24">
          <Sidebar />
        </div>
      </aside>

      <div className="min-w-0 space-y-12">
        {events.map((e) => (
          <section key={e.n}>
            <p className="mb-3 text-[13px]">
              <span className="font-medium">Meetup {String(e.n).padStart(2, "0")}</span>
              <span className="ml-2 text-fg/50">{e.date}</span>
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {e.photos.map((photo, i) => (
                <div key={photo.src} className="relative aspect-[16/10] overflow-hidden rounded-lg bg-base-2">
                  <Image
                    src={photo.src}
                    alt={`Vibe Code Philly meetup ${e.n}, photo ${i + 1}`}
                    fill
                    sizes="(min-width: 1024px) 280px, (min-width: 640px) 33vw, 50vw"
                    className="object-cover object-[50%_30%]"
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
