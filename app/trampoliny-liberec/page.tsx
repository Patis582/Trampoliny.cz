import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { LiberecHeroSlideshow } from "@/components/layout/LiberecHeroSlideshow";
import { LiberecHeroContent } from "@/components/layout/LiberecHeroContent";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getServicesByBrand } from "@/sanity/lib/queries";
import { SectionError } from "@/components/ui/SectionError";
import { EtickyKodex } from "@/components/liberec/EtickyKodex";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trampolíny Liberec — Závodní sportovní oddíl",
  description:
    "Závodní trampolínový oddíl s tradicí od roku 2009. 100+ závodníků, 300+ medailí, 10+ reprezentantů ČR. Trénujeme v TC Orionka v Liberci–Harcově.",
  openGraph: {
    title: "Trampolíny Liberec — Závodní sportovní oddíl",
    description:
      "Závodní trampolínový oddíl s tradicí od roku 2009. 100+ závodníků, 300+ medailí, 10+ reprezentantů ČR. Trénujeme v TC Orionka v Liberci–Harcově.",
    url: "https://trampoliny.cz/trampoliny-liberec",
  },
  alternates: { canonical: "https://trampoliny.cz/trampoliny-liberec" },
};

export default async function TrampolinyLiberecPage() {
  const services = await getServicesByBrand("liberec");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: "Trampolíny Liberec",
    url: "https://trampoliny.cz/trampoliny-liberec",
    description: "Závodní trampolínový oddíl s tradicí od roku 2009.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Harcovská 1209/3",
      addressLocality: "Liberec",
      addressRegion: "Liberecký kraj",
      addressCountry: "CZ",
    },
    sport: "Trampolining",
    foundingDate: "2009",
  };

  return (
    <div className="font-body-md antialiased bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ height: "100svh", minHeight: 600 }}>
        <LiberecHeroSlideshow />
        <LiberecHeroContent />
      </section>

      {/* ── STATS BAND ── */}
      <div className="bg-brand-navy-deep">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-3 divide-x divide-white/10">
            {[
              { label: "Členů", value: "200+" },
              { label: "Trenérů", value: "20+" },
              { label: "Trénujeme od roku", value: "1968" },
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
            Trampolíny Liberec je sportovní oddíl s dlouholetou tradicí. Vedeme děti k pohybu od 4 let věku. Od začátečníků v přípravkách až po reprezentanty na mezinárodních soutěžích. Trénujeme v Trampolínovém centru Orionka a v Trampolínové hale Nádraží, kde máme k dispozici profesionální závodní vybavení.
          </p>
        </ScrollReveal>
      </section>

      {/* ── HISTORIE — timeline ── */}
      <section className="bg-surface-container-lowest py-section-padding-mobile md:py-section-padding-desktop">
        <div className="max-w-container-max mx-auto px-gutter">
          {/* Heading */}
          <ScrollReveal className="mb-10 md:mb-14">
            <span className="inline-block font-label-bold text-label-bold uppercase tracking-widest text-brand-orange mb-4">
              Od roku 1967
            </span>
            <h2
              className="font-black uppercase tracking-tight leading-none text-border-dark"
              style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
            >
              Naše historie
            </h2>
          </ScrollReveal>

          {/* Timeline */}
          <div>
            {[
              {
                label: "1967",
                text: "Historie skoků na trampolíně v Liberci sahá až do roku 1967. U zrodu tohoto sportu stáli Petr Velechovský a Roman Chryštof, kteří položili základy libereckého oddílu. První tréninky probíhaly na pódiu tělocvičny TJ Lokomotiva Liberec v Jablonecké ulici. Během dalších desetiletí se oddíl několikrát stěhoval a využíval různá sportoviště po celém městě, včetně dnes již legendárních prostor bývalých Městských lázní.",
              },
              {
                label: "60+ let",
                text: "Za více než šedesát let své existence vychoval liberecký oddíl řadu mistrů České republiky i reprezentantů, kteří úspěšně reprezentovali Českou republiku na evropských i světových soutěžích. Liberec se tak stal jedním z tradičních center českých trampolín.",
              },
              {
                label: "2000",
                text: "Významným mezníkem se stal rok 2000, kdy se naplno trenérské práci začal věnovat Ing. Miroslav Patrman – bývalý mnohonásobný mistr České republiky ve skocích na trampolíně. Jeho cílem nikdy nebylo pouze vychovávat vrcholové sportovce — od začátku usiloval o to, aby trampolíny byly dostupné všem, bez ohledu na věk nebo výkonnost.",
              },
              {
                label: "Hala Nádraží",
                text: "Jedním z největších projektů Miroslava Patrmana bylo vybudování specializované trampolínové haly v prostorách železničního nádraží v Liberci. Z původně nevyužívaných prostor vzniklo moderní sportoviště, které již více než dvě desetiletí slouží dětem, sportovcům i široké veřejnosti.",
              },
              {
                label: "TC Orionka",
                text: "Dalším významným krokem bylo vybudování Trampolínového centra Orionka v libereckém Harcově. Z původních tenisových kurtů vzniklo moderní multifunkční sportovní centrum s závodními trampolínami, molitanovou jámou, double mini trampolínou, airtrack a gymnastickým zázemím. Dnes patří mezi nejlépe vybavená trampolínová centra v České republice.",
              },
            ].map(({ label, text }, i) => (
              <ScrollReveal key={label} delay={i * 60}>
                <div className="grid grid-cols-[80px_1fr] md:grid-cols-[160px_1fr] gap-6 md:gap-12 border-t border-surface-container-high py-7 md:py-8">
                  <span className="font-label-bold text-[10px] uppercase tracking-widest text-brand-orange pt-1 leading-tight">
                    {label}
                  </span>
                  <p className="text-on-surface-variant font-light leading-relaxed text-sm md:text-base">
                    {text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
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
                    Za roky existence jsme získali mnoho medailových umístění na závodech všech úrovní.
                  </p>
                  <p>
                    Naši závodníci pravidelně obsazují přední místa na Mistrovství ČR juniorů i seniorů.
                  </p>
                  <p>
                    Několik našich svěřenců reprezentovalo ČR na Mistrovství Evropy, Mistrovství světa i Světových pohárech.
                  </p>
                  <p>
                    2012 — Zita Frydrychová reprezentovala na OH Londýn.
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
                  src="/fotky-liberec/hero-liberec-1.jpg"
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

      {/* ── ETICKÝ KODEX ── */}
      <section className="py-section-padding-mobile md:py-section-padding-desktop bg-surface-container-lowest" id="kodex">
        <div className="max-w-container-max mx-auto px-gutter">
          <ScrollReveal className="mb-12">
            <span className="inline-block font-label-bold text-label-bold uppercase tracking-widest text-brand-orange mb-6">
              Pravidla oddílu
            </span>
            <h2
              className="font-black uppercase tracking-tight leading-none text-border-dark"
              style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
            >
              Etický <span className="font-medium">kodex</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <EtickyKodex />
          </ScrollReveal>
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
            <div className="flex flex-col gap-6 shrink-0 items-start">
              <div className="flex flex-col sm:flex-row gap-4">
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
              <div className="flex gap-5">
                <a href="https://www.instagram.com/trampoliny_liberec/" target="_blank" rel="noopener noreferrer" className="font-label-bold text-[10px] uppercase tracking-widest text-white/40 hover:text-brand-orange transition-colors">Instagram</a>
                <a href="https://www.facebook.com/people/Trampolíny-Liberec/100064273773002/" target="_blank" rel="noopener noreferrer" className="font-label-bold text-[10px] uppercase tracking-widest text-white/40 hover:text-brand-orange transition-colors">Facebook</a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
}
