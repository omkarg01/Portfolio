"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { site } from "@/lib/content";

const NeuralGlobe = dynamic(
  () => import("@/components/NeuralGlobe").then((m) => m.NeuralGlobe),
  { ssr: false },
);

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.1,
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pb-16 pt-24"
    >
      <div className="pointer-events-none absolute inset-0 hero-space" />
      <NeuralGlobe />
      <div className="pointer-events-none absolute inset-0 hero-vignette" />
      <div className="noise" />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-8 inline-flex items-center rounded-full border border-line bg-surface/80 px-4 py-1.5 text-xs font-medium tracking-wide text-muted backdrop-blur-sm sm:text-sm"
        >
          <span className="mr-2 h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
          {site.title} · {site.location}
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="font-[family-name:var(--font-display)] text-[clamp(2.4rem,7vw,4.6rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-fg"
        >
          I build{" "}
          <span className="ai-gradient">AI systems</span>
          <br className="hidden sm:block" /> that do real work.
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {site.subhead}
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {site.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line/80 bg-bg/40 px-3 py-1 text-xs tracking-wide text-muted backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#work"
            className="cta-primary inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-bg transition hover:brightness-110"
          >
            Explore my work
            <span aria-hidden>→</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-full border border-line bg-bg/50 px-7 py-3.5 text-sm font-medium text-fg backdrop-blur-sm transition hover:border-accent hover:text-accent"
          >
            Get in touch
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-hidden
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-line/80 p-1.5">
          <span className="scroll-dot h-1.5 w-1.5 rounded-full bg-accent" />
        </div>
      </motion.div>
    </section>
  );
}
