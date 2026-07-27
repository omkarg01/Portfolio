"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, featuredProjects } from "@/lib/content";

type Project = (typeof projects)[number];

function ProjectLinks({ project }: { project: Project }) {
  const live = project.href?.startsWith("http") ? project.href : "";
  const github = "github" in project && typeof project.github === "string" && project.github.startsWith("http")
    ? project.github
    : "";
  const liveLabel =
    "linkLabel" in project && typeof project.linkLabel === "string" && project.linkLabel
      ? project.linkLabel
      : "Live demo";

  if (!live && !github) return null;

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {live ? (
        <a
          href={live}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition hover:brightness-110"
        >
          {liveLabel}
          <span aria-hidden>↗</span>
        </a>
      ) : null}
      {github ? (
        <a
          href={github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-fg transition hover:border-accent hover:text-accent"
        >
          GitHub
          <span aria-hidden>↗</span>
        </a>
      ) : null}
    </div>
  );
}

function WindowChrome({ title, badge }: { title: string; badge?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] text-white/45">{title}</span>
      </div>
      {badge ? (
        <span className="rounded-full border border-accent/35 bg-accent/10 px-2 py-0.5 text-[10px] text-accent">
          {badge}
        </span>
      ) : null}
    </div>
  );
}

function PreviewShell({
  children,
  title,
  badge,
}: {
  children: ReactNode;
  title: string;
  badge?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#070d16] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
      <div className="pointer-events-none absolute inset-0 project-flow-grid opacity-50" />
      <div className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.18),transparent_70%)]" />
      <div className="relative">
        <WindowChrome title={title} badge={badge} />
        <div className="min-h-[340px] p-5 sm:min-h-[380px] sm:p-6">{children}</div>
      </div>
    </div>
  );
}

