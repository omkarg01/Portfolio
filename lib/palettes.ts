export type Palette = {
  id: string;
  name: string;
  swatch: [string, string];
  vars: Record<string, string>;
};

export const palettes: Palette[] = [
  {
    id: "teal",
    name: "Teal",
    swatch: ["#2dd4bf", "#38bdf8"],
    vars: {
      "--bg": "#070b12",
      "--bg-elevated": "#0c121c",
      "--fg": "#e8eef7",
      "--muted": "#8b9bb0",
      "--accent": "#2dd4bf",
      "--accent-dim": "#14b8a6",
      "--accent-2": "#38bdf8",
      "--accent-3": "#a5b4fc",
      "--accent-glow": "rgba(45, 212, 191, 0.22)",
      "--accent-soft": "rgba(45, 212, 191, 0.1)",
      "--accent-soft-2": "rgba(56, 189, 248, 0.08)",
      "--line": "rgba(139, 155, 176, 0.18)",
      "--surface": "rgba(14, 22, 34, 0.72)",
      "--cta-shadow": "rgba(45, 212, 191, 0.25)",
      "--grid-line": "rgba(45, 212, 191, 0.06)",
    },
  },
  {
    id: "teal-mix",
    name: "Teal Mix",
    swatch: ["#2dd4bf", "#34d399"],
    vars: {
      "--bg": "#070b12",
      "--bg-elevated": "#0c121c",
      "--fg": "#e8eef7",
      "--muted": "#8b9bb0",
      "--accent": "#2dd4bf",
      "--accent-dim": "#0d9488",
      "--accent-2": "#34d399",
      "--accent-3": "#6ee7b7",
      "--accent-glow": "rgba(45, 212, 191, 0.24)",
      "--accent-soft": "rgba(45, 212, 191, 0.12)",
      "--accent-soft-2": "rgba(52, 211, 153, 0.1)",
      "--line": "rgba(139, 155, 176, 0.18)",
      "--surface": "rgba(14, 22, 34, 0.72)",
      "--cta-shadow": "rgba(52, 211, 153, 0.28)",
      "--grid-line": "rgba(45, 212, 191, 0.07)",
    },
  },
  {
    id: "amber",
    name: "Amber",
    swatch: ["#f59e0b", "#fb923c"],
    vars: {
      "--bg": "#0a0908",
      "--bg-elevated": "#14110e",
      "--fg": "#f5f0e8",
      "--muted": "#a89b88",
      "--accent": "#f59e0b",
      "--accent-dim": "#d97706",
      "--accent-2": "#fb923c",
      "--accent-3": "#fcd34d",
      "--accent-glow": "rgba(245, 158, 11, 0.22)",
      "--accent-soft": "rgba(245, 158, 11, 0.12)",
      "--accent-soft-2": "rgba(251, 146, 60, 0.08)",
      "--line": "rgba(168, 155, 136, 0.2)",
      "--surface": "rgba(24, 18, 12, 0.72)",
      "--cta-shadow": "rgba(245, 158, 11, 0.28)",
      "--grid-line": "rgba(245, 158, 11, 0.07)",
    },
  },
  {
    id: "ocean",
    name: "Ocean",
    swatch: ["#38bdf8", "#818cf8"],
    vars: {
      "--bg": "#060912",
      "--bg-elevated": "#0b1220",
      "--fg": "#e8eef8",
      "--muted": "#8796b0",
      "--accent": "#38bdf8",
      "--accent-dim": "#0ea5e9",
      "--accent-2": "#818cf8",
      "--accent-3": "#c4b5fd",
      "--accent-glow": "rgba(56, 189, 248, 0.22)",
      "--accent-soft": "rgba(56, 189, 248, 0.12)",
      "--accent-soft-2": "rgba(129, 140, 248, 0.1)",
      "--line": "rgba(135, 150, 176, 0.2)",
      "--surface": "rgba(12, 18, 32, 0.72)",
      "--cta-shadow": "rgba(56, 189, 248, 0.28)",
      "--grid-line": "rgba(56, 189, 248, 0.07)",
    },
  },
  {
    id: "lime",
    name: "Lime",
    swatch: ["#a3e635", "#4ade80"],
    vars: {
      "--bg": "#070b08",
      "--bg-elevated": "#0d140f",
      "--fg": "#eef5ea",
      "--muted": "#8fa38a",
      "--accent": "#a3e635",
      "--accent-dim": "#84cc16",
      "--accent-2": "#4ade80",
      "--accent-3": "#bef264",
      "--accent-glow": "rgba(163, 230, 53, 0.2)",
      "--accent-soft": "rgba(163, 230, 53, 0.1)",
      "--accent-soft-2": "rgba(74, 222, 128, 0.08)",
      "--line": "rgba(143, 163, 138, 0.2)",
      "--surface": "rgba(14, 22, 16, 0.72)",
      "--cta-shadow": "rgba(163, 230, 53, 0.25)",
      "--grid-line": "rgba(163, 230, 53, 0.07)",
    },
  },
  {
    id: "coral",
    name: "Coral",
    swatch: ["#fb7185", "#f97316"],
    vars: {
      "--bg": "#0c0809",
      "--bg-elevated": "#161012",
      "--fg": "#f8eef0",
      "--muted": "#a89096",
      "--accent": "#fb7185",
      "--accent-dim": "#e11d48",
      "--accent-2": "#f97316",
      "--accent-3": "#fda4af",
      "--accent-glow": "rgba(251, 113, 133, 0.22)",
      "--accent-soft": "rgba(251, 113, 133, 0.12)",
      "--accent-soft-2": "rgba(249, 115, 22, 0.08)",
      "--line": "rgba(168, 144, 150, 0.2)",
      "--surface": "rgba(26, 14, 18, 0.72)",
      "--cta-shadow": "rgba(251, 113, 133, 0.28)",
      "--grid-line": "rgba(251, 113, 133, 0.07)",
    },
  },
];

export const DEFAULT_PALETTE_ID = "teal";
export const PALETTE_STORAGE_KEY = "og-dev-palette";

export function applyPalette(id: string) {
  const palette = palettes.find((p) => p.id === id) ?? palettes[0];
  const root = document.documentElement;
  Object.entries(palette.vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
  root.dataset.palette = palette.id;
  return palette.id;
}
