import { getPricingSections } from '@/sanity/lib/queries'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { PricingSection } from '@/components/pricing/PricingSection'
import { SectionError } from '@/components/ui/SectionError'

export default async function CenikPage() {
  const sections = await getPricingSections()

  return (
    <div className="font-body-md antialiased bg-white min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50 [transform:translateZ(0)]">
        <Nav />
      </div>
      <main>
        <div className="pt-40 pb-8 max-w-container-max mx-auto px-gutter">
          <span className="inline-block text-brand-orange font-label-bold text-label-bold uppercase tracking-widest mb-6">
            Vstupné & tréninky
          </span>
          <h1 className="font-headline-md-mobile text-headline-md-mobile md:font-headline-md md:text-headline-md text-border-dark uppercase tracking-tight">
            Ceník
          </h1>
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
            <PricingSection key={section._id} section={section} alt={i % 2 === 1} />
          ))
        )}
      </main>
      <Footer />
    </div>
  )
}
