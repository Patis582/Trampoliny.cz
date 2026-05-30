import Image from "next/image";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { PatrmanHeroSlideshow } from "@/components/layout/PatrmanHeroSlideshow";
import { PatrmanHeroContent } from "@/components/layout/PatrmanHeroContent";
import { PatrmanGallery } from "@/components/layout/PatrmanGallery";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getServicesByBrand } from "@/sanity/lib/queries";
import { SectionError } from "@/components/ui/SectionError";

const contacts = [
  { label: "Oslavy & pronájem", name: "Kamila Brücklérová", phone: "+420 720 987 654", email: "kamilabrucklerova@gmail.com" },
  { label: "Tábory & workshopy", name: "Klára Patrmanová", phone: "+420 731 123 456", email: "pripravky@trampoliny-liberec.cz" },
];

export default async function TrampolinyPatrmanPage() {
  const services = await getServicesByBrand("patrman");

  return (
    <div className="font-body-md antialiased bg-white min-h-screen">

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
                    Trampolíny Patrman provozuje Miroslav Patrman v Liberci od roku 2009.
                    Začínali jsme s jednou halou a hrstkou nadšených dětí — dnes každý týden
                    přivítáme stovky dětí od jednoho roku až po dospělé.
                  </p>
                  <p>
                    Naším cílem není vychovat závodníky, ale dát každému dítěti radost z pohybu,
                    sebevědomí a bezpečné prostředí kde se mohou posouvat svým vlastním tempem.
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
            {contacts.map(({ label, name, phone, email }) => (
              <div key={name} className="p-6 border-t-2 border-brand-green bg-white/5">
                <span className="block font-label-bold text-[10px] uppercase tracking-widest text-brand-green mb-3">{label}</span>
                <p className="font-black text-white uppercase tracking-tight text-sm mb-4">{name}</p>
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
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
}
