"use client";

import { useEffect, useState } from "react";
import {
  applyPalette,
  DEFAULT_PALETTE_ID,
  PALETTE_STORAGE_KEY,
  palettes,
} from "@/lib/palettes";

const isDev = process.env.NODE_ENV === "development";

export function PaletteSwitcher() {
  const [active, setActive] = useState(DEFAULT_PALETTE_ID);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isDev) return;
    let saved = DEFAULT_PALETTE_ID;
    try {
      saved = localStorage.getItem(PALETTE_STORAGE_KEY) || DEFAULT_PALETTE_ID;
    } catch {
      /* ignore */
    }
    const id = applyPalette(saved);
    setActive(id);
  }, []);

  if (!isDev) return null;

  const select = (id: string) => {
    applyPalette(id);
    setActive(id);
    try {
      localStorage.setItem(PALETTE_STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-line bg-surface/80 px-2.5 py-1.5 text-[11px] text-muted backdrop-blur-sm transition hover:border-accent hover:text-fg"
        aria-expanded={open}
        aria-label="Color palettes (dev only)"
        title="Color palettes · dev only"
      >
        <span
          className="h-3.5 w-3.5 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${
              palettes.find((p) => p.id === active)?.swatch[0]
            }, ${palettes.find((p) => p.id === active)?.swatch[1]})`,
          }}
        />
        <span className="hidden sm:inline">Palette</span>
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[60] cursor-default"
            aria-label="Close palette menu"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-[calc(100%+8px)] z-[70] w-56 rounded-2xl border border-line bg-bg-elevated/95 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-md">
            <p className="mb-2 px-1 text-[10px] tracking-[0.16em] text-muted uppercase">
              Dev palettes
            </p>
            <div className="flex flex-col gap-1">
              {palettes.map((palette) => {
                const selected = palette.id === active;
                return (
                  <button
                    key={palette.id}
                    type="button"
                    onClick={() => {
                      select(palette.id);
                      setOpen(false);
                    }}
                    className={`flex items-center gap-3 rounded-xl px-2.5 py-2 text-left text-sm transition ${
                      selected
                        ? "bg-accent/15 text-fg"
                        : "text-muted hover:bg-white/5 hover:text-fg"
                    }`}
                  >
                    <span
                      className="h-6 w-6 shrink-0 rounded-full border border-white/10"
                      style={{
                        background: `linear-gradient(135deg, ${palette.swatch[0]}, ${palette.swatch[1]})`,
                      }}
                    />
                    <span className="flex-1 font-medium">{palette.name}</span>
                    {selected && (
                      <span className="text-[10px] text-accent">Active</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
