import { getPricingSections } from '@/sanity/lib/queries'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { PricingSection } from '@/components/pricing/PricingSection'
import { SectionError } from '@/components/ui/SectionError'

export default async function CenikPage() {
  const sections = await getPricingSections()

  return (
    <div className="font-body-md antialiased bg-white min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>

      {/* ── HERO ── */}
      <section className="bg-border-dark pt-24 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-container-max mx-auto px-gutter">
          <span className="inline-block text-brand-orange font-label-bold text-label-bold uppercase tracking-widest mb-4">
            Vstupné & tréninky
          </span>
          <h1
            className="font-black uppercase tracking-tight leading-none text-white mb-10"
            style={{ fontSize: "clamp(40px, 6vw, 80px)", letterSpacing: "-0.03em" }}
          >
            Ceník
          </h1>

          {Array.isArray(sections) && sections.length > 0 && (
            <nav className="flex flex-wrap gap-x-8 gap-y-3">
              {sections.map((section, i) => (
                <a
                  key={section._id}
                  href={`#${section.slug}`}
                  className="flex items-baseline gap-2 group"
                >
                  <span className="font-label-bold text-[10px] text-white/25 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-label-bold text-[11px] uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                    {section.title}
                  </span>
                </a>
              ))}
            </nav>
          )}
        </div>
      </section>

      {/* ── SEKCE ── */}
      <main>
        {sections === null ? (
          <div className="max-w-container-max mx-auto px-gutter py-section-padding-mobile md:py-section-padding-desktop">
            <SectionError message="Ceník se momentálně nepodařilo načíst. Zkuste obnovit stránku." />
          </div>
        ) : sections.length === 0 ? (
          <div className="max-w-container-max mx-auto px-gutter py-section-padding-mobile md:py-section-padding-desktop">
            <p className="text-on-surface-variant font-light">Ceník brzy přibude.</p>
          </div>
        ) : (
          sections.map((section, i) => (
            <PricingSection key={section._id} section={section} alt={i % 2 === 1} first={i === 0} />
          ))
        )}
      </main>

      <Footer />
    </div>
  )
}
