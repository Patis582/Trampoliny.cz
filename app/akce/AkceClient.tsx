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

const PAGE_SIZE = 20

interface Props {
  events: Event[]
  pastEvents: Event[]
}

function matchesSearch(event: Event, q: string): boolean {
  if (!q) return true
  const needle = q.toLowerCase()
  return (
    event.title.toLowerCase().includes(needle) ||
    (event.customType ?? '').toLowerCase().includes(needle)
  )
}

export function AkceClient({ events, pastEvents }: Props) {
  const [view, setView] = useState<'seznam' | 'kalendář'>('seznam')
  const [filter, setFilter] = useState<Filter>('vše')
  const [search, setSearch] = useState('')
  const [upcomingLimit, setUpcomingLimit] = useState(PAGE_SIZE)
  const [pastLimit, setPastLimit] = useState(PAGE_SIZE)

  const filteredUpcoming = events.filter(
    (e) => (filter === 'vše' || e.type === filter) && matchesSearch(e, search)
  )
  const filteredPast = pastEvents.filter(
    (e) => (filter === 'vše' || e.type === filter) && matchesSearch(e, search)
  )

  const visibleUpcoming = filteredUpcoming.slice(0, upcomingLimit)
  const visiblePast = filteredPast.slice(0, pastLimit)

  // Reset limits when filter/search changes
  const handleFilter = (f: Filter) => { setFilter(f); setUpcomingLimit(PAGE_SIZE); setPastLimit(PAGE_SIZE) }
  const handleSearch = (q: string) => { setSearch(q); setUpcomingLimit(PAGE_SIZE); setPastLimit(PAGE_SIZE) }

  const filterButtons = (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          onClick={() => handleFilter(f.value)}
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

  const searchBar = (
    <div className="relative">
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline pointer-events-none"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
      </svg>
      <input
        type="search"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Hledat akci…"
        className="w-full pl-10 pr-4 py-2.5 border border-surface-container-high bg-white text-border-dark font-body-md text-sm placeholder:text-outline focus:outline-none focus:border-border-dark transition-colors"
      />
    </div>
  )

  return (
    <div>
      {/* Desktop: search left, filters center, toggle right */}
      <div className="hidden md:flex items-center justify-between gap-4 mb-10">
        {view === 'seznam' ? (
          <>
            <div className="w-64 shrink-0">{searchBar}</div>
            {filterButtons}
          </>
        ) : <div />}
        <EventsViewToggle view={view} onChange={setView} />
      </div>

      {/* Mobile: toggle top-right, search + filters below */}
      <div className="flex md:hidden flex-col gap-3 mb-8">
        <div className="flex justify-end">
          <EventsViewToggle view={view} onChange={setView} />
        </div>
        {view === 'seznam' && (
          <>
            {searchBar}
            {filterButtons}
          </>
        )}
      </div>

      {view === 'seznam' ? (
        <>
          {/* Upcoming */}
          <EventsList events={visibleUpcoming} />
          {visibleUpcoming.length < filteredUpcoming.length && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => setUpcomingLimit((n) => n + PAGE_SIZE)}
                className="font-label-bold text-[11px] uppercase tracking-widest px-8 py-3 border border-border-dark text-border-dark hover:bg-border-dark hover:text-white transition-colors"
              >
                Zobrazit více ({filteredUpcoming.length - visibleUpcoming.length} dalších)
              </button>
            </div>
          )}

          {/* Past events */}
          {filteredPast.length > 0 && (
            <div className="mt-20 md:mt-28">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-8 h-px bg-surface-container-high" />
                <h2
                  className="font-black uppercase tracking-tight leading-none text-outline"
                  style={{ fontSize: "clamp(18px, 2.5vw, 28px)" }}
                >
                  Proběhlé akce
                </h2>
                <div className="flex-1 h-px bg-surface-container-high" />
              </div>
              <EventsList events={visiblePast} isPast />
              {visiblePast.length < filteredPast.length && (
                <div className="mt-10 flex justify-center">
                  <button
                    onClick={() => setPastLimit((n) => n + PAGE_SIZE)}
                    className="font-label-bold text-[11px] uppercase tracking-widest px-8 py-3 border border-border-dark text-border-dark hover:bg-border-dark hover:text-white transition-colors"
                  >
                    Zobrazit více ({filteredPast.length - visiblePast.length} dalších)
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <EventsCalendar events={events} />
      )}
    </div>
  )
}
