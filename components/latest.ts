// Edit me when life changes — used for the home page LATEST strip + CURRENTLY widget.

export const currently = {
  building: "nateisles.com",
  writing: "Track 004 — TBD",
  reading: "—",
  watching: "—",
};

export type LatestItem = {
  island: "FILMS" | "MUSIC" | "TOOLS" | "COACHING";
  title: string;
  meta: string;
  href: string;
  thumb?: string; // image OR video path under /public
  isVideo?: boolean;
};

export const latest: LatestItem[] = [
  {
    island: "FILMS",
    title: "Reel — In Progress",
    meta: "AI cinema · 2026",
    href: "/films",
    thumb: "/me/films/cinematic-1.mp4",
    isVideo: true,
  },
  {
    island: "MUSIC",
    title: "The Eternal Eve",
    meta: "Single · 2026",
    href: "/music",
    thumb: "/music/the-eternal-eve.jpg",
  },
  {
    island: "TOOLS",
    title: "Building in private",
    meta: "Q3 2026 release",
    href: "/tools",
  },
  {
    island: "COACHING",
    title: "The Craft — Doors Q4",
    meta: "Founding pricing for first 100",
    href: "/coaching",
    thumb: "/me/portrait-editorial.jpg",
  },
];
