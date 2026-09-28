import Image from "next/image";
import Link from "next/link";
import { links, nav } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-cream/10">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.5fr_1fr_1fr] md:px-8">
        <div>
          <Image src="/wordmark.png" alt="Vibe Code PHL" width={596} height={336} className="h-14 w-auto" />
          <p className="mt-5 max-w-sm text-sm text-cream/60">
            A Philadelphia community for people who build with AI. Meetups, talks, build sessions — and a
            network that connects builders with teams who need them.
          </p>
        </div>
        <div>
          <p className="label mb-4">Explore</p>
          <ul className="space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-cream/70 hover:text-cream">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label mb-4">Follow</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={links.instagram} target="_blank" rel="noreferrer" className="text-cream/70 hover:text-cream">
                Instagram — @vibecodephilly
              </a>
            </li>
            {links.linkedin && (
              <li>
                <a href={links.linkedin} target="_blank" rel="noreferrer" className="text-cream/70 hover:text-cream">
                  LinkedIn
                </a>
              </li>
            )}
            <li>
              <a href={links.rsvp} target="_blank" rel="noreferrer" className="text-cream/70 hover:text-cream">
                Next event on Partiful
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl justify-between px-5 pb-8 text-xs text-cream/40 md:px-8">
        <span>© {new Date().getFullYear()} Vibe Code Philly</span>
        <span className="font-mono">Made in PHL</span>
      </div>
    </footer>
  );
}
