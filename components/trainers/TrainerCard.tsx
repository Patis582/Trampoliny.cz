import Image from 'next/image'
import { Trainer } from '@/sanity/lib/queries'


export function TrainerCard({ trainer }: { trainer: Trainer }) {
  const { name, photo, bio, email, phone } = trainer
  const objectPosition = photo?.hotspot
    ? `${photo.hotspot.x * 100}% ${photo.hotspot.y * 100}%`
    : 'center top'

  return (
    <div className="group cursor-default">
      {/* Photo */}
      <div className="relative w-full aspect-square overflow-hidden bg-surface-container mb-3">
        {photo?.url ? (
          <Image
            src={photo.url}
            alt={photo.alt ?? name}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            style={{ objectPosition }}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        ) : (
          <div className="w-full h-full bg-surface-container-high" />
        )}
      </div>

      {/* Name */}
      <p className="font-bold text-[12px] uppercase tracking-tight text-border-dark leading-tight mb-1">
        {name}
      </p>

      {/* Bio */}
      {bio && (
        <p className="text-[11px] text-on-surface-variant font-light leading-snug mb-2">
          {bio}
        </p>
      )}

      {/* Contact */}
      {(email || phone) && (
        <div className="flex flex-col gap-0.5">
          {phone && (
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="text-[11px] text-brand-orange font-medium hover:text-border-dark transition-colors"
            >
              {phone}
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="text-[11px] text-on-surface-variant font-light hover:text-brand-orange transition-colors"
            >
              {email}
            </a>
          )}
        </div>
      )}
    </div>
  )
}
