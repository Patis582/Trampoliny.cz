import Image from "next/image";
import Link from "next/link";
import { AnnouncementBar } from "@/components/announcements/AnnouncementBar";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { HomeCinematicHero } from "@/components/layout/HomeCinematicHero";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getServices, getAnnouncements, getUpcomingEvents } from "@/sanity/lib/queries";
import type { Event } from "@/sanity/lib/queries";
import { SectionError } from "@/components/ui/SectionError";

export default async function Home() {
  const [services, announcements, upcomingEvents] = await Promise.all([
    getServices(),
    getAnnouncements(),
    getUpcomingEvents(3),
  ]);

  return (
    <div className="font-body-md text-body-md antialiased selection:bg-primary-fixed selection:text-primary bg-background">
      {/* Fixed header */}
      <div className="fixed top-0 left-0 w-full z-50">
        <AnnouncementBar announcements={announcements} />
        <Nav />
      </div>

      {/* ── Hero ── */}
      <HomeCinematicHero />

      {/* ── Brands section ── */}
      <section id="oddil" className="bg-white py-section-padding-mobile md:py-section-padding-desktop">
        {/* Header — centered */}
        <ScrollReveal className="max-w-container-max mx-auto px-gutter text-center mb-20 md:mb-28">
          <span className="inline-block text-brand-orange font-label-bold text-label-bold uppercase tracking-widest mb-6">
            Kdo jsme
          </span>
          <h2
            className="font-black uppercase tracking-tight leading-none text-border-dark"
            style={{ fontSize: "clamp(40px, 6vw, 80px)" }}
          >
            Dvě značky,
            <br />
            <span className="font-medium">jedna vášeň</span>
          </h2>
        </ScrollReveal>

        {/* Brand cards */}
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12 lg:gap-20">

            {/* Liberec */}
            <ScrollReveal>
              <Link
                href="/trampoliny-liberec"
                className="group flex flex-col items-center text-center cursor-pointer"
              >
                <div className="relative w-full max-w-xs h-52 mb-8 opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-300">
                  <Image
                    src="/logo-liberec.jpg"
                    alt="Trampolíny Liberec Logo"
                    fill
                    sizes="(max-width: 768px) 80vw, 40vw"
                    className="object-contain"
                  />
                </div>
                <span className="font-label-bold text-label-bold uppercase tracking-widest text-outline mb-3">
                  Závodní oddíl
                </span>
                <h3
                  className="font-black uppercase tracking-tight leading-none text-brand-orange mb-5 group-hover:opacity-80 transition-opacity duration-300"
                  style={{ fontSize: "clamp(18px, 2vw, 26px)" }}
                >
                  Trampolíny Liberec
                </h3>
                <p className="text-on-surface-variant font-light leading-relaxed max-w-sm">
                  Sportovní oddíl zaměřený na výkonnostní skákání a přípravu
                  závodníků. Vychováváme talenty a posouváme limity na
                  profesionálních závodních trampolínách.
                </p>
              </Link>
            </ScrollReveal>

            {/* Patrman — offset down on desktop */}
            <ScrollReveal delay={150} className="md:pt-16">
              <Link
                href="/trampoliny-patrman"
                className="group flex flex-col items-center text-center cursor-pointer"
              >
                <div className="relative w-full max-w-xs h-52 mb-8 opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-300">
                  <Image
                    src="/logo-patrman.jpg"
                    alt="Trampolíny Patrman Logo"
                    fill
                    sizes="(max-width: 768px) 80vw, 40vw"
                    className="object-contain"
                  />
                </div>
                <span className="font-label-bold text-label-bold uppercase tracking-widest text-outline mb-3">
                  Tábory &amp; Aktivity
                </span>
                <h3
                  className="font-black uppercase tracking-tight leading-none text-on-tertiary-container mb-5 group-hover:opacity-80 transition-opacity duration-300"
                  style={{ fontSize: "clamp(18px, 2vw, 26px)" }}
                >
                  Trampolíny Patrman
                </h3>
                <p className="text-on-surface-variant font-light leading-relaxed max-w-sm">
                  Komerční skákání, kurzy pro veřejnost a pronájem haly. Zábava a
                  pohyb pro všechny věkové kategorie pod dohledem zkušených
                  trenérů.
                </p>
              </Link>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section
        className="py-section-padding-mobile md:py-section-padding-desktop bg-surface-container-lowest"
        id="sluzby"
      >
        <div className="max-w-container-max mx-auto px-gutter">
          <ScrollReveal className="mb-16">
            <span className="inline-block text-brand-green font-label-bold text-label-bold uppercase tracking-widest mb-6">
              Aktivity
            </span>
            <h2
              className="font-black uppercase tracking-tight leading-none"
              style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
            >
              Co u nás <span className="font-medium">najdeš</span>
            </h2>
          </ScrollReveal>
          {services === null ? (
            <SectionError message="Aktivity se momentálně nepodařilo načíst. Zkuste obnovit stránku." />
          ) : (
            <ScrollReveal delay={100}>
              <ServiceGrid services={services} />
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* ── Events ── */}
      {(upcomingEvents === null || upcomingEvents.length > 0) && (
        <section className="bg-brand-navy-deep py-section-padding-mobile md:py-section-padding-desktop" id="akce">
          <div className="max-w-container-max mx-auto px-gutter">
            <ScrollReveal>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
                <div>
                  <span className="inline-block text-brand-orange font-label-bold text-label-bold uppercase tracking-widest mb-6">
                    Program
                  </span>
                  <h2
                    className="font-black uppercase tracking-tight leading-none text-white"
                    style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
                  >
                    Nadcházející akce
                  </h2>
                </div>
                <Link
                  href="/akce"
                  className="hidden sm:inline font-label-bold text-[11px] uppercase tracking-widest text-white/40 hover:text-white transition-colors shrink-0"
                >
                  Zobrazit vše →
                </Link>
              </div>

              {upcomingEvents === null ? (
                <SectionError message="Akce se momentálně nepodařilo načíst. Zkuste obnovit stránku." />
              ) : (
                <div className="divide-y divide-white/10">
                  {upcomingEvents.map((event) => (
                    <EventRow key={event._id} event={event} />
                  ))}
                </div>
              )}

              <div className="mt-10 sm:hidden">
                <Link
                  href="/akce"
                  className="inline-flex items-center gap-2 font-label-bold text-[11px] uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                >
                  Zobrazit vše →
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ── Locations & Contact ── */}
      <section
        className="py-section-padding-mobile md:py-section-padding-desktop bg-white"
        id="kontakt"
      >
        <div className="max-w-container-max mx-auto px-gutter">
          <ScrollReveal className="mb-16">
            <span className="inline-block text-brand-orange font-label-bold text-label-bold uppercase tracking-widest mb-6">
              Lokality
            </span>
            <h2
              className="font-black uppercase tracking-tight leading-none"
              style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
            >
              Kde nás najdete
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <ScrollReveal>
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-border-dark uppercase mb-1">
                    Trampolínové centrum Orionka
                  </h3>
                  <p className="font-body-md text-on-surface-variant font-light">
                    Jizerská ul., Liberec – Harcov
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
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-border-dark uppercase mb-1">
                    Trampolínová hala Nádraží
                  </h3>
                  <p className="font-body-md text-on-surface-variant font-light">
                    Nádraží ČD č.p. 435, Liberec (mezi nástupištěm 1 a 3)
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
            </ScrollReveal>
          </div>

          {/* Contact cards */}
          <ScrollReveal>
            <div className="pt-16 border-t border-surface-container-high space-y-8">
              <h3 className="font-headline-sm text-headline-sm text-border-dark uppercase tracking-tight">Kontakt</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Závodní oddíl", name: "Miroslav Patrman", bio: "Hlavní trenér závodního oddílu", phone: "+420 604 245 971", email: "mirapatrman@gmail.com", brand: "liberec" },
                  { label: "Přípravky & kroužky", name: "Klára Patrmanová", bio: "Vedoucí přípravek a kroužků", phone: "+420 731 123 456", email: "pripravky@trampoliny-liberec.cz", brand: "liberec" },
                  { label: "Oslavy & pronájem", name: "Kamila Brücklérová", bio: "Organizace oslav a pronájem haly", phone: "+420 720 987 654", email: "kamilabrucklerova@gmail.com", brand: "patrman" },
                  { label: "Tábory & workshopy", name: "Michaela Křiklavová", bio: "Příměstské tábory a workshopy", phone: "+420 608 456 789", email: "tabory@trampoliny-patrman.cz", brand: "patrman" },
                ].map(({ label, name, bio, phone, email, brand }) => (
                  <div
                    key={label}
                    className="flex flex-col gap-1 p-5 bg-surface-container-lowest"
                  >
                    <span className="font-label-bold text-[10px] uppercase tracking-widest text-outline mb-2">{label}</span>
                    <p className="font-headline-sm text-border-dark font-bold text-sm uppercase tracking-tight">{name}</p>
                    <p className="font-body-md text-on-surface-variant font-light text-sm mb-2">{bio}</p>
                    <a href={`tel:${phone.replace(/\s/g, "")}`} className="font-body-md text-body-md text-border-dark font-medium hover:text-brand-orange transition-colors">{phone}</a>
                    <a href={`mailto:${email}`} className="font-body-md text-body-md text-on-surface-variant font-light hover:text-brand-orange transition-colors">{email}</a>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}

const TYPE_LABELS: Record<string, string> = {
  závod: "Závod", tábor: "Tábor", kemp: "Kemp", workshop: "Workshop", jiné: "Jiné",
}

const TYPE_COLORS: Record<string, string> = {
  závod: "text-brand-orange", tábor: "text-on-tertiary-container", kemp: "text-on-tertiary-container",
  workshop: "text-brand-navy-deep", jiné: "text-outline",
}

function EventRow({ event }: { event: Event }) {
  const label = event.type === "jiné" && event.customType ? event.customType : (TYPE_LABELS[event.type] ?? event.type)
  const typeColor = TYPE_COLORS[event.type] ?? "text-outline"
  const date = new Date(event.date).toLocaleDateString("cs-CZ", { day: "numeric", month: "long" })

  return (
    <Link
      href={`/akce/${event.slug}`}
      className="group flex items-center gap-4 md:gap-8 py-5 px-4 -mx-4 hover:bg-white/[0.07] transition-colors"
    >
      <span className="font-label-bold text-[10px] uppercase tracking-widest text-white/35 shrink-0 w-24 hidden sm:block">
        {date}
      </span>
      <div className="flex-1 min-w-0">
        <span className={`font-label-bold text-[9px] uppercase tracking-widest block mb-1 ${typeColor}`}>
          {label}
        </span>
        <h3
          className="font-black text-white uppercase tracking-tight leading-tight group-hover:text-white/80 transition-colors truncate"
          style={{ fontSize: "clamp(14px, 1.5vw, 18px)" }}
        >
          {event.title}
        </h3>
        <span className="font-label-bold text-[10px] uppercase tracking-widest text-white/35 sm:hidden block mt-1">
          {date}
        </span>
      </div>
      {event.registration?.isOpen && (
        <span className="font-label-bold text-[9px] uppercase tracking-widest text-brand-orange shrink-0 hidden md:block">
          ● Přihlášky
        </span>
      )}
      <svg className="w-4 h-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </Link>
  )
}
