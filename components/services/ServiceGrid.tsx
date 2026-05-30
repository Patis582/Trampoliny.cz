import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/sanity/lib/queries";

export function ServiceGrid({ services }: { services: Service[] }) {
  return (
    <>
      {/* Mobile — compact list */}
      <div className="md:hidden">
        {services.map((s, i) => (
          <ServiceRow
            key={s._id}
            num={String(i + 1).padStart(2, "0")}
            service={s}
          />
        ))}
      </div>

      {/* Desktop — card grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <ServiceCard
            key={s._id}
            num={String(i + 1).padStart(2, "0")}
            service={s}
          />
        ))}
      </div>
    </>
  );
}

type AccentColor = "orange" | "green" | "navy";

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

function ServiceRow({ num, service }: { num: string; service: Service }) {
  const { title, accent } = service;
  const cls = accentClasses[accent];

  return (
    <Link
      href={`/aktivity/${service.slug}`}
      className={`group flex items-center gap-4 border-t-2 ${cls.border} pt-4 pb-5 hover:opacity-80 transition-opacity`}
    >
      <span className={`font-label-bold text-[10px] uppercase tracking-widest shrink-0 w-6 ${cls.label}`}>
        {num}
      </span>
      <h3 className={`flex-1 font-black text-border-dark uppercase tracking-tight leading-tight transition-colors ${cls.title}`} style={{ fontSize: "clamp(14px, 3.5vw, 18px)" }}>
        {title}
      </h3>
      <svg className="w-4 h-4 text-outline group-hover:translate-x-0.5 transition-transform shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </Link>
  );
}

function ServiceCard({ num, service }: { num: string; service: Service }) {
  const { title, description: desc, accent, image } = service;
  const cls = accentClasses[accent];

  return (
    <Link
      href={`/aktivity/${service.slug}`}
      className={`group flex flex-col bg-white overflow-hidden border-t-2 ${cls.border} hover:shadow-sm transition-all duration-300 cursor-pointer`}
    >
      <div className="aspect-video overflow-hidden relative bg-surface-container">
        {image?.url && (
          <Image
            src={image.url}
            alt={title}
            fill
            sizes="(max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
      </div>

      <div className="relative p-5 flex flex-col flex-1 overflow-hidden">
        <span
          className={`absolute -bottom-4 -right-2 font-black leading-none select-none pointer-events-none transition-colors duration-500 ${cls.watermark}`}
          style={{ fontSize: "clamp(72px, 9vw, 108px)" }}
          aria-hidden="true"
        >
          {num}
        </span>

        <div className="relative z-10 flex items-start justify-between mb-3">
          <span className={`font-label-bold text-[10px] uppercase tracking-widest ${cls.label}`}>{num}</span>
        </div>

        <h3 className={`relative z-10 font-headline-sm text-headline-sm text-border-dark uppercase mb-4 transition-colors ${cls.title}`}>
          {title}
        </h3>
        <p className="relative z-10 font-body-md text-on-surface-variant font-light mb-4 flex-1">{desc}</p>

        <div className="relative z-10 flex items-center justify-between">
          <div className={`w-12 h-px group-hover:w-24 transition-all duration-500 ${cls.bar}`} />
          <span className={`text-[11px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${cls.label}`}>
            Více info →
          </span>
        </div>
      </div>
    </Link>
  );
}
