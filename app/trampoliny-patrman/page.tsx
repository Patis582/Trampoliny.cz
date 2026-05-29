import Image from "next/image";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { PatrmanHeroSlideshow } from "@/components/layout/PatrmanHeroSlideshow";
import { PatrmanGallery } from "@/components/layout/PatrmanGallery";
import { getServicesByBrand } from "@/sanity/lib/queries";
import { SectionError } from "@/components/ui/SectionError";


const contacts = [
  { name: "Kamila Brücklérová", phone: "+420 720 987 654", email: "kamilabrucklerova@gmail.com" },
  { name: "Klára Patrmanová", phone: "+420 731 123 456", email: "pripravky@trampoliny-liberec.cz" },
];

export default async function TrampolinyPatrmanPage() {
  const services = await getServicesByBrand("patrman");

  return (
    <div className="font-body-md antialiased bg-white min-h-screen">

      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative h-[85vh] flex items-center overflow-hidden pt-20 md:pt-0">
        <PatrmanHeroSlideshow />
        <div className="relative z-10 w-full max-w-container-max mx-auto px-gutter md:pt-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 lg:col-span-7">
            <div className="flex items-center gap-3 mb-4 md:mb-10">
              <div className="w-6 h-px bg-brand-green" />
              <span className="text-[10px] font-label-bold uppercase tracking-[0.4em] text-white/45">Trampolíny Patrman</span>
            </div>
            <h1 className="font-headline-lg-mobile md:font-headline-lg font-bold uppercase tracking-tight leading-none mb-6 md:mb-10">
              <span className="text-white block text-[36px] md:text-[44px]">Tábory,</span>
              <span className="text-white block text-[36px] md:text-[44px]">Oslavy</span>
              <span className="text-brand-green block text-[36px] md:text-[44px] mt-2">& Skákání</span>
            </h1>
            <p className="text-base text-white/75 mb-6 md:mb-12 max-w-sm font-light leading-relaxed">
              Kroužky, tábory, oslavy i volné skákání. Pro každého od 1 roku.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <a
                href="#sluzby"
                className="inline-flex justify-center items-center bg-brand-green text-border-dark font-label-bold text-label-bold px-7 py-3 uppercase tracking-wider hover:bg-white hover:text-border-dark transition-all duration-300 shadow-xl"
              >
                Naše služby
              </a>
              <a
                href="#kontakt"
                className="inline-flex justify-center items-center bg-white/10 text-white font-label-bold text-label-bold px-7 py-3 uppercase tracking-wider border border-white/30 backdrop-blur-md hover:bg-white hover:text-border-dark transition-all duration-300"
              >
                Kontakt
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── KDO JSME (foto vlevo, text vpravo) ───────────────────── */}
      <section className="bg-white">
        <div className="max-w-container-max mx-auto px-gutter pt-16 pb-section-padding-mobile md:py-section-padding-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src="/hero-patrman-1.jpg"
                alt="Trampolíny Patrman — trenér s dítětem"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-6">
              <div className="space-y-3">
                <span className="inline-block font-label-bold text-label-bold uppercase tracking-widest text-on-tertiary-container">Kdo jsme</span>
                <h2 className="font-headline-sm-mobile text-headline-sm-mobile md:font-headline-sm md:text-headline-sm text-border-dark uppercase tracking-tight">
                  Trampolíny Patrman
                </h2>
              </div>
              <div className="space-y-4 font-body-md text-body-md text-on-surface-variant font-light leading-relaxed">
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
          </div>
        </div>
      </section>

      {/* ── GALERIE ──────────────────────────────────────────────── */}
      <section className="bg-surface-container-lowest py-section-padding-mobile md:py-section-padding-desktop overflow-hidden">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="mb-8 md:mb-16">
            <span className="inline-block font-label-bold text-label-bold uppercase tracking-widest text-on-tertiary-container mb-3">Atmosféra</span>
            <h2 className="font-headline-md-mobile text-headline-md-mobile md:font-headline-md md:text-headline-md text-border-dark uppercase tracking-tight">
              Jak to u nás <span className="font-medium">vypadá</span>
            </h2>
          </div>

          <PatrmanGallery />
        </div>
      </section>

      {/* ── NAŠE SLUŽBY ──────────────────────────────────────────── */}
      <section
        className="py-section-padding-mobile md:py-section-padding-desktop bg-white"
        id="sluzby"
      >
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="mb-10 md:mb-24">
            <span className="inline-block text-on-tertiary-container font-label-bold text-label-bold uppercase tracking-widest mb-3">Aktivity</span>
            <h2 className="font-headline-md-mobile text-headline-md-mobile md:font-headline-md md:text-headline-md text-border-dark uppercase tracking-tight">
              Co u nás <span className="font-medium">najdeš</span>
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

      {/* ── CTA / KONTAKT ────────────────────────────────────────── */}
      <section className="bg-border-dark py-20" id="kontakt">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="mb-12">
            <span className="inline-block font-label-bold text-[11px] uppercase tracking-widest text-on-tertiary-container mb-4">Kontakt</span>
            <h2 className="font-headline-sm-mobile text-headline-sm-mobile md:font-headline-sm md:text-headline-sm text-white uppercase tracking-tight">
              Napiš nebo zavolej
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            {contacts.map(({ name, phone, email }) => (
              <div key={name} className="p-6 border border-white/10">
                <p className="font-headline-sm-mobile text-headline-sm-mobile md:font-headline-sm md:text-headline-sm text-white font-bold uppercase tracking-tight mb-4">{name}</p>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="block font-body-md text-white/70 hover:text-white transition-colors mb-1"
                >
                  {phone}
                </a>
                <a
                  href={`mailto:${email}`}
                  className="block font-body-md text-white/50 hover:text-white transition-colors text-sm"
                >
                  {email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
