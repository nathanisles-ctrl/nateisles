"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import StoryboardComposer from "@/components/StoryboardComposer";

type Clip = {
  id: string;
  src: string;
  title: string;
  category: "SHORTS" | "ATMOSPHERE" | "SUBJECT" | "MOTION";
  prompt: string;
  tool: string;
};

const clips: Clip[] = [
  {
    id: "001",
    src: "/me/films/cinematic-1.mp4",
    title: "High-Fidelity",
    category: "ATMOSPHERE",
    prompt: "A cinematic high-fidelity shot.",
    tool: "HAILUO",
  },
  {
    id: "002",
    src: "/me/films/slow-walk.mp4",
    title: "Slow Walk",
    category: "MOTION",
    prompt: "Cinematic shot, slow-motion walk.",
    tool: "HAILUO",
  },
  {
    id: "003",
    src: "/me/films/zoom.mp4",
    title: "Push-In",
    category: "MOTION",
    prompt: "Cinematic shot, zoom into the subject.",
    tool: "HAILUO",
  },
  {
    id: "004",
    src: "/me/films/gritty.mp4",
    title: "Gritty",
    category: "ATMOSPHERE",
    prompt: "Gritty, high-contrast cinema.",
    tool: "HAILUO",
  },
  {
    id: "005",
    src: "/me/films/subject-a.mp4",
    title: "Subject — A",
    category: "SUBJECT",
    prompt: "Subject study, cinematic frame.",
    tool: "HIGGSFIELD",
  },
  {
    id: "006",
    src: "/me/films/subject-b.mp4",
    title: "Subject — B",
    category: "SUBJECT",
    prompt: "Subject study, cinematic frame.",
    tool: "HIGGSFIELD",
  },
  {
    id: "007",
    src: "/me/films/subject-c.mp4",
    title: "Subject — C",
    category: "SUBJECT",
    prompt: "Subject motion, anamorphic.",
    tool: "HIGGSFIELD",
  },
  {
    id: "008",
    src: "/me/films/subject-d.mp4",
    title: "Subject — D",
    category: "SUBJECT",
    prompt: "Subject motion, anamorphic.",
    tool: "HIGGSFIELD",
  },
  {
    id: "009",
    src: "/me/films/pan.mp4",
    title: "Camera Pan",
    category: "MOTION",
    prompt: "Camera pans around to show the world.",
    tool: "HAILUO",
  },
  {
    id: "010",
    src: "/me/films/monster.mp4",
    title: "Reveal",
    category: "SHORTS",
    prompt: "Make a monster appear.",
    tool: "HAILUO",
  },
];

const categories = ["ALL", "SHORTS", "ATMOSPHERE", "SUBJECT", "MOTION"] as const;

