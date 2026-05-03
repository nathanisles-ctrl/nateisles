import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FILMS — NATE ISLES",
  description:
    "AI cinema and shorts. Original films directed and produced through prompt, motion, and craft.",
};

export default function FilmsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