function PreviewMcp({ project }: { project: Project }) {
  const mock = project.mock as {
    tools: { name: string; status: string }[];
    prompt: string;
  };

  return (
    <PreviewShell title="mcp://hr-assist" badge="LIVE">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[11px] tracking-[0.16em] text-white/40 uppercase">
          Registered tools
        </p>
        <span className="font-mono text-[11px] text-accent">
          {mock.tools.length} endpoints
        </span>
      </div>
      <div className="space-y-2">
        {mock.tools.map((tool, i) => (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            className={`grid grid-cols-[1fr_auto] items-center gap-3 rounded-xl border px-3.5 py-3 ${
              tool.status === "active"
                ? "border-accent/40 bg-accent/10"
                : "border-white/8 bg-white/[0.03]"
            }`}
          >
            <code className="text-[12px] text-white/90">{tool.name}()</code>
            <span
              className={`text-[10px] tracking-wider uppercase ${
                tool.status === "active" ? "text-accent" : "text-white/35"
              }`}
            >
              {tool.status}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="mt-5 rounded-xl border border-dashed border-accent/30 bg-accent/5 px-4 py-3">
        <p className="text-[10px] tracking-[0.14em] text-accent/80 uppercase">
          Active prompt
        </p>
        <p className="mt-1 font-mono text-[12px] text-accent">{mock.prompt}</p>
      </div>
    </PreviewShell>
  );
}

function PreviewAgents({ project }: { project: Project }) {
  const mock = project.mock as {
    query: string;
    agents: { name: string; role: string; active: boolean }[];
    answer: string;
  };

  return (
    <PreviewShell title="agents · coordinator" badge="ROUTING">
      <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
        <p className="text-[10px] tracking-[0.14em] text-white/40 uppercase">
          Incoming
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-white/85">{mock.query}</p>
      </div>

      <div className="relative my-5 grid grid-cols-3 gap-2">
        <div className="pointer-events-none absolute left-[16%] right-[16%] top-[18px] h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
        {mock.agents.map((agent) => (
          <div
            key={agent.name}
            className={`relative rounded-xl border px-2 py-4 text-center ${
              agent.active
                ? "border-accent/45 bg-accent/10"
                : "border-white/8 bg-white/[0.02]"
            }`}
          >
            <span
              className={`mx-auto mb-2 block h-2.5 w-2.5 rounded-full ${
                agent.active
                  ? "bg-accent shadow-[0_0_12px_rgba(45,212,191,0.8)]"
                  : "bg-white/20"
              }`}
            />
            <p className="text-[11px] font-semibold text-white">{agent.name}</p>
            <p className="mt-1 text-[10px] text-white/40">{agent.role}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-accent/25 bg-gradient-to-br from-accent/15 via-transparent to-sky-500/10 px-4 py-4">
        <p className="text-[10px] tracking-[0.14em] text-accent uppercase">
          Final synthesis
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white">{mock.answer}</p>
      </div>
    </PreviewShell>
  );
}

function PreviewRag({ project }: { project: Project }) {
  const mock = project.mock as {
    query: string;
    route: string;
    confidence: string;
    hits: string[];
  };

  return (
    <PreviewShell title="rag · semantic-router" badge="SQL">
      <div className="mb-4 flex items-end justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4">
        <div>
          <p className="text-[10px] tracking-[0.14em] text-white/40 uppercase">
            Classified route
          </p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-lg text-accent">
            {mock.route}
          </p>
          <p className="mt-2 max-w-xs text-xs text-white/55">{mock.query}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-white/40">Score</p>
          <p className="font-[family-name:var(--font-display)] text-3xl text-white">
            {mock.confidence}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {mock.hits.map((hit, i) => (
          <div
            key={hit}
            className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-3.5 py-3"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/15 font-mono text-[10px] text-accent">
              {i + 1}
            </span>
            <span className="text-sm text-white/80">{hit}</span>
          </div>
        ))}
      </div>
    </PreviewShell>
  );
}

function PreviewResearch({ project }: { project: Project }) {
  const mock = project.mock as {
    urls: string[];
    question: string;
    citation: string;
  };

  return (
    <PreviewShell title="research · url-rag" badge="CITED">
      <p className="mb-2 text-[10px] tracking-[0.14em] text-white/40 uppercase">
        Source graph
      </p>
      <div className="mb-4 space-y-2">
        {mock.urls.map((url, i) => (
          <div
            key={url}
            className="flex items-center gap-3 rounded-xl border border-white/8 px-3 py-2.5"
          >
            <span className="h-2 w-2 rounded-full bg-sky-400/80" />
            <span className="truncate font-mono text-[11px] text-white/55">
              [{i + 1}] {url}
            </span>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
        <p className="text-[10px] tracking-[0.14em] text-white/40 uppercase">
          Query
        </p>
        <p className="mt-1 text-sm text-white/85">{mock.question}</p>
      </div>
      <div className="mt-4 flex items-center justify-between rounded-xl border border-accent/30 bg-accent/10 px-4 py-3">
        <span className="text-sm text-white">Answer grounded</span>
        <span className="font-mono text-[11px] text-accent">{mock.citation}</span>
      </div>
    </PreviewShell>
  );
}

function PreviewTambo({ project }: { project: Project }) {
  const mock = project.mock as {
    prompt: string;
    component: string;
    components: string[];
  };

  return (
    <PreviewShell title="proshop · tambo ai" badge="GEN UI">
      <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
        <p className="text-[10px] tracking-[0.14em] text-white/40 uppercase">
          User prompt
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-white/85">
          {mock.prompt}
        </p>
      </div>

      <div className="my-4 flex items-center gap-2 px-1">
        <span className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
        <span className="text-[10px] tracking-[0.16em] text-accent uppercase">
          Renders component
        </span>
        <span className="h-px flex-1 bg-gradient-to-l from-accent/50 to-transparent" />
      </div>

      <div className="rounded-xl border border-accent/35 bg-gradient-to-br from-accent/15 to-sky-500/10 p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-mono text-[11px] text-accent">&lt;{mock.component} /&gt;</p>
          <span className="rounded-full border border-accent/30 px-2 py-0.5 text-[10px] text-accent">
            not text
          </span>
        </div>
        <div className="grid grid-cols-[72px_1fr] gap-3">
          <div className="aspect-square rounded-lg border border-white/10 bg-white/5" />
          <div>
            <p className="text-sm font-semibold text-white">iPhone 15 Pro</p>
            <p className="mt-1 text-[11px] text-white/45">
              AI review summary · stock alert · rating
            </p>
            <div className="mt-2 flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <span key={n} className="text-[10px] text-accent">
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {mock.components.map((c) => (
          <span
            key={c}
            className={`rounded-md border px-2 py-1 font-mono text-[10px] ${
              c === mock.component
                ? "border-accent/40 bg-accent/10 text-accent"
                : "border-white/10 text-white/40"
            }`}
          >
            {c}
          </span>
        ))}
      </div>
    </PreviewShell>
  );
}

function PreviewExponentia({ project }: { project: Project }) {
  const mock = project.mock as {
    query: string;
    answer: string;
    sources: string[];
    followUps: string[];
    escalated: boolean;
  };

  return (
    <PreviewShell title="exponentia · rag chatbot" badge="CITED">
      <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
        <p className="text-[10px] tracking-[0.14em] text-white/40 uppercase">
          Visitor question
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-white/85">
          {mock.query}
        </p>
      </div>

      <div className="mt-3 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3">
        <p className="text-[10px] tracking-[0.14em] text-accent uppercase">
          Grounded answer
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-white">{mock.answer}</p>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {mock.sources.map((src) => (
          <span
            key={src}
            className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[10px] text-sky-300/90"
          >
            ↗ {src}
          </span>
        ))}
      </div>

      <div className="mt-4">
        <p className="mb-2 text-[10px] tracking-[0.14em] text-white/40 uppercase">
          Suggested follow-ups
        </p>
        <div className="flex flex-col gap-1.5">
          {mock.followUps.map((q) => (
            <div
              key={q}
              className="rounded-lg border border-line/80 px-3 py-2 text-xs text-white/70"
            >
              {q}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-lg border border-white/8 px-3 py-2">
        <span className="text-[11px] text-white/45">Email escalation</span>
        <span className="text-[11px] text-muted">
          {mock.escalated ? "Sent via SMTP" : "Idle · unanswered only"}
        </span>
      </div>
    </PreviewShell>
  );
}

function PreviewSoon({ project }: { project: Project }) {
  const mock = project.mock as {
    status?: string;
    progress?: number;
    focus?: string;
  };
  const progress = mock.progress ?? 35;
  const status = mock.status ?? "In progress";
  const focus = mock.focus ?? "Architecture & early prototypes";

  return (
    <PreviewShell title={`${project.title.toLowerCase()} · wip`} badge="BUILDING">
      <div className="flex h-full min-h-[280px] flex-col">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] tracking-[0.16em] text-white/40 uppercase">
              {project.category}
            </p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold text-white">
              {project.title}
            </p>
          </div>
          <span className="rounded-full border border-accent/35 bg-accent/10 px-2.5 py-1 text-[10px] text-accent">
            {status}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-white/55">{project.outcome}</p>

        <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
          <div className="mb-2 flex items-center justify-between text-[11px]">
            <span className="text-white/40">Build progress</span>
            <span className="font-mono text-accent">{progress}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-accent"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-3 text-[11px] text-white/45">Current focus: {focus}</p>
        </div>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {project.flow.map((step) => (
            <span
              key={step}
              className="rounded-md border border-dashed border-white/15 px-2 py-1 text-[10px] text-white/40"
            >
              {step}
            </span>
          ))}
        </div>
      </div>
    </PreviewShell>
  );
}

function ProjectPreview({ project }: { project: Project }) {
  if (project.preview === "mcp") return <PreviewMcp project={project} />;
  if (project.preview === "agents") return <PreviewAgents project={project} />;
  if (project.preview === "rag") return <PreviewRag project={project} />;
  if (project.preview === "research") return <PreviewResearch project={project} />;
  if (project.preview === "tambo") return <PreviewTambo project={project} />;
  if (project.preview === "exponentia") return <PreviewExponentia project={project} />;
  return <PreviewSoon project={project} />;
}

export function Projects() {
  const [active, setActive] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const archiveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodes = itemRefs.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const idx = nodes.indexOf(visible.target as HTMLElement);
        if (idx >= 0) setActive(idx);
      },
      {
        root: null,
        rootMargin: "-35% 0px -35% 0px",
        threshold: [0.15, 0.35, 0.55, 0.75],
      },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  const project = featuredProjects[active] ?? featuredProjects[0];
  const remaining = projects.length - featuredProjects.length;

  const openArchive = () => {
    setShowAll(true);
    requestAnimationFrame(() => {
      archiveRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <section id="work" className="relative border-t border-line">
      <div className="mx-auto max-w-6xl px-6 pt-24 sm:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mb-10 max-w-2xl lg:mb-6"
        >
          <p className="text-sm font-medium tracking-wide text-accent">Work</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-5xl">
            Systems I&apos;ve shipped.
          </h2>
          <p className="mt-4 text-muted">
            Scroll the featured case studies, then open the full archive to browse
            every system.
          </p>
        </motion.div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
        {/* Sticky preview */}
        <div className="relative hidden lg:block">
          <div className="sticky top-24">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[11px] tracking-[0.18em] text-muted uppercase">
                Featured · Runtime preview
              </p>
              <div className="flex gap-1.5">
                {featuredProjects.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${
                      i === active ? "w-6 bg-accent" : "w-1.5 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                transition={{ duration: 0.35 }}
              >
                <ProjectPreview project={project} />
              </motion.div>
            </AnimatePresence>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.flow.map((step, i) => (
                <div key={step} className="flex items-center gap-1.5">
                  <span className="rounded-md border border-line bg-surface/70 px-2 py-1 text-[10px] text-muted">
                    {step}
                  </span>
                  {i < project.flow.length - 1 && (
                    <span className="text-[10px] text-accent/50">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scrolling featured chapters */}
        <div className="flex flex-col">
          {featuredProjects.map((item, i) => {
            const isActive = i === active;
            return (
              <article
                key={item.id}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className={`border-t border-line py-14 first:border-t-0 sm:py-20 lg:min-h-[70vh] lg:py-24 ${
                  isActive ? "opacity-100" : "opacity-55 lg:opacity-40"
                } transition-opacity duration-300`}
              >
                <div className="mb-6 lg:hidden">
                  <ProjectPreview project={item} />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-[family-name:var(--font-display)] text-sm font-semibold text-accent">
                    {item.id}
                  </span>
                  <span className="rounded-full border border-accent/35 bg-accent/10 px-2.5 py-0.5 text-[11px] text-accent">
                    Featured
                  </span>
                  <span className="rounded-full border border-line px-2.5 py-0.5 text-[11px] text-muted">
                    {item.category}
                  </span>
                  <span className="text-[11px] text-muted/70">{item.subtitle}</span>
                </div>

                <h3 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
                  {item.title}
                </h3>

                <p className="mt-3 text-base font-medium text-accent/90">
                  {item.outcome}
                </p>

                <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
                  {item.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {item.highlights.map((h) => (
                    <span
                      key={h}
                      className="rounded-full border border-line bg-surface/50 px-3 py-1.5 text-xs text-fg/85"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-x-1 text-xs text-muted">
                  {item.stack.map((tech, idx) => (
                    <span key={tech}>
                      {tech}
                      {idx < item.stack.length - 1 ? (
                        <span className="mx-2 text-white/20">/</span>
                      ) : null}
                    </span>
                  ))}
                </div>

                <ProjectLinks project={item} />
              </article>
            );
          })}
        </div>
      </div>

      {/* Show more / all projects */}
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-6 sm:pb-28">
        <div className="flex flex-col items-center gap-5 border-t border-line pt-12 text-center">
          <p className="text-sm text-muted">
            {showAll
              ? `Showing all ${projects.length} projects`
              : `${featuredProjects.length} featured · ${remaining} more in the archive`}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {!showAll ? (
              <>
                <button
                  type="button"
                  onClick={openArchive}
                  className="cta-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-bg transition hover:brightness-110"
                >
                  View all projects
                  <span aria-hidden>→</span>
                </button>
                {remaining > 0 && (
                  <button
                    type="button"
                    onClick={openArchive}
                    className="inline-flex items-center rounded-full border border-line px-6 py-3 text-sm font-medium text-fg transition hover:border-accent hover:text-accent"
                  >
                    Show more ({remaining})
                  </button>
                )}
              </>
            ) : (
              <button
                type="button"
                onClick={() => setShowAll(false)}
                className="inline-flex items-center rounded-full border border-line px-6 py-3 text-sm font-medium text-fg transition hover:border-accent hover:text-accent"
              >
                Show less
              </button>
            )}
          </div>
        </div>

        <div ref={archiveRef} id="all-projects" className="scroll-mt-24">
          <AnimatePresence initial={false}>
            {showAll && (
              <motion.div
                key="archive"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-12">
                  <div className="mb-8 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs tracking-[0.18em] text-accent uppercase">
                        Archive
                      </p>
                      <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight sm:text-3xl">
                        All projects
                      </h3>
                    </div>
                    <p className="text-xs text-muted">
                      {String(projects.length).padStart(2, "0")} systems
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {projects.map((item, i) => {
                      const live = item.href?.startsWith("http") ? item.href : "";
                      const github =
                        "github" in item &&
                        typeof item.github === "string" &&
                        item.github.startsWith("http")
                          ? item.github
                          : "";
                      const isSoon = item.preview === "soon";
                      const liveLabel =
                        "linkLabel" in item &&
                        typeof item.linkLabel === "string" &&
                        item.linkLabel
                          ? item.linkLabel
                          : "Live";

                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05, duration: 0.35 }}
                          className={`rounded-2xl border border-line bg-surface/40 p-5 sm:p-6 ${
                            isSoon ? "border-dashed opacity-90" : ""
                          }`}
                        >
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-[family-name:var(--font-display)] text-xs font-semibold text-accent">
                              {item.id}
                            </span>
                            {item.featured && (
                              <span className="rounded-full border border-accent/30 px-2 py-0.5 text-[10px] text-accent">
                                Featured
                              </span>
                            )}
                            {live && !item.linkLabel && (
                              <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[10px] text-accent">
                                Live
                              </span>
                            )}
                            {item.linkLabel && (
                              <span className="rounded-full border border-line px-2 py-0.5 text-[10px] text-muted">
                                Proprietary
                              </span>
                            )}
                            {isSoon && (
                              <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[10px] text-accent">
                                In progress
                              </span>
                            )}
                          </div>
                          <h4 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-fg">
                            {item.title}
                          </h4>
                          <p className="mt-1 text-xs text-muted">
                            {item.category} · {item.subtitle}
                          </p>
                          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
                            {item.outcome}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {item.stack.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className="rounded-full border border-line px-2 py-0.5 text-[10px] text-muted"
                              >
                                {tech}
                              </span>
                            ))}
                            {item.stack.length > 3 && (
                              <span className="text-[10px] text-muted">
                                +{item.stack.length - 3}
                              </span>
                            )}
                          </div>
                          {(live || github) && (
                            <div className="mt-5 flex flex-wrap gap-2">
                              {live ? (
                                <a
                                  href={live}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1.5 rounded-full border border-accent/35 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent transition hover:bg-accent/20"
                                >
                                  {liveLabel} ↗
                                </a>
                              ) : null}
                              {github ? (
                                <a
                                  href={github}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-muted transition hover:border-accent hover:text-accent"
                                >
                                  GitHub ↗
                                </a>
                              ) : null}
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