export default function FilmsPage() {
  const [muted, setMuted] = useState(true);
  const [filter, setFilter] = useState<(typeof categories)[number]>("ALL");
  const [active, setActive] = useState<Clip | null>(null);

  const visible =
    filter === "ALL" ? clips : clips.filter((c) => c.category === filter);

  return (
    <main className="relative">
      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover object-[center_25%]"
          autoPlay
          muted={muted}
          loop
          playsInline
        >
          <source src="/me/atmosphere.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-obsidian/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-obsidian" />

        <div className="relative z-10 h-full flex items-end p-8 md:p-12">
          <div className="absolute top-28 left-8 md:left-12 font-mono text-xs tracking-[0.3em] text-bone/80">
            FILMS / AI CINEMA
          </div>

          <button
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Unmute" : "Mute"}
            className="absolute bottom-10 right-10 w-12 h-12 rounded-full border border-ember/60 text-ember flex items-center justify-center hover:bg-ember/10 transition-colors duration-500"
          >
            {muted ? "▶" : "❚❚"}
          </button>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="relative px-6 md:px-12 py-32 md:py-44">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-5 gap-16 md:gap-20 items-start">
          <div className="md:col-span-3">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-bone text-4xl md:text-6xl lg:text-7xl tracking-[0.02em] leading-[1.05]"
            >
              The camera
              <br />
              is software now.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{
                duration: 1.2,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-10 text-bone/75 text-base md:text-lg max-w-2xl leading-relaxed"
            >
              I direct cinema with prompts, motion, and craft — through Hailuo,
              Higgsfield, Kling, and Runway. Every frame below is generated.
              Every sequence is composed. The reel is the model.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{
                duration: 1.2,
                delay: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-8 text-ember font-mono text-[11px] tracking-[0.3em]"
            >
              — N. ISLES, DIRECTOR
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{
              duration: 1.4,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="md:col-span-2 relative aspect-[3/4] overflow-hidden border border-bone/10"
          >
            <img
              src="/me/portrait-cinematic.jpg"
              alt="Nate Isles, director"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
            <div className="absolute top-5 left-5 text-bone/80 font-mono text-[10px] tracking-[0.3em]">
              FILMS / DIR 001
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED DROP */}
      <section className="relative px-6 md:px-12 py-24 border-t border-bone/5">
        <div className="max-w-[1500px] mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <span className="h-1.5 w-1.5 rounded-full bg-ember pulse-soft" />
            <p className="text-ember font-mono text-[10px] tracking-[0.3em]">
              FEATURED DROP / NEW
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="relative aspect-video overflow-hidden border border-bone/10 bg-obsidian">
              <video
                src={clips[2].src}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-obsidian/30 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 text-ember font-mono text-[9px] tracking-[0.3em]">
                {clips[2].id} · {clips[2].tool}
              </div>
            </div>
            <div>
              <h2 className="font-display font-black text-bone text-4xl md:text-6xl tracking-[0.02em] leading-[1.05]">
                {clips[2].title}.
              </h2>
              <p className="mt-6 text-bone/75 text-base md:text-lg leading-relaxed">
                A study in {clips[2].category.toLowerCase()} —{" "}
                {clips[2].tool} pipeline, anamorphic frame, slow push-in. The
                kind of shot that used to require a crew, a dolly, and a
                location permit.
              </p>
              <button
                onClick={() => setActive(clips[2])}
                className="mt-8 inline-flex items-center gap-3 border border-ember text-ember px-6 py-3 text-sm tracking-[0.2em] hover:bg-ember hover:text-obsidian transition-colors duration-500"
              >
                OPEN FRAME →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS BREAKDOWN */}
      <section className="relative px-6 md:px-12 py-24 border-t border-bone/5">
        <div className="max-w-[1500px] mx-auto">
          <p className="text-ember font-mono text-[10px] tracking-[0.3em] mb-5">
            PROCESS / PROMPT → FRAME
          </p>
          <h2 className="font-display font-black text-bone text-4xl md:text-6xl tracking-[0.02em] mb-16 leading-[1.05]">
            How a frame
            <br />
            gets made.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {[
              {
                num: "01",
                title: "PROMPT",
                body: "Every shot starts as a sentence. The discipline is in restraint — fewer adjectives, sharper composition.",
                example:
                  "&ldquo;Cinematic shot, anamorphic, slow push toward a single warm gold light source. Heavy film grain. No people.&rdquo;",
              },
              {
                num: "02",
                title: "MODEL",
                body: "Hailuo for motion, Higgsfield for subject continuity, Kling for camera control, Runway for finishing. Each model has a hand it does best.",
                example: "HAILUO · HIGGSFIELD · KLING · RUNWAY",
              },
              {
                num: "03",
                title: "FRAME",
                body: "A 4–10 second clip. Looped, color-graded, contextualized in the sequence. The cut is the craft.",
                example: "→ HOVER ANY CLIP IN THE GRID",
              },
            ].map((step) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="border border-bone/10 p-8"
              >
                <div className="text-ember font-display font-black text-5xl tracking-[0.04em]">
                  {step.num}
                </div>
                <div className="mt-6 font-display font-black text-bone text-xl tracking-[0.18em]">
                  {step.title}
                </div>
                <p className="mt-4 text-bone/75 text-sm leading-relaxed">
                  {step.body}
                </p>
                <p
                  className="mt-6 text-bone/50 italic text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: step.example }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="relative px-6 md:px-12 py-24 border-t border-bone/5">
        <div className="max-w-[1500px] mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-ember font-mono text-[10px] tracking-[0.3em] mb-3">
                THE WORK
              </p>
              <h2 className="font-display font-black text-bone text-4xl md:text-6xl tracking-[0.02em]">
                Generated frames.
              </h2>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`text-[11px] tracking-[0.25em] transition-colors duration-300 ${
                    filter === c
                      ? "text-ember"
                      : "text-bone/50 hover:text-bone"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {visible.map((c, i) => (
              <ClipTile
                key={c.id}
                clip={c}
                index={i}
                onOpen={() => setActive(c)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* STORYBOARD COMPOSER */}
      <section className="relative px-6 md:px-12 py-32 border-t border-bone/5">
        <div className="max-w-[1500px] mx-auto">
          <div className="mb-16 max-w-3xl">
            <p className="text-ember font-mono text-[10px] tracking-[0.3em] mb-5">
              INTERACTIVE / TRY IT
            </p>
            <h2 className="font-display font-black text-bone text-4xl md:text-6xl lg:text-7xl tracking-[0.02em] leading-[1.05]">
              Direct your own
              <br />
              scene.
            </h2>
            <p className="mt-8 text-bone/75 text-base md:text-lg leading-relaxed">
              Drag clips from the palette into the timeline. Reorder. Hit play
              and watch the cut. This is the loop I work in — composed
              sequence, generated frame.
            </p>
          </div>

          <StoryboardComposer />
        </div>
      </section>

      {/* LIGHTBOX */}
      {/* (component below) */}
      {active && (
        <div
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[200] bg-obsidian/95 flex items-center justify-center p-6 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl"
          >
            <button
              onClick={() => setActive(null)}
              className="absolute -top-12 right-0 text-bone/70 hover:text-bone text-xs tracking-[0.25em]"
            >
              CLOSE ✕
            </button>
            <div className="aspect-video bg-obsidian border border-bone/10">
              <video
                src={active.src}
                autoPlay
                loop
                controls
                className="w-full h-full object-contain"
              />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="text-ember font-mono text-[10px] tracking-[0.3em]">
                  TITLE
                </div>
                <div className="mt-2 font-display font-black text-bone text-2xl">
                  {active.title}
                </div>
              </div>
              <div>
                <div className="text-ember font-mono text-[10px] tracking-[0.3em]">
                  CATEGORY · TOOL
                </div>
                <div className="mt-2 text-bone/80 font-mono text-xs tracking-[0.2em]">
                  {active.category} · {active.tool}
                </div>
              </div>
              <div>
                <div className="text-ember font-mono text-[10px] tracking-[0.3em]">
                  PROMPT
                </div>
                <div className="mt-2 text-bone/80 italic">{active.prompt}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function ClipTile({
  clip,
  index,
  onOpen,
}: {
  clip: Clip;
  index: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{
        duration: 0.8,
        delay: (index % 4) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={onOpen}
      onMouseEnter={() => ref.current?.play().catch(() => {})}
      onMouseLeave={() => {
        if (ref.current) {
          ref.current.pause();
          ref.current.currentTime = 0;
        }
      }}
      className="group relative aspect-[4/5] overflow-hidden border border-bone/10 hover:border-ember/60 cursor-pointer transition-colors duration-500"
    >
      <video
        ref={ref}
        src={clip.src}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-obsidian/30 opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
      <div className="absolute top-3 left-3 text-ember font-mono text-[9px] tracking-[0.3em]">
        {clip.id}
      </div>
      <div className="absolute top-3 right-3 text-bone/70 font-mono text-[9px] tracking-[0.25em]">
        {clip.tool}
      </div>
      <div className="absolute bottom-4 left-4 right-4">
        <div className="font-display font-black text-bone text-lg md:text-xl tracking-[0.02em]">
          {clip.title}
        </div>
        <div className="mt-1 text-bone/60 text-[10px] tracking-[0.2em]">
          {clip.category}
        </div>
      </div>
    </motion.div>
  );
}
