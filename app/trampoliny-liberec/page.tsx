import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { LiberecHeroSlideshow } from "@/components/layout/LiberecHeroSlideshow";
import { getServicesByBrand } from "@/sanity/lib/queries";
import { SectionError } from "@/components/ui/SectionError";

export default async function TrampolinyLiberecPage() {
  const services = await getServicesByBrand("liberec");

  return (
    <div className="font-body-md antialiased bg-white min-h-screen">

      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative h-[75vh] min-h-[560px] flex items-end overflow-hidden">
        <LiberecHeroSlideshow />
        <div className="relative z-10 w-full max-w-container-max mx-auto px-gutter pb-16 pt-32">
          <div className="mb-6">
            <span className="inline-flex items-center font-label-bold text-[9px] md:text-[11px] uppercase tracking-widest bg-brand-orange text-white px-2 py-0.5 md:px-3 md:py-1.5">
              Trampolíny Liberec
            </span>
          </div>
          <h1 className="font-headline-lg-mobile md:font-headline-md text-headline-lg-mobile md:text-headline-md text-white uppercase tracking-tight leading-none mb-6">
            Závodní oddíl<br />& Kroužky
          </h1>
          <p className="font-body-lg-mobile text-body-lg-mobile md:font-body-lg md:text-body-lg text-white/75 font-light max-w-xl leading-relaxed">
            Výkonnostní trénink, závody a přípravky pro děti i dospělé v TC Orionka v Liberci.
          </p>
        </div>
      </section>

      {/* ── STATS BAND ───────────────────────────────────────────── */}
      <div className="bg-border-dark">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-3 divide-x divide-white/10">
            {[
              { label: "Závodníků", value: "100+" },
              { label: "Medailí", value: "300+" },
              { label: "Trénujeme od roku", value: "2009" },
            ].map(({ label, value }) => (
              <div key={label} className="px-4 py-5 md:px-8 md:py-7 first:pl-0">
                <p className="font-label-bold text-[10px] uppercase tracking-widest text-white/40 mb-1.5">{label}</p>
                <p className="font-headline-sm-mobile text-headline-sm-mobile md:font-headline-sm md:text-headline-sm text-white uppercase tracking-tight">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── INTRO ────────────────────────────────────────────────── */}
      <section className="py-section-padding-mobile md:py-section-padding-desktop bg-white">
        <div className="max-w-3xl mx-auto px-gutter text-center">
          <span className="inline-block font-label-bold text-[11px] uppercase tracking-widest text-brand-orange mb-6">Kdo jsme</span>
          <h2 className="font-headline-md-mobile text-headline-md-mobile md:font-headline-md md:text-headline-md text-border-dark uppercase tracking-tight mb-10">
            Sportovní oddíl
          </h2>
          <p className="font-body-lg-mobile text-body-lg-mobile md:font-body-lg md:text-body-lg text-on-surface-variant font-light leading-relaxed">
            Trampolíny Liberec je závodní sportovní oddíl s dlouholetou tradicí. Vychováváme závodníky všech úrovní — od začátečníků v přípravkách až po reprezentanty na mezinárodních soutěžích. Trénujeme v Trampolínovém centru Orionka v Liberci – Harcově, kde máme k dispozici profesionální závodní vybavení.
          </p>
        </div>
      </section>

      {/* ── HISTORIE (foto vlevo, text vpravo) ───────────────────── */}
      <section className="bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-gutter py-section-padding-mobile md:py-section-padding-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src="/hero-liberec-4.jpg"
                alt="Závodník na trampolíně"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-6">
              <span className="inline-block font-label-bold text-[11px] uppercase tracking-widest text-brand-orange">Od roku 2009</span>
              <h2 className="font-headline-sm-mobile text-headline-sm-mobile md:font-headline-sm md:text-headline-sm text-border-dark uppercase tracking-tight">
                Naše historie
              </h2>
              <div className="space-y-4 font-body-md text-body-md text-on-surface-variant font-light leading-relaxed">
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
          </div>
        </div>
      </section>

      {/* ── ÚSPĚCHY (text vlevo, foto vpravo) ────────────────────── */}
      <section className="bg-white">
        <div className="max-w-container-max mx-auto px-gutter py-section-padding-mobile md:py-section-padding-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <span className="inline-block font-label-bold text-[11px] uppercase tracking-widest text-brand-orange">Výsledky</span>
              <h2 className="font-headline-sm-mobile text-headline-sm-mobile md:font-headline-sm md:text-headline-sm text-border-dark uppercase tracking-tight">
                Naše úspěchy
              </h2>
              <div className="space-y-4 font-body-md text-body-md text-on-surface-variant font-light leading-relaxed">
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
                  <div key={label} className="p-5 bg-surface-container-lowest">
                    <p className="font-headline-sm-mobile text-headline-sm-mobile md:font-headline-sm md:text-headline-sm text-brand-orange uppercase tracking-tight">{num}</p>
                    <p className="font-label-bold text-[10px] uppercase tracking-widest text-outline mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[3/2] overflow-hidden order-1 lg:order-2">
              <Image
                src="/hero-liberec-1.jpg"
                alt="Závodní tým Trampolíny Liberec"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── AKTIVITY ZE SANITY ───────────────────────────────────── */}
      <section className="py-section-padding-mobile md:py-section-padding-desktop bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="mb-24">
            <span className="inline-block text-brand-orange font-label-bold text-label-bold uppercase tracking-widest mb-6">Co nabízíme</span>
            <h2 className="font-headline-md-mobile text-headline-md-mobile md:font-headline-md md:text-headline-md text-border-dark uppercase tracking-tight">
              Aktivity<br /><span className="font-medium">Trampolíny Liberec</span>
            </h2>
          </div>
          {services === null ? (
            <SectionError message="Aktivity se momentálně nepodařilo načíst. Zkuste obnovit stránku." />
          ) : services.length > 0 ? (
            <ServiceGrid services={services} />
          ) : (
            <p className="font-body-md text-on-surface-variant font-light">Aktivity brzy přibydou.</p>
          )}
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────── */}
      <section className="bg-border-dark py-20">
        <div className="max-w-container-max mx-auto px-gutter flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="inline-block font-label-bold text-[11px] uppercase tracking-widest text-brand-orange mb-4">Přidej se k nám</span>
            <h2 className="font-headline-sm-mobile text-headline-sm-mobile md:font-headline-sm md:text-headline-sm text-white uppercase tracking-tight">
              Chceš trénovat s námi?
            </h2>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Link
              href="/jak-na-eos"
              className="inline-flex items-center gap-2.5 bg-brand-orange text-white font-label-bold uppercase tracking-widest px-7 py-4 text-[11px] hover:bg-white hover:text-border-dark transition-colors"
            >
              Jak se přihlásit přes EOS
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/treneri"
              className="inline-flex items-center gap-2.5 border border-white/30 text-white font-label-bold uppercase tracking-widest px-7 py-4 text-[11px] hover:border-white hover:bg-white/10 transition-colors"
            >
              Naši trenéři
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
