'use client'

import { useState } from 'react'
import { EventsList } from '@/components/events/EventsList'
import { EventsCalendar } from '@/components/events/EventsCalendar'
import { EventsViewToggle } from '@/components/events/EventsViewToggle'
import type { Event, EventType } from '@/sanity/lib/queries'

type Filter = 'vše' | EventType

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'vše', label: 'Vše' },
  { value: 'závod', label: 'Závody' },
  { value: 'tábor', label: 'Tábory' },
  { value: 'kemp', label: 'Kempy' },
  { value: 'workshop', label: 'Workshopy' },
  { value: 'jiné', label: 'Jiné' },
]

interface Props {
  events: Event[]
}

export function AkceClient({ events }: Props) {
  const [view, setView] = useState<'seznam' | 'kalendář'>('seznam')
  const [filter, setFilter] = useState<Filter>('vše')

  const filtered = filter === 'vše' ? events : events.filter((e) => e.type === filter)

  const filterButtons = (
    <div className="flex flex-wrap gap-2">
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
  )

  return (
    <div>
      {/* Desktop: filters left, toggle right — same row */}
      <div className="hidden md:flex items-center justify-between gap-4 mb-10">
        {view === 'seznam' ? filterButtons : <div />}
        <EventsViewToggle view={view} onChange={setView} />
      </div>

      {/* Mobile: toggle top-right, filters below */}
      <div className="flex md:hidden flex-col gap-3 mb-8">
        <div className="flex justify-end">
          <EventsViewToggle view={view} onChange={setView} />
        </div>
        {view === 'seznam' && filterButtons}
      </div>

      {view === 'seznam' ? (
        <EventsList events={filtered} />
      ) : (
        <EventsCalendar events={events} />
      )}
    </div>
  )
}
