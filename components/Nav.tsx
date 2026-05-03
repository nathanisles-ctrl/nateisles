"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/films", label: "FILMS" },
  { href: "/music", label: "MUSIC" },
  { href: "/tools", label: "TOOLS" },
  { href: "/coaching", label: "COACHING" },
  { href: "/contact", label: "CONTACT" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-700 ${
          scrolled
            ? "backdrop-blur-xl bg-obsidian/60 border-b border-bone/5"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-10 py-5">
          <Link
            href="/"
            className="font-display font-black text-bone tracking-[0.18em] text-sm md:text-base"
          >
            NATE ISLES
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className="relative text-[11px] tracking-[0.22em] text-bone/80 hover:text-bone transition-colors duration-500 group"
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-2 left-0 h-px bg-ember transition-all duration-700 ease-cinematic ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-bone text-xs tracking-[0.22em]"
            aria-label="Open menu"
          >
            MENU
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-obsidian flex flex-col items-center justify-center md:hidden"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 text-bone text-xs tracking-[0.22em]"
              aria-label="Close menu"
            >
              CLOSE
            </button>
            <nav className="flex flex-col items-center gap-8">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15 + i * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={l.href}
                    className="font-display font-black text-bone text-3xl tracking-[0.18em]"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
