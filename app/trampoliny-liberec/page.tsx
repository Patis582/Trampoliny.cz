import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { LiberecHeroSlideshow } from "@/components/layout/LiberecHeroSlideshow";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getServicesByBrand } from "@/sanity/lib/queries";
import { SectionError } from "@/components/ui/SectionError";

export default async function TrampolinyLiberecPage() {
  const services = await getServicesByBrand("liberec");

  return (
    <div className="font-body-md antialiased bg-white min-h-screen">

      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ height: "100svh", minHeight: 600 }}>
        <LiberecHeroSlideshow />
        <div className="relative z-10 h-full flex flex-col justify-end px-gutter max-w-container-max mx-auto pb-16 md:pb-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-brand-orange" />
            <span className="text-[10px] font-label-bold uppercase tracking-[0.4em] text-white/40">
              Závodní oddíl · TC Orionka · Liberec
            </span>
          </div>
          <h1 className="font-black uppercase leading-none mb-6">
            <span className="block text-white" style={{ fontSize: "clamp(48px, 9vw, 128px)", letterSpacing: "-0.04em", lineHeight: 0.92 }}>
              Závodní
            </span>
            <span className="block text-white" style={{ fontSize: "clamp(48px, 9vw, 128px)", letterSpacing: "-0.04em", lineHeight: 0.92 }}>
              oddíl
            </span>
            <span className="block text-brand-orange" style={{ fontSize: "clamp(48px, 9vw, 128px)", letterSpacing: "-0.04em", lineHeight: 0.92 }}>
              &amp; Kroužky
            </span>
          </h1>
          <p className="text-white/55 font-light mb-10 max-w-md leading-relaxed" style={{ fontSize: "clamp(14px, 1.1vw, 16px)" }}>
            Výkonnostní trénink, závody a přípravky pro děti i dospělé v TC Orionka v Liberci.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#aktivity"
              className="inline-flex justify-center items-center bg-brand-orange text-white font-label-bold text-[11px] uppercase tracking-wider px-7 py-4 hover:bg-white hover:text-brand-orange transition-all duration-300 cursor-pointer"
            >
              Naše kroužky
            </a>
            <a
              href="#uspechy"
              className="inline-flex justify-center items-center gap-3 bg-white/10 text-white font-label-bold text-[11px] uppercase tracking-wider px-7 py-4 border border-white/25 backdrop-blur-sm hover:bg-white hover:text-brand-navy-deep transition-all duration-300 cursor-pointer"
            >
              Naše úspěchy
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <div className="bg-brand-navy-deep">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-3 divide-x divide-white/10">
            {[
              { label: "Závodníků", value: "100+" },
              { label: "Medailí", value: "300+" },
              { label: "Trénujeme od roku", value: "2009" },
            ].map(({ label, value }) => (
              <div key={label} className="px-4 py-8 md:px-10 md:py-10 first:pl-0 last:pr-0">
                <p className="font-label-bold text-[10px] uppercase tracking-widest text-white/35 mb-2 leading-tight">{label}</p>
                <p
                  className="font-black text-white uppercase tracking-tight"
                  style={{ fontSize: "clamp(24px, 4vw, 48px)", lineHeight: 1 }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── INTRO ── */}
      <section className="py-section-padding-mobile md:py-section-padding-desktop bg-white">
        <ScrollReveal className="max-w-3xl mx-auto px-gutter text-center">
          <span className="inline-block font-label-bold text-label-bold uppercase tracking-widest text-brand-orange mb-6">
            Kdo jsme
          </span>
          <h2
            className="font-black uppercase tracking-tight leading-none text-border-dark mb-10"
            style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
          >
            Sportovní oddíl
          </h2>
          <p
            className="text-on-surface-variant font-light leading-relaxed"
            style={{ fontSize: "clamp(15px, 1.1vw, 18px)" }}
          >
            Trampolíny Liberec je závodní sportovní oddíl s dlouholetou tradicí. Vychováváme závodníky všech úrovní — od začátečníků v přípravkách až po reprezentanty na mezinárodních soutěžích. Trénujeme v Trampolínovém centru Orionka v Liberci – Harcově, kde máme k dispozici profesionální závodní vybavení.
          </p>
        </ScrollReveal>
      </section>

      {/* ── HISTORIE — foto vlevo, text vpravo ── */}
      <section className="bg-surface-container-lowest py-section-padding-mobile md:py-section-padding-desktop">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/hero-liberec-4.jpg"
                  alt="Závodník na trampolíně"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <div className="space-y-6">
                <span className="inline-block font-label-bold text-label-bold uppercase tracking-widest text-brand-orange">
                  Od roku 2009
                </span>
                <h2
                  className="font-black uppercase tracking-tight leading-none text-border-dark"
                  style={{ fontSize: "clamp(24px, 3vw, 40px)" }}
                >
                  Naše historie
                </h2>
                <div className="space-y-4 text-on-surface-variant font-light leading-relaxed">
                  <p>
                    Oddíl byl založen v roce 2009 v Trampolínovém centru Orionka v Liberci – Harcově. Za více než patnáct let jsme vybudovali jedno z nejúspěšnějších trampolínových center v České republice.
                  </p>
                  <p>
                    Trénujeme na profesionálních závodních trampolínách, DMT dráze a vybavení pro akrobatiku. Naši závodníci se pravidelně účastní oblastních i národních závodů — Žákovský pohár, Český pohár a Mistrovství republiky.
                  </p>
                  <p>
                    Ti nejlepší jsou zařazeni do Sportovních středisek a reprezentují Českou republiku na mezinárodní úrovni včetně Mistrovství Evropy.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── ÚSPĚCHY — text vlevo, foto vpravo ── */}
      <section className="bg-white py-section-padding-mobile md:py-section-padding-desktop" id="uspechy">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal className="order-2 lg:order-1">
              <div className="space-y-6">
                <span className="inline-block font-label-bold text-label-bold uppercase tracking-widest text-brand-orange">
                  Výsledky
                </span>
                <h2
                  className="font-black uppercase tracking-tight leading-none text-border-dark"
                  style={{ fontSize: "clamp(24px, 3vw, 40px)" }}
                >
                  Naše úspěchy
                </h2>
                <div className="space-y-4 text-on-surface-variant font-light leading-relaxed">
                  <p>
                    Za roky existence jsme získali více než 300 medailí na závodech všech úrovní. Naši závodníci pravidelně obsazují přední místa na Mistrovství České republiky juniorů i seniorů.
                  </p>
                  <p>
                    Několik našich svěřenců reprezentovalo Českou republiku na Mistrovství Evropy a světových pohárech. Jsme hrdí na každého závodníka, který se posune o krok dál.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {[
                    { num: "300+", label: "Medailí celkem" },
                    { num: "10+", label: "Reprezentantů ČR" },
                  ].map(({ num, label }) => (
                    <div key={label} className="p-5 bg-surface-container-lowest border-t-2 border-brand-orange">
                      <p
                        className="font-black text-brand-orange uppercase tracking-tight mb-1"
                        style={{ fontSize: "clamp(20px, 2.5vw, 32px)", lineHeight: 1 }}
                      >
                        {num}
                      </p>
                      <p className="font-label-bold text-[10px] uppercase tracking-widest text-outline mt-1">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={120} className="order-1 lg:order-2">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/hero-liberec-2.jpg"
                  alt="Závodní tým Trampolíny Liberec"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── AKTIVITY ── */}
      <section className="py-section-padding-mobile md:py-section-padding-desktop bg-surface-container-lowest" id="aktivity">
        <div className="max-w-container-max mx-auto px-gutter">
          <ScrollReveal className="mb-16">
            <span className="inline-block text-brand-orange font-label-bold text-label-bold uppercase tracking-widest mb-6">
              Co nabízíme
            </span>
            <h2
              className="font-black uppercase tracking-tight leading-none text-border-dark"
              style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
            >
              Aktivity<br /><span className="font-medium">Trampolíny Liberec</span>
            </h2>
          </ScrollReveal>
          {services === null ? (
            <SectionError message="Aktivity se momentálně nepodařilo načíst. Zkuste obnovit stránku." />
          ) : services.length > 0 ? (
            <ScrollReveal delay={100}>
              <ServiceGrid services={services} />
            </ScrollReveal>
          ) : (
            <p className="text-on-surface-variant font-light">Aktivity brzy přibydou.</p>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-brand-navy-deep py-section-padding-mobile md:py-section-padding-desktop">
        <ScrollReveal className="max-w-container-max mx-auto px-gutter">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            <div>
              <span className="inline-block font-label-bold text-label-bold uppercase tracking-widest text-brand-orange mb-4">
                Přidej se k nám
              </span>
              <h2
                className="font-black uppercase tracking-tight leading-none text-white"
                style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
              >
                Chceš trénovat<br />s námi?
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link
                href="/jak-na-to"
                className="inline-flex items-center gap-3 bg-brand-orange text-white font-label-bold text-[11px] uppercase tracking-wider px-7 py-4 hover:bg-white hover:text-brand-navy-deep transition-all duration-300"
              >
                Jak se přihlásit
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/treneri"
                className="inline-flex items-center border border-white/30 text-white font-label-bold text-[11px] uppercase tracking-wider px-7 py-4 hover:border-white hover:bg-white/10 transition-all duration-300"
              >
                Naši trenéři
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
}
