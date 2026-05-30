import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { getEventBySlug, getAllEventSlugs, type EventType } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

export async function generateStaticParams() {
  const slugs = await getAllEventSlugs()
  return slugs.map((slug) => ({ slug }))
}

const TYPE_LABELS: Record<EventType, string> = {
  'závod': 'Závod',
  'tábor': 'Tábor',
  'kemp': 'Kemp',
  'workshop': 'Workshop',
  'jiné': 'Jiné',
}

const TYPE_ACCENT: Record<EventType, { badge: string; bar: string; border: string; text: string }> = {
  'závod':    { badge: 'bg-brand-orange text-white',      bar: 'bg-brand-orange',      border: 'border-brand-orange',      text: 'text-brand-orange' },
  'tábor':    { badge: 'bg-brand-green text-border-dark', bar: 'bg-brand-green',        border: 'border-brand-green',        text: 'text-on-tertiary-container' },
  'kemp':     { badge: 'bg-brand-green text-border-dark', bar: 'bg-brand-green',        border: 'border-brand-green',        text: 'text-on-tertiary-container' },
  'workshop': { badge: 'bg-brand-navy-deep text-white',   bar: 'bg-brand-navy-deep',    border: 'border-brand-navy-deep',    text: 'text-brand-navy-deep' },
  'jiné':     { badge: 'bg-surface-container-high text-outline', bar: 'bg-outline',     border: 'border-outline',            text: 'text-outline' },
}

function formatDate(dateStr: string, endDateStr?: string): string {
  const date = new Date(dateStr)
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }
  if (!endDateStr) return date.toLocaleDateString('cs-CZ', opts)
  const end = new Date(endDateStr)
  if (date.toDateString() === end.toDateString()) return date.toLocaleDateString('cs-CZ', opts)
  return `${date.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long' })} – ${end.toLocaleDateString('cs-CZ', opts)}`
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = await getEventBySlug(slug)
  if (!event) notFound()

  const typeLabel = event.type === 'jiné' && event.customType ? event.customType : TYPE_LABELS[event.type]
  const accent = TYPE_ACCENT[event.type]
  const heroImageUrl = event.image ? urlFor(event.image).width(1920).height(1080).url() : null

  return (
    <div className="font-body-md antialiased bg-white min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden flex flex-col justify-end"
        style={{ height: "80vh", minHeight: 560 }}
      >
        <div className="absolute inset-0">
          {heroImageUrl ? (
            <Image
              src={heroImageUrl}
              alt={event.title}
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
          ) : (
            <div className="w-full h-full bg-brand-navy-deep" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-container-max mx-auto px-gutter pb-12 md:pb-20">
          <Link
            href="/akce"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors font-label-bold text-[9px] uppercase tracking-widest mb-8 group"
          >
            <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Všechny akce
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <div className={`w-6 h-px ${accent.bar}`} />
            <span className="text-[10px] font-label-bold uppercase tracking-[0.4em] text-white/50">
              {formatDate(event.date, event.endDate)}
            </span>
          </div>

          <span className={`inline-flex items-center font-label-bold text-[11px] uppercase tracking-widest px-3 py-1.5 mb-5 ${accent.badge}`}>
            {typeLabel}
          </span>

          <h1
            className="font-black text-white uppercase tracking-tight leading-none"
            style={{ fontSize: "clamp(36px, 6vw, 80px)", letterSpacing: "-0.03em" }}
          >
            {event.title}
          </h1>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-2xl mx-auto px-gutter py-section-padding-mobile md:py-section-padding-desktop">

        {event.description && event.description.length > 0 && (
          <ScrollReveal>
            <div className="space-y-5 mb-12">
              <PortableText
                value={event.description}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="text-on-surface-variant font-light leading-relaxed" style={{ fontSize: "clamp(15px, 1.1vw, 17px)" }}>{children}</p>
                    ),
                    h2: ({ children }) => (
                      <h2 className="font-black uppercase tracking-tight leading-none text-border-dark mt-10" style={{ fontSize: "clamp(18px, 2vw, 26px)" }}>{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="font-bold uppercase tracking-tight text-border-dark text-base">{children}</h3>
                    ),
                    blockquote: ({ children }) => (
                      <p className={`text-border-dark font-medium leading-relaxed border-l-4 ${accent.border} pl-6`}>{children}</p>
                    ),
                  },
                  list: {
                    bullet: ({ children }) => (
                      <ul className="list-disc pl-6 space-y-1 text-on-surface-variant font-light leading-relaxed">{children}</ul>
                    ),
                    number: ({ children }) => (
                      <ol className="list-decimal pl-6 space-y-1 text-on-surface-variant font-light leading-relaxed">{children}</ol>
                    ),
                  },
                  listItem: {
                    bullet: ({ children }) => <li>{children}</li>,
                    number: ({ children }) => <li>{children}</li>,
                  },
                  marks: {
                    strong: ({ children }: { children: React.ReactNode }) => <strong className="font-semibold text-border-dark">{children}</strong>,
                    em: ({ children }: { children: React.ReactNode }) => <em>{children}</em>,
                  },
                }}
              />
            </div>
          </ScrollReveal>
        )}

        {event.registration?.isOpen && event.registration.url && (
          <ScrollReveal>
            <div className="mb-12">
              <a
                href={event.registration.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center font-label-bold uppercase tracking-widest px-10 py-4 text-[11px] hover:bg-brand-navy-deep hover:text-white transition-colors ${accent.badge}`}
              >
                Přihlásit se →
              </a>
            </div>
          </ScrollReveal>
        )}

        {event.links && event.links.length > 0 && (
          <ScrollReveal>
            <div className={`pt-8 border-t-2 ${accent.border}`}>
              <h2
                className="font-black uppercase tracking-tight leading-none text-border-dark mb-6"
                style={{ fontSize: "clamp(18px, 2vw, 26px)" }}
              >
                Odkazy
              </h2>
              <div className="flex flex-wrap gap-3">
                {event.links.map((link) => (
                  <a
                    key={`${link.url}-${link.label}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-label-bold text-[11px] uppercase tracking-widest px-6 py-3 border border-border-dark text-border-dark hover:bg-brand-navy-deep hover:text-white hover:border-brand-navy-deep transition-colors"
                  >
                    {link.label} →
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>

      {/* ── BOTTOM CTA ── */}
      <section className="bg-brand-navy-deep py-section-padding-mobile md:py-section-padding-desktop">
        <div className="max-w-container-max mx-auto px-gutter flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="inline-block text-brand-orange font-label-bold text-label-bold uppercase tracking-widest mb-4">
              Program
            </span>
            <h2
              className="font-black uppercase tracking-tight leading-none text-white"
              style={{ fontSize: "clamp(24px, 3vw, 40px)" }}
            >
              Prohlédni si všechny akce
            </h2>
          </div>
          <Link
            href="/akce"
            className="shrink-0 inline-flex items-center gap-3 bg-brand-orange text-white font-label-bold uppercase tracking-widest px-8 py-4 text-[11px] hover:bg-white hover:text-brand-navy-deep transition-colors"
          >
            Všechny akce
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
