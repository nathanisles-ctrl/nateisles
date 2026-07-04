import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI STACK — NATE ISLES",
  description:
    "The AI tools behind the work — video, image, music, voice, writing, and code — sorted by function.",
};

export default function AiStackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
