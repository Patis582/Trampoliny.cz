import Image from "next/image";
import Link from "next/link";
import { AnnouncementBar } from "@/components/announcements/AnnouncementBar";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { HeroSlideshow } from "@/components/layout/HeroSlideshow";
import { HeroScrollHint } from "@/components/layout/HeroScrollHint";
import { getServices, getAnnouncements, getUpcomingEvents } from "@/sanity/lib/queries";
import { EventCard } from "@/components/events/EventCard";
import { SectionError } from "@/components/ui/SectionError";

export default async function Home() {
  const [services, announcements, upcomingEvents] = await Promise.all([
    getServices(),
    getAnnouncements(),
    getUpcomingEvents(3),
  ]);

  return (
    <div className="font-body-md text-body-md antialiased selection:bg-primary-fixed selection:text-primary bg-background">
      {/* Announcement bar + Nav — fixed together as one block */}
      <div className="fixed top-0 left-0 w-full z-50">
        <AnnouncementBar announcements={announcements} />
        <Nav />
      </div>

      {/* Hero Section */}
      <section
        className="relative h-[90vh] flex items-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <HeroSlideshow />
        </div>
        <HeroScrollHint />
        <div className="relative z-10 w-full max-w-container-max mx-auto px-gutter pt-40 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 lg:col-span-7">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-6 h-px bg-brand-orange" />
              <span className="text-[10px] font-label-bold uppercase tracking-[0.4em] text-white/45">TC Orionka · Liberec</span>
            </div>
            <h1 className="font-headline-lg-mobile md:font-headline-lg font-bold uppercase tracking-tight leading-none mb-10">
              <span className="text-white block text-[48px] md:text-[64px]">Posouvej</span>
              <span className="text-white block text-[48px] md:text-[64px]">limity</span>
              <span className="text-brand-orange block text-[48px] md:text-[64px] mt-2">na maximum</span>
            </h1>
            <p className="text-base text-white/75 mb-12 max-w-sm font-light leading-relaxed">
              Závody, tábory, oslavy i parkour. Dvě haly v Liberci pro každého.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                href="/trampoliny-liberec"
                className="inline-flex justify-center items-center bg-brand-orange text-white font-label-bold text-label-bold px-10 py-4 uppercase tracking-wider hover:bg-white hover:text-brand-orange transition-all duration-300 shadow-xl"
              >
                Sportovní oddíl
              </Link>
              <Link
                href="#sluzby"
                className="inline-flex justify-center items-center bg-white/10 text-white font-label-bold text-label-bold px-10 py-4 uppercase tracking-wider border border-white/30 backdrop-blur-md hover:bg-white hover:text-brand-navy-deep transition-all duration-300 group"
              >
                Naše služby
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-3 h-5 w-5 text-brand-orange group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section
        className="py-section-padding-mobile md:py-section-padding-desktop relative bg-white"
        id="oddil"
      >
        <div className="max-w-container-max mx-auto px-gutter relative z-10">
          <div className="text-center mb-24">
            <span className="inline-block text-brand-orange font-label-bold text-label-bold uppercase tracking-widest mb-6">
              Kdo jsme
            </span>
            <h2 className="font-headline-md text-headline-md text-border-dark uppercase tracking-tight">
              Dvě značky, <br />
              <span className="font-medium">jedna vášeň</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start max-w-5xl mx-auto">
            {/* Liberec Brand */}
            <Link href="/trampoliny-liberec" className="flex flex-col items-center text-center group">
              <div className="w-64 h-64 mb-12 relative transition-transform duration-500 hover:scale-105">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7U758qwaUugU71tmbwfaKIAARZeBMBuq-2T1VMJYAjF4rvCdk7LyMZ1TKXyTHpTgg4LI86FIlipw3N146HDFziqxj5MoNcZauTlKV2yKG3A0JVft0rmllt5OGovqhhKkqTLa7uvKj-YbZKJ41KkImDD4SovkaaH1kTPcUBctY3hSuCn5TK9HnHunGXbv7JwSrVNm38tJJKgD4LVjDBdk_a6nW99OEfkiJr5tg8d8L65EBwE5IPJzu-lTcNhsrm9kgQYlUl8aY-YSc"
                  alt="Trampolíny Liberec Logo"
                  fill
                  sizes="256px"
                  className="object-contain transition-all duration-500"
                />
              </div>
              <h3 className="font-headline-sm text-headline-sm text-brand-orange uppercase mb-6 tracking-wide">
                Trampolíny Liberec
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md font-light leading-relaxed">
                Sportovní oddíl zaměřený na výkonnostní skákání a přípravu
                závodníků. Vychováváme talenty a posouváme limity na
                profesionálních závodních trampolínách.
              </p>
            </Link>
            {/* Patrman Brand */}
            <Link href="/trampoliny-patrman" className="flex flex-col items-center text-center group md:mt-16">
              <div className="w-64 h-64 mb-12 relative transition-transform duration-500 hover:scale-105">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgFmLni6SFyuxQhS39xDn1sakbDjfTLFWBfYb8WjBouof7u7EkfuiNyZBM3KZDb9lm1Oel5xwk7UH2HBhF3VPxVe7GzfNEGOStQCeB1eORNb7up3BzEgEvZRUZkCnyw6Y1yRlfMNXV0eqxh8LAp2y2f-wa2WxkPtTWVslRdE2IZj_eBYbRgR0_oQHD2F3821xifowQcQGjIxEPGPzStgAR1JsBHETuqCeFarxq6YatgyspvuTCtQUorPV3m7xyM0dpLZMK2rSOFDy3"
                  alt="Trampolíny Patrman Logo"
                  fill
                  sizes="256px"
                  className="object-contain transition-all duration-500"
                />
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-tertiary-container uppercase mb-6 tracking-wide">
                Trampolíny Patrman
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md font-light leading-relaxed">
                Komerční skákání, kurzy pro veřejnost a pronájem haly. Zábava a
                pohyb pro všechny věkové kategorie pod dohledem zkušených
                trenérů.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        className="py-section-padding-mobile md:py-section-padding-desktop bg-surface-container-lowest"
        id="sluzby"
      >
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="mb-24">
            <span className="inline-block text-brand-green font-label-bold text-label-bold uppercase tracking-widest mb-6">
              Aktivity
            </span>
            <h2 className="font-headline-md text-headline-md text-border-dark uppercase tracking-tight">
              Co u nás <span className="font-medium">najdeš</span>
            </h2>
          </div>
          {services === null ? (
            <SectionError message="Aktivity se momentálně nepodařilo načíst. Zkuste obnovit stránku." />
          ) : (
            <ServiceGrid services={services} />
          )}
        </div>
      </section>

      {/* Upcoming Events Section */}
      {(upcomingEvents === null || upcomingEvents.length > 0) && (
        <section className="py-section-padding-mobile md:py-section-padding-desktop bg-white" id="akce">
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
              <div>
                <span className="inline-block text-brand-orange font-label-bold text-label-bold uppercase tracking-widest mb-6">
                  Program
                </span>
                <h2 className="font-headline-md text-headline-md text-border-dark uppercase tracking-tight">
                  Nadcházející akce
                </h2>
              </div>
              <Link
                href="/akce"
                className="font-label-bold text-[11px] uppercase tracking-widest text-outline hover:text-brand-orange transition-colors shrink-0"
              >
                Zobrazit vše →
              </Link>
            </div>
            {upcomingEvents === null ? (
              <SectionError message="Akce se momentálně nepodařilo načíst. Zkuste obnovit stránku." />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map((event) => (
                  <EventCard key={event._id} event={event} compact />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Location & Contact Section */}
      <section
        className="py-section-padding-mobile md:py-section-padding-desktop bg-white"
        id="kontakt"
      >
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="mb-16">
            <span className="inline-block text-brand-orange font-label-bold text-label-bold uppercase tracking-widest mb-6">
              Lokality
            </span>
            <h2 className="font-headline-md text-headline-md text-border-dark uppercase tracking-tight">
              Kde nás najdete
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* TC Orionka */}
            <div className="flex flex-col gap-6">
              <div className="border-l-4 border-brand-orange pl-6">
                <span className="font-label-bold text-[11px] uppercase tracking-widest text-brand-orange mb-2 block">Trampolíny Liberec</span>
                <h3 className="font-headline-sm text-headline-sm text-border-dark uppercase mb-1">
                  Trampolínové centrum Orionka
                </h3>
                <p className="font-body-md text-on-surface-variant font-light">
                  Jizerská ul., Liberec – Harcov
                </p>
                <p className="font-body-md text-outline text-sm mt-1">
                  Závodní oddíl, přípravky, parkour a otevřené hodiny (Po 16–18)
                </p>
              </div>
              <div className="overflow-hidden border border-surface-container-high">
                <iframe
                  src="https://maps.google.com/maps?q=Trampolínové+centrum+Orionka,+Liberec&z=15&output=embed"
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="TC Orionka mapa"
                />
              </div>
            </div>
            {/* Hala Nádraží */}
            <div className="flex flex-col gap-6">
              <div className="border-l-4 border-brand-green pl-6">
                <span className="font-label-bold text-[11px] uppercase tracking-widest text-on-tertiary-container mb-2 block">Trampolíny Patrman</span>
                <h3 className="font-headline-sm text-headline-sm text-border-dark uppercase mb-1">
                  Trampolínová hala Nádraží
                </h3>
                <p className="font-body-md text-on-surface-variant font-light">
                  Nádraží ČD č.p. 435, Liberec (mezi nástupištěm 1 a 3)
                </p>
                <p className="font-body-md text-outline text-sm mt-1">
                  Oslavy, tábory, Open Gym a volné skákání (So 10–13)
                </p>
              </div>
              <div className="overflow-hidden border border-surface-container-high">
                <iframe
                  src="https://maps.google.com/maps?q=Nádraží+ČD+Liberec&z=15&output=embed"
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Hala Nádraží mapa"
                />
              </div>
            </div>
          </div>

          {/* Kontaktní údaje */}
          <div className="pt-16 border-t border-surface-container-high space-y-8">
            <h3 className="font-headline-sm text-headline-sm text-border-dark uppercase tracking-tight">Kontakt</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Závodní oddíl", name: "Miroslav Patrman", bio: "Hlavní trenér závodního oddílu", phone: "+420 604 245 971", email: "mirapatrman@gmail.com" },
                { label: "Přípravky & kroužky", name: "Klára Patrmanová", bio: "Vedoucí přípravek a kroužků", phone: "+420 731 123 456", email: "pripravky@trampoliny-liberec.cz" },
                { label: "Oslavy & pronájem", name: "Kamila Brücklérová", bio: "Organizace oslav a pronájem haly", phone: "+420 720 987 654", email: "kamilabrucklerova@gmail.com" },
                { label: "Tábory & workshopy", name: "Michaela Křiklavová", bio: "Příměstské tábory a workshopy", phone: "+420 608 456 789", email: "tabory@trampoliny-patrman.cz" },
              ].map(({ label, name, bio, phone, email }) => (
                <div key={label} className="flex flex-col gap-1 p-5 bg-surface-container-lowest">
                  <span className="font-label-bold text-[10px] uppercase tracking-widest text-outline mb-2">{label}</span>
                  <p className="font-headline-sm text-border-dark font-bold text-sm uppercase tracking-tight">{name}</p>
                  <p className="font-body-md text-on-surface-variant font-light text-sm mb-2">{bio}</p>
                  <a href={`tel:${phone.replace(/\s/g, "")}`} className="font-body-md text-body-md text-border-dark font-medium hover:text-brand-orange transition-colors">{phone}</a>
                  <a href={`mailto:${email}`} className="font-body-md text-body-md text-on-surface-variant font-light hover:text-brand-orange transition-colors">{email}</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

