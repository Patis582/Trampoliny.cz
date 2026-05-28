import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/sanity/lib/queries";

export function ServiceGrid({ services }: { services: Service[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
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

  const accentClasses: Record<AccentColor, { num: string; title: string; bar: string }> = {
    orange: {
      num: "text-brand-orange/20 group-hover:text-brand-orange",
      title: "group-hover:text-brand-orange",
      bar: "bg-brand-orange",
    },
    green: {
      num: "text-brand-green/20 group-hover:text-brand-green",
      title: "group-hover:text-brand-green",
      bar: "bg-brand-green",
    },
    navy: {
      num: "text-border-dark/20 group-hover:text-border-dark",
      title: "",
      bar: "bg-border-dark",
    },
  };

  const cls = accentClasses[accent];
  const accentColor = accent === "orange" ? "text-brand-orange" : accent === "green" ? "text-brand-green" : "text-border-dark";

  return (
    <Link
      href={`/aktivity/${service.slug}`}
      className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="hidden md:block aspect-video overflow-hidden relative bg-surface-container">
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
      <div className="p-5 md:p-8 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-4">
          <span className={`block font-headline-lg text-3xl md:text-4xl transition-colors ${cls.num}`}>{num}</span>
          {brand === "liberec" && (
            <span className="font-label-bold text-[10px] uppercase tracking-widest bg-brand-orange text-white px-2 py-1 shrink-0">
              Trampolíny Liberec
            </span>
          )}
          {brand === "patrman" && (
            <span className="font-label-bold text-[10px] uppercase tracking-widest bg-brand-green text-border-dark px-2 py-1 shrink-0">
              Trampolíny Patrman
            </span>
          )}
        </div>
        <h3 className={`font-headline-sm-mobile text-headline-sm-mobile md:font-headline-sm md:text-headline-sm text-border-dark uppercase mb-4 transition-colors ${cls.title}`}>
          {title}
        </h3>
        <p className="font-body-md text-on-surface-variant font-light mb-8 flex-1">{desc}</p>
        <div className="flex items-center justify-between">
          <div className={`w-12 h-1 group-hover:w-24 transition-all duration-500 ${cls.bar}`} />
          <span className={`text-[11px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${accentColor}`}>
            Více info →
          </span>
        </div>
      </div>
    </Link>
  );
}
