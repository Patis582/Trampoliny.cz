import { getPricingSections } from '@/sanity/lib/queries'
import { Footer } from '@/components/layout/Footer'
import { SectionError } from '@/components/ui/SectionError'
import { CenikClient } from './CenikClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Ceník vstupného a tréninků",
  description:
    "Přehled cen vstupů, členství a kurzů pro Trampolíny Liberec a Trampolíny Patrman v Liberci.",
  openGraph: {
    title: "Ceník vstupného a tréninků | Trampolíny.cz",
    description:
      "Přehled cen vstupů, členství a kurzů pro Trampolíny Liberec a Trampolíny Patrman v Liberci.",
    url: "https://trampoliny.cz/cenik",
  },
  alternates: { canonical: "https://trampoliny.cz/cenik" },
};

export default async function CenikPage() {
  const sections = await getPricingSections()

  return (
    <div className="font-body-md antialiased bg-white min-h-screen">
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

        </div>
      </section>

      {/* ── SEKCE ── */}
      {sections === null ? (
        <div className="max-w-container-max mx-auto px-gutter py-section-padding-mobile md:py-section-padding-desktop">
          <SectionError message="Ceník se momentálně nepodařilo načíst. Zkuste obnovit stránku." />
        </div>
      ) : sections.length === 0 ? (
        <div className="max-w-container-max mx-auto px-gutter py-section-padding-mobile md:py-section-padding-desktop">
          <p className="text-on-surface-variant font-light">Ceník brzy přibude.</p>
        </div>
      ) : (
        <CenikClient sections={sections} />
      )}

      <Footer />
    </div>
  )
}
