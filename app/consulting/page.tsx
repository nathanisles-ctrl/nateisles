"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const offerings = [
  {
    numeral: "I",
    name: "AI STRATEGY AUDITS",
    body: "Where AI can realistically save you time or money — not where the hype says it should.",
  },
  {
    numeral: "II",
    name: "IMPLEMENTATION & AUTOMATION",
    body: "I build the systems, not just recommend them. Working software, not a slide deck.",
  },
  {
    numeral: "III",
    name: "ONGOING ADVISORY",
    body: "A technical partner as your needs evolve — on call, not one-and-done.",
  },
];

export default function ConsultingPage() {
  return (
    <main className="relative">
      {/* HERO */}
      <section className="relative px-6 md:px-12 py-32 md:py-40 border-b border-bone/5">
        <div className="max-w-[1300px] mx-auto">
          <p className="font-mono text-xs tracking-[0.3em] text-bone/60">
            ~/consulting
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 font-display font-black text-bone text-6xl md:text-9xl tracking-[0.04em] leading-none"
          >
            AI CONSULTING
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 text-bone/80 text-base md:text-lg max-w-2xl"
          >
            I help businesses cut through AI hype and actually use it —
            strategically, practically, and without the fluff.
          </motion.p>
        </div>
      </section>

      {/* OFFERINGS */}
      <section className="relative px-6 md:px-12 py-32 border-b border-bone/5">
        <div className="max-w-[1300px] mx-auto">
          <p className="text-ember font-mono text-[10px] tracking-[0.3em] mb-16">
            WHAT I DO
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
            {offerings.map((o, i) => (
              <motion.div
                key={o.numeral}
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
                  {o.numeral}
                </div>
                <h3 className="mt-6 font-display font-black text-bone text-lg md:text-xl tracking-[0.1em]">
                  {o.name}
                </h3>
                <p className="mt-4 text-bone/70 text-sm leading-relaxed">
                  {o.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR + PROOF */}
      <section className="relative px-6 md:px-12 py-32 border-b border-bone/5">
        <div className="max-w-[1100px] mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-bone text-3xl md:text-5xl tracking-[0.02em] leading-[1.15]"
          >
            Small businesses and founders
            <br />
            who want results, not buzzwords.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 border-t border-bone/10 pt-16 max-w-2xl mx-auto"
          >
            <p className="text-ember font-mono text-[10px] tracking-[0.3em] mb-6">
              PROOF
            </p>
            <p className="text-bone/80 text-base md:text-lg leading-relaxed">
              I build and run my own AI agent infrastructure —{" "}
              <Link
                href="/tools/nexus"
                className="text-ember hover:text-ember-light transition-colors duration-300"
              >
                Nexus
              </Link>{" "}
              — deployed and maintained on my own servers. I don&apos;t just
              talk about AI, I ship it daily.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative min-h-[50vh] flex items-center justify-center px-6 py-24">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-bone text-4xl md:text-6xl tracking-[0.02em]"
          >
            Let&apos;s find your edge.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/contact?project=consulting"
              className="mt-10 inline-block text-ember text-sm tracking-[0.25em] hover:scale-110 transition-transform duration-500"
            >
              GET IN TOUCH →
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
