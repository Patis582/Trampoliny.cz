import Image from "next/image";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { PatrmanHeroSlideshow } from "@/components/layout/PatrmanHeroSlideshow";
import { PatrmanHeroContent } from "@/components/layout/PatrmanHeroContent";
import { PatrmanGallery } from "@/components/layout/PatrmanGallery";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getServicesByBrand, getTestimonials, getNotableVisitors } from "@/sanity/lib/queries";
import { SectionError } from "@/components/ui/SectionError";
import { TestimonialsMarquee } from "@/components/patrman/TestimonialsMarquee";
import { NotableVisitorsGrid } from "@/components/patrman/NotableVisitorsGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trampolíny Patrman — Skákání pro celou rodinu",
  description:
    "Trampolínové centrum Miroslava Patrmana v Liberci od roku 2009. Otevřené skákání, kurzy rodič a dítě, oslavy narozenin, výlety pro školy a pronájem hal pro celou rodinu.",
  openGraph: {
    title: "Trampolíny Patrman — Skákání pro celou rodinu",
    description:
      "Trampolínové centrum Miroslava Patrmana v Liberci od roku 2009. Otevřené skákání, kurzy rodič a dítě, oslavy narozenin, výlety pro školy a pronájem hal pro celou rodinu.",
    url: "https://trampoliny.cz/trampoliny-patrman",
  },
  alternates: { canonical: "https://trampoliny.cz/trampoliny-patrman" },
};

const contacts = [
  { name: "Klára Patrmanová", bio: "Manažerka", phone: "+420 605 285 590", email: "kpatrmanova@gmail.com" },
];

export default async function TrampolinyPatrmanPage() {
  const [services, testimonials, notableVisitors] = await Promise.all([
    getServicesByBrand("patrman"),
    getTestimonials(),
    getNotableVisitors(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: "Trampolíny Patrman",
    url: "https://trampoliny.cz/trampoliny-patrman",
    description: "Trampolínové centrum Miroslava Patrmana v Liberci od roku 2009.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Liberec",
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

      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ height: "100svh", minHeight: 600 }}>
        <PatrmanHeroSlideshow />
        <PatrmanHeroContent />
      </section>

      {/* ── KDO JSME ── */}
      <section className="bg-white py-section-padding-mobile md:py-section-padding-desktop">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/hero-patrman-1.jpg"
                  alt="Trampolíny Patrman — trenér s dítětem"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <div className="space-y-6">
                <span className="inline-block font-label-bold text-label-bold uppercase tracking-widest text-on-tertiary-container">
                  Kdo jsme
                </span>
                <h2
                  className="font-black uppercase tracking-tight leading-none text-border-dark"
                  style={{ fontSize: "clamp(24px, 3vw, 40px)" }}
                >
                  Trampolíny Patrman
                </h2>
                <div className="space-y-4 text-on-surface-variant font-light leading-relaxed">
                  <p>
                    Miroslav Patrman začínal v roce 2009 s jednou halou a hrstkou nadšených dětí.
                    Dnes k nám každý týden přijde stovky dětí od jednoho roku výš — a většina
                    z nich se vrátí příští týden.
                  </p>
                  <p>
                    Nechceme závodníky — chceme děti, které se těší na trénink. Pohyb, sebevědomí
                    a kamarádi. Ve svém tempu, s trenérem, který to má rád stejně jako ty.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── FOTKY ── */}
      <section className="bg-surface-container-lowest py-section-padding-mobile md:py-section-padding-desktop overflow-hidden">
        <div className="max-w-container-max mx-auto px-gutter">
          <ScrollReveal className="mb-12 md:mb-16">
            <span className="inline-block font-label-bold text-label-bold uppercase tracking-widest text-on-tertiary-container mb-6">
              Atmosféra
            </span>
            <h2
              className="font-black uppercase tracking-tight leading-none text-border-dark"
              style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
            >
              Jak to u nás <span className="font-medium">vypadá</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <PatrmanGallery />
          </ScrollReveal>
        </div>
      </section>

      {/* ── NAŠE SLUŽBY ── */}
      <section className="py-section-padding-mobile md:py-section-padding-desktop bg-white" id="sluzby">
        <div className="max-w-container-max mx-auto px-gutter">
          <ScrollReveal className="mb-16">
            <span className="inline-block text-on-tertiary-container font-label-bold text-label-bold uppercase tracking-widest mb-6">
              Aktivity
            </span>
            <h2
              className="font-black uppercase tracking-tight leading-none text-border-dark"
              style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
            >
              Co u nás <span className="font-medium">najdeš</span>
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

      {/* ── RECENZE ── */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-section-padding-mobile md:py-section-padding-desktop bg-brand-navy-deep overflow-hidden">
          <ScrollReveal className="max-w-container-max mx-auto px-gutter mb-12">
            <span className="inline-block font-label-bold text-label-bold uppercase tracking-widest text-brand-green mb-4">
              Recenze
            </span>
            <h2
              className="font-black uppercase tracking-tight leading-none text-white"
              style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
            >
              Co o nás <span className="font-medium">říkají</span>
            </h2>
          </ScrollReveal>
          <TestimonialsMarquee testimonials={testimonials} />
        </section>
      )}

      {/* ── KDO NÁS NAVŠTÍVIL ── */}
      {notableVisitors && notableVisitors.length > 0 && (
        <section className="bg-brand-navy-deep pt-section-padding-mobile md:pt-section-padding-desktop">
          <div className="max-w-container-max mx-auto px-gutter mb-12">
            <ScrollReveal>
              <span className="inline-block font-label-bold text-label-bold uppercase tracking-widest text-brand-green mb-4">
                Slavní hosté
              </span>
              <h2
                className="font-black uppercase tracking-tight leading-none text-white"
                style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
              >
                Kdo nás <span className="font-medium">navštívil</span>
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={100}>
            <NotableVisitorsGrid visitors={notableVisitors} />
          </ScrollReveal>
        </section>
      )}

      {/* ── KONTAKT ── */}
      <section className="bg-brand-navy-deep py-section-padding-mobile md:py-section-padding-desktop" id="kontakt">
        <ScrollReveal className="max-w-container-max mx-auto px-gutter">
          <div className="mb-12">
            <span className="inline-block font-label-bold text-label-bold uppercase tracking-widest text-brand-green mb-4">
              Kontakt
            </span>
            <h2
              className="font-black uppercase tracking-tight leading-none text-white"
              style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
            >
              Napiš nebo zavolej
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            {contacts.map(({ name, bio, phone, email }) => (
              <div key={name} className="p-6 border-t-2 border-brand-green bg-white/5">
                <p className="font-black text-white uppercase tracking-tight text-sm">{name}</p>
                <p className="text-white/50 font-light text-sm mb-4">{bio}</p>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="block text-white/70 font-light hover:text-white transition-colors mb-1"
                >
                  {phone}
                </a>
                <a
                  href={`mailto:${email}`}
                  className="block text-white/50 font-light hover:text-white transition-colors text-sm"
                >
                  {email}
                </a>
              </div>
            ))}
          </div>
          <div className="flex gap-5 mt-10">
            <a href="https://www.instagram.com/trampolinypatrman/" target="_blank" rel="noopener noreferrer" className="font-label-bold text-[10px] uppercase tracking-widest text-white/40 hover:text-brand-green transition-colors">Instagram</a>
            <a href="https://www.facebook.com/trampolinypatrman/" target="_blank" rel="noopener noreferrer" className="font-label-bold text-[10px] uppercase tracking-widest text-white/40 hover:text-brand-green transition-colors">Facebook</a>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
}
