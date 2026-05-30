'use client'

import { EventCard } from './EventCard'
import type { Event } from '@/sanity/lib/queries'

interface Props {
  events: Event[]
  isPast?: boolean
}

export function EventsList({ events, isPast = false }: Props) {
  if (events.length === 0) {
    return (
      <p className="font-body-md text-outline text-center py-24">
        {isPast ? 'Žádné proběhlé akce v této kategorii.' : 'Žádné nadcházející akce v této kategorii.'}
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event) => (
        <EventCard key={event._id} event={event} isPast={isPast} />
      ))}
    </div>
  )
}
