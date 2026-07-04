"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type AiTool = {
  name: string;
  href: string;
  blurb: string;
};

type AiCategory = {
  label: string;
  tools: AiTool[];
};

const categories: AiCategory[] = [
  {
    label: "VIDEO GENERATION",
    tools: [
      {
        name: "Kling",
        href: "https://klingai.com",
        blurb: "Cinematic video generation — powers the hero clips on this site.",
      },
      {
        name: "Runway",
        href: "https://runwayml.com",
        blurb: "Video models, editing, and VFX tooling.",
      },
      {
        name: "Pika",
        href: "https://pika.art",
        blurb: "Fast, stylized text-to-video generation.",
      },
      {
        name: "Luma Dream Machine",
        href: "https://lumalabs.ai/dream-machine",
        blurb: "Realistic motion and physics from a single prompt.",
      },
    ],
  },
  {
    label: "IMAGE GENERATION",
    tools: [
      {
        name: "Midjourney",
        href: "https://www.midjourney.com",
        blurb: "Painterly, high-fidelity still imagery.",
      },
      {
        name: "Stable Diffusion",
        href: "https://stability.ai",
        blurb: "Open-weight diffusion models from Stability AI.",
      },
      {
        name: "Adobe Firefly",
        href: "https://firefly.adobe.com",
        blurb: "Commercially-safe generative imagery built into Creative Cloud.",
      },
    ],
  },
  {
    label: "MUSIC GENERATION",
    tools: [
      {
        name: "Suno",
        href: "https://suno.com",
        blurb: "Full song generation from lyrics and prompt — powers the Music island.",
      },
      {
        name: "Udio",
        href: "https://udio.com",
        blurb: "High-fidelity AI music generation and vocals.",
      },
    ],
  },
  {
    label: "VOICE & AUDIO",
    tools: [
      {
        name: "ElevenLabs",
        href: "https://elevenlabs.io",
        blurb: "Text-to-speech, voice cloning, and dubbing.",
      },
    ],
  },
  {
    label: "CHAT & WRITING",
    tools: [
      {
        name: "ChatGPT",
        href: "https://chatgpt.com",
        blurb: "OpenAI's general-purpose assistant.",
      },
      {
        name: "Claude",
        href: "https://claude.ai",
        blurb: "Anthropic's assistant — reasoning, writing, long-context work.",
      },
      {
        name: "Gemini",
        href: "https://gemini.google.com",
        blurb: "Google's multimodal assistant.",
      },
    ],
  },
  {
    label: "CODE & DEV",
    tools: [
      {
        name: "Claude Code",
        href: "https://claude.com/claude-code",
        blurb: "Agentic coding in the terminal — runs Nexus and builds this site.",
      },
      {
        name: "GitHub Copilot",
        href: "https://github.com/features/copilot",
        blurb: "In-editor pair programming.",
      },
      {
        name: "Cursor",
        href: "https://cursor.com",
        blurb: "AI-native code editor.",
      },
    ],
  },
];

export default function AiStackPage() {
  return (
    <main className="relative">
      {/* HERO */}
      <section className="relative px-6 md:px-12 py-32 md:py-40 border-b border-bone/5">
        <div className="max-w-[1300px] mx-auto">
          <Link
            href="/tools"
            className="font-mono text-xs tracking-[0.3em] text-bone/60 hover:text-ember transition-colors duration-300"
          >
            ← ~/tools
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 font-display font-black text-bone text-6xl md:text-8xl tracking-[0.04em] leading-none"
          >
            AI STACK
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 text-bone/80 text-base md:text-lg max-w-2xl"
          >
            The tools behind the work, sorted by function. Some built the
            clips, tracks, and code on this site directly — the rest are
            here because they&apos;re the best in class right now.
          </motion.p>
        </div>
      </section>

      {/* CATEGORIES */}
      {categories.map((category) => (
        <section
          key={category.label}
          className="relative px-6 md:px-12 py-20 border-b border-bone/5"
        >
          <div className="max-w-[1300px] mx-auto">
            <p className="text-ember font-mono text-[10px] tracking-[0.3em] mb-10">
              {category.label}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {category.tools.map((tool, ti) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{
                    duration: 0.9,
                    delay: (ti % 3) * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <a
                    href={tool.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full border border-bone/10 hover:border-ember p-8 transition-all duration-500 hover:shadow-[0_0_60px_-20px_rgba(201,169,97,0.3)] group"
                  >
                    <div className="flex items-start justify-between">
                      <h3 className="font-display font-black text-bone text-2xl md:text-3xl tracking-[0.02em]">
                        {tool.name}
                      </h3>
                      <span className="text-ember opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        ↗
                      </span>
                    </div>
                    <p className="mt-4 text-bone/70 text-sm">{tool.blurb}</p>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
