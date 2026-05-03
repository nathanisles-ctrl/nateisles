"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import AudioPlayer from "@/components/AudioPlayer";
import { tracks, type Track } from "@/components/tracks";

const featured = tracks[0];
const catalog = tracks;

export default function MusicPage() {
  // Allow only one player active at a time
  const playersRef = useRef<Map<string, () => void>>(new Map());
  const [activeId, setActiveId] = useState<string | null>(null);

  const onPlayerStarts = (track: Track) => {
    setActiveId(track.id);
    playersRef.current.forEach((pause, id) => {
      if (id !== track.id) pause();
    });
  };

  const register = (id: string) => (api: { pause: () => void }) => {
    playersRef.current.set(id, api.pause);
  };

  return (
    <main className="relative" style={{ backgroundColor: "#0A0807" }}>
      <div className="grain-overlay" aria-hidden />

      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <video
          className="absolute inset-0 w-full h-full object-cover object-[center_30%] opacity-60"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/me/subject-2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-warm/70 via-obsidian-warm/85 to-obsidian-warm" />

        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.4,
              delay: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-display font-black text-bone text-6xl md:text-8xl lg:text-[10rem] tracking-[0.1em] flicker"
          >
            MUSIC
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{
              duration: 1.2,
              delay: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-8 text-bone/80 text-sm md:text-base tracking-wider"
          >
            Original tracks. Production. Long-form listening.
          </motion.p>
        </div>
      </section>

      {/* FEATURED / LATEST */}
      {featured && (
        <section className="relative px-6 md:px-12 py-32 md:py-44">
          <div className="max-w-[1300px] mx-auto">
            <p className="text-ember font-mono text-[10px] tracking-[0.3em] mb-10">
              LATEST
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="aspect-square w-full overflow-hidden shadow-2xl border border-ember/10">
                  <img
                    src={featured.cover}
                    alt={featured.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-6">
                  <div className="font-display font-black text-bone text-4xl md:text-5xl tracking-[0.02em]">
                    {featured.title}
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] tracking-[0.3em]">
                    <span className="text-ember">{featured.format}</span>
                    <span className="text-bone/40">·</span>
                    <span className="text-bone/60">{featured.year}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{
                  duration: 1.2,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <AudioPlayer
                  track={featured}
                  onPlay={onPlayerStarts}
                  registerControl={register(featured.id)}
                />

                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-bone/70 text-xs tracking-[0.2em]">
                  <a
                    href={featured.sunoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-ember relative group transition-colors duration-500"
                  >
                    SUNO
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-ember group-hover:w-full transition-all duration-500" />
                  </a>
                  {["SPOTIFY", "APPLE MUSIC", "YOUTUBE", "SOUNDCLOUD"].map(
                    (s) => (
                      <span
                        key={s}
                        className="text-bone/30"
                        title="Coming soon"
                      >
                        {s}
                      </span>
                    )
                  )}
                </div>

                {featured.description && (
                  <p className="mt-8 text-bone/60 text-sm leading-relaxed max-w-md">
                    {featured.description}
                  </p>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* CATALOG */}
      {catalog.length > 1 && (
        <section className="relative px-6 md:px-12 py-24 border-t border-bone/5">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-ember font-mono text-xs tracking-[0.3em] mb-12">
              CATALOG / {String(catalog.length).padStart(3, "0")}
            </h2>
            <ul className="divide-y divide-bone/5">
              {catalog.map((t) => (
                <CatalogRow
                  key={t.id}
                  track={t}
                  onPlay={onPlayerStarts}
                  isActive={activeId === t.id}
                  registerControl={register(t.id)}
                />
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* PROCESS */}
      <section className="relative px-6 md:px-12 py-32 border-t border-bone/5">
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-ember font-mono text-[10px] tracking-[0.3em] mb-5">
              PROCESS / 001
            </p>
            <h2 className="font-display font-black text-bone text-4xl md:text-5xl lg:text-6xl tracking-[0.02em] leading-[1.05]">
              Built in the
              <br />
              same room.
            </h2>
            <p className="mt-8 text-bone/75 text-base md:text-lg leading-relaxed">
              Every track is written, produced, and finished here. No
              committees. No notes from a label. Just the room and the
              instinct.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{
              duration: 1.2,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative aspect-[4/5] overflow-hidden border border-bone/10 bg-gradient-to-br from-ember-deep/20 via-obsidian-warm to-obsidian"
          >
            <video
              src="/me/atmosphere.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-warm via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-ember font-mono text-[10px] tracking-[0.3em]">
              STUDIO / IN PROGRESS
            </div>
          </motion.div>
        </div>
      </section>

      {/* VOICE */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-6 py-24">
        <div className="text-center max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-bone text-4xl md:text-6xl lg:text-7xl tracking-[0.02em] leading-[1.1]"
          >
            Music is the room
            <br />
            before the words.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{
              duration: 1.2,
              delay: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-10 text-bone/70 text-base md:text-lg"
          >
            On production, instinct, and what songs say when nobody is
            listening.
          </motion.p>
        </div>
      </section>
    </main>
  );
}

function CatalogRow({
  track,
  onPlay,
  isActive,
  registerControl,
}: {
  track: Track;
  onPlay: (t: Track) => void;
  isActive: boolean;
  registerControl: (api: { pause: () => void }) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <li
      className={`group transition-colors duration-500 ${
        isActive ? "bg-ember/[0.03]" : "hover:bg-bone/[0.02]"
      }`}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-6 px-2 text-left"
      >
        <div className="flex items-baseline gap-6 min-w-0">
          <span className="text-ember font-mono text-xs tracking-[0.3em] w-10 shrink-0">
            {track.id}
          </span>
          <div className="min-w-0">
            <div className="font-display font-black text-bone text-2xl tracking-[0.02em] truncate">
              {track.title}
            </div>
            <div className="text-bone/50 text-[10px] tracking-[0.3em] mt-1">
              {track.format} · {track.year}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6 shrink-0">
          <span
            className={`text-ember text-xl transition-transform duration-500 ${
              open ? "rotate-90" : ""
            } group-hover:scale-125`}
          >
            →
          </span>
        </div>
      </button>

      {open && (
        <div className="px-2 pb-8 pt-2 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-start">
          <img
            src={track.cover}
            alt={track.title}
            className="w-full md:w-[200px] aspect-square object-cover border border-bone/10"
          />
          <div>
            <AudioPlayer
              track={track}
              onPlay={onPlay}
              registerControl={registerControl}
            />
            <a
              href={track.sunoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-bone/60 hover:text-ember text-[11px] tracking-[0.25em] transition-colors duration-500"
            >
              OPEN ON SUNO →
            </a>
          </div>
        </div>
      )}
    </li>
  );
}
