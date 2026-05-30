import { PricingSection as PricingSectionType } from '@/sanity/lib/queries'
import { PricingTable } from './PricingTable'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function PricingSection({ section, alt, first }: { section: PricingSectionType; alt?: boolean; first?: boolean }) {
  return (
    <section
      id={section.slug}
      className={`scroll-mt-20 ${first ? '' : 'border-t-2 border-surface-container-high'} ${alt ? 'bg-surface-container-lowest' : 'bg-white'}`}
    >
      <div className="max-w-container-max mx-auto px-gutter py-10 md:py-16">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8 md:mb-10">
            <div>
              <h2
                className="font-black uppercase tracking-tight leading-none text-border-dark mb-3"
                style={{ fontSize: "clamp(22px, 3vw, 36px)" }}
              >
                {section.title}
              </h2>
              {section.validFrom && (
                <span className="inline-block font-label-bold text-[10px] uppercase tracking-widest text-white bg-border-dark px-2.5 py-0.5">
                  {section.validFrom}
                </span>
              )}
            </div>
            {section.pdfUrl && (
              <a
                href={section.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 shrink-0 border border-border-dark text-border-dark font-label-bold text-[10px] uppercase tracking-widest px-4 py-2 hover:bg-border-dark hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {section.pdfLabel ?? 'Stáhnout PDF'}
              </a>
            )}
          </div>

          <div className="space-y-8">
            {section.groups.map((group) => (
              <PricingTable key={group._key} group={group} />
            ))}
          </div>

          {section.note && (
            <p className="mt-8 font-light text-outline leading-relaxed border-t border-surface-container-high pt-4 text-sm">
              {section.note}
            </p>
          )}
        </ScrollReveal>
      </div>
    </section>
  )
}
