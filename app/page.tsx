"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import IslandCard from "@/components/IslandCard";
import { latest, currently } from "@/components/latest";

const islands = [
  {
    numeral: "I",
    name: "FILMS",
    oneLiner: "AI cinema and shorts.",
    href: "/films",
    videoSrc: "/me/islands/films.mp4",
    gradient: "from-storm/40 via-obsidian to-obsidian",
  },
  {
    numeral: "II",
    name: "MUSIC",
    oneLiner: "Original tracks and production.",
    href: "/music",
    videoSrc: "/me/islands/music.mp4",
    gradient: "from-ember-deep/20 via-obsidian-warm to-obsidian",
  },
  {
    numeral: "III",
    name: "TOOLS",
    oneLiner: "Software and creative AI.",
    href: "/tools",
    videoSrc: "/me/islands/tools.mp4",
    gradient: "from-storm/30 via-obsidian to-obsidian",
  },
  {
    numeral: "IV",
    name: "COACHING",
    oneLiner: "The craft of the offensive line.",
    href: "/coaching",
    videoSrc: "/me/islands/coaching.mp4",
    gradient: "from-ember-deep/10 via-obsidian-deep to-obsidian",
  },
];

export default function Home() {
  const [revealed, setRevealed] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <main>
      {/* Cold open overlay */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: revealed ? 0 : 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[80] bg-obsidian pointer-events-none"
        style={{ display: revealed ? "none" : "block" }}
      />

      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover object-[center_25%]"
          autoPlay
          muted
          loop
          playsInline
          poster="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'><rect width='16' height='9' fill='%230A0A0A'/></svg>"
        >
          <source src="/me/subject-1.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-obsidian/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-transparent to-obsidian" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 14 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-bone text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.08em] text-center -mt-16"
          >
            NATE ISLES
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: revealed ? 0.9 : 0, y: revealed ? 0 : 10 }}
            transition={{
              duration: 1.2,
              delay: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-8 text-bone/90 text-sm md:text-base tracking-wide"
          >
            Building what didn&apos;t exist yesterday.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: revealed ? 1 : 0 }}
            transition={{
              duration: 1.2,
              delay: 1.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-ember pulse-soft" />
            <span className="text-ember/70 text-xs">↓</span>
          </motion.div>
        </div>
      </section>

      {/* ISLANDS */}
      <section className="relative py-24 md:py-32 px-6 md:px-10">
        <div className="absolute inset-0 bg-obsidian/70 -z-10" />
        <div className="max-w-[1300px] mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-ember font-mono text-xs tracking-[0.3em] mb-12 md:mb-20 text-center"
          >
            FOUR ISLANDS · ONE LINE
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {islands.map((isle, i) => (
              <IslandCard
                key={isle.name}
                {...isle}
                index={i}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
              />
            ))}
          </div>
        </div>
      </section>

      {/* LATEST STRIP */}
      <section className="relative px-6 md:px-12 py-24 border-t border-bone/5">
        <div className="max-w-[1500px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <p className="text-ember font-mono text-[10px] tracking-[0.3em]">
              LATEST / FOUR ISLANDS
            </p>
            <p className="text-bone/40 font-mono text-[10px] tracking-[0.3em]">
              UPDATED ROLLING
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {latest.map((item, i) => (
              <motion.div
                key={item.island}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={item.href}
                  className="group block border border-bone/10 hover:border-ember/40 transition-colors duration-500"
                >
                  <div className="relative aspect-[5/6] overflow-hidden bg-storm/20">
                    {item.thumb && item.isVideo && (
                      <video
                        src={item.thumb}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-700"
                      />
                    )}
                    {item.thumb && !item.isVideo && (
                      <img
                        src={item.thumb}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-700"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
                    <div className="absolute top-3 left-3 text-ember font-mono text-[9px] tracking-[0.3em]">
                      {item.island}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="font-display font-black text-bone text-base md:text-lg tracking-[0.02em] leading-tight">
                        {item.title}
                      </div>
                      <div className="mt-1 text-bone/55 text-[10px] tracking-[0.18em]">
                        {item.meta}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VOICE LINE — split with portrait */}
      <section className="relative min-h-screen flex items-center px-6 md:px-12 py-32">
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display font-black text-bone text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.04em] leading-[0.95]">
              Force,
              <br />
              in every form.
            </h2>
            <p className="mt-10 text-bone/70 text-base md:text-lg max-w-md">
              Former pro offensive lineman. AI filmmaker. Musician. Builder.
            </p>

            <div className="mt-12 pt-8 border-t border-bone/10 max-w-md space-y-2">
              <p className="text-ember font-mono text-[10px] tracking-[0.3em] mb-4">
                CURRENTLY
              </p>
              {[
                { k: "BUILDING", v: currently.building },
                { k: "WRITING", v: currently.writing },
                { k: "READING", v: currently.reading },
                { k: "WATCHING", v: currently.watching },
              ].map((row) => (
                <div
                  key={row.k}
                  className="grid grid-cols-[100px_1fr] gap-4 text-sm"
                >
                  <span className="text-bone/40 font-mono text-[10px] tracking-[0.25em] pt-0.5">
                    {row.k}
                  </span>
                  <span className="text-bone/85">{row.v}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{
              duration: 1.4,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden border border-bone/10"
          >
            <img
              src="/me/portrait-editorial.jpg"
              alt="Nate Isles"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 text-ember font-mono text-[10px] tracking-[0.3em]">
              ISLES / PORTRAIT 001
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
