"use client";

import { CalendarDays, Handshake, Sparkles, UsersRound, type LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { links, nav } from "@/data/site";

const icons: Record<(typeof nav)[number]["icon"], LucideIcon> = {
  events: CalendarDays,
  talent: UsersRound,
  partner: Handshake,
  showcase: Sparkles,
};

function Tabs({ className = "" }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={`flex items-stretch ${className}`}>
      {nav.map((item) => {
        const Icon = icons[item.icon];
        // The home page is the events feed, so Events reads as active there too.
        const active = pathname.startsWith(item.href) || (item.href === "/events" && pathname === "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`relative flex flex-1 flex-col items-center justify-center gap-1 px-4 text-[11px] transition-colors md:flex-none md:px-5 ${
              active ? "text-fg" : "text-fg/40 hover:text-fg/70"
            }`}
          >
            <Icon size={18} strokeWidth={active ? 2.2 : 1.8} />
            <span className={active ? "font-medium" : ""}>{item.label}</span>
            {active && <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-fg" />}
          </Link>
        );
      })}
    </nav>
  );
}

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-fg/10 bg-base/90 backdrop-blur-md">
      <div className="relative mx-auto flex h-14 max-w-6xl items-center justify-between px-5 md:h-16 md:px-8">
        <Link href="/" aria-label="Vibe Code Philly home">
          <Image src="/wordmark-dark.png" alt="Vibe Code PHL" width={596} height={336} className="h-7 w-auto" priority />
        </Link>

        <Tabs className="absolute inset-y-0 left-1/2 hidden -translate-x-1/2 md:flex" />

        <a
          href={links.rsvp}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-pink px-4 py-1.5 text-[13px] font-medium text-white transition hover:brightness-110"
        >
          RSVP
        </a>
      </div>

      <Tabs className="h-14 border-t border-fg/10 md:hidden" />
    </header>
  );
}
