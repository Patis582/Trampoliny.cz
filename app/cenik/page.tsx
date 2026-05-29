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
      <main>
        <div className="pt-24 md:pt-40 max-w-container-max mx-auto px-gutter">
          <div className="pb-8 mb-8 md:pb-10 md:mb-10 border-b border-surface-container-high">
            <span className="inline-block text-brand-orange font-label-bold text-label-bold uppercase tracking-widest mb-3">
              Vstupné & tréninky
            </span>
            <h1 className="font-headline-md-mobile text-headline-md-mobile md:font-headline-md md:text-headline-md text-border-dark uppercase tracking-tight mb-8 md:mb-10">
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
                    <span className="font-label-bold text-[10px] text-outline tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-label-bold text-[11px] uppercase tracking-widest text-border-dark group-hover:text-brand-orange transition-colors">
                      {section.title}
                    </span>
                  </a>
                ))}
              </nav>
            )}
          </div>
        </div>
        {sections === null ? (
          <div className="max-w-container-max mx-auto px-gutter pb-section-padding-mobile md:pb-section-padding-desktop">
            <SectionError message="Ceník se momentálně nepodařilo načíst. Zkuste obnovit stránku." />
          </div>
        ) : sections.length === 0 ? (
          <div className="max-w-container-max mx-auto px-gutter pb-section-padding-mobile md:pb-section-padding-desktop">
            <p className="font-body-md text-on-surface-variant font-light">Ceník brzy přibude.</p>
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
