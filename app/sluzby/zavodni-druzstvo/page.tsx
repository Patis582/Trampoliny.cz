import Link from "next/link";
import Image from "next/image";

export default function ZavodniDruzstvoPage() {
  return (
    <div className="font-body-md antialiased bg-white min-h-screen">

      {/* Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-surface-container-high">
        <div className="max-w-container-max mx-auto px-gutter py-6 flex justify-between items-center">
          <Link href="/" className="font-headline-sm text-headline-sm font-bold text-border-dark hover:text-brand-orange transition-colors duration-200 tracking-tight">
            Trampolíny
          </Link>
          <div className="hidden md:flex items-center gap-12">
            {[["Oddíl", "/#oddil"], ["Služby", "/#sluzby"], ["Rozvrh", "/#rozvrh"], ["Ceník", "/#cenik"]].map(([label, href]) => (
              <Link key={label} href={href} className="font-label-bold text-label-bold text-outline hover:text-border-dark transition-colors duration-200 uppercase">
                {label}
              </Link>
            ))}
          </div>
          <Link href="/#kontakt" className="hidden md:inline-flex bg-transparent text-border-dark font-label-bold text-label-bold px-8 py-3 uppercase tracking-wider minimal-border-dark hover:bg-border-dark hover:text-white transition-all duration-300">
            Kontakt
          </Link>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative h-[75vh] min-h-[560px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://lh3.googleusercontent.com/aida/ADBb0ujcwjQsk52BoTmx9QXrnib6ROR791-hRivGHKqhTAIXB5IBnigT0zUgxz-uoKgyxDkwAPbyiDXDXd4DTvIkYsruPnUFtvPn7o-2XPGvrSaflJtcrg27-jupAA0CKNkoYqgJm4M2Jtw7F8q76MEgFeqnj0zxE-2uxE9t6dR8gJk58l-WO6tOU9iVrHrQXdaF8OALqXqUbbW9yyyAxb2L2-zVptlyqcM2L_uDBcHbNLiDCHsCC63Bhi8N-swx"
            alt="Závodní družstvo"
            fill
            className="object-cover object-center scale-105"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-deep via-brand-navy-deep/50 to-brand-navy-deep/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-deep/70 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-container-max mx-auto px-gutter pb-16 pt-32">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/#sluzby" className="inline-flex items-center gap-2 text-white/50 hover:text-white/90 transition-colors font-label-bold text-[11px] uppercase tracking-widest group">
              <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Všechny služby
            </Link>
            <span className="inline-flex items-center font-label-bold text-[11px] uppercase tracking-widest bg-brand-orange text-white px-3 py-1.5">
              Trampolíny Liberec
            </span>
          </div>

          <h1 className="font-headline-lg-mobile md:font-headline-md text-headline-lg-mobile md:text-headline-md text-white uppercase tracking-tight leading-none mb-6">
            Závodní<br />družstvo
          </h1>

          <p className="font-body-lg text-body-lg text-white/75 font-light max-w-lg leading-relaxed">
            Výkonnostní trénink pro sportovce s ambicemi závodit na národní i mezinárodní úrovni.
          </p>
        </div>
      </section>

      {/* ── STATS BAND ───────────────────────────────────────────── */}
      <div className="bg-border-dark">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-2 divide-x divide-white/10">
            {[
              { label: "Věková skupina", value: "Od 8 let" },
              { label: "Lokalita", value: "TC Orionka" },
            ].map(({ label, value }) => (
              <div key={label} className="px-8 py-7 first:pl-0">
                <p className="font-label-bold text-[10px] uppercase tracking-widest text-white/40 mb-1.5">{label}</p>
                <p className="font-headline-sm text-headline-sm text-white uppercase tracking-tight">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────────── */}
      <div className="max-w-container-max mx-auto px-gutter py-section-padding-mobile md:py-section-padding-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">

          {/* Left — content */}
          <main className="lg:col-span-8 space-y-20">

            {/* O oddílu */}
            <div className="space-y-8">
              <div>
                <span className="inline-block font-label-bold text-[11px] uppercase tracking-widest text-brand-orange mb-4">O oddílu</span>
                <h2 className="font-headline-sm text-headline-sm text-border-dark uppercase tracking-tight">
                  Pro koho jsou tréninky určeny
                </h2>
              </div>
              <p className="font-body-lg text-body-lg text-border-dark font-medium leading-relaxed">
                Pro děti, které už berou skoky na trampolíně vážně a chtějí se tomuto sportu věnovat výkonnostně.
              </p>
              <div className="space-y-5 font-body-md text-body-md text-on-surface-variant font-light leading-relaxed">
                <p>
                  Po dohodě se svým trenérem a rodiči se účastní oblastních i národních či mezinárodních závodů — Žákovský a Český pohár, Mistrovství republiky juniorů a seniorů, Mistrovství republiky družstev, Mistrovství Evropy aj.
                </p>
                <p>
                  Ti nejlepší ze závodních družstev jsou zařazeni do Sportovních středisek, Sportovních center mládeže a Vrcholového sportovního centra mládeže.
                </p>
              </div>
            </div>

            {/* Horizontal rule */}
            <div className="h-px bg-surface-container-high" />

            {/* Organizace */}
            <div className="space-y-8">
              <div>
                <span className="inline-block font-label-bold text-[11px] uppercase tracking-widest text-brand-orange mb-4">Školní rok 2025/26</span>
                <h2 className="font-headline-sm text-headline-sm text-border-dark uppercase tracking-tight">
                  Jak to funguje
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                    text: "Tréninky začnou po dohodě s trenérem. V týmech jste již zařazeni ze systému EOS.",
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ),
                    text: "Ze systému EOS obdržíte žádost o kontrolu údajů. Po odsouhlasení přijde pokyn k platbě emailem nebo přes aplikaci.",
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ),
                    text: "Závodní přípravka pokračuje — přihlašte se po dohodě s trenérkou Monikou Patrmanovou nebo Mírou Patrmanem.",
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    ),
                    text: "Tréninky NEJSOU o státních svátcích. O školních prázdninách vždy po dohodě s trenérem dle závodní sezóny.",
                  },
                ].map(({ icon, text }, i) => (
                  <div key={i} className="flex gap-5 p-6 bg-surface-container-lowest">
                    <span className="shrink-0 text-brand-orange mt-0.5">{icon}</span>
                    <p className="font-body-md text-body-md text-on-surface-variant font-light leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Horizontal rule */}
            <div className="h-px bg-surface-container-high" />

            {/* Ceník */}
            <div className="space-y-8">
              <div>
                <span className="inline-block font-label-bold text-[11px] uppercase tracking-widest text-brand-orange mb-4">Finance</span>
                <h2 className="font-headline-sm text-headline-sm text-border-dark uppercase tracking-tight">
                  Ceník 2025/26
                </h2>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant font-light leading-relaxed">
                Pokyny k platbě jsou zasílány po registraci ze systému EOS emailem nebo přes aplikaci. Na splátkový kalendář se domluvte na{" "}
                <a href="mailto:kamilabrucklerova@gmail.com" className="text-brand-orange font-medium hover:text-border-dark transition-colors underline underline-offset-4">
                  kamilabrucklerova@gmail.com
                </a>.
              </p>

              <div className="flex flex-wrap gap-3">
                <a href="#" className="inline-flex items-center gap-2.5 bg-brand-orange text-white font-label-bold uppercase tracking-widest px-7 py-4 text-[11px] hover:bg-border-dark transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Přehled tréninků 2025/26
                </a>
                <a href="#" className="inline-flex items-center gap-2.5 border border-border-dark text-border-dark font-label-bold uppercase tracking-widest px-7 py-4 text-[11px] hover:bg-border-dark hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Ceník 2025/26
                </a>
              </div>
            </div>

          </main>

          {/* Right — sticky sidebar */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-5">

              {/* CTA card */}
              <div className="bg-border-dark text-white p-10 space-y-7">
                <div>
                  <span className="font-label-bold text-[10px] uppercase tracking-widest text-white/40 block mb-4">
                    Zájem o trénink?
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-white uppercase tracking-tight">
                    Ozvi se nám
                  </h3>
                </div>
                <p className="font-body-md text-body-md text-white/60 font-light leading-relaxed">
                  Rádi poradíme, zda je závodní příprava vhodná pro tvé dítě, a domluvíme termín prvního tréninku.
                </p>
                <div className="space-y-3">
                  <a href="mailto:mirapatrman@gmail.com" className="flex items-center justify-center bg-brand-orange text-white font-label-bold uppercase tracking-widest px-6 py-4 text-[11px] hover:bg-white hover:text-border-dark transition-colors w-full">
                    Napsat trenérovi
                  </a>
                  <a href="tel:+420604245971" className="flex items-center justify-center border border-white/15 text-white/80 font-label-bold uppercase tracking-widest px-6 py-4 text-[11px] hover:border-white/50 hover:text-white transition-colors w-full">
                    +420 604 245 971
                  </a>
                </div>
              </div>

              {/* Info card */}
              <div className="border border-surface-container-high divide-y divide-surface-container-high">
                <div className="p-6 space-y-1">
                  <p className="font-label-bold text-[10px] uppercase tracking-widest text-outline">Lokalita</p>
                  <p className="font-body-md text-body-md text-border-dark font-medium">TC Orionka, Liberec – Harcov</p>
                </div>
                <div className="p-6 space-y-1">
                  <p className="font-label-bold text-[10px] uppercase tracking-widest text-outline">Trenér</p>
                  <p className="font-body-md text-body-md text-border-dark font-medium">Míra Patrman</p>
                  <p className="font-body-md text-body-md text-border-dark font-medium">Monika Patrmanová</p>
                </div>
                <div className="p-6 space-y-1">
                  <p className="font-label-bold text-[10px] uppercase tracking-widest text-outline">Registrace</p>
                  <p className="font-body-md text-body-md text-on-surface-variant font-light">Systém EOS</p>
                </div>
              </div>

            </div>
          </aside>

        </div>
      </div>

      {/* ── BOTTOM CTA ───────────────────────────────────────────── */}
      <section className="bg-surface-container-lowest border-t border-surface-container-high py-20">
        <div className="max-w-container-max mx-auto px-gutter flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="inline-block text-brand-orange font-label-bold text-label-bold uppercase tracking-widest mb-4">
              Trampolíny Liberec & Patrman
            </span>
            <h2 className="font-headline-sm text-headline-sm text-border-dark uppercase tracking-tight">
              Prohlédni si všechny naše služby
            </h2>
          </div>
          <Link href="/#sluzby" className="shrink-0 inline-flex items-center gap-3 bg-border-dark text-white font-label-bold uppercase tracking-widest px-8 py-4 text-[11px] hover:bg-brand-orange transition-colors">
            Všechny služby
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="w-full bg-border-dark text-white">
        <div className="max-w-container-max mx-auto px-gutter pt-20 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-4">
              <Link href="/" className="font-headline-sm text-headline-sm font-bold text-white tracking-tight">
                Trampolíny <span className="text-brand-orange">Liberec</span><br />
                <span className="text-brand-green">& Patrman</span>
              </Link>
              <p className="mt-6 font-body-md text-white/60 font-light max-w-xs leading-relaxed">
                Závodní oddíl i veřejné skákání v Liberci. Dvě haly — Orionka v Harcově a Nádraží v centru města.
              </p>
            </div>
            <div className="md:col-span-2">
              <h4 className="font-label-bold text-[11px] text-white/40 uppercase tracking-widest mb-6">Menu</h4>
              <div className="flex flex-col gap-4">
                {[["Oddíl", "/#oddil"], ["Služby", "/#sluzby"], ["Rozvrh", "/#rozvrh"], ["Ceník", "/#cenik"]].map(([l, h]) => (
                  <Link key={l} href={h} className="text-white/70 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest">{l}</Link>
                ))}
              </div>
            </div>
            <div className="md:col-span-3">
              <h4 className="font-label-bold text-[11px] text-white/40 uppercase tracking-widest mb-6">Kontakt</h4>
              <p className="text-white/40 text-[11px] font-bold tracking-widest uppercase mb-1">Telefon</p>
              <p className="text-white font-medium mb-6">+420 604 245 971</p>
              <p className="text-white/40 text-[11px] font-bold tracking-widest uppercase mb-1">Email</p>
              <p className="text-white font-medium">mirapatrman@gmail.com</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-white/40 text-xs font-light gap-4">
            <div>© {new Date().getFullYear()} Trampolíny Liberec & Patrman. Všechna práva vyhrazena.</div>
            <div className="flex gap-8">
              <Link href="#" className="hover:text-brand-orange transition-colors">Facebook</Link>
              <Link href="#" className="hover:text-brand-green transition-colors">Instagram</Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
