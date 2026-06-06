import { Footer } from '@/components/layout/Footer'
import { DokumentyTabs } from '@/components/dokumenty/DokumentyTabs'
import { getDocumentCategories } from '@/sanity/lib/queries'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dokumenty ke stažení',
  description:
    'Formuláře, souhlasy a dokumenty ke stažení pro Trampolíny Liberec, Trampolíny Patrman a trenéry.',
  openGraph: {
    title: 'Dokumenty ke stažení | Trampolíny.cz',
    description:
      'Formuláře, souhlasy a dokumenty ke stažení pro Trampolíny Liberec, Trampolíny Patrman a trenéry.',
    url: 'https://trampoliny.cz/dokumenty',
  },
  alternates: { canonical: 'https://trampoliny.cz/dokumenty' },
}

export default async function DokumentyPage() {
  const categories = await getDocumentCategories()

  return (
    <div className="font-body-md antialiased bg-border-dark min-h-screen">
      {/* ── HERO ── */}
      <section className="bg-border-dark pt-24 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-container-max mx-auto px-gutter">
          <span className="inline-block text-brand-orange font-label-bold text-label-bold uppercase tracking-widest mb-4">
            Právní & admin
          </span>
          <h1
            className="font-black uppercase tracking-tight leading-none text-white"
            style={{ fontSize: 'clamp(40px, 6vw, 80px)', letterSpacing: '-0.03em' }}
          >
            Dokumenty
          </h1>
          <p
            className="mt-6 text-white/50 font-light"
            style={{ fontSize: 'clamp(14px, 1.1vw, 17px)' }}
          >
            Formuláře a dokumenty ke stažení
          </p>
        </div>
      </section>

      {/* ── TABS + OBSAH ── */}
      <DokumentyTabs categories={categories} />

      <Footer />
    </div>
  )
}
