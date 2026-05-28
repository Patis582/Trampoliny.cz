'use client'

import { useState } from 'react'
import type { Event } from '@/sanity/lib/queries'
import { EventCard } from './EventCard'

const DAYS = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne']
const MONTHS = [
  'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
  'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec',
]

function getMondayBasedDay(date: Date): number {
  return (date.getDay() + 6) % 7
}

interface Props {
  events: Event[]
}

export function EventsCalendar({ events }: Props) {
  const today = new Date()
  const [current, setCurrent] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  const year = current.getFullYear()
  const month = current.getMonth()
  const firstDayOffset = getMondayBasedDay(new Date(year, month, 1))
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const totalCells = Math.ceil((firstDayOffset + daysInMonth) / 7) * 7

  const monthEvents = events.filter((e) => {
    const d = new Date(e.date)
    return d.getFullYear() === year && d.getMonth() === month
  })

  const eventsByDay = monthEvents.reduce<Record<number, Event[]>>((acc, e) => {
    const day = new Date(e.date).getDate()
    if (!acc[day]) acc[day] = []
    acc[day].push(e)
    return acc
  }, {})

  const selectedEvents = selectedDay ? (eventsByDay[selectedDay] ?? []) : []

  function prevMonth() {
    setSelectedDay(null)
    setCurrent(new Date(year, month - 1, 1))
  }

  function nextMonth() {
    setSelectedDay(null)
    setCurrent(new Date(year, month + 1, 1))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={prevMonth}
          className="font-label-bold text-[11px] uppercase tracking-widest px-4 py-2 border border-surface-container-high hover:border-border-dark hover:text-border-dark text-outline transition-colors"
        >
          ← Předchozí
        </button>
        <h2 className="font-headline-sm text-headline-sm text-border-dark uppercase">
          {MONTHS[month]} {year}
        </h2>
        <button
          onClick={nextMonth}
          className="font-label-bold text-[11px] uppercase tracking-widest px-4 py-2 border border-surface-container-high hover:border-border-dark hover:text-border-dark text-outline transition-colors"
        >
          Další →
        </button>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {DAYS.map((d) => (
          <div
            key={d}
            className="font-label-bold text-[10px] uppercase tracking-widest text-outline text-center py-2"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 border-l border-t border-surface-container-high">
        {Array.from({ length: totalCells }).map((_, i) => {
          const dayNum = i - firstDayOffset + 1
          const isCurrentMonth = dayNum >= 1 && dayNum <= daysInMonth
          const hasEvents = isCurrentMonth && !!eventsByDay[dayNum]
          const isSelected = dayNum === selectedDay
          const isToday =
            isCurrentMonth &&
            dayNum === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()

          return (
            <div
              key={i}
              onClick={() => isCurrentMonth && hasEvents && setSelectedDay(isSelected ? null : dayNum)}
              className={`border-r border-b border-surface-container-high min-h-[80px] p-2 flex flex-col transition-colors ${
                !isCurrentMonth ? 'bg-surface-container-lowest' : ''
              } ${hasEvents ? 'cursor-pointer hover:bg-surface-container-low' : ''} ${
                isSelected ? 'bg-brand-orange/5' : ''
              }`}
            >
              {isCurrentMonth && (
                <span
                  className={`font-label-bold text-xs w-6 h-6 flex items-center justify-center rounded-full ${
                    isToday ? 'bg-brand-orange text-white' : 'text-on-surface'
                  }`}
                >
                  {dayNum}
                </span>
              )}
              {isCurrentMonth && hasEvents && (
                <div className="mt-1 flex flex-col gap-1">
                  {eventsByDay[dayNum].slice(0, 2).map((e) => (
                    <span
                      key={e._id}
                      className="text-[10px] font-medium text-border-dark bg-brand-orange/10 px-1 truncate leading-tight"
                    >
                      {e.title}
                    </span>
                  ))}
                  {eventsByDay[dayNum].length > 2 && (
                    <span className="text-[10px] text-outline">
                      +{eventsByDay[dayNum].length - 2} další
                    </span>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {selectedEvents.length > 0 && (
        <div className="mt-12">
          <h3 className="font-headline-sm text-headline-sm text-border-dark uppercase mb-8">
            Akce {selectedDay}. {MONTHS[month].toLowerCase()}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {selectedEvents.map((e) => (
              <EventCard key={e._id} event={e} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
