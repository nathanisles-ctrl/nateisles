import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MUSIC — NATE ISLES",
  description: "Original tracks. Production. Long-form listening.",
};

export default function MusicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
