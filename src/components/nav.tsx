"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { links, nav } from "@/data/site";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-fg/10 bg-base/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 md:px-8">
        <Link href="/" aria-label="Vibe Code Philly home" onClick={() => setOpen(false)}>
          <Image src="/wordmark-dark.png" alt="Vibe Code PHL" width={596} height={336} className="h-7 w-auto" priority />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[13px] transition-colors hover:text-fg ${
                pathname.startsWith(item.href) ? "text-fg" : "text-fg/60"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={links.rsvp}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-pink px-4 py-1.5 text-[13px] font-medium text-white transition hover:brightness-110"
          >
            RSVP
          </a>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="grid size-9 place-items-center rounded-full border border-fg/15 md:hidden"
          >
            <span className="block h-px w-4 bg-fg shadow-[0_5px_0_var(--fg),0_-5px_0_var(--fg)]" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-fg/10 px-5 pb-6 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="display block border-b border-fg/10 py-4 text-3xl"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
