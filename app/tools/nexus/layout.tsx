import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NEXUS — NATE ISLES",
  description:
    "Always-on agent. Weekly cron pipeline + 24/7 Telegram bot in an agentic loop. Live feed.",
};

export default function NexusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
