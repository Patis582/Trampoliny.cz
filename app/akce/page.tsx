import { getUpcomingEvents, getPastEvents } from '@/sanity/lib/queries'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { AkceClient } from './AkceClient'
import { SectionError } from '@/components/ui/SectionError'

export default async function AkcePage() {
  const [upcomingEvents, pastEvents] = await Promise.all([
    getUpcomingEvents(),
    getPastEvents(),
  ])

  return (
    <div className="font-body-md antialiased bg-white min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>

      {/* ── HERO ── */}
      <section className="bg-border-dark pt-24 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-container-max mx-auto px-gutter">
          <span className="inline-block text-brand-orange font-label-bold text-label-bold uppercase tracking-widest mb-4">
            Program
          </span>
          <h1
            className="font-black uppercase tracking-tight leading-none text-white mb-6"
            style={{ fontSize: "clamp(40px, 6vw, 80px)", letterSpacing: "-0.03em" }}
          >
            Akce
          </h1>
          <p
            className="text-white/55 font-light max-w-xl leading-relaxed"
            style={{ fontSize: "clamp(14px, 1.1vw, 17px)" }}
          >
            Nadcházející závody, tábory, workshopy a další akce od Trampolín Liberec a Trampolín Patrman.
          </p>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <main className="py-section-padding-mobile md:py-section-padding-desktop">
        <div className="max-w-container-max mx-auto px-gutter">
          {upcomingEvents === null && pastEvents === null ? (
            <SectionError message="Akce se momentálně nepodařilo načíst. Zkuste obnovit stránku." />
          ) : (
            <AkceClient
              events={upcomingEvents ?? []}
              pastEvents={pastEvents ?? []}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
