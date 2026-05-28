"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="font-body-md antialiased bg-white min-h-screen flex items-center justify-center px-gutter">
      <div className="max-w-md text-center">
        <span className="inline-block text-brand-orange font-label-bold text-[11px] uppercase tracking-widest mb-6">
          Chyba
        </span>
        <h1 className="font-headline-md text-headline-md text-border-dark uppercase tracking-tight mb-6">
          Něco se pokazilo
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant font-light leading-relaxed mb-10">
          Omlouváme se, stránku se nepodařilo načíst. Zkus to znovu nebo se vrať na úvodní stránku.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center bg-brand-orange text-white font-label-bold uppercase tracking-widest px-8 py-4 text-[11px] hover:bg-border-dark transition-colors"
          >
            Zkusit znovu
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center border border-border-dark text-border-dark font-label-bold uppercase tracking-widest px-8 py-4 text-[11px] hover:bg-border-dark hover:text-white transition-colors"
          >
            Úvodní stránka
          </Link>
        </div>
      </div>
    </div>
  );
}
