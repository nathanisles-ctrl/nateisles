"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

type Track = {
  id: string;
  title: string;
  year: string;
  format: string;
  length: string;
};

const tracks: Track[] = [];
const hasRelease = false;

export default function MusicPage() {
  return (
    <main
      className="relative"
      style={{ backgroundColor: "#0A0807" }}
    >
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

      {/* LATEST RELEASE */}
      <section className="relative px-6 md:px-12 py-32 md:py-44">
        {hasRelease ? (
          <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="aspect-square w-full bg-gradient-to-br from-ember-deep/40 via-obsidian-warm to-obsidian shadow-2xl border border-ember/10" />
              <div className="mt-6">
                <div className="font-display font-black text-bone text-3xl">
                  Untitled No. 001
                </div>
                <div className="mt-2 text-ember text-[10px] tracking-[0.3em]">
                  SINGLE
                </div>
                <div className="mt-1 text-bone/60 text-xs tracking-[0.2em]">
                  RELEASE: TBD 2026
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <AudioPlayer />
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-bone/70 text-xs tracking-[0.2em]">
                {["SPOTIFY", "APPLE MUSIC", "YOUTUBE", "SOUNDCLOUD"].map(
                  (s) => (
                    <a
                      key={s}
                      href="#"
                      className="hover:text-ember relative group transition-colors duration-500"
                    >
                      {s}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-ember group-hover:w-full transition-all duration-500" />
                    </a>
                  )
                )}
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="max-w-[900px] mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-bone text-4xl md:text-6xl tracking-[0.02em]"
            >
              First track dropping soon.
            </motion.h2>
            <p className="mt-8 text-bone/70 max-w-md mx-auto">
              Sign up below to hear it before anyone else.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-10 flex items-end gap-4 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="YOUR EMAIL"
                className="flex-1 bg-transparent border-b border-bone/30 focus:border-ember py-3 text-bone outline-none transition-colors duration-500"
              />
              <button
                type="submit"
                className="text-ember text-sm tracking-[0.2em] py-3 hover:text-ember-light transition-colors duration-500"
              >
                SUBMIT →
              </button>
            </form>
          </div>
        )}
      </section>

      {/* CATALOG */}
      {tracks.length > 0 && (
        <section className="relative px-6 md:px-12 py-24 border-t border-bone/5">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-ember font-mono text-xs tracking-[0.3em] mb-12">
              CATALOG
            </h2>
            <ul className="divide-y divide-bone/5">
              {tracks.map((t) => (
                <li
                  key={t.id}
                  className="group flex items-center justify-between py-6 px-2 hover:bg-bone/[0.02] transition-colors duration-500 cursor-pointer"
                >
                  <div className="flex items-baseline gap-6">
                    <span className="text-ember font-mono text-xs tracking-[0.3em] w-10">
                      {t.id}
                    </span>
                    <div>
                      <div className="font-display font-black text-bone text-2xl tracking-[0.02em]">
                        {t.title}
                      </div>
                      <div className="text-bone/50 text-[10px] tracking-[0.3em] mt-1">
                        {t.format} · {t.length}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-bone/60 text-xs tracking-[0.2em]">
                      {t.year}
                    </span>
                    <span className="text-ember text-xl group-hover:scale-125 transition-transform duration-500">
                      →
                    </span>
                  </div>
                </li>
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
              Every track is written, recorded, mixed, and finished here. No
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
      <section className="relative min-h-screen flex items-center justify-center px-6 py-24">
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

function AudioPlayer() {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (playing) a.pause();
    else a.play();
    setPlaying(!playing);
  };

  return (
    <div className="bg-obsidian/80 border border-bone/10 p-6 md:p-8">
      <audio
        ref={ref}
        onTimeUpdate={(e) => {
          const a = e.currentTarget;
          setProgress((a.currentTime / (a.duration || 1)) * 100);
        }}
        onEnded={() => setPlaying(false)}
      >
        <source src="" type="audio/mpeg" />
      </audio>

      <div className="flex items-center gap-6">
        <button
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
          className="w-14 h-14 rounded-full bg-ember text-obsidian flex items-center justify-center text-lg hover:bg-ember-light transition-colors duration-500"
        >
          {playing ? "❚❚" : "▶"}
        </button>
        <div className="flex-1 group">
          <div className="h-px bg-bone/20 relative overflow-hidden group-hover:h-0.5 transition-all duration-300">
            <div
              className="absolute inset-y-0 left-0 bg-bone"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 flex justify-between text-bone/40 font-mono text-[10px] tracking-[0.2em]">
            <span>0:00</span>
            <span>—:—</span>
          </div>
        </div>
      </div>
    </div>
  );
}
