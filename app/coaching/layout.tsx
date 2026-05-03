import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "THE CRAFT — NATE ISLES Coaching",
  description:
    "A school for offensive linemen. Technique, film study, the mental game, direct access.",
};

export default function CoachingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
