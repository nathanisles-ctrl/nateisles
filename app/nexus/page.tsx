"use client";

import { motion } from "framer-motion";

const builtWith = [
  {
    label: "INTERFACE",
    body: "A long-polling Telegram bot (nexus_bot.py) — no inbound ports required, so the attack surface stays small by design.",
  },
  {
    label: "MODEL",
    body: "Runs on Claude, currently claude-sonnet-4-6.",
  },
  {
    label: "TOOLS (8)",
    body: "web_search, fetch_url, run_collectors, generate_content, list_content_packages, read_file, save_to_notion, run_script — each one scoped to a specific job rather than open-ended shell access.",
  },
  {
    label: "COMMANDS",
    body: "/start, /status, /signals, /briefing, /watch — plus a full agentic fallback for anything outside the fixed command set.",
  },
  {
    label: "MEMORY",
    body: "A persistent SQLite store (memory/nexus.db) so briefings and outcomes are tracked over time instead of starting from zero each session.",
  },
  {
    label: "PUBLISHING",
    body: "OAuth-connected to Instagram and YouTube, with dedicated publisher scripts for each.",
  },
  {
    label: "OPS",
    body: "Runs as a systemd service (Restart=always, RestartSec=10) so it self-heals after a crash, and reports live events to a telemetry dashboard at nateisles.com/tools/nexus — [X] uptime, visible in real time rather than something I have to SSH in to check.",
  },
];

const timeline = [
  {
    when: "APRIL 25–27, 2026",
    body: "First automated weekly research briefings generated and delivered.",
  },
  {
    when: "[DATE]",
    body: "Publish layer, Instagram OAuth, the memory system, and content generation shipped together.",
  },
  {
    when: "[DATE]",
    body: "Telegram delivery added: weekly briefing now lands in both Notion and a Telegram DM automatically.",
  },
  {
    when: "MAY 4, 2026",
    body: "Bot wired to a live telemetry dashboard on nateisles.com; service confirmed running and self-restarting on the VPS.",
  },
];

export default function NexusCaseStudyPage() {
  return (
    <main className="relative">
      {/* VIDEO — TODO(nathan): replace VIDEO_ID_PLACEHOLDER below with the
          real YouTube video ID before launch. */}
      <div className="relative w-full aspect-video bg-obsidian border-b border-bone/10">
        <iframe
          className="absolute inset-0 w-full h-full"
          src="https://www.youtube.com/embed/VIDEO_ID_PLACEHOLDER"
          title="Nexus — case study video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      {/* HERO */}
      <section className="relative px-6 md:px-12 pt-20 pb-16">
        <div className="max-w-[1300px] mx-auto">
          <p className="font-mono text-xs tracking-[0.3em] text-bone/60 mb-6">
            ~/nexus
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-bone text-6xl md:text-8xl lg:text-[10rem] tracking-[0.04em] leading-none"
          >
            NEXUS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 font-display font-black text-bone text-2xl md:text-4xl tracking-[0.02em] max-w-3xl"
          >
            Building an autonomous agent that runs my content and research
            pipeline.
          </motion.p>
        </div>
      </section>

      {/* WHAT NEXUS IS */}
      <section className="relative px-6 md:px-12 py-24 border-t border-bone/5">
        <div className="max-w-[1300px] mx-auto">
          <p className="text-ember font-mono text-[10px] tracking-[0.3em] mb-6">
            WHAT NEXUS IS
          </p>
          <p className="text-bone/80 text-base md:text-lg leading-relaxed max-w-3xl">
            Nexus is a Telegram-based autonomous agent running on a personal
            VPS, built solo, that handles content generation, research
            briefings, and (in progress) sports-signal analysis without
            needing to touch a laptop. It&apos;s not a chatbot wrapper —
            it&apos;s a super-agent with its own tool belt: web search, URL
            fetching, a data-collector runner, a content generator, a Notion
            writer, and a sandboxed script runner, all invoked autonomously in
            response to a single Telegram conversation.
          </p>
        </div>
      </section>

      {/* HOW IT'S BUILT */}
      <section className="relative px-6 md:px-12 py-24 border-t border-bone/5">
        <div className="max-w-[1300px] mx-auto">
          <p className="text-ember font-mono text-[10px] tracking-[0.3em] mb-10">
            HOW IT&apos;S BUILT
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-bone/5">
            {builtWith.map((b) => (
              <div key={b.label} className="bg-obsidian p-8 md:p-10">
                <div className="text-ember font-mono text-[10px] tracking-[0.3em] mb-4">
                  {b.label}
                </div>
                <p className="text-bone/75 text-sm leading-relaxed">
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="relative px-6 md:px-12 py-24 border-t border-bone/5">
        <div className="max-w-[1300px] mx-auto">
          <p className="text-ember font-mono text-[10px] tracking-[0.3em] mb-10">
            TIMELINE
          </p>
          <ul className="space-y-8 max-w-3xl">
            {timeline.map((t) => (
              <li
                key={t.when + t.body}
                className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-2 md:gap-8"
              >
                <span className="text-ember font-mono text-[10px] tracking-[0.25em] pt-0.5">
                  {t.when}
                </span>
                <span className="text-bone/80 text-sm md:text-base leading-relaxed">
                  {t.body}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHERE IT STANDS NOW */}
      <section className="relative px-6 md:px-12 py-24 border-t border-bone/5">
        <div className="max-w-[1300px] mx-auto">
          <p className="text-ember font-mono text-[10px] tracking-[0.3em] mb-6">
            WHERE IT STANDS NOW
          </p>
          <div className="max-w-3xl space-y-6">
            <p className="text-bone/80 text-base md:text-lg leading-relaxed">
              Nexus reliably runs its content and briefing pipeline
              autonomously — generating drafts, delivering weekly briefings
              to Notion and Telegram, and reporting its own status to a
              public dashboard — with a human reviewing output before
              anything goes out publicly. It is not yet handling money: no
              payments, no autonomous spend, nothing financial is connected.
              That&apos;s deliberate. The build is following a staged
              roadmap — security hardening first, monetization second
              (human-approved only), broader autonomy last — so that scope
              increases only after the previous stage has run cleanly.
            </p>
            <p className="text-bone/50 text-sm leading-relaxed italic">
              [Add here once available: subscriber/output counts,
              engagement numbers, screenshots of the live dashboard, or a
              specific problem this pipeline solved that used to take manual
              hours.]
            </p>
          </div>
        </div>
      </section>

      {/* WHAT'S NEXT */}
      <section className="relative px-6 md:px-12 py-24 border-t border-bone/5">
        <div className="max-w-[1300px] mx-auto">
          <p className="text-ember font-mono text-[10px] tracking-[0.3em] mb-6">
            WHAT&apos;S NEXT
          </p>
          <p className="text-bone/80 text-base md:text-lg leading-relaxed max-w-3xl">
            The next stage turns this from &ldquo;runs my content
            pipeline&rdquo; into &ldquo;contributes to revenue&rdquo;:
            productizing a sports-analysis signals feed and making the
            weekly content engine fully autonomous, with every money-touching
            action still requiring a human approval step before it executes.
            Broader autonomy — Nexus executing small transactions on its own
            — only comes after that stage has a clean track record.
          </p>
        </div>
      </section>
    </main>
  );
}
