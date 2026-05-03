"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import GithubFeed from "@/components/GithubFeed";
import GithubStats from "@/components/GithubStats";

type Tool = {
  name: string;
  description: string;
  type: string;
  stack: string;
  status: "LIVE" | "BETA" | "SOON" | "INTERNAL";
  icon: "square" | "circle" | "line" | "triangle";
  href?: string;
};

const tools: Tool[] = [
  {
    name: "Tool 001",
    description: "Currently in private development.",
    type: "WEB APP",
    stack: "NEXT.JS",
    status: "SOON",
    icon: "square",
  },
  {
    name: "Tool 002",
    description: "Creative AI utility for filmmakers.",
    type: "CLI",
    stack: "PYTHON",
    status: "INTERNAL",
    icon: "circle",
  },
];

const statusColor: Record<Tool["status"], string> = {
  LIVE: "text-ember",
  BETA: "text-bone",
  SOON: "text-bone/50",
  INTERNAL: "text-storm",
};

export default function ToolsPage() {
  return (
    <main className="relative">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center px-6 md:px-12 py-32">
        <div className="max-w-[1300px] mx-auto w-full">
          <p className="font-mono text-xs tracking-[0.3em] text-bone/60">
            ~/tools
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.4,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-12 font-display font-black text-bone text-7xl md:text-9xl lg:text-[12rem] tracking-[0.06em] leading-none"
          >
            TOOLS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-10 text-bone/80 text-base md:text-lg max-w-2xl"
          >
            Software and creative AI, built for makers.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{
              duration: 1.2,
              delay: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-4 font-mono text-xs tracking-[0.18em] text-bone/60"
          >
            [ open source where possible · proprietary where it matters ]
          </motion.p>
        </div>
      </section>

      {/* GRID */}
      <section className="relative px-6 md:px-12 py-24 border-t border-bone/5">
        <div className="max-w-[1300px] mx-auto">
          {tools.length === 0 ? (
            <div className="max-w-2xl">
              <h2 className="font-display font-black text-bone text-4xl md:text-5xl">
                The first tools are coming.
              </h2>
              <p className="mt-6 text-bone/70">
                Currently building in private. Public releases starting Q3
                2026.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {tools.map((t, i) => (
                <ToolCard key={t.name} tool={t} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* GITHUB ACTIVITY */}
      <section className="relative px-6 md:px-12 py-24 border-t border-bone/5">
        <div className="max-w-[1100px] mx-auto">
          <p className="text-ember font-mono text-[10px] tracking-[0.3em] mb-4">
            ACTIVITY
          </p>
          <h2 className="font-display font-black text-bone text-3xl md:text-5xl tracking-[0.02em] mb-10">
            Building, in public.
          </h2>
          <div className="mb-10">
            <GithubStats />
          </div>
          <GithubFeed />
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-6 py-24 border-t border-bone/5">
        <div className="text-center max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-bone text-4xl md:text-6xl tracking-[0.02em] leading-[1.1]"
          >
            Built in public.
            <br />
            Shared in code.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{
              duration: 1.2,
              delay: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-10 text-bone/70 text-base md:text-lg"
          >
            Most of what I build is open source. The rest exists for paying
            clients or future products. Either way, the rule is the same: ship
            things people want to use.
          </motion.p>
          <a
            href="https://github.com/nateisles"
            className="mt-10 inline-block font-mono text-xs tracking-[0.2em] text-ember hover:text-ember-light transition-colors duration-500"
          >
            → github.com/nateisles
          </a>
        </div>
      </section>

      {/* HIRE */}
      <section className="relative px-6 md:px-12 py-32 border-t border-bone/5">
        <div className="max-w-[1100px]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-bone text-4xl md:text-6xl tracking-[0.02em]"
          >
            Need something built?
          </motion.h2>
          <p className="mt-8 text-bone/70 max-w-2xl text-base md:text-lg leading-relaxed">
            I take a small number of custom AI tooling and creative-tech
            projects per quarter. If you have a real problem to solve, write me.
          </p>
          <Link
            href="/contact?project=tool"
            className="mt-10 inline-flex items-center gap-3 border border-ember text-ember px-6 py-3 text-sm tracking-[0.2em] hover:bg-ember hover:text-obsidian transition-colors duration-500"
          >
            PITCH ME A PROJECT →
          </Link>
        </div>
      </section>
    </main>
  );
}

function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.9,
        delay: (index % 2) * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={tool.href || "#"}
        className="block border border-bone/10 hover:border-ember p-8 transition-all duration-500 hover:shadow-[0_0_60px_-20px_rgba(201,169,97,0.3)] group"
      >
        <div className="flex items-start justify-between">
          <ToolIcon icon={tool.icon} />
          <span
            className={`font-mono text-[10px] tracking-[0.25em] ${statusColor[tool.status]}`}
          >
            [ {tool.status} ]
          </span>
        </div>

        <h3 className="mt-10 font-display font-black text-bone text-3xl md:text-4xl tracking-[0.02em]">
          {tool.name}
        </h3>
        <p className="mt-3 text-bone/70 text-sm">{tool.description}</p>

        <div className="mt-12 flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-[0.25em] text-bone/60">
            {tool.type} · {tool.stack}
          </span>
          <span className="text-ember opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function ToolIcon({ icon }: { icon: Tool["icon"] }) {
  const cls = "w-8 h-8 stroke-ember fill-none stroke-[1.5]";
  switch (icon) {
    case "circle":
      return (
        <svg viewBox="0 0 32 32" className={cls}>
          <circle cx="16" cy="16" r="12" />
        </svg>
      );
    case "line":
      return (
        <svg viewBox="0 0 32 32" className={cls}>
          <line x1="4" y1="16" x2="28" y2="16" />
        </svg>
      );
    case "triangle":
      return (
        <svg viewBox="0 0 32 32" className={cls}>
          <polygon points="16,4 28,28 4,28" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 32 32" className={cls}>
          <rect x="4" y="4" width="24" height="24" />
        </svg>
      );
  }
}
