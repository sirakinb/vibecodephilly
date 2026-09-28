import Image from "next/image";
import Link from "next/link";
import { HeroVideo } from "@/components/hero-video";
import { PhotoGrid } from "@/components/photo-grid";
import { events, links, nextEvent } from "@/data/site";

const involved = [
  { href: "/talent", title: "Join the talent network", body: "Profile, opportunities, demo slots" },
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
          <span className="text-fg/50">Limited spots</span>
        </div>
        <div className="space-y-4 bg-fg p-4 text-white">
          <p className="text-[13px]">
            <span className="font-medium">{nextEvent.date}</span>
            <span className="ml-1.5 text-white/50">{nextEvent.day}</span>
          </p>
          <a
            href={links.rsvp}
            target="_blank"
            rel="noreferrer"
            className="flex gap-3 rounded-xl bg-white/[0.06] p-3 transition hover:bg-white/10"
          >
            <div className="min-w-0 flex-1">
              <p className="text-[12px] text-white/50">{nextEvent.time}</p>
              <p className="mt-1 font-medium leading-snug">{nextEvent.title}</p>
              <p className="mt-0.5 text-[13px] leading-snug text-white/70">{nextEvent.subtitle}</p>
              <p className="mt-2 text-[12px] text-white/50">
                {nextEvent.venue}, {nextEvent.address}
              </p>
            </div>
            <Image
              src={nextEvent.image}
              alt={`${nextEvent.title} flyer`}
              width={72}
              height={72}
              className="size-[72px] shrink-0 rounded-lg object-cover"
            />
          </a>
          <a
            href={links.rsvp}
            target="_blank"
            rel="noreferrer"
            className="block rounded-lg bg-pink px-4 py-2.5 text-center text-sm font-medium transition hover:brightness-110"
          >
            RSVP on Partiful
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
            <PhotoGrid photos={e.photos} title={`Vibe Code Philly Meetup ${String(e.n).padStart(2, "0")}`} date={e.date} />
          </section>
        ))}
      </div>
    </div>
  );
}
