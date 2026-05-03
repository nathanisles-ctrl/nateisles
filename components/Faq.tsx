"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const faqs: { q: string; a: string }[] = [
  {
    q: "How long until you reply?",
    a: "Within 48 hours, often same-day. I read every email myself. If you don't hear back, your message landed in spam — DM me on any of the social links in the footer.",
  },
  {
    q: "What kinds of projects do you take?",
    a: "AI cinema commissions, custom creative-tech tools, music collaborations, and select coaching consults. I take a small number per quarter so each gets real attention.",
  },
  {
    q: "Do you do speaking or press?",
    a: "Yes — for the right outlet. Use the booking link to grab 15 minutes if you want to pitch a feature, podcast, or panel.",
  },
  {
    q: "Can you build something for my brand?",
    a: "Sometimes. I take a couple custom AI tooling and creative-tech projects per quarter. Pitch the problem first, not the deliverable.",
  },
  {
    q: "Are you on Discord / Telegram / WhatsApp?",
    a: "No private DMs outside the platforms in the footer. Email or Cal.com is the fastest path.",
  },
  {
    q: "Will I get added to a newsletter?",
    a: "Only if you sign up for one — coaching list on the Coaching page, music drops on Music. The contact form is one-to-one.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="border-t border-bone/5">
      {faqs.map((f, i) => {
        const expanded = open === i;
        return (
          <div key={i} className="border-b border-bone/5">
            <button
              onClick={() => setOpen(expanded ? null : i)}
              className="w-full flex items-center justify-between gap-6 py-5 text-left"
            >
              <span className="font-display font-black text-bone text-lg md:text-xl tracking-[0.02em]">
                {f.q}
              </span>
              <span
                className={`shrink-0 text-ember text-xl transition-transform duration-500 ${
                  expanded ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 pr-10 text-bone/75 text-sm md:text-base leading-relaxed">
                    {f.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
