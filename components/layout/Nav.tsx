"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks: [string, string][] = [
  ["Oddíl", "/trampoliny-liberec"],
  ["Služby", "/trampoliny-patrman"],
  ["Akce", "/akce"],
  ["Trenéři", "/treneri"],
  ["Ceník", "/cenik"],
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-surface-container-high transition-all duration-300">
      <div className="max-w-container-max mx-auto px-gutter py-2 md:py-4 flex justify-between items-center">
        <Link href="/" onClick={() => setOpen(false)} className="font-headline-sm text-headline-sm font-bold text-border-dark hover:text-brand-orange transition-colors duration-200 tracking-tight">
          Trampolíny
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(([label, href]) => (
            <Link key={label} href={href} className="font-label-bold text-label-bold text-outline hover:text-border-dark transition-colors duration-200 uppercase">
              {label}
            </Link>
          ))}
        </div>
        <div className="flex items-center">
          <a href="/#kontakt" className="hidden md:inline-flex bg-transparent text-border-dark font-label-bold text-label-bold px-6 py-2 uppercase tracking-wider minimal-border-dark hover:bg-border-dark hover:text-white transition-all duration-300">
            Kontakt
          </a>
          <button
            className="md:hidden p-3 text-border-dark"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Zavřít menu" : "Otevřít menu"}
          >
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-96" : "max-h-0"}`}>
        <div className="px-gutter pb-6 flex flex-col gap-0 border-t border-surface-container-high">
          {navLinks.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="font-label-bold text-label-bold text-border-dark uppercase py-4 border-b border-surface-container-high last:border-0 hover:text-brand-orange transition-colors"
            >
              {label}
            </Link>
          ))}
          <a
            href="/#kontakt"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex justify-center bg-border-dark text-white font-label-bold text-label-bold px-8 py-4 uppercase tracking-wider hover:bg-brand-orange transition-colors duration-300"
          >
            Kontakt
          </a>
        </div>
      </div>
    </nav>
  );
}
