'use client'

interface Props {
  view: 'seznam' | 'kalendář'
  onChange: (view: 'seznam' | 'kalendář') => void
}

export function EventsViewToggle({ view, onChange }: Props) {
  return (
    <div className="flex border border-surface-container-high">
      {(['seznam', 'kalendář'] as const).map((v) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          className={`font-label-bold text-[11px] uppercase tracking-widest px-5 py-2 transition-colors capitalize ${
            view === v
              ? 'bg-border-dark text-white'
              : 'bg-white text-outline hover:text-border-dark'
          }`}
        >
          {v}
        </button>
      ))}
    </div>
  )
}
