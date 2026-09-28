# Vibe Code Philly

Site for Vibe Code Philly: events, talent network and partnerships.

Next.js (App Router) + Tailwind v4. `npm run dev` to develop.

- Event photos: `public/events/`, metadata in `src/data/photos.json` (exported from the Drive folder by `_media/pick.py`, which is git-ignored).
- Links (Partiful, Instagram, LinkedIn), events, talks: `src/data/site.ts`.
- Forms (talent, partner, speak, showcase) submit to `src/app/actions.ts`. Submissions are only logged until a database is connected.
