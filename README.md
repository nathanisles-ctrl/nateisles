# NATE ISLES — nateisles.com

Cinematic mythos. Force, in every form.

A multi-page personal brand site for NATE ISLES — AI filmmaker, musician,
software builder, and former pro offensive lineman. Built per the spec in
`nate-isles-website-spec.md`.

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** with custom brand tokens
- **Framer Motion** for cinematic transitions
- **Google Fonts:** Big Shoulders Display (display), Inter (body), JetBrains Mono (mono)

## Brand tokens

| Token | Hex |
|---|---|
| `obsidian` | `#0A0A0A` |
| `obsidian-warm` | `#0A0807` (music) |
| `obsidian-deep` | `#080604` (coaching) |
| `bone` | `#E8E4DA` |
| `ember` | `#C9A961` |
| `ember-light` | `#D4B373` |
| `ember-deep` | `#8B6F30` |
| `storm` | `#2A3942` |

Cinematic easing is `cubic-bezier(0.16, 1, 0.3, 1)` (`ease-cinematic`),
durations live between 600–1200ms.

## Pages

- `/` — cinematic gateway (cold open → hero → four islands → voice line)
- `/films` — director's reel
- `/music` — nocturnal sacred (warmer obsidian + grain)
- `/tools` — brutalist precise (no video, no grain)
- `/coaching` — heavy grounded (deepest obsidian + heaviest grain)
- `/contact` — minimal three-field form

## Run locally

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## Personal assets (`public/me/`)

The site already wires in four videos and references two portraits. Files
the pages expect:

| File | Used on | Status |
|---|---|---|
| `subject-1.mp4` | `/` hero | wired |
| `subject-2.mp4` | `/films` hero | wired |
| `atmosphere.mp4` | `/music` hero | wired |
| `high-angle.mp4` | `/coaching` hero | wired |
| `portrait-editorial.jpg` | `/` voice section, `/coaching` credential, `/contact` signature | **drop in** |
| `portrait-cinematic.jpg` | `/films` statement | **drop in** |

To add the portraits, save them to:
- `public/me/portrait-editorial.jpg` — the editorial wood-paneled-room shot
- `public/me/portrait-cinematic.jpg` — the cinematic sci-fi/orb shot

`<img>` tags fall back gracefully if the file is missing (display: none on
error), so the layout doesn't break — but those slots feel empty without
the images.

## Replace remaining placeholders before launch

1. **More videos** — Section 10 of the spec also calls for:
   - 4× 1:1 island preview videos on the homepage (currently solid gradient
     cards — they read as designed without preview clips, but adding them
     deepens the experience)
   - `/films` per-film stills + clips when you populate the `films` array

2. **Films / tracks / tools** — populate the `films`, `tracks`, and `tools`
   arrays at the top of each page. Empty arrays trigger the
   "no-content-yet" placeholders (intentional — anticipation is currency).

3. **Email handlers** — `/api/contact` and `/api/subscribe` currently log
   and return `{ok:true}`. Wire them to Resend / SendGrid / ConvertKit /
   Beehiiv before launch.

4. **GitHub link** — replace `github.com/nateisles` on the Tools page with
   the actual handle if different.

5. **Favicon + OG image** — drop into `/public` and reference from
   `app/layout.tsx`.

## Architecture notes

- `components/CustomCursor.tsx` — desktop-only ember dot + obsidian ring
  follower. Hidden on touch.
- `components/PageTransition.tsx` — 600ms cross-fade between pages.
- `components/Nav.tsx` — floats over content, blurs in on scroll, mobile
  full-screen menu.
- `globals.css` — fonts loaded from Google CDN. Native cursor hidden on
  fine-pointer devices via `cursor: none`.

## Launch checklist

See Section 12 of `nate-isles-website-spec.md`.
