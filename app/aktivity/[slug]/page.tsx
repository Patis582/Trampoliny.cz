import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { getServiceBySlug, getAllServiceSlugs, type ServiceDetail } from "@/sanity/lib/queries";

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function AktivitaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const isLiberec = service.brand === "liberec";
  const brandLabel = isLiberec ? "Trampolíny Liberec" : "Trampolíny Patrman";
  const badgeClass = isLiberec
    ? "bg-brand-orange text-white"
    : "bg-brand-green text-border-dark";

  return (
    <div className="font-body-md antialiased bg-white min-h-screen">

      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative h-[75vh] min-h-[560px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          {service.heroImage?.url ? (
            <Image
              src={service.heroImage.url}
              alt={service.title}
              fill
              className="object-cover object-center scale-105"
              sizes="100vw"
              priority
            />
          ) : (
            <div className="w-full h-full bg-brand-navy-deep" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-deep via-brand-navy-deep/50 to-brand-navy-deep/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-deep/70 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-container-max mx-auto px-gutter pb-16 pt-32">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/#sluzby" className="inline-flex items-center gap-2 text-white/50 hover:text-white/90 transition-colors font-label-bold text-[11px] uppercase tracking-widest group">
              <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Všechny aktivity
            </Link>
            <span className={`inline-flex items-center font-label-bold text-[11px] uppercase tracking-widest px-3 py-1.5 ${badgeClass}`}>
              {brandLabel}
            </span>
          </div>

          <h1 className="font-headline-lg-mobile md:font-headline-md text-headline-lg-mobile md:text-headline-md text-white uppercase tracking-tight leading-none mb-6">
            {service.title}
          </h1>

          <p className="font-body-lg text-body-lg text-white/75 font-light max-w-lg leading-relaxed">
            {service.description}
          </p>
        </div>
      </section>

      {/* ── STATS BAND ───────────────────────────────────────────── */}
      {(service.ageGroup || service.locationFull) && (
        <div className="bg-border-dark">
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="grid grid-cols-2 divide-x divide-white/10">
              {service.ageGroup && (
                <div className="px-8 py-7 first:pl-0">
                  <p className="font-label-bold text-[10px] uppercase tracking-widest text-white/40 mb-1.5">Věková skupina</p>
                  <p className="font-headline-sm text-headline-sm text-white uppercase tracking-tight">{service.ageGroup}</p>
                </div>
              )}
              {service.locationFull && (
                <div className="px-8 py-7 first:pl-0">
                  <p className="font-label-bold text-[10px] uppercase tracking-widest text-white/40 mb-1.5">Lokalita</p>
                  <p className="font-headline-sm text-headline-sm text-white uppercase tracking-tight">{service.locationFull.split(",")[0]}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT ─────────────────────────────────────────── */}
      <div className="max-w-container-max mx-auto px-gutter py-section-padding-mobile md:py-section-padding-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">

          {/* Left — content */}
          <main className="lg:col-span-8 space-y-20">

            {/* Body (portable text) + optional image */}
            {(service.bodyTitle || (service.body && service.body.length > 0)) && (
              <div className="space-y-8">
                {service.bodyTitle && (
                  <h2 className="font-headline-sm text-headline-sm text-border-dark uppercase tracking-tight">
                    {service.bodyTitle}
                  </h2>
                )}
                {service.body && service.body.length > 0 && (
                  <div className="space-y-5">
                    <PortableText
                      value={service.body}
                      components={{
                        block: {
                          normal: ({ children }) => (
                            <p className="font-body-md text-body-md text-on-surface-variant font-light leading-relaxed">{children}</p>
                          ),
                          h2: ({ children }) => (
                            <h2 className="font-headline-sm text-headline-sm text-border-dark uppercase tracking-tight">{children}</h2>
                          ),
                          h3: ({ children }) => (
                            <h3 className="font-headline-sm text-headline-sm text-border-dark uppercase tracking-tight text-base">{children}</h3>
                          ),
                          blockquote: ({ children }) => (
                            <p className="font-body-lg text-body-lg text-border-dark font-medium leading-relaxed border-l-4 border-brand-orange pl-6">{children}</p>
                          ),
                        },
                        marks: {
                          strong: ({ children }: { children: React.ReactNode }) => <strong className="font-semibold text-border-dark">{children}</strong>,
                          em: ({ children }: { children: React.ReactNode }) => <em>{children}</em>,
                        },
                      }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Jak to funguje */}
            {service.howItWorks && service.howItWorks.length > 0 && (
              <>
                <div className="h-px bg-surface-container-high" />
                <div className="space-y-8">
                  <h2 className="font-headline-sm text-headline-sm text-border-dark uppercase tracking-tight">
                    Jak to funguje
                  </h2>
                  <div className="space-y-4">
                    {service.howItWorks.map((text, i) => (
                      <div key={i} className="flex gap-5 p-6 bg-surface-container-lowest">
                        <span className="shrink-0 text-brand-orange mt-0.5">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span>
                        <p className="font-body-md text-body-md text-on-surface-variant font-light leading-relaxed">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Ceník / soubory */}
            {(service.pricingNote || (service.files && service.files.length > 0)) && (
              <>
                <div className="h-px bg-surface-container-high" />
                <div className="space-y-8">
                  <h2 className="font-headline-sm text-headline-sm text-border-dark uppercase tracking-tight">
                    Ceník a dokumenty
                  </h2>
                  {service.pricingNote && (
                    <p className="font-body-md text-body-md text-on-surface-variant font-light leading-relaxed">
                      {service.pricingNote}
                    </p>
                  )}
                  {service.files && service.files.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {service.files.map((file, i) => (
                        <a
                          key={i}
                          href={file.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2.5 font-label-bold uppercase tracking-widest px-7 py-4 text-[11px] transition-colors ${
                            file.style === "primary"
                              ? "bg-brand-orange text-white hover:bg-border-dark"
                              : "border border-border-dark text-border-dark hover:bg-border-dark hover:text-white"
                          }`}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {file.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

          </main>

          {/* Right — sticky sidebar */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-5">
              <RegistrationSidebar service={service} />

              {/* Info card */}
              <div className="border border-surface-container-high divide-y divide-surface-container-high">
                {service.locationFull && (
                  <div className="p-6 space-y-1">
                    <p className="font-label-bold text-[10px] uppercase tracking-widest text-outline">Lokalita</p>
                    <p className="font-body-md text-body-md text-border-dark font-medium">{service.locationFull}</p>
                  </div>
                )}
                <div className="p-6 space-y-1">
                  <p className="font-label-bold text-[10px] uppercase tracking-widest text-outline">Trenér</p>
                  <Link href="/treneri" className="font-body-md text-body-md text-brand-orange font-medium hover:text-border-dark transition-colors">
                    Naši trenéři →
                  </Link>
                </div>
                {service.registration?.type === "eos" && (
                  <div className="p-6 space-y-1">
                    <p className="font-label-bold text-[10px] uppercase tracking-widest text-outline">Registrace</p>
                    <p className="font-body-md text-body-md text-on-surface-variant font-light mb-1">Systém EOS</p>
                    <Link href="#" className="font-body-md text-body-md text-brand-orange font-medium hover:text-border-dark transition-colors">
                      Jak na to →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* ── BOTTOM CTA ───────────────────────────────────────────── */}
      <section className="bg-surface-container-lowest border-t border-surface-container-high py-20">
        <div className="max-w-container-max mx-auto px-gutter flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="inline-block text-brand-orange font-label-bold text-label-bold uppercase tracking-widest mb-4">
              Trampolíny Liberec & Patrman
            </span>
            <h2 className="font-headline-sm text-headline-sm text-border-dark uppercase tracking-tight">
              Prohlédni si všechny aktivity
            </h2>
          </div>
          <Link href="/#sluzby" className="shrink-0 inline-flex items-center gap-3 bg-border-dark text-white font-label-bold uppercase tracking-widest px-8 py-4 text-[11px] hover:bg-brand-orange transition-colors">
            Všechny aktivity
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function RegistrationSidebar({ service }: { service: ServiceDetail }) {
  const reg = service.registration;
  const description = reg?.ctaDescription ?? "Rádi poradíme a domluvíme termín.";

  if (reg?.type === "form" && reg.formUrl) {
    return (
      <div className="bg-border-dark text-white p-10 space-y-7">
        <div>
          <span className="font-label-bold text-[10px] uppercase tracking-widest text-white/40 block mb-4">Máš zájem?</span>
          <h3 className="font-headline-sm text-headline-sm text-white uppercase tracking-tight">Přihlas se</h3>
        </div>
        <p className="font-body-md text-body-md text-white/60 font-light leading-relaxed">{description}</p>
        <a href={reg.formUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-brand-orange text-white font-label-bold uppercase tracking-widest px-6 py-4 text-[11px] hover:bg-white hover:text-border-dark transition-colors w-full">
          Přihlásit se →
        </a>
      </div>
    );
  }

  if (reg?.type === "email" && reg.email) {
    return (
      <div className="bg-border-dark text-white p-10 space-y-7">
        <div>
          <span className="font-label-bold text-[10px] uppercase tracking-widest text-white/40 block mb-4">Máš zájem?</span>
          <h3 className="font-headline-sm text-headline-sm text-white uppercase tracking-tight">Ozvi se nám</h3>
        </div>
        <p className="font-body-md text-body-md text-white/60 font-light leading-relaxed">{description}</p>
        <a href={`mailto:${reg.email}`} className="flex items-center justify-center bg-brand-orange text-white font-label-bold uppercase tracking-widest px-6 py-4 text-[11px] hover:bg-white hover:text-border-dark transition-colors w-full">
          Napsat email
        </a>
      </div>
    );
  }

  // default: eos or no registration set
  return (
    <div className="bg-border-dark text-white p-10 space-y-7">
      <div>
        <span className="font-label-bold text-[10px] uppercase tracking-widest text-white/40 block mb-4">Máš zájem?</span>
        <h3 className="font-headline-sm text-headline-sm text-white uppercase tracking-tight">Ozvi se nám</h3>
      </div>
      <p className="font-body-md text-body-md text-white/60 font-light leading-relaxed">{description}</p>
      <div className="space-y-3">
        {reg?.email && (
          <a href={`mailto:${reg.email}`} className="flex items-center justify-center bg-brand-orange text-white font-label-bold uppercase tracking-widest px-6 py-4 text-[11px] hover:bg-white hover:text-border-dark transition-colors w-full">
            Napsat trenérovi
          </a>
        )}
        {reg?.phone && (
          <a href={`tel:${reg.phone}`} className="flex items-center justify-center border border-white/15 text-white/80 font-label-bold uppercase tracking-widest px-6 py-4 text-[11px] hover:border-white/50 hover:text-white transition-colors w-full">
            {reg.phone}
          </a>
        )}
      </div>
    </div>
  );
}
