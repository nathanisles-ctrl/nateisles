import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI CONSULTING — NATE ISLES",
  description:
    "Strategy and systems for the AI era. Audits, implementation, and ongoing advisory for small businesses and founders.",
};

export default function ConsultingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
