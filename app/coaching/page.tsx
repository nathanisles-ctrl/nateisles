"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Countdown from "@/components/Countdown";

const pillars = [
  {
    numeral: "I",
    name: "TECHNIQUE LIBRARY",
    body: "Frame-by-frame breakdowns of foundational technique. Pass set, run blocks, pull, climb. Slowed down to the level coaches don't show.",
  },
  {
    numeral: "II",
    name: "FILM STUDY",
    body: "Studying NFL and college tape together. Learning to see the leverage. The angles. The tells.",
  },
  {
    numeral: "III",
    name: "THE MENTAL GAME",
    body: "What playing the position teaches you about pressure, repetition, and the long road. Lessons that translate beyond the field.",
  },
  {
    numeral: "IV",
    name: "DIRECT ACCESS",
    body: "Ask questions. Share your tape. Get coached, not lectured.",
  },
];

export default function CoachingPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="relative" style={{ backgroundColor: "#080604" }}>
      <div className="grain-overlay grain-heavy" aria-hidden />

      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover object-[center_30%] opacity-70"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/me/coaching.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-deep/50 via-obsidian-deep/70 to-obsidian-deep" />

        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <div className="text-center w-full">
            <p className="absolute top-28 left-6 md:left-12 font-mono text-xs tracking-[0.3em] text-bone/80">
              COACHING / OFFENSIVE LINE
            </p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.6,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-display font-black text-bone text-7xl sm:text-8xl md:text-[10rem] lg:text-[14rem] tracking-[0.04em] leading-none"
            >
              THE CRAFT
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{
                duration: 1.2,
                delay: 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-10 text-bone/85 text-sm md:text-base tracking-wider"
            >
              A school for offensive linemen. Coming soon.
            </motion.p>
          </div>
        </div>
      </section>

      {/* CREDENTIAL — now with portrait */}
      <section className="relative px-6 md:px-12 py-32 md:py-44">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 relative aspect-[3/4] overflow-hidden border border-ember/20"
          >
            <img
              src="/me/portrait-editorial.jpg"
              alt="Nate Isles, former NFL offensive lineman"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-deep/60 via-transparent to-transparent" />
            <div className="absolute top-5 left-5 text-ember font-mono text-[10px] tracking-[0.3em]">
              ISLES / NFL · O-LINE
            </div>
          </motion.div>

          <div className="md:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-bone text-3xl md:text-5xl lg:text-6xl tracking-[0.02em] leading-[1.05]"
            >
              The position I played
              <br />
              became the lens
              <br />
              I see everything through.
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{
                duration: 1.4,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-10 text-bone/75 text-base md:text-lg leading-relaxed space-y-6"
            >
              <p>
                Eight years on the line. Six teams across three leagues —
                NFL, CFL, Arena. Now I teach what most coaches don&apos;t:
                the moments inside the reps. The eye discipline. The hand
                violence. The patience. The mental architecture of the
                position.
              </p>
              <p className="text-bone">
                This isn&apos;t another highlight reel. It&apos;s a curriculum.
              </p>
            </motion.div>
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
              — N. ISLES · 8 YRS PRO · NFL · CFL · ARENA
            </motion.p>
          </div>
        </div>
      </section>

      {/* THE RECORD */}
      <section className="relative px-6 md:px-12 py-20 border-t border-bone/5">
        <div className="max-w-[1300px] mx-auto">
          <p className="text-ember font-mono text-[10px] tracking-[0.3em] mb-10 text-center">
            ON THE LINE — THE RECORD
          </p>

          {/* Summary stats */}
          <div className="grid grid-cols-3 gap-px bg-bone/5 mb-px">
            {[
              { stat: "8+", label: "YEARS PRO" },
              { stat: "6", label: "TEAMS" },
              { stat: "3", label: "LEAGUES" },
            ].map((c) => (
              <div
                key={c.label}
                className="bg-obsidian-deep p-6 md:p-10 text-center"
              >
                <div className="font-display font-black text-bone text-3xl md:text-5xl tracking-[0.04em] tabular-nums">
                  {c.stat}
                </div>
                <div className="mt-3 text-ember font-mono text-[9px] md:text-[10px] tracking-[0.3em]">
                  {c.label}
                </div>
              </div>
            ))}
          </div>

          {/* Teams by league */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-bone/5">
            {[
              {
                league: "NFL",
                teams: ["Seattle Seahawks", "Arizona Cardinals"],
              },
              {
                league: "CFL",
                teams: ["Montreal Alouettes", "BC Lions"],
              },
              {
                league: "ARENA",
                teams: ["Columbus Lions", "Columbus Destroyers"],
              },
            ].map((g) => (
              <div
                key={g.league}
                className="bg-obsidian-deep p-6 md:p-10"
              >
                <div className="text-ember font-mono text-[10px] tracking-[0.3em] mb-5">
                  {g.league}
                </div>
                <ul className="space-y-2">
                  {g.teams.map((t) => (
                    <li
                      key={t}
                      className="font-display font-black text-bone text-lg md:text-xl tracking-[0.02em]"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="relative px-6 md:px-12 py-32 border-t border-bone/5">
        <div className="max-w-[1300px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-bone text-4xl md:text-6xl tracking-[0.02em] mb-20"
          >
            What you&apos;ll get inside.
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-10">
            {pillars.map((p, i) => (
              <motion.div
                key={p.numeral}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: 1,
                  delay: i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="text-ember font-display text-5xl md:text-6xl font-black tracking-[0.05em]">
                  {p.numeral}
                </div>
                <h3 className="mt-6 font-display font-black text-bone text-lg md:text-xl tracking-[0.15em]">
                  {p.name}
                </h3>
                <p className="mt-4 text-bone/70 text-sm leading-relaxed">
                  {p.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-6 py-32 border-t border-bone/5">
        <div className="text-center max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-bone text-4xl md:text-6xl lg:text-7xl tracking-[0.02em]"
          >
            Built for the line.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{
              duration: 1.2,
              delay: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-10 text-bone/75 text-base md:text-lg space-y-2"
          >
            <p>High school and college linemen who want to get better.</p>
            <p>Trainers and coaches who want a deeper curriculum.</p>
            <p>Former players who still love the position.</p>
            <p className="pt-6 text-bone">
              If you&apos;ve ever been called a hog, a mauler, a glue guy —
              this is for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FREE PREVIEW */}
      <section className="relative px-6 md:px-12 py-32 border-t border-bone/5">
        <div className="max-w-[1300px] mx-auto">
          <div className="mb-12 max-w-2xl">
            <p className="text-ember font-mono text-[10px] tracking-[0.3em] mb-5">
              FREE PREVIEW / TECHNIQUE 001
            </p>
            <h2 className="font-display font-black text-bone text-4xl md:text-6xl tracking-[0.02em] leading-[1.05]">
              See the kind of
              <br />
              coaching you&apos;ll get.
            </h2>
            <p className="mt-8 text-bone/75 text-base md:text-lg leading-relaxed">
              A 60-second sample. The full library lives inside the school.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-video overflow-hidden border border-bone/10 bg-obsidian"
          >
            <video
              src="/me/coaching.mp4"
              controls
              playsInline
              poster=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>

          <p className="mt-6 text-bone/40 text-xs tracking-[0.18em]">
            FRAME-BY-FRAME · PASS SET · WEEK 01
          </p>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="relative px-6 md:px-12 py-32 border-t border-bone/5">
        <div className="max-w-[1300px] mx-auto text-center">
          <p className="text-ember font-mono text-[10px] tracking-[0.3em] mb-6">
            UNTIL THE DOORS OPEN
          </p>
          <h2 className="font-display font-black text-bone text-4xl md:text-6xl tracking-[0.02em] mb-12">
            Q4 2026.
          </h2>
          <Countdown />
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="relative px-6 md:px-12 py-32 border-t border-bone/5">
        <div className="max-w-[1100px] mx-auto">
          <p className="text-ember font-mono text-[10px] tracking-[0.3em] mb-10">
            EARLY VOICES
          </p>
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-bone text-3xl md:text-5xl lg:text-6xl tracking-[0.02em] leading-[1.1]"
          >
            &ldquo;Coming soon — early member quotes will live here once the
            first cohort runs.&rdquo;
          </motion.blockquote>
          <p className="mt-8 text-ember font-mono text-[11px] tracking-[0.3em]">
            — FOUNDING MEMBER, TBD
          </p>
        </div>
      </section>

      {/* CONVERSION */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-6 py-32 border-t border-bone/5">
        <div className="text-center max-w-2xl w-full">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-bone text-5xl md:text-7xl tracking-[0.02em]"
          >
            Doors open soon.
          </motion.h2>
          <p className="mt-8 text-bone/75 text-base md:text-lg">
            The school launches Q4 2026 inside Skool. Founding member pricing
            for the first 100. Sign up below to be on the list.
          </p>

          {!submitted ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="mt-10 flex flex-col sm:flex-row items-stretch gap-4 max-w-lg mx-auto"
            >
              <input
                type="email"
                required
                placeholder="YOUR EMAIL"
                className="flex-1 bg-transparent border-b border-bone/30 focus:border-ember py-3 text-bone outline-none transition-colors duration-500 text-center sm:text-left"
              />
              <button
                type="submit"
                className="border border-ember text-ember px-6 py-3 text-sm tracking-[0.2em] hover:bg-ember hover:text-obsidian transition-colors duration-500"
              >
                GET ON THE LIST
              </button>
            </form>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mt-10 font-display font-black text-ember text-2xl md:text-3xl tracking-[0.05em]"
            >
              YOU&apos;RE ON THE LIST.
            </motion.p>
          )}

          <p className="mt-8 text-bone/40 text-xs tracking-wider">
            We&apos;ll only email you about coaching. Nothing else.
          </p>
        </div>
      </section>
    </main>
  );
}
