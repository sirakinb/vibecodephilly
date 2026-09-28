import photos from "./photos.json";

export type Photo = { src: string; w: number; h: number };

export const links = {
  rsvp: "https://partiful.com/e/zl6giZDvfTnFRP0I7l6Y",
  instagram: "https://instagram.com/vibecodephilly",
  linkedin: "",
};

export const nextEvent = {
  title: "Vibe Marketing",
  subtitle: "Marketing in the Age of Agents",
  day: "Saturday",
  date: "Oct 17",
  time: "12 to 3 PM",
  venue: "iMunch Cafe",
  address: "233 N 31st St",
  image: "/next-event.jpg",
};

export const nav = [
  { href: "/events", label: "Events", icon: "events" },
  { href: "/talent", label: "Talent", icon: "talent" },
  { href: "/partner", label: "Partner", icon: "partner" },
  { href: "/showcase", label: "Showcase", icon: "showcase" },
] as const;

export type EventRecap = {
  n: number;
  date: string;
  iso: string;
  blurb: string;
  photos: Photo[];
};

const all = photos as Record<string, Photo[]>;
const pick = (n: number, files: number[]) => files.map((i) => all[n][i - 1]);

// Curated per event: rows of 6 so grids stay even at 2 and 3 columns.
const p: Record<string, Photo[]> = {
  "1": pick(1, [3, 2, 10, 17, 13, 11, 5, 19, 20, 14, 22, 18, 6, 12, 21, 16, 4, 9]),
  "2": pick(2, [11, 3, 14, 4, 12, 10, 7, 13, 9, 5, 6, 8]),
  "3": pick(3, [1, 5, 9, 4, 8, 10, 11, 2, 7, 3, 6, 12]),
  "4": pick(4, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  "5": pick(5, [1, 4, 2, 5, 6, 3]),
};

// Newest first.
export const events: EventRecap[] = [
  { n: 5, date: "June 20, 2026", iso: "2026-06-20", blurb: "Lightning talks on local tooling, sandboxed agents, no-code game dev and more.", photos: p["5"] },
  { n: 4, date: "April 22, 2026", iso: "2026-04-22", blurb: "A full room of developers, founders and first-timers working side by side.", photos: p["4"] },
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
