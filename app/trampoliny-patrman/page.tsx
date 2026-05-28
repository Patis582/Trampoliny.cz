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
      <section className="relative h-[75vh] min-h-[560px] flex items-end overflow-hidden">
        <PatrmanHeroSlideshow />
        <div className="relative z-10 w-full max-w-container-max mx-auto px-gutter pb-16 pt-32">
          <div className="mb-6">
            <span className="inline-flex items-center font-label-bold text-[9px] md:text-[11px] uppercase tracking-widest bg-on-tertiary-container text-white px-2 py-0.5 md:px-3 md:py-1.5">
              Trampolíny Patrman
            </span>
          </div>
          <h1 className="font-headline-lg-mobile md:font-headline-md text-headline-lg-mobile md:text-headline-md text-white uppercase tracking-tight leading-none mb-6">
            Služby
          </h1>
          <p className="font-body-lg-mobile text-body-lg-mobile md:font-body-lg md:text-body-lg text-white/75 font-light max-w-xl leading-relaxed">
            Kroužky, tábory, oslavy i volné skákání. Pro každého od 1 roku.
          </p>
          <div className="mt-8">
            <a
              href="#sluzby"
              className="inline-flex items-center gap-2.5 bg-on-tertiary-container text-white font-label-bold uppercase tracking-widest px-7 py-4 text-[11px] hover:bg-white hover:text-border-dark transition-colors"
            >
              Naše služby
            </a>
          </div>
        </div>
      </section>

      {/* ── KDO JSME (foto vlevo, text vpravo) ───────────────────── */}
      <section className="bg-white">
        <div className="max-w-container-max mx-auto px-gutter py-section-padding-mobile md:py-section-padding-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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
              <span className="inline-block font-label-bold text-[11px] uppercase tracking-widest text-on-tertiary-container">Kdo jsme</span>
              <h2 className="font-headline-sm-mobile text-headline-sm-mobile md:font-headline-sm md:text-headline-sm text-border-dark uppercase tracking-tight">
                Trampolíny Patrman
              </h2>
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
          <div className="mb-16">
            <span className="inline-block font-label-bold text-[11px] uppercase tracking-widest text-on-tertiary-container mb-6">Atmosféra</span>
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
          <div className="mb-24">
            <span className="inline-block text-on-tertiary-container font-label-bold text-label-bold uppercase tracking-widest mb-6">Aktivity</span>
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
      <section className="bg-border-dark py-20">
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
