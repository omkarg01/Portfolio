"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/content";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 mesh opacity-80" />
      <div className="noise" />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65 }}
        >
          <p className="text-sm font-medium tracking-wide text-accent">
            What&apos;s next
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-5xl">
            Let&apos;s build something intelligent together.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted">
            Open to conversations about agentic platforms, MCP tooling, and
            production LLM systems, from quick questions to full builds.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg transition hover:bg-accent-dim"
            >
              Get in touch
            </a>
            <a
              href={site.resume}
              download="Omkar_Gujja_Resume_AI_Engineer.pdf"
              className="inline-flex items-center rounded-full border border-line px-6 py-3 text-sm font-medium text-fg transition hover:border-accent hover:text-accent"
            >
              Download Resume
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-line px-6 py-3 text-sm font-medium text-fg transition hover:border-accent hover:text-accent"
            >
              GitHub
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-line px-6 py-3 text-sm font-medium text-fg transition hover:border-accent hover:text-accent"
            >
              LinkedIn
            </a>
          </div>

          <a
            href={`mailto:${site.email}`}
            className="mt-8 inline-block text-sm text-muted transition hover:text-accent"
          >
            {site.email}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
