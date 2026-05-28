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

const TYPE_COLORS: Record<EventType, string> = {
  'závod': 'bg-brand-orange text-white',
  'tábor': 'bg-brand-green text-border-dark',
  'kemp': 'bg-brand-navy-deep text-white',
  'workshop': 'bg-border-dark text-white',
  'jiné': 'bg-surface-container text-outline',
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
}

export function EventCard({ event, compact = false }: Props) {
  return (
    <Link href={`/akce/${event.slug}`} className="group flex flex-col bg-white border border-surface-container-high hover:shadow-md transition-shadow">
      {event.image && !compact && (
        <div className="aspect-video overflow-hidden relative">
          <Image
            src={urlFor(event.image).width(800).height(450).url()}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-4">
          <span className={`font-label-bold text-[10px] uppercase tracking-widest px-2 py-1 shrink-0 ${TYPE_COLORS[event.type]}`}>
            {event.type === 'jiné' && event.customType ? event.customType : TYPE_LABELS[event.type]}
          </span>
          {event.registration?.isOpen && (
            <span className="font-label-bold text-[10px] uppercase tracking-widest px-2 py-1 bg-brand-green/20 text-on-tertiary-container border border-brand-green/40 shrink-0">
              Přihlášky otevřeny
            </span>
          )}
        </div>
        <p className="font-label-bold text-[10px] uppercase tracking-widest text-outline mb-2">
          {formatDate(event.date, event.endDate)}
        </p>
        <h3 className="font-headline-sm text-headline-sm text-border-dark uppercase mb-3 leading-tight">
          {event.title}
        </h3>
        {!compact && event.links && event.links.length > 0 && (
          <div className="mt-auto pt-4 flex flex-wrap gap-3">
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
        {event.registration?.url && (
          <a
            href={event.registration.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex justify-center items-center bg-brand-orange text-white font-label-bold text-[11px] uppercase tracking-widest px-6 py-3 hover:bg-border-dark transition-colors"
          >
            Přihlásit se
          </a>
        )}
      </div>
    </Link>
  )
}
