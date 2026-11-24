// Edit me when life changes — used for the home page LATEST strip + CURRENTLY widget.

// Add a row here whenever there's something real to show. No placeholders —
// an empty widget reads better than a fake one.
export const currently: { k: string; v: string }[] = [
  { k: "BUILDING", v: "nateisles.com" },
];

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
    title: "Code Blooded",
    meta: "AI sci-fi short · watch on YouTube",
    href: "https://www.youtube.com/watch?v=ZJNc0o2lPlQ",
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
    title: "Nexus",
    meta: "Self-hosted AI agent",
    href: "/tools",
  },
  {
    island: "COACHING",
    title: "OL Mastery — Doors open",
    meta: "Join on Skool",
    href: "/coaching",
    thumb: "/me/portrait-editorial.jpg",
  },
];
