"use client";

import { useState, useEffect } from "react";
import type { Announcement } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";

const THREE_HOURS = 3 * 60 * 60 * 1000;
const STORAGE_KEY = "dismissed_announcements";

function getDismissedMap(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function persistDismiss(id: string) {
  const map = getDismissedMap();
  const now = Date.now();
  map[id] = now;
  for (const key of Object.keys(map)) {
    if (now - map[key] > THREE_HOURS) delete map[key];
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

function filterVisible(list: Announcement[]): Announcement[] {
  const map = getDismissedMap();
  const now = Date.now();
  return list.filter((a) => !map[a._id] || now - map[a._id] > THREE_HOURS);
}

export function AnnouncementBar({ announcements }: { announcements: Announcement[] }) {
  const [visible, setVisible] = useState<Announcement[]>(announcements);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Filtruj dismissed na klientu po mountu
  useEffect(() => {
    setVisible(filterVisible(announcements));
  }, [announcements]);

  const total = visible.length;
  const item = visible[index] ?? null;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (total <= 1 || paused || open) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 6000);
    return () => clearInterval(id);
  }, [total, paused, open]);

  if (total === 0 || !item) return null;

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  const dismissCurrent = () => {
    persistDismiss(item._id);
    const newVisible = visible.filter((a) => a._id !== item._id);
    setVisible(newVisible);
    if (newVisible.length === 0) {
      setOpen(false);
    } else {
      setIndex((i) => Math.min(i, newVisible.length - 1));
    }
  };

  return (
    <>
      {/* ── BAR ── */}
      <div
        className="w-full bg-brand-orange"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="max-w-container-max mx-auto px-gutter flex items-center gap-3 py-4">
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-3 flex-1 text-left min-w-0 group"
          >
            <span className="shrink-0 bg-white text-brand-orange font-label-bold uppercase tracking-widest px-2.5 py-0.5 text-[10px] hidden sm:block">
              Novinka
            </span>
            <span className="text-white font-medium text-sm flex-1 truncate leading-tight">
              {item.title}
            </span>
            <span className="shrink-0 font-label-bold text-[10px] uppercase tracking-widest text-white/70 group-hover:text-white transition-colors hidden md:flex items-center gap-1.5">
              Číst dál
              <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>

          {total > 1 && (
            <div className="shrink-0 flex items-center gap-1">
              <button onClick={prev} className="text-white/70 hover:text-white transition-colors p-1.5" aria-label="Předchozí">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="font-label-bold text-[10px] text-white/70 tabular-nums w-6 text-center">
                {index + 1}/{total}
              </span>
              <button onClick={next} className="text-white/70 hover:text-white transition-colors p-1.5" aria-label="Další">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          <button
            onClick={dismissCurrent}
            className="shrink-0 text-white/70 hover:text-white transition-colors p-2 -mr-2"
            aria-label="Zavřít oznámení"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── BACKDROP ── */}
      <div
        className={`fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      />

      {/* ── MODAL ── */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-6 pointer-events-none">
        <div
          className={`w-full max-w-lg flex flex-col pointer-events-auto transform transition-all duration-300 ease-out ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          {/* Header — dark */}
          <div className="bg-border-dark px-8 pt-8 pb-8 relative shrink-0">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors"
              aria-label="Zavřít"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <span className="inline-block bg-brand-orange text-white font-label-bold uppercase tracking-widest px-2.5 py-0.5 text-[10px] mb-5">
              Novinka
            </span>
            <h2
              className="font-black uppercase tracking-tight leading-tight text-white pr-6"
              style={{ fontSize: "clamp(22px, 3vw, 32px)" }}
            >
              {item.title}
            </h2>
          </div>

          {/* Body — white */}
          <div className="bg-white px-8 py-8 flex flex-col gap-6 max-h-[60vh] overflow-y-auto">
            {item.body && (
              <div className="space-y-4">
                <PortableText
                  value={item.body}
                  components={{
                    block: {
                      normal: ({ children }) => (
                        <p className="text-on-surface-variant font-light leading-relaxed text-sm">{children}</p>
                      ),
                      h2: ({ children }) => (
                        <h3 className="font-black uppercase tracking-tight text-border-dark text-base">{children}</h3>
                      ),
                    },
                    marks: {
                      strong: ({ children }: { children: React.ReactNode }) => (
                        <strong className="font-semibold text-border-dark">{children}</strong>
                      ),
                      em: ({ children }: { children: React.ReactNode }) => <em>{children}</em>,
                      link: ({ value, children }: { value?: { href?: string }; children: React.ReactNode }) => (
                        <a href={value?.href} className="text-brand-orange hover:underline" target="_blank" rel="noopener noreferrer">
                          {children}
                        </a>
                      ),
                    },
                  }}
                />
              </div>
            )}

            {item.link?.url && (
              <a
                href={item.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-brand-orange text-white font-label-bold uppercase tracking-widest px-8 py-4 text-[11px] hover:bg-border-dark transition-colors self-start"
              >
                {item.link.label || "Více informací"}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            )}

            {total > 1 && (
              <div className="pt-6 border-t border-surface-container-high flex items-center justify-between">
                <button
                  onClick={prev}
                  className="flex items-center gap-2 font-label-bold text-[10px] uppercase tracking-widest text-outline hover:text-border-dark transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Předchozí
                </button>
                <span className="font-label-bold text-[10px] text-outline tabular-nums">
                  {index + 1} / {total}
                </span>
                <button
                  onClick={next}
                  className="flex items-center gap-2 font-label-bold text-[10px] uppercase tracking-widest text-outline hover:text-border-dark transition-colors"
                >
                  Další
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
