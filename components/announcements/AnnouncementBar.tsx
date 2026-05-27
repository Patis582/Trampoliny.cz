"use client";

import { useState, useEffect } from "react";

export function AnnouncementBar() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (dismissed) return null;

  return (
    <>
      {/* Top bar — div wrapper, two sibling buttons inside */}
      <div className="w-full bg-border-dark text-white hover:bg-primary-container transition-colors duration-200">
        <div className="max-w-container-max mx-auto px-gutter flex items-center gap-4 py-2.5">
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-4 flex-1 text-left min-w-0"
          >
            <span className="shrink-0 bg-brand-orange font-label-bold text-white uppercase tracking-widest px-2 py-0.5 text-[11px]">
              Novinka
            </span>
            <span className="font-body-md text-sm text-white/90 flex-1 truncate">
              Otevřeny přihlášky na letní příměstský tábor 2026
            </span>
            <span className="shrink-0 font-label-bold text-[11px] uppercase tracking-widest text-brand-orange hidden sm:block">
              Více info →
            </span>
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="shrink-0 text-white/50 hover:text-white transition-colors p-1 -mr-1"
            aria-label="Zavřít oznámení"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Modal overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-border-dark/70 backdrop-blur-sm" />
          <div
            className="relative bg-white max-w-lg w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-1 bg-brand-orange w-full" />
            <div className="p-8 md:p-10">
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-outline hover:text-border-dark transition-colors p-1"
                aria-label="Zavřít"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <span className="inline-block bg-brand-orange text-white font-label-bold uppercase tracking-widest px-3 py-1 text-[11px] mb-6">
                Novinka
              </span>
              <h2 className="font-headline-sm text-headline-sm text-border-dark uppercase tracking-tight mb-4">
                Letní příměstský tábor 2026
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant font-light leading-relaxed mb-4">
                Příměstský tábor proběhne v Trampolínovém centru Orionka ve dvou turnusech:
              </p>
              <ul className="font-body-md text-body-md text-on-surface-variant font-light space-y-1 mb-6 ml-4 list-disc">
                <li>1. turnus: 7. – 11. července 2026</li>
                <li>2. turnus: 14. – 18. července 2026</li>
              </ul>
              <p className="font-body-md text-body-md text-on-surface-variant font-light leading-relaxed mb-8">
                Program zahrnuje skákání na trampolínách, lezeckou stěnu a celodenní výlety.
                Kapacita je omezená — přihlaste se co nejdříve!
              </p>
              <a
                href="#"
                className="inline-flex justify-center items-center bg-brand-orange text-white font-label-bold uppercase tracking-widest px-8 py-3.5 text-sm hover:bg-border-dark transition-colors"
              >
                Přihlásit se na tábor
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
