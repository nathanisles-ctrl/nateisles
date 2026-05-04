"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import NexusDashboard from "@/components/NexusDashboard";

export default function NexusPage() {
  return (
    <main className="relative">
      {/* HERO */}
      <section className="relative px-6 md:px-12 pt-32 pb-16">
        <div className="max-w-[1300px] mx-auto">
          <Link
            href="/tools"
            className="text-bone/50 hover:text-bone font-mono text-[10px] tracking-[0.3em] inline-block mb-12"
          >
            ← TOOLS
          </Link>
          <p className="font-mono text-xs tracking-[0.3em] text-bone/60 mb-6">
            ~/tools/nexus
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-display font-black text-bone text-6xl md:text-8xl lg:text-[10rem] tracking-[0.04em] leading-none"
          >
            NEXUS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-8 text-bone/80 text-base md:text-lg max-w-2xl"
          >
            An always-on agent. Weekly cron pipeline plus a 24/7 Telegram bot
            running an agentic loop with Claude. Below is what he&apos;s
            actually doing.
          </motion.p>
        </div>
      </section>

      {/* SPECS */}
      <section className="relative px-6 md:px-12 py-12">
        <div className="max-w-[1300px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-bone/5">
          {[
            { label: "RUNTIME", value: "PYTHON 3.12" },
            { label: "DEPS", value: "ZERO" },
            { label: "STORE", value: "SQLITE" },
            { label: "HOST", value: "VPS · UBUNTU" },
          ].map((c) => (
            <div
              key={c.label}
              className="bg-obsidian p-5 md:p-7"
            >
              <div className="text-ember font-mono text-[9px] tracking-[0.3em] mb-2">
                {c.label}
              </div>
              <div className="font-display font-black text-bone text-lg md:text-xl tracking-[0.04em]">
                {c.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DASHBOARD */}
      <section className="relative px-6 md:px-12 py-12">
        <div className="max-w-[1300px] mx-auto">
          <p className="text-ember font-mono text-[10px] tracking-[0.3em] mb-5">
            LIVE FEED
          </p>
          <h2 className="font-display font-black text-bone text-3xl md:text-5xl tracking-[0.02em] mb-8">
            What he&apos;s doing.
          </h2>
          <NexusDashboard />
        </div>
      </section>

      {/* WHAT NEXUS DOES */}
      <section className="relative px-6 md:px-12 py-32 border-t border-bone/5">
        <div className="max-w-[1300px] mx-auto">
          <p className="text-ember font-mono text-[10px] tracking-[0.3em] mb-5">
            ANATOMY
          </p>
          <h2 className="font-display font-black text-bone text-3xl md:text-5xl tracking-[0.02em] mb-12">
            Two services, one agent.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-bone/5">
            <div className="bg-obsidian p-8 md:p-10">
              <div className="text-ember font-mono text-[10px] tracking-[0.3em] mb-4">
                01 / WEEKLY PIPELINE
              </div>
              <div className="font-display font-black text-bone text-2xl md:text-3xl tracking-[0.02em] mb-6">
                Mondays, 07:00 ET.
              </div>
              <ul className="space-y-3 text-bone/75 text-sm leading-relaxed">
                <li>→ Collects signals from configured sources</li>
                <li>→ Generates a briefing (markdown, dated)</li>
                <li>→ Delivers to Notion + Telegram</li>
                <li>→ Writes content packages per vertical</li>
                <li>→ Logs to logs/weekly_YYYY-MM-DD.log</li>
              </ul>
            </div>
            <div className="bg-obsidian p-8 md:p-10">
              <div className="text-ember font-mono text-[10px] tracking-[0.3em] mb-4">
                02 / TELEGRAM BOT
              </div>
              <div className="font-display font-black text-bone text-2xl md:text-3xl tracking-[0.02em] mb-6">
                Always on, always thinking.
              </div>
              <ul className="space-y-3 text-bone/75 text-sm leading-relaxed">
                <li>→ Listens to commands 24/7</li>
                <li>→ Calls Claude in an agentic loop</li>
                <li>→ Tools: web search, file reads, content gen, exec</li>
                <li>→ Iterates until it has an answer</li>
                <li>→ Not a one-shot script — it thinks</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
