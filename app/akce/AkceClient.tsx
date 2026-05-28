'use client'

import { useState } from 'react'
import { EventsList } from '@/components/events/EventsList'
import { EventsCalendar } from '@/components/events/EventsCalendar'
import { EventsViewToggle } from '@/components/events/EventsViewToggle'
import type { Event } from '@/sanity/lib/queries'

interface Props {
  events: Event[]
}

export function AkceClient({ events }: Props) {
  const [view, setView] = useState<'seznam' | 'kalendář'>('seznam')

  return (
    <div>
      <div className="flex justify-end mb-8">
        <EventsViewToggle view={view} onChange={setView} />
      </div>
      {view === 'seznam' ? (
        <EventsList events={events} />
      ) : (
        <EventsCalendar events={events} />
      )}
    </div>
  )
}
