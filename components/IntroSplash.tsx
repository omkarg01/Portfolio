"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/content";

type IntroSplashProps = {
  onDone: () => void;
};

export function IntroSplash({ onDone }: IntroSplashProps) {
  const finished = useRef(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const finish = () => {
      if (finished.current) return;
      finished.current = true;
      onDone();
    };

    const timer = window.setTimeout(finish, 3200);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") finish();
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
    // intentionally once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finishClick = () => {
    if (finished.current) return;
    finished.current = true;
    onDone();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-[#03060c]"
      onClick={finishClick}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      role="dialog"
      aria-label="Introduction"
    >
      <div className="pointer-events-none absolute inset-0 intro-aura" />
      <div className="noise !z-0" />

      {/* Soft constellation dots: AI cue, not a globe clone */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {[
          ["18%", "28%"],
          ["78%", "22%"],
          ["62%", "68%"],
          ["28%", "72%"],
          ["88%", "58%"],
          ["12%", "55%"],
        ].map(([left, top], i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-accent/50"
            style={{ left, top }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0.2, 0.7, 0.25], scale: 1 }}
            transition={{ delay: 0.4 + i * 0.08, duration: 2.4, repeat: Infinity }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mb-8 text-[11px] tracking-[0.35em] text-muted uppercase"
        >
          {site.title}
        </motion.p>

        <h1 className="flex flex-wrap items-end justify-center gap-x-[0.28em] overflow-visible pb-2 font-[family-name:var(--font-display)] text-[clamp(2.8rem,11vw,6.5rem)] font-semibold leading-[1.15] tracking-[-0.04em]">
          <span className="inline-flex overflow-visible">
            {site.firstName.split("").map((letter, i) => (
              <motion.span
                key={`f-${letter}-${i}`}
                className="inline-block overflow-visible text-fg"
                initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.35 + i * 0.06,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {letter}
              </motion.span>
            ))}
          </span>
          <span className="inline-flex overflow-visible">
            {site.lastName.split("").map((letter, i) => (
              <motion.span
                key={`l-${letter}-${i}`}
                className="inline-block overflow-visible text-accent"
                initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.55 + site.firstName.length * 0.06 + i * 0.06,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.div
          className="intro-mark mt-8 h-px w-28 origin-center sm:w-36"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-8 text-sm text-muted"
        >
          Building systems that remember context, and so will you.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0.4] }}
          transition={{ delay: 1.9, duration: 1.2 }}
          className="mt-10 text-[11px] tracking-[0.2em] text-muted/70 uppercase"
        >
          Click to enter
        </motion.p>
      </div>
    </motion.div>
  );
}

export function IntroGate({ children }: { children: ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showIntro ? <IntroSplash onDone={() => setShowIntro(false)} /> : null}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: showIntro ? "none" : "auto" }}
      >
        {children}
      </motion.div>
    </>
  );
}
