import photos from "./photos.json";

export type Photo = { src: string; w: number; h: number };

// TODO: swap in the live Partiful link for the next event.
export const links = {
  rsvp: "https://partiful.com",
  instagram: "https://instagram.com/vibecodephilly",
  linkedin: "",
};

export const nav = [
  { href: "/events", label: "Events" },
  { href: "/builders", label: "Builders" },
  { href: "/hire", label: "Hire" },
  { href: "/partner", label: "Partner" },
  { href: "/showcase", label: "Showcase" },
];

export type EventRecap = {
  n: number;
  date: string;
  iso: string;
  blurb: string;
  photos: Photo[];
};

const p = photos as Record<string, Photo[]>;

// Newest first.
export const events: EventRecap[] = [
  { n: 5, date: "June 20, 2026", iso: "2026-06-20", blurb: "Lightning talks on local tooling, sandboxed agents, no-code game dev and more.", photos: p["5"] },
  { n: 4, date: "April 22, 2026", iso: "2026-04-22", blurb: "A full room of builders, founders and first-timers shipping side by side.", photos: p["4"] },
  { n: 3, date: "March 28, 2026", iso: "2026-03-28", blurb: "Live demos on the big screen and a full afternoon of building.", photos: p["3"] },
  { n: 2, date: "November 13, 2025", iso: "2025-11-13", blurb: "Couch-side demos, open laptops and our first community show-and-tell.", photos: p["2"] },
  { n: 1, date: "September 16, 2025", iso: "2025-09-16", blurb: "Where it started: one kitchen, a lot of pizza, and a room full of people building with AI.", photos: p["1"] },
];

export const talks = [
  "Vibe Code Agentic Foundations",
  "Build Locally with Our New CLI & API",
  "Codex: Sandbox Terminal for Safe Local Development",
  "Copyright Myths Busted: Using Public Domain Content Legally",
  "Free Website Hosting: Start Your Project Today",
  "Katika.ws: Local Tech Hosting for Your Projects",
  "No-Code Game Dev: Build Your Own Game in a Week",
];

export const stacks = ["Cursor", "Claude Code", "Lovable", "Replit", "Bolt", "v0", "Codex", "n8n", "Other"];
