import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
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
  const brandHref = isLiberec ? "/trampoliny-liberec" : "/trampoliny-patrman";

  // On light bg — orange or dark olive green (contrast-safe)
  const accentText = isLiberec ? "text-brand-orange" : "text-on-tertiary-container";
  // On dark bg — orange or bright green (both visible on navy)
  const heroAccent = isLiberec ? "text-brand-orange" : "text-brand-green";
  // Bars, borders, dividers
  const accentBar = isLiberec ? "bg-brand-orange" : "bg-brand-green";
  const accentBorder = isLiberec ? "border-brand-orange" : "border-brand-green";
  // CTA buttons
  const accentBtnBg = isLiberec ? "bg-brand-orange" : "bg-brand-green";
  const accentBtnText = isLiberec ? "text-white" : "text-border-dark";

  return (
    <div className="font-body-md antialiased bg-white min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden flex flex-col justify-end"
        style={{ height: "80vh", minHeight: 560 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          {service.heroImage?.url ? (
            <div className="absolute inset-0 animate-kenburns">
              <Image
                src={service.heroImage.url}
                alt={service.title}
                fill
                className="object-cover object-center"
                sizes="100vw"
                priority
              />
            </div>
          ) : (
            <div className="w-full h-full bg-brand-navy-deep" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-container-max mx-auto px-gutter pb-12 md:pb-20 w-full">
          <Link
            href={brandHref}
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors font-label-bold text-[9px] uppercase tracking-widest mb-8 group"
          >
            <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {brandLabel}
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <div className={`w-6 h-px ${accentBar}`} />
            <span className={`text-[10px] font-label-bold uppercase tracking-[0.4em] ${heroAccent}`}>
              {brandLabel}
            </span>
          </div>

          <h1
            className="font-black text-white uppercase tracking-tight leading-none mb-5"
            style={{ fontSize: "clamp(36px, 6vw, 80px)", letterSpacing: "-0.03em" }}
          >
            {service.title}
          </h1>
          <p
            className="text-white/60 font-light leading-relaxed max-w-xl"
            style={{ fontSize: "clamp(14px, 1.1vw, 17px)" }}
          >
            {service.description}
          </p>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      {(service.ageGroup || service.locationFull) && (
        <div className="bg-brand-navy-deep">
          <div className="max-w-container-max mx-auto px-gutter">
            <div className={`grid divide-x divide-white/10 ${service.ageGroup && service.locationFull ? "grid-cols-2" : "grid-cols-1"}`}>
              {service.ageGroup && (
                <div className="px-4 py-4 md:px-10 md:py-8 first:pl-0">
                  <p className="font-label-bold text-[10px] uppercase tracking-widest text-white/35 mb-1">Věková skupina</p>
                  <p className="font-black text-white uppercase tracking-tight" style={{ fontSize: "clamp(16px, 3vw, 36px)", lineHeight: 1 }}>
                    {service.ageGroup}
                  </p>
                </div>
              )}
              {service.locationFull && (
                <div className="px-4 py-4 md:px-10 md:py-8 first:pl-0">
                  <p className="font-label-bold text-[10px] uppercase tracking-widest text-white/35 mb-1">Lokalita</p>
                  <p className="font-black text-white uppercase tracking-tight" style={{ fontSize: "clamp(16px, 3vw, 36px)", lineHeight: 1 }}>
                    {service.locationFull.split(",")[0]}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-container-max mx-auto px-gutter py-section-padding-mobile md:py-section-padding-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">

          {/* Left — content */}
          <main className="lg:col-span-8 space-y-16">

            {/* Body */}
            {(service.bodyTitle || (service.body && service.body.length > 0)) && (
              <ScrollReveal>
                <div className="space-y-8">
                  {service.bodyTitle && (
                    <h2
                      className="font-black uppercase tracking-tight leading-none text-border-dark"
                      style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
                    >
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
                              <p className="text-on-surface-variant font-light leading-relaxed">{children}</p>
                            ),
                            h2: ({ children }) => (
                              <h2 className="font-black uppercase tracking-tight leading-none text-border-dark mt-10" style={{ fontSize: "clamp(18px, 2vw, 26px)" }}>{children}</h2>
                            ),
                            h3: ({ children }) => (
                              <h3 className="font-bold uppercase tracking-tight text-border-dark text-base">{children}</h3>
                            ),
                            blockquote: ({ children }) => (
                              <p className={`text-border-dark font-medium leading-relaxed border-l-4 ${accentBorder} pl-6`}>{children}</p>
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
              </ScrollReveal>
            )}

            {/* Jak to funguje */}
            {service.howItWorks && service.howItWorks.length > 0 && (
              <ScrollReveal>
                <div className={`h-0.5 ${accentBar} mb-16`} />
                <div className="space-y-8">
                  <h2
                    className="font-black uppercase tracking-tight leading-none text-border-dark"
                    style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
                  >
                    Jak to funguje
                  </h2>
                  <div className="space-y-3">
                    {service.howItWorks.map((text, i) => (
                      <div key={i} className="flex gap-5 p-5 md:p-6 bg-surface-container-lowest items-start">
                        <span
                          className={`shrink-0 font-black leading-none ${accentText}`}
                          style={{ fontSize: "clamp(20px, 2vw, 28px)", lineHeight: 1 }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="text-on-surface-variant font-light leading-relaxed pt-0.5">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Ceník / soubory */}
            {(service.pricingNote || (service.files && service.files.length > 0)) && (
              <ScrollReveal>
                <div className={`h-0.5 ${accentBar} mb-16`} />
                <div className="space-y-8">
                  <h2
                    className="font-black uppercase tracking-tight leading-none text-border-dark"
                    style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
                  >
                    Ceník a dokumenty
                  </h2>
                  {service.pricingNote && (
                    <p className="text-on-surface-variant font-light leading-relaxed">
                      {service.pricingNote}
                    </p>
                  )}
                  <Link
                    href="/cenik"
                    className={`inline-flex items-center gap-2 font-label-bold text-[11px] uppercase tracking-widest ${accentText} hover:opacity-70 transition-opacity`}
                  >
                    Celý ceník →
                  </Link>
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
                              ? `${accentBtnBg} ${accentBtnText} hover:bg-border-dark hover:text-white`
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
              </ScrollReveal>
            )}
          </main>

          {/* Right — sticky sidebar */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-4">
              <RegistrationSidebar
                service={service}
                accentBtnBg={accentBtnBg}
                accentBtnText={accentBtnText}
                accentBorder={accentBorder}
              />

              {(service.locationFull || service.registration?.type === "eos") && (
                <div className={`border-t-2 ${accentBorder} border border-surface-container-high divide-y divide-surface-container-high`}>
                  {service.locationFull && (
                    <div className="p-6 space-y-1">
                      <p className="font-label-bold text-[10px] uppercase tracking-widest text-outline mb-1">Lokalita</p>
                      <p className="text-border-dark font-medium">{service.locationFull}</p>
                    </div>
                  )}
                  {service.registration?.type === "eos" && (
                    <div className="p-6 space-y-1">
                      <p className="font-label-bold text-[10px] uppercase tracking-widest text-outline mb-1">Trenér</p>
                      <Link href="/treneri" className={`${accentText} font-medium hover:opacity-70 transition-opacity`}>
                        Naši trenéři →
                      </Link>
                    </div>
                  )}
                  {service.registration?.type === "eos" && (
                    <div className="p-6 space-y-1">
                      <p className="font-label-bold text-[10px] uppercase tracking-widest text-outline mb-1">Registrace</p>
                      <p className="text-on-surface-variant font-light text-sm mb-1">Systém EOS</p>
                      <Link href="/jak-na-to" className={`${accentText} font-medium hover:opacity-70 transition-opacity`}>
                        Jak na to →
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </aside>

        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <section className="bg-brand-navy-deep py-section-padding-mobile md:py-section-padding-desktop">
        <div className="max-w-container-max mx-auto px-gutter flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div>
            <span className={`inline-block font-label-bold text-label-bold uppercase tracking-widest mb-4 ${heroAccent}`}>
              {brandLabel}
            </span>
            <h2
              className="font-black uppercase tracking-tight leading-none text-white"
              style={{ fontSize: "clamp(24px, 3vw, 40px)" }}
            >
              Prohlédni si<br />všechny aktivity
            </h2>
          </div>
          <Link
            href="/#sluzby"
            className={`shrink-0 inline-flex items-center gap-3 ${accentBtnBg} ${accentBtnText} font-label-bold uppercase tracking-widest px-8 py-4 text-[11px] hover:bg-white hover:text-brand-navy-deep transition-colors`}
          >
            Všechny aktivity
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function RegistrationSidebar({
  service,
  accentBtnBg,
  accentBtnText,
  accentBorder,
}: {
  service: ServiceDetail;
  accentBtnBg: string;
  accentBtnText: string;
  accentBorder: string;
}) {
  const reg = service.registration;
  const description = reg?.ctaDescription ?? "Rádi poradíme a domluvíme termín.";
  const btnClass = `flex items-center justify-center ${accentBtnBg} ${accentBtnText} font-label-bold uppercase tracking-widest px-6 py-4 text-[11px] hover:bg-white hover:text-border-dark transition-colors w-full`;

  const heading = reg?.type === "form" || reg?.type === "eos" ? "Přihlas se" : "Ozvi se nám";

  return (
    <div className={`bg-brand-navy-deep text-white p-6 md:p-10 space-y-7 border-t-2 ${accentBorder}`}>
      <div>
        <span className="font-label-bold text-[10px] uppercase tracking-widest text-white/40 block mb-4">
          Máš zájem?
        </span>
        <h3
          className="font-black uppercase tracking-tight leading-none text-white"
          style={{ fontSize: "clamp(18px, 2vw, 26px)" }}
        >
          {heading}
        </h3>
      </div>
      <p className="text-white/60 font-light leading-relaxed">{description}</p>
      <div className="space-y-3">
        {reg?.type === "eos" && (
          <>
            <a href="https://eos.trampoliny.cz/" target="_blank" rel="noopener noreferrer" className={btnClass}>
              Přihlásit se →
            </a>
            {reg.email && (
              <a href={`mailto:${reg.email}`} className="text-center text-white/50 hover:text-white transition-colors font-label-bold text-[10px] uppercase tracking-widest">
                {reg.email}
              </a>
            )}
          </>
        )}
        {reg?.type === "form" && reg.formUrl && (
          <a href={reg.formUrl} target="_blank" rel="noopener noreferrer" className={btnClass}>
            Přihlásit se →
          </a>
        )}
        {reg?.type === "email" && reg.email && (
          <a href={`mailto:${reg.email}`} className={btnClass}>
            Napsat email
          </a>
        )}
        {reg?.type !== "form" && reg?.type !== "email" && reg?.type !== "eos" && reg?.email && (
          <a href={`mailto:${reg.email}`} className={btnClass}>
            Napsat email
          </a>
        )}
        {reg?.type !== "eos" && reg?.phone && (
          <a
            href={`tel:${reg.phone}`}
            className="flex items-center justify-center border border-white/15 text-white/80 font-label-bold uppercase tracking-widest px-6 py-4 text-[11px] hover:border-white/50 hover:text-white transition-colors w-full"
          >
            {reg.phone}
          </a>
        )}
      </div>
    </div>
  );
}
