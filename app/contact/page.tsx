"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { socials } from "@/components/socials";
import Faq from "@/components/Faq";

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactInner />
    </Suspense>
  );
}

function ContactInner() {
  const params = useSearchParams();
  const projectContext = params.get("project");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    try {
      const data = new FormData(e.currentTarget);
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          context: projectContext,
        }),
      }).catch(() => {});
      setSent(true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 py-32">
      <div className="w-full max-w-xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-black text-bone text-6xl md:text-8xl tracking-[0.06em] text-center"
        >
          WRITE ME
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1.2,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-6 text-bone/75 text-center text-base"
        >
          For collaborations, custom work, press, or to talk about the line.
        </motion.p>

        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.form
              key="form"
              onSubmit={onSubmit}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-16 space-y-10"
            >
              {projectContext && (
                <p className="text-ember font-mono text-xs tracking-[0.3em]">
                  RE: {projectContext.toUpperCase()} INQUIRY
                </p>
              )}

              <Field name="name" type="text" placeholder="NAME" required />
              <Field name="email" type="email" placeholder="EMAIL" required />
              <FieldArea
                name="message"
                placeholder="WHAT'S THIS ABOUT?"
                required
              />

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={busy}
                  className="text-ember text-sm tracking-[0.25em] hover:scale-110 transition-transform duration-500 disabled:opacity-50"
                >
                  {busy ? "SENDING…" : "SEND →"}
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-20 flex flex-col items-center gap-8"
            >
              <div className="relative w-24 h-24 rounded-full overflow-hidden border border-ember/30">
                <img
                  src="/me/portrait-editorial.jpg"
                  alt="Nate Isles"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display =
                      "none";
                  }}
                />
              </div>
              <p className="text-center font-display font-black text-bone text-2xl md:text-3xl tracking-[0.04em]">
                Got it. I read every email.
                <span className="block mt-3 text-ember text-base tracking-[0.3em]">
                  — NATE.
                </span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <a
            href="mailto:hello@nateisles.com"
            className="block border border-bone/10 hover:border-ember p-6 transition-colors duration-500 group"
          >
            <p className="text-ember font-mono text-[10px] tracking-[0.3em] mb-3">
              EMAIL DIRECT
            </p>
            <p className="font-display font-black text-bone text-lg tracking-[0.02em]">
              hello@nateisles.com
            </p>
            <p className="mt-2 text-bone/60 text-xs">
              Read every email. Reply within 48h.
            </p>
          </a>
          <a
            href="https://cal.com/nateisles"
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-bone/10 hover:border-ember p-6 transition-colors duration-500 group"
          >
            <p className="text-ember font-mono text-[10px] tracking-[0.3em] mb-3">
              BOOK A CALL
            </p>
            <p className="font-display font-black text-bone text-lg tracking-[0.02em]">
              15 min on Cal.com →
            </p>
            <p className="mt-2 text-bone/60 text-xs">
              For collabs, custom work, press.
            </p>
          </a>
        </div>

        <div className="mt-24 pt-16 border-t border-bone/5">
          <p className="text-ember font-mono text-[10px] tracking-[0.3em] mb-6 text-center">
            FREQUENT QUESTIONS
          </p>
          <Faq />
        </div>

        <div className="mt-20 pt-12 border-t border-bone/5 text-center">
          <p className="text-ember font-mono text-[10px] tracking-[0.3em] mb-6">
            ELSEWHERE
          </p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 max-w-2xl mx-auto">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] tracking-[0.22em] text-bone/60 hover:text-ember transition-colors duration-500"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function Field({
  name,
  type,
  placeholder,
  required,
}: {
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div className="relative">
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-bone/30 focus:border-ember py-4 text-bone outline-none transition-colors duration-500"
      />
    </div>
  );
}

function FieldArea({
  name,
  placeholder,
  required,
}: {
  name: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      required={required}
      rows={4}
      className="w-full bg-transparent border-b border-bone/30 focus:border-ember py-4 text-bone outline-none transition-colors duration-500 resize-none"
    />
  );
}
