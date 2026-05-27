import Link from "next/link";

const navLinks: [string, string][] = [
  ["Oddíl", "/#oddil"],
  ["Služby", "/#sluzby"],
  ["Rozvrh", "/#rozvrh"],
  ["Ceník", "/#cenik"],
];

export function Nav() {
  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-surface-container-high transition-all duration-300">
      <div className="max-w-container-max mx-auto px-gutter py-6 flex justify-between items-center">
        <Link href="/" className="font-headline-sm text-headline-sm font-bold text-border-dark hover:text-brand-orange transition-colors duration-200 tracking-tight">
          Trampolíny
        </Link>
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map(([label, href]) => (
            <Link key={label} href={href} className="font-label-bold text-label-bold text-outline hover:text-border-dark transition-colors duration-200 uppercase">
              {label}
            </Link>
          ))}
        </div>
        <div className="flex items-center">
          <Link href="/#kontakt" className="hidden md:inline-flex bg-transparent text-border-dark font-label-bold text-label-bold px-8 py-3 uppercase tracking-wider minimal-border-dark hover:bg-border-dark hover:text-white transition-all duration-300">
            Kontakt
          </Link>
          <button className="md:hidden p-2 text-border-dark">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
