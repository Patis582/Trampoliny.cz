import Image from "next/image";
import Link from "next/link";
import { AnnouncementBar } from "@/components/announcements/AnnouncementBar";
import { getServices, getAnnouncements, type Service } from "@/sanity/lib/queries";

export default async function Home() {
  const [services, announcements] = await Promise.all([
    getServices(),
    getAnnouncements(),
  ]);

  return (
    <div className="font-body-md text-body-md antialiased selection:bg-primary-fixed selection:text-primary bg-background">
      {/* Announcement bar + Nav — fixed together as one block */}
      <div className="fixed top-0 left-0 w-full z-50">
        <AnnouncementBar announcements={announcements} />
      <nav className="bg-white/95 backdrop-blur-sm border-b border-surface-container-high transition-all duration-300">
        <div className="max-w-container-max mx-auto px-gutter py-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="font-headline-sm text-headline-sm font-bold text-border-dark hover:text-brand-orange transition-colors duration-200 tracking-tight"
            >
              Trampolíny Liberec
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-12">
            <Link
              href="#oddil"
              className="font-label-bold text-label-bold text-outline hover:text-border-dark transition-colors duration-200 uppercase"
            >
              Oddíl
            </Link>
            <Link
              href="#sluzby"
              className="font-label-bold text-label-bold text-outline hover:text-border-dark transition-colors duration-200 uppercase"
            >
              Služby
            </Link>
            <Link
              href="#rozvrh"
              className="font-label-bold text-label-bold text-outline hover:text-border-dark transition-colors duration-200 uppercase"
            >
              Rozvrh
            </Link>
            <Link
              href="#cenik"
              className="font-label-bold text-label-bold text-outline hover:text-border-dark transition-colors duration-200 uppercase"
            >
              Ceník
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              href="#kontakt"
              className="hidden md:inline-flex bg-transparent text-border-dark font-label-bold text-label-bold px-8 py-3 uppercase tracking-wider minimal-border-dark hover:bg-border-dark hover:text-white transition-all duration-300"
            >
              Kontakt
            </Link>
            <button className="md:hidden p-2 text-border-dark">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      </div>

      {/* Hero Section */}
      <section
        className="relative h-[90vh] flex items-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoplPr8NPor55b3xNOqNskGO7PaNgNtYp9JavwhLsvH5TPDr2AEhL-_2E8z4AgAN2iicAj5H5YrOk0RrUQRuzchhCQyP4G5LOSkAil61MIJ_tH55FctGrVkAoIm7J7pTKNUmpnh4OUZTae5gf8FWuJOMkNVg3p91cqyvnY9coD2dV5_uEDGIyQ2dKjRb0hzgEoDsLxf0onDwscyN9lgrYjKxdtTMdFEn7VASXUXskwDnXp6Nu6vB0IJzx9D48EWmwXiiKZUYYsl4cp"
            alt="Hall photo background"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-deep/85 via-brand-navy-deep/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-navy-deep/30" />
        </div>
        <div className="relative z-10 w-full max-w-container-max mx-auto px-gutter pt-40 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 lg:col-span-7">
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white uppercase mb-12 tracking-tight drop-shadow-lg">
              Vyskoč si <br />
              <span className="text-brand-orange drop-shadow-none">výš.</span>
            </h1>
            <p className="font-body-lg text-body-lg text-white/90 mb-16 max-w-xl font-light drop-shadow-md">
              Závodní oddíl, parkour, příměstské tábory i volné skákání pro
              veřejnost. Dvě haly v Liberci — Orionka a Nádraží.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                href="#oddil"
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
            <div className="flex flex-col items-center text-center group">
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
            </div>
            {/* Patrman Brand */}
            <div className="flex flex-col items-center text-center group md:mt-16">
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
            </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {services.map((s, i) => (
              <ServiceCard
                key={s._id}
                num={String(i + 1).padStart(2, "0")}
                title={s.title}
                desc={s.description}
                accent={s.accent}
                brand={s.brand}
                img={s.image?.url}
              />
            ))}
          </div>
        </div>
      </section>

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* TC Orionka */}
            <div className="flex flex-col gap-6">
              <div className="border-l-4 border-border-dark pl-6">
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
              <div className="border-l-4 border-border-dark pl-6">
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
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full pt-24 pb-12 px-gutter max-w-container-max mx-auto bg-white border-t border-surface-container-high">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
          <div className="md:col-span-4">
            <Link
              href="#"
              className="font-headline-sm text-headline-sm font-bold text-border-dark tracking-tight"
            >
              Trampolíny <span className="text-brand-orange">Liberec</span>
            </Link>
            <p className="mt-6 font-body-md text-outline font-light max-w-xs">
              Závodní oddíl i veřejné skákání v Liberci. Dvě haly — Orionka v
              Harcově a Nádraží v centru města.
            </p>
          </div>
          <div className="md:col-span-2">
            <h4 className="font-label-bold text-label-bold text-border-dark uppercase mb-6">
              Menu
            </h4>
            <div className="flex flex-col gap-4">
              {(
                [
                  ["Oddíl", "#oddil"],
                  ["Služby", "#sluzby"],
                  ["Rozvrh", "#rozvrh"],
                  ["Ceník", "#cenik"],
                ] as [string, string][]
              ).map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="text-outline hover:text-brand-orange transition-colors uppercase text-xs font-bold tracking-widest"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:col-span-3">
            <h4 className="font-label-bold text-label-bold text-border-dark uppercase mb-6">
              Právní informace
            </h4>
            <div className="flex flex-col gap-4">
              {[
                "Ochrana soukromí",
                "Všeobecné podmínky",
                "Mapa stránek",
              ].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-outline hover:text-border-dark transition-colors uppercase text-xs font-bold tracking-widest"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:col-span-3">
            <h4 className="font-label-bold text-label-bold text-border-dark uppercase mb-6">
              Kontakt
            </h4>
            <p className="text-outline text-xs font-bold tracking-widest uppercase mb-2">
              Telefon
            </p>
            <p className="text-border-dark font-medium mb-6">
              +420 604 245 971
            </p>
            <p className="text-outline text-xs font-bold tracking-widest uppercase mb-2">
              Email
            </p>
            <p className="text-border-dark font-medium">
              mirapatrman@gmail.com
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-surface-container-low text-outline text-xs font-light">
          <div>© 2024 Trampolíny Patrman. Všechna práva vyhrazena.</div>
          <div className="mt-4 md:mt-0 flex gap-8">
            <Link href="#" className="hover:text-brand-orange transition-colors">
              Facebook
            </Link>
            <Link href="#" className="hover:text-brand-green transition-colors">
              Instagram
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

type AccentColor = "orange" | "green" | "navy";

function ServiceCard({
  num,
  title,
  desc,
  accent,
  img,
  brand,
}: {
  num: string;
  title: string;
  desc: string;
  accent: AccentColor;
  img?: string;
  brand?: "liberec" | "patrman";
}) {
  const accentClasses: Record<
    AccentColor,
    { num: string; title: string; bar: string }
  > = {
    orange: {
      num: "text-brand-orange/20 group-hover:text-brand-orange",
      title: "group-hover:text-brand-orange",
      bar: "bg-brand-orange",
    },
    green: {
      num: "text-brand-green/20 group-hover:text-brand-green",
      title: "group-hover:text-brand-green",
      bar: "bg-brand-green",
    },
    navy: {
      num: "text-border-dark/20 group-hover:text-border-dark",
      title: "",
      bar: "bg-border-dark",
    },
  };

  const cls = accentClasses[accent];

  return (
    <div className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-video overflow-hidden relative bg-surface-container">
        {img && (
          <Image
            src={img}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
      </div>
      <div className="p-8">
        <div className="flex items-start justify-between mb-4">
          <span className={`block font-headline-lg text-4xl transition-colors ${cls.num}`}>
            {num}
          </span>
          {brand === "liberec" && (
            <span className="font-label-bold text-[10px] uppercase tracking-widest bg-brand-orange text-white px-2 py-1 shrink-0">
              Trampolíny Liberec
            </span>
          )}
          {brand === "patrman" && (
            <span className="font-label-bold text-[10px] uppercase tracking-widest bg-brand-green text-border-dark px-2 py-1 shrink-0">
              Trampolíny Patrman
            </span>
          )}
        </div>
        <h3
          className={`font-headline-sm text-headline-sm text-border-dark uppercase mb-4 transition-colors ${cls.title}`}
        >
          {title}
        </h3>
        <p className="font-body-md text-on-surface-variant font-light mb-8">
          {desc}
        </p>
        <div
          className={`w-12 h-1 group-hover:w-full transition-all duration-500 ${cls.bar}`}
        />
      </div>
    </div>
  );
}
