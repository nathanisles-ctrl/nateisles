"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

type Props = {
  numeral: string;
  name: string;
  oneLiner: string;
  href: string;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
  videoSrc?: string;
  gradient?: string;
};

export default function IslandCard({
  numeral,
  name,
  oneLiner,
  href,
  index,
  hoveredIndex,
  setHoveredIndex,
  videoSrc,
  gradient = "from-storm/30 via-obsidian to-obsidian",
}: Props) {
  const [hover, setHover] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dimmed = hoveredIndex !== null && hoveredIndex !== index;

  const handleEnter = () => {
    setHover(true);
    setHoveredIndex(index);
    videoRef.current?.play().catch(() => {});
  };

  const handleLeave = () => {
    setHover(false);
    setHoveredIndex(null);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 1,
        delay: index * 0.2,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`transition-opacity duration-700 ease-cinematic ${
        dimmed ? "opacity-30" : "opacity-100"
      }`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Link href={href} className="block group">
        <div
          className={`relative aspect-[5/4] md:aspect-[4/3] overflow-hidden border border-bone/10 hover:border-ember/40 transition-colors duration-700 bg-gradient-to-br ${gradient}`}
        >
          {videoSrc && (
            <video
              ref={videoRef}
              src={videoSrc}
              muted
              loop
              playsInline
              preload="metadata"
              className={`absolute inset-0 w-full h-full object-cover object-[center_25%] transition-opacity duration-700 ease-cinematic ${
                hover ? "opacity-70" : "opacity-30"
              }`}
            />
          )}
          <div
            className={`absolute inset-0 bg-obsidian/40 transition-opacity duration-700 ${
              hover ? "opacity-50" : "opacity-70"
            }`}
          />
          <div
            className={`absolute inset-0 bg-ember/[0.04] transition-opacity duration-700 ${
              hover ? "opacity-100" : "opacity-0"
            }`}
          />

          <div className="absolute top-6 left-6 text-ember font-mono text-xs tracking-[0.3em]">
            {numeral}
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
            <motion.h3
              animate={{ scale: hover ? 1.02 : 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-bone text-4xl md:text-6xl tracking-[0.06em]"
            >
              {name}
            </motion.h3>
            <p className="mt-4 text-bone/70 text-sm md:text-base max-w-xs">
              {oneLiner}
            </p>
          </div>

          <div
            className={`absolute bottom-6 right-6 text-ember text-xl transition-all duration-700 ease-cinematic ${
              hover
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-2"
            }`}
          >
            →
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
