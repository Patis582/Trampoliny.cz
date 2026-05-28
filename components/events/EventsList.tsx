'use client'

import { useState } from 'react'
import { EventCard } from './EventCard'
import type { Event, EventType } from '@/sanity/lib/queries'

type Filter = 'vše' | EventType

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'vše', label: 'Vše' },
  { value: 'závod', label: 'Závody' },
  { value: 'tábor', label: 'Tábory' },
  { value: 'open-gym', label: 'Open Gym' },
  { value: 'jiné', label: 'Jiné' },
]

interface Props {
  events: Event[]
}

export function EventsList({ events }: Props) {
  const [filter, setFilter] = useState<Filter>('vše')
  const filtered = filter === 'vše' ? events : events.filter((e) => e.type === filter)

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-12">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`font-label-bold text-[11px] uppercase tracking-widest px-4 py-2 border transition-colors ${
              filter === f.value
                ? 'bg-border-dark text-white border-border-dark'
                : 'bg-white text-outline border-surface-container-high hover:border-border-dark hover:text-border-dark'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="font-body-md text-outline text-center py-24">
          Žádné nadcházející akce v této kategorii.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}
