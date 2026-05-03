"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Frame = {
  id: string;
  src: string;
  label: string;
};

const palette: Frame[] = [
  { id: "p1", src: "/me/films/cinematic-1.mp4", label: "EST. SHOT" },
  { id: "p2", src: "/me/films/slow-walk.mp4", label: "SLOW WALK" },
  { id: "p3", src: "/me/films/zoom.mp4", label: "PUSH-IN" },
  { id: "p4", src: "/me/films/gritty.mp4", label: "GRITTY" },
  { id: "p5", src: "/me/films/subject-a.mp4", label: "SUBJECT A" },
  { id: "p6", src: "/me/films/subject-b.mp4", label: "SUBJECT B" },
  { id: "p7", src: "/me/films/subject-c.mp4", label: "SUBJECT C" },
  { id: "p8", src: "/me/films/pan.mp4", label: "CAMERA PAN" },
  { id: "p9", src: "/me/films/monster.mp4", label: "REVEAL" },
];

const SLOTS = 6;
const FRAME_DURATION_MS = 2400;

export default function StoryboardComposer() {
  const [scene, setScene] = useState<(Frame | null)[]>(
    Array(SLOTS).fill(null)
  );
  const [playing, setPlaying] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const dragRef = useRef<{ frame: Frame | null; fromSlot: number | null }>({
    frame: null,
    fromSlot: null,
  });
  const videoRefs = useRef<(HTMLVideoElement | null)[]>(Array(SLOTS).fill(null));
  const stopRequestedRef = useRef(false);

  const onPaletteDragStart = (frame: Frame) => {
    dragRef.current = { frame, fromSlot: null };
  };

  const onSlotDragStart = (slotIdx: number, frame: Frame) => {
    dragRef.current = { frame, fromSlot: slotIdx };
  };

  const onDropSlot = (targetIdx: number) => {
    const { frame, fromSlot } = dragRef.current;
    if (!frame) return;
    setScene((s) => {
      const next = [...s];
      if (fromSlot !== null) {
        const tmp = next[targetIdx];
        next[targetIdx] = frame;
        next[fromSlot] = tmp;
      } else {
        next[targetIdx] = frame;
      }
      return next;
    });
    dragRef.current = { frame: null, fromSlot: null };
  };

  const removeFrame = (slotIdx: number) => {
    setScene((s) => {
      const next = [...s];
      next[slotIdx] = null;
      return next;
    });
  };

  const pauseAllSlots = () => {
    videoRefs.current.forEach((v) => {
      if (v) {
        v.pause();
        v.currentTime = 0;
      }
    });
  };

  const playScene = async () => {
    if (playing) return;
    const filledIndices = scene
      .map((f, i) => (f ? i : -1))
      .filter((i) => i >= 0);
    if (filledIndices.length === 0) return;

    stopRequestedRef.current = false;
    setPlaying(true);
    pauseAllSlots();

    for (const idx of filledIndices) {
      if (stopRequestedRef.current) break;
      setActiveIdx(idx);
      const v = videoRefs.current[idx];
      if (v) {
        v.currentTime = 0;
        try {
          await v.play();
        } catch {}
      }
      await new Promise((r) => setTimeout(r, FRAME_DURATION_MS));
      if (v) v.pause();
    }

    setActiveIdx(null);
    setPlaying(false);
    stopRequestedRef.current = false;
  };

  const stopScene = () => {
    stopRequestedRef.current = true;
    pauseAllSlots();
    setActiveIdx(null);
    setPlaying(false);
  };

  const clearScene = () => {
    stopScene();
    setScene(Array(SLOTS).fill(null));
  };

  useEffect(() => {
    return () => {
      stopRequestedRef.current = true;
    };
  }, []);

  const hasAny = scene.some((f) => f !== null);

  return (
    <div className="space-y-12">
      {/* PALETTE */}
      <div>
        <p className="text-ember font-mono text-[10px] tracking-[0.3em] mb-5">
          PALETTE / DRAG INTO TIMELINE
        </p>
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
          {palette.map((f) => (
            <PaletteTile
              key={f.id}
              frame={f}
              onDragStart={onPaletteDragStart}
            />
          ))}
        </div>
      </div>

      {/* TIMELINE */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <p className="text-ember font-mono text-[10px] tracking-[0.3em]">
            TIMELINE / 6 FRAMES
          </p>
          <div className="flex gap-5">
            <button
              onClick={clearScene}
              disabled={!hasAny && !playing}
              className="text-bone/60 hover:text-bone disabled:opacity-30 text-[11px] tracking-[0.2em] transition-colors duration-300"
            >
              CLEAR
            </button>
            {playing ? (
              <button
                onClick={stopScene}
                className="text-ember hover:text-ember-light text-[11px] tracking-[0.2em] transition-colors duration-300"
              >
                ◼ STOP
              </button>
            ) : (
              <button
                onClick={playScene}
                disabled={!hasAny}
                className="text-ember hover:text-ember-light text-[11px] tracking-[0.2em] disabled:opacity-30 transition-colors duration-300"
              >
                ▶ PLAY SCENE
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {scene.map((frame, i) => (
            <Slot
              key={i}
              index={i}
              frame={frame}
              active={activeIdx === i}
              playing={playing}
              videoRef={(el) => {
                videoRefs.current[i] = el;
              }}
              onDrop={() => onDropSlot(i)}
              onDragStart={(f) => onSlotDragStart(i, f)}
              onRemove={() => removeFrame(i)}
            />
          ))}
        </div>

        <p className="mt-6 text-bone/40 text-xs">
          Drag a clip from the palette into any slot. Drag a slot onto another
          to swap. Hover a slot for the × to remove. Hit play to run the cut.
        </p>
      </div>
    </div>
  );
}

function PaletteTile({
  frame,
  onDragStart,
}: {
  frame: Frame;
  onDragStart: (f: Frame) => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  return (
    <div
      draggable
      onDragStart={(e) => {
        onDragStart(frame);
        e.dataTransfer.effectAllowed = "copy";
      }}
      onMouseEnter={() => ref.current?.play().catch(() => {})}
      onMouseLeave={() => {
        if (ref.current) {
          ref.current.pause();
          ref.current.currentTime = 0;
        }
      }}
      className="relative aspect-square overflow-hidden border border-bone/10 hover:border-ember cursor-grab active:cursor-grabbing transition-colors duration-300 group select-none"
    >
      <video
        ref={ref}
        src={frame.src}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <div className="absolute inset-0 bg-obsidian/40 group-hover:bg-obsidian/10 transition-colors duration-300 pointer-events-none" />
      <div className="absolute bottom-1.5 left-1.5 text-[8px] font-mono tracking-[0.2em] text-bone/80 pointer-events-none">
        {frame.label}
      </div>
    </div>
  );
}

function Slot({
  index,
  frame,
  active,
  playing,
  videoRef,
  onDrop,
  onDragStart,
  onRemove,
}: {
  index: number;
  frame: Frame | null;
  active: boolean;
  playing: boolean;
  videoRef: (el: HTMLVideoElement | null) => void;
  onDrop: () => void;
  onDragStart: (f: Frame) => void;
  onRemove: () => void;
}) {
  const [hover, setHover] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        onDrop();
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`relative aspect-video border transition-all duration-300 ${
        dragOver ? "border-ember bg-ember/10" : "border-bone/10"
      } ${
        active
          ? "border-ember shadow-[0_0_60px_-10px_rgba(201,169,97,0.8)]"
          : ""
      }`}
    >
      <div className="absolute top-1.5 left-1.5 z-10 text-ember font-mono text-[9px] tracking-[0.25em] pointer-events-none">
        {String(index + 1).padStart(2, "0")}
      </div>

      <AnimatePresence>
        {frame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div
              draggable
              onDragStart={(e) => {
                onDragStart(frame);
                e.dataTransfer.effectAllowed = "move";
              }}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              <video
                ref={videoRef}
                src={frame.src}
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute bottom-1.5 right-1.5 text-[8px] font-mono tracking-[0.2em] text-bone bg-obsidian/70 px-1.5 py-0.5 pointer-events-none">
                {frame.label}
              </div>
            </div>

            {hover && !playing && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
                className="absolute top-1.5 right-1.5 z-20 w-6 h-6 rounded-full bg-obsidian/80 border border-bone/30 hover:border-ember hover:text-ember text-bone/80 text-xs flex items-center justify-center transition-colors duration-300"
                aria-label="Remove frame"
              >
                ✕
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!frame && (
        <div className="absolute inset-0 flex items-center justify-center text-bone/20 font-mono text-[10px] tracking-[0.3em] pointer-events-none">
          {dragOver ? "DROP" : "EMPTY"}
        </div>
      )}
    </div>
  );
}
