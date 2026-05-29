import { getUpcomingEvents } from '@/sanity/lib/queries'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { AkceClient } from './AkceClient'
import { SectionError } from '@/components/ui/SectionError'

export default async function AkcePage() {
  const events = await getUpcomingEvents()

  return (
    <div className="font-body-md antialiased bg-white min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>
      <main className="pt-24 md:pt-40 pb-section-padding-mobile md:pb-section-padding-desktop">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="pb-8 mb-8 md:pb-10 md:mb-10 border-b border-surface-container-high">
            <span className="inline-block text-brand-orange font-label-bold text-label-bold uppercase tracking-widest mb-3">
              Program
            </span>
            <h1 className="font-headline-md-mobile text-headline-md-mobile md:font-headline-md md:text-headline-md text-border-dark uppercase tracking-tight">
              Akce
            </h1>
          </div>
          {events === null ? (
            <SectionError message="Akce se momentálně nepodařilo načíst. Zkuste obnovit stránku." />
          ) : (
            <AkceClient events={events} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
