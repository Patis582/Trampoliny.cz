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
    <div className="flex flex-col group cursor-default transition-transform duration-300 ease-out hover:-translate-y-2">
      {/* Photo */}
      <div className="relative w-full aspect-[4/3] md:aspect-[3/4] overflow-hidden bg-surface-container mb-3 md:mb-5">
        {photo?.url ? (
          <Image
            src={photo.url}
            alt={photo.alt ?? name}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            style={{ objectPosition }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full bg-surface-container-high" />
        )}
      </div>

      {/* Name */}
      <p className="text-[13px] leading-tight md:font-headline-sm-mobile md:text-headline-sm-mobile font-bold uppercase tracking-tight text-border-dark mb-2 md:mb-3">
        {name}
      </p>

      {/* Badges */}
      <div className="flex flex-wrap gap-1 mb-2 md:gap-1.5 md:mb-4">
        {specializations.map((s) => (
          <span
            key={s}
            className="inline-block bg-brand-orange text-white font-label-bold text-[8px] md:text-[10px] uppercase tracking-widest px-1.5 py-0.5 md:px-2.5 md:py-1"
          >
            {SPECIALIZATION_LABELS[s] ?? s}
          </span>
        ))}
      </div>

      {/* Bio */}
      <p className="text-xs md:font-body-md md:text-body-md text-on-surface-variant font-light leading-relaxed mb-2 md:mb-4 flex-1">
        {bio}
      </p>

      {/* Contact */}
      {(email || phone) && (
        <div className="flex flex-col gap-1 mt-auto pt-2 md:pt-4 border-t border-surface-container-high">
          {phone && (
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="text-xs md:font-body-md md:text-body-md text-border-dark font-medium hover:text-brand-orange transition-colors"
            >
              {phone}
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="text-xs md:font-body-md md:text-body-md text-on-surface-variant font-light hover:text-brand-orange transition-colors"
            >
              {email}
            </a>
          )}
        </div>
      )}
    </div>
  )
}
