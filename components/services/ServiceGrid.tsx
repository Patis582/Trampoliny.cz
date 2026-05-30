import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/sanity/lib/queries";

export function ServiceGrid({ services }: { services: Service[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((s, i) => (
        <ServiceCard
          key={s._id}
          num={String(i + 1).padStart(2, "0")}
          service={s}
        />
      ))}
    </div>
  );
}

type AccentColor = "orange" | "green" | "navy";

function ServiceCard({ num, service }: { num: string; service: Service }) {
  const { title, description: desc, accent, brand, image } = service;

  const accentClasses: Record<AccentColor, { border: string; title: string; bar: string; watermark: string; label: string }> = {
    orange: {
      border: "border-brand-orange",
      title: "group-hover:text-brand-orange",
      bar: "bg-brand-orange",
      watermark: "text-brand-orange/8 group-hover:text-brand-orange/15",
      label: "text-brand-orange",
    },
    green: {
      border: "border-brand-green",
      title: "group-hover:text-brand-green",
      bar: "bg-brand-green",
      watermark: "text-brand-green/8 group-hover:text-brand-green/15",
      label: "text-brand-green",
    },
    navy: {
      border: "border-border-dark",
      title: "",
      bar: "bg-border-dark",
      watermark: "text-border-dark/6 group-hover:text-border-dark/12",
      label: "text-border-dark",
    },
  };

  const cls = accentClasses[accent];

  return (
    <Link
      href={`/aktivity/${service.slug}`}
      className={`group flex flex-col bg-white overflow-hidden border-t-2 ${cls.border} hover:shadow-sm transition-all duration-300 cursor-pointer`}
    >
      {/* Image — visible on all screen sizes */}
      <div className="aspect-video overflow-hidden relative bg-surface-container">
        {image?.url && (
          <Image
            src={image.url}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
      </div>

      {/* Content */}
      <div className="relative p-4 md:p-5 flex flex-col flex-1 overflow-hidden">
        {/* Watermark number */}
        <span
          className={`absolute -bottom-4 -right-2 font-black leading-none select-none pointer-events-none transition-colors duration-500 ${cls.watermark}`}
          style={{ fontSize: "clamp(72px, 9vw, 108px)" }}
          aria-hidden="true"
        >
          {num}
        </span>

        {/* Header row */}
        <div className="relative z-10 flex items-start justify-between mb-3">
          <span className={`font-label-bold text-[10px] uppercase tracking-widest ${cls.label}`}>{num}</span>
          {brand === "liberec" && (
            <span className="hidden md:inline font-label-bold text-[10px] uppercase tracking-widest bg-brand-orange text-white px-2 py-1 shrink-0">
              Trampolíny Liberec
            </span>
          )}
          {brand === "patrman" && (
            <span className="hidden md:inline font-label-bold text-[10px] uppercase tracking-widest bg-brand-green text-border-dark px-2 py-1 shrink-0">
              Trampolíny Patrman
            </span>
          )}
        </div>

        <h3 className={`relative z-10 font-headline-sm-mobile text-headline-sm-mobile md:font-headline-sm md:text-headline-sm text-border-dark uppercase mb-4 transition-colors ${cls.title}`}>
          {title}
        </h3>
        <p className="relative z-10 font-body-md text-on-surface-variant font-light mb-4 flex-1">{desc}</p>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between">
          <div className={`w-12 h-px group-hover:w-24 transition-all duration-500 ${cls.bar}`} />
          {brand === "liberec" && (
            <span className="md:hidden font-label-bold text-[9px] uppercase tracking-widest bg-brand-orange text-white px-2 py-0.5 shrink-0">
              Trampolíny Liberec
            </span>
          )}
          {brand === "patrman" && (
            <span className="md:hidden font-label-bold text-[9px] uppercase tracking-widest bg-brand-green text-border-dark px-2 py-0.5 shrink-0">
              Trampolíny Patrman
            </span>
          )}
          <span className={`hidden md:inline text-[11px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${cls.label}`}>
            Více info →
          </span>
        </div>
      </div>
    </Link>
  );
}
