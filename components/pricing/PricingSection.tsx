import { PricingSection as PricingSectionType } from '@/sanity/lib/queries'
import { PricingTable } from './PricingTable'

export function PricingSection({ section, alt }: { section: PricingSectionType; alt?: boolean }) {
  return (
    <section className={alt ? 'bg-surface-container-lowest' : 'bg-white'}>
      <div className="max-w-container-max mx-auto px-gutter py-section-padding-mobile md:py-section-padding-desktop">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-12">
          <div>
            <h2 className="font-headline-md-mobile text-headline-md-mobile md:font-headline-md md:text-headline-md text-border-dark uppercase tracking-tight mb-3">
              {section.title}
            </h2>
            {section.validFrom && (
              <span className="inline-block font-label-bold text-[10px] uppercase tracking-widest text-white bg-border-dark px-3 py-1">
                {section.validFrom}
              </span>
            )}
          </div>
          {section.pdfUrl && (
            <a
              href={section.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 shrink-0 border border-border-dark text-border-dark font-label-bold text-[11px] uppercase tracking-widest px-5 py-3 hover:bg-border-dark hover:text-white transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {section.pdfLabel ?? 'Stáhnout PDF'}
            </a>
          )}
        </div>

        <div className="space-y-10">
          {section.groups.map((group) => (
            <PricingTable key={group._key} group={group} />
          ))}
        </div>

        {section.note && (
          <p className="mt-10 font-body-md text-body-md text-outline font-light italic border-t border-surface-container-high pt-6">
            {section.note}
          </p>
        )}
      </div>
    </section>
  )
}
