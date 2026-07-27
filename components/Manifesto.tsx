"use client";

import { motion } from "framer-motion";
import { manifesto } from "@/lib/content";

export function Manifesto() {
  return (
    <section
      id="build"
      className="relative border-t border-line bg-bg"
    >
      <div className="mx-auto grid max-w-6xl lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        {/* Sticky left */}
        <div className="relative border-b border-line px-6 py-16 lg:border-b-0 lg:border-r lg:px-8 lg:py-0">
          <div className="lg:sticky lg:top-24 lg:flex lg:min-h-[calc(100vh-6rem)] lg:flex-col lg:justify-center lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55 }}
            >
              <p className="text-xs font-medium tracking-[0.18em] text-accent uppercase">
                [ 00 ] Manifesto
              </p>
              <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl lg:text-[3.4rem]">
                How I
                <br />
                build.
              </h2>
              <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
                Principles behind the agents, MCP tools, and RAG systems I ship.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Scrolling right */}
        <div className="px-6 py-10 sm:px-8 lg:py-24">
          <ul className="flex flex-col">
            {manifesto.map((item, i) => (
              <motion.li
                key={item.number}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, delay: 0.04 }}
                className={`py-14 sm:py-20 ${
                  i < manifesto.length - 1 ? "border-b border-line" : ""
                }`}
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-wide text-accent">
                    {item.number}
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-fg sm:text-2xl">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                  {item.body}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
