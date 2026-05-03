import Link from "next/link";
import { socials } from "./socials";

const sections = [
  { href: "/films", label: "FILMS" },
  { href: "/music", label: "MUSIC" },
  { href: "/tools", label: "TOOLS" },
  { href: "/coaching", label: "COACHING" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 px-6 md:px-10 pt-[15vh] pb-10 border-t border-bone/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div>
            <Link
              href="/"
              className="font-display font-black text-bone tracking-[0.18em] text-xl md:text-2xl block"
            >
              NATE ISLES
            </Link>
            <p className="mt-4 text-sm text-bone/60 max-w-sm">
              Building what didn&apos;t exist yesterday.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-3">
            {sections.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="text-[11px] tracking-[0.22em] text-bone/70 hover:text-bone transition-colors duration-500"
              >
                {s.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3 my-12">
          <span className="h-px flex-1 bg-bone/10" />
          <span className="text-ember text-xs">·</span>
          <span className="h-px flex-1 bg-bone/10" />
        </div>

        <div className="mb-10">
          <p className="text-ember font-mono text-[10px] tracking-[0.3em] mb-5">
            FOLLOW
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2.5">
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

        <div className="flex items-center justify-between pt-6 border-t border-bone/5">
          <p className="text-[10px] tracking-[0.18em] text-ember/80">
            © 2026 NATE ISLES — ALL WORK, ALL RIGHTS, ALL EARNED.
          </p>
        </div>
      </div>
    </footer>
  );
}
