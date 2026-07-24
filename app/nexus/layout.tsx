import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NEXUS — CASE STUDY — NATE ISLES",
  description:
    "How Nexus — an autonomous Telegram agent running content generation and research pipelines from a personal VPS — actually works, end to end.",
};

export default function NexusCaseStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
