export type Track = {
  id: string;
  title: string;
  audio: string;
  cover: string;
  format: "SINGLE" | "EP" | "ALBUM";
  length: string;
  year: string;
  sunoUrl: string;
  description?: string;
};

// Add tracks here. The first one is featured as "LATEST" — reorder to swap.
export const tracks: Track[] = [
  {
    id: "001",
    title: "The Eternal Eve",
    audio: "/music/the-eternal-eve.mp3",
    cover: "/music/the-eternal-eve.jpg",
    format: "SINGLE",
    length: "—",
    year: "2026",
    sunoUrl:
      "https://suno.com/song/b98ce1a9-7a0e-4065-9fae-3eab659c65d5",
  },
  {
    id: "002",
    title: "Redline Reality",
    audio: "/music/redline-reality.mp3",
    cover: "/music/redline-reality-large.jpg",
    format: "SINGLE",
    length: "—",
    year: "2026",
    sunoUrl:
      "https://suno.com/song/70965e27-2664-473c-a125-6d0c537a0343",
  },
];
