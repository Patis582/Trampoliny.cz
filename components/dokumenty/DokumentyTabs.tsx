'use client'

import { useState } from 'react'
import type { DocumentCategory } from '@/sanity/lib/queries'

type Brand = 'liberec' | 'patrman' | 'treneri'

const TAB_CONFIG: {
  brand: Brand
  label: string
  activeClass: string
  accentBarClass: string
  downloadClass: string
}[] = [
  {
    brand: 'liberec',
    label: 'Trampolíny Liberec',
    activeClass: 'bg-brand-orange text-white',
    accentBarClass: 'bg-brand-orange',
    downloadClass: 'text-brand-orange',
  },
  {
    brand: 'patrman',
    label: 'Trampolíny Patrman',
    activeClass: 'bg-brand-green text-border-dark',
    accentBarClass: 'bg-brand-green',
    downloadClass: 'text-brand-green',
  },
  {
    brand: 'treneri',
    label: 'Trenéři',
    activeClass: 'bg-brand-navy-deep text-white border border-white/30',
    accentBarClass: 'bg-white/20',
    downloadClass: 'text-white/60',
  },
]

function PdfIcon() {
  return (
    <svg
      className="w-4 h-4 text-white/40 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    </svg>
  )
}

export function DokumentyTabs({ categories }: { categories: DocumentCategory[] }) {
  const firstNonEmpty =
    TAB_CONFIG.find((t) => categories.some((c) => c.brand === t.brand))?.brand ?? 'patrman'
  const [active, setActive] = useState<Brand>(firstNonEmpty)

  const activeConfig = TAB_CONFIG.find((t) => t.brand === active)!
  const activeCategories = categories.filter((c) => c.brand === active)

  return (
    <div className="max-w-container-max mx-auto px-gutter py-section-padding-mobile md:py-section-padding-desktop">
      {/* Taby */}
      <div className="flex flex-wrap gap-2 mb-12 md:mb-16">
        {TAB_CONFIG.map(({ brand, label, activeClass }) => (
          <button
            key={brand}
            onClick={() => setActive(brand)}
            className={`font-label-bold text-[11px] uppercase tracking-widest px-5 py-3 transition-colors cursor-pointer ${
              active === brand
                ? activeClass
                : 'border border-white/20 text-white/60 hover:text-white hover:border-white/40'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Obsah aktivního tabu */}
      {activeCategories.length === 0 ? (
        <p className="text-white/40 font-light text-sm">
          Žádné dokumenty zatím nejsou k dispozici.
        </p>
      ) : (
        <div className="space-y-12">
          {activeCategories.map((cat) => (
            <div key={cat._id}>
              {/* Kategorie nadpis + dělítko */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-label-bold text-[11px] uppercase tracking-widest text-white/50 shrink-0">
                  {cat.title}
                </span>
                <div className={`flex-1 h-px ${activeConfig.accentBarClass}`} />
              </div>

              {/* Dokumenty */}
              {cat.documents.length === 0 ? (
                <p className="text-white/30 text-sm font-light">Žádné soubory.</p>
              ) : (
                <div className="divide-y divide-white/5">
                  {cat.documents.map((doc) => (
                    <div
                      key={doc._id}
                      className="flex items-center justify-between gap-6 py-4 hover:bg-white/5 px-2 -mx-2 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <PdfIcon />
                        <span className="text-white/80 font-light text-sm leading-snug truncate">
                          {doc.title}
                        </span>
                      </div>
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`shrink-0 font-label-bold text-[10px] uppercase tracking-widest transition-opacity hover:opacity-70 ${activeConfig.downloadClass}`}
                      >
                        Stáhnout →
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
