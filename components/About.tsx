"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/content";

export function About() {
  return (
    <section id="about" className="relative border-t border-line py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_20%_50%,var(--accent-glow),transparent)]" />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-medium tracking-wide text-accent">About</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
            From models to products people use.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">{site.about}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap content-start gap-2"
        >
          {site.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-line bg-surface px-3.5 py-2 text-sm text-fg/85"
            >
              {skill}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
