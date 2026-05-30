import Image from 'next/image'
import Link from 'next/link'
import type { Event, EventType } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

const TYPE_LABELS: Record<EventType, string> = {
  'závod': 'Závod',
  'tábor': 'Tábor',
  'kemp': 'Kemp',
  'workshop': 'Workshop',
  'jiné': 'Jiné',
}

const TYPE_BORDER: Record<EventType, string> = {
  'závod': 'border-brand-orange',
  'tábor': 'border-brand-green',
  'kemp': 'border-brand-green',
  'workshop': 'border-brand-navy-deep',
  'jiné': 'border-surface-container-high',
}

const TYPE_TEXT: Record<EventType, string> = {
  'závod': 'text-brand-orange',
  'tábor': 'text-on-tertiary-container',
  'kemp': 'text-on-tertiary-container',
  'workshop': 'text-brand-navy-deep',
  'jiné': 'text-outline',
}

function formatDate(dateStr: string, endDateStr?: string): string {
  const date = new Date(dateStr)
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }
  if (!endDateStr) return date.toLocaleDateString('cs-CZ', opts)
  const end = new Date(endDateStr)
  if (date.toDateString() === end.toDateString()) return date.toLocaleDateString('cs-CZ', opts)
  return `${date.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long' })} – ${end.toLocaleDateString('cs-CZ', opts)}`
}

interface Props {
  event: Event
  compact?: boolean
  isPast?: boolean
}

export function EventCard({ event, compact = false, isPast = false }: Props) {
  const borderClass = TYPE_BORDER[event.type]
  const textClass = TYPE_TEXT[event.type]
  const typeLabel = event.type === 'jiné' && event.customType ? event.customType : TYPE_LABELS[event.type]

  return (
    <div className={`group relative flex flex-col border-t-2 ${borderClass} pt-4 pb-5`}>
      {event.image && !compact && (
        <div className="aspect-video overflow-hidden relative mb-4">
          <Image
            src={urlFor(event.image).width(800).height(450).url()}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="flex items-center justify-between gap-3 mb-2">
        <p className="font-label-bold text-[10px] uppercase tracking-widest text-outline">
          {formatDate(event.date, event.endDate)}
        </p>
        {isPast ? (
          <span className="font-label-bold text-[9px] uppercase tracking-widest text-outline shrink-0">
            Proběhlo
          </span>
        ) : event.registration?.isOpen && (
          <span className="font-label-bold text-[9px] uppercase tracking-widest text-brand-orange shrink-0">
            ● Přihlášky
          </span>
        )}
      </div>

      <h3 className="font-headline-sm-mobile text-headline-sm-mobile md:font-headline-sm md:text-headline-sm text-border-dark uppercase mb-3 leading-tight">
        <Link href={`/akce/${event.slug}`} className="after:absolute after:inset-0 hover:text-brand-orange transition-colors duration-200">
          {event.title}
        </Link>
      </h3>

      <span className={`font-label-bold text-[9px] uppercase tracking-widest ${textClass}`}>
        {typeLabel}
      </span>

      {!compact && !isPast && event.links && event.links.length > 0 && (
        <div className="relative z-10 mt-4 flex flex-wrap gap-3">
          {event.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-label-bold text-[10px] uppercase tracking-widest text-border-dark hover:text-brand-orange transition-colors"
            >
              {link.label} →
            </a>
          ))}
        </div>
      )}

      {!isPast && event.registration?.url && (
        <a
          href={event.registration.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 mt-4 inline-flex justify-center items-center bg-brand-orange text-white font-label-bold text-[11px] uppercase tracking-widest px-6 py-3 hover:bg-border-dark transition-colors"
        >
          Přihlásit se
        </a>
      )}
    </div>
  )
}
