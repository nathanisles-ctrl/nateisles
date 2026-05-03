import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TOOLS — NATE ISLES",
  description: "Software and creative AI, built for makers.",
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
