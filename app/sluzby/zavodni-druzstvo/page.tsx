import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

export default function ZavodniDruzstvoPage() {
  return (
    <div className="font-body-md antialiased bg-white min-h-screen">

      {/* Nav */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative h-[75vh] min-h-[560px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/zavodni-druzstvo-hero.jpg"
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
                  "Tréninky začnou po dohodě s trenérem. V týmech jste již zařazeni ze systému EOS.",
                  "Ze systému EOS obdržíte žádost o kontrolu údajů. Po odsouhlasení přijde pokyn k platbě emailem nebo přes aplikaci.",
                  "Závodní přípravka pokračuje — přihlašte se po dohodě s trenérkou Monikou Patrmanovou nebo Mírou Patrmanem.",
                  "Tréninky NEJSOU o státních svátcích. O školních prázdninách vždy po dohodě s trenérem dle závodní sezóny.",
                ].map((text, i) => (
                  <div key={i} className="flex gap-5 p-6 bg-surface-container-lowest">
                    <span className="shrink-0 text-brand-orange mt-0.5">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
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
                    Máš zájem?
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
                  <Link href="#" className="font-body-md text-body-md text-brand-orange font-medium hover:text-border-dark transition-colors">
                    Naši trenéři →
                  </Link>
                </div>
                <div className="p-6 space-y-1">
                  <p className="font-label-bold text-[10px] uppercase tracking-widest text-outline">Registrace</p>
                  <p className="font-body-md text-body-md text-on-surface-variant font-light mb-1">Systém EOS</p>
                  <Link href="#" className="font-body-md text-body-md text-brand-orange font-medium hover:text-border-dark transition-colors">
                    Jak na to →
                  </Link>
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

      <Footer />

    </div>
  );
}
