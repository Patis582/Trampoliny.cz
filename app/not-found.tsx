import Link from "next/link";
import { HeroScrollHint } from "@/components/layout/HeroScrollHint";

export default function NotFound() {
  return (
    <div className="font-body-md antialiased bg-white min-h-screen flex items-center justify-center px-gutter">
      <div className="max-w-md text-center flex flex-col items-center">
        <HeroScrollHint color="#fe642c" width={160} height={280} standalone />
        <div className="mt-10">
          <span className="inline-block text-brand-orange font-label-bold text-[11px] uppercase tracking-widest mb-6">
            404
          </span>
          <h1 className="font-headline-md text-headline-md text-border-dark uppercase tracking-tight mb-6">
            Stránka nenalezena
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant font-light leading-relaxed mb-10">
            Stránka kterou hledáš neexistuje nebo byla přesunuta.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-brand-orange text-white font-label-bold uppercase tracking-widest px-8 py-4 text-[11px] hover:bg-border-dark transition-colors"
          >
            Zpět na úvod
          </Link>
        </div>
      </div>
    </div>
  );
}
