import Image from 'next/image'
import { Trainer } from '@/sanity/lib/queries'

const SPECIALIZATION_LABELS: Record<string, string> = {
  'zavodni-oddil': 'Závodní oddíl',
  'pripravky': 'Přípravky',
  'parkour': 'Parkour',
  'tabory': 'Tábory',
  'workshopy': 'Workshopy',
  'oslavy': 'Oslavy',
  'rodice-a-deti': 'Rodiče a děti',
}

export function TrainerCard({ trainer }: { trainer: Trainer }) {
  const { name, photo, bio, specializations, email, phone } = trainer
  const objectPosition = photo?.hotspot
    ? `${photo.hotspot.x * 100}% ${photo.hotspot.y * 100}%`
    : 'center top'

  return (
    <div className="flex flex-col">
      {/* Photo */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-surface-container mb-5">
        {photo?.url ? (
          <Image
            src={photo.url}
            alt={photo.alt ?? name}
            fill
            className="object-cover"
            style={{ objectPosition }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full bg-surface-container-high" />
        )}
      </div>

      {/* Name */}
      <p className="font-headline-sm text-headline-sm text-border-dark uppercase tracking-tight mb-3">
        {name}
      </p>

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {specializations.map((s) => (
          <span
            key={s}
            className="inline-block bg-brand-orange text-white font-label-bold text-[10px] uppercase tracking-widest px-2.5 py-1"
          >
            {SPECIALIZATION_LABELS[s] ?? s}
          </span>
        ))}
      </div>

      {/* Bio */}
      <p className="font-body-md text-body-md text-on-surface-variant font-light leading-relaxed mb-4 flex-1">
        {bio}
      </p>

      {/* Contact */}
      {(email || phone) && (
        <div className="flex flex-col gap-1 mt-auto pt-4 border-t border-surface-container-high">
          {phone && (
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="font-body-md text-body-md text-border-dark font-medium hover:text-brand-orange transition-colors"
            >
              {phone}
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="font-body-md text-body-md text-on-surface-variant font-light hover:text-brand-orange transition-colors text-sm"
            >
              {email}
            </a>
          )}
        </div>
      )}
    </div>
  )
}
