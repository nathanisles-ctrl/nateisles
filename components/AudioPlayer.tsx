"use client";

import { useEffect, useRef, useState } from "react";
import type { Track } from "./tracks";

function fmt(s: number) {
  if (!isFinite(s)) return "—:—";
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
}

type Props = {
  track: Track;
  onPlay?: (track: Track) => void;
  registerControl?: (api: { pause: () => void; track: Track }) => void;
};

export default function AudioPlayer({
  track,
  onPlay,
  registerControl,
}: Props) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!registerControl) return;
    registerControl({
      pause: () => {
        ref.current?.pause();
        setPlaying(false);
      },
      track,
    });
  }, [registerControl, track]);

  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play();
      setPlaying(true);
      onPlay?.(track);
    }
  };

  const onTime = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    const a = e.currentTarget;
    setCurrent(a.currentTime);
    setProgress((a.currentTime / (a.duration || 1)) * 100);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = ref.current;
    if (!a || !duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - r.left) / r.width;
    a.currentTime = pct * duration;
  };

  return (
    <div className="bg-obsidian/80 border border-bone/10 p-6 md:p-8 backdrop-blur-sm">
      <audio
        ref={ref}
        src={track.audio}
        onTimeUpdate={onTime}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => {
          setPlaying(false);
          setProgress(0);
          setCurrent(0);
        }}
        preload="metadata"
      />

      <div className="flex items-center gap-6">
        <button
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
          className="shrink-0 w-14 h-14 rounded-full bg-ember text-obsidian flex items-center justify-center text-lg hover:bg-ember-light transition-all duration-500 hover:scale-105"
        >
          {playing ? "❚❚" : "▶"}
        </button>
        <div className="flex-1 min-w-0">
          <div
            onClick={seek}
            className="group relative h-px bg-bone/20 cursor-pointer hover:h-1 transition-all duration-300"
          >
            <div
              className="absolute inset-y-0 left-0 bg-bone"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-ember opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ left: `calc(${progress}% - 4px)` }}
            />
          </div>
          <div className="mt-3 flex justify-between text-bone/40 font-mono text-[10px] tracking-[0.2em]">
            <span>{fmt(current)}</span>
            <span>{fmt(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
