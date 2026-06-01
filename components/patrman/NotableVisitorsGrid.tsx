import Image from "next/image";
import type { NotableVisitor } from "@/sanity/lib/queries";

export function NotableVisitorsGrid({ visitors }: { visitors: NotableVisitor[] }) {
  if (visitors.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[240px]">
      {visitors.map((v, i) => {
        const isWide = i % 5 === 0;
        return (
          <div
            key={v._id}
            className={`relative overflow-hidden group cursor-default ${isWide ? "col-span-2" : "col-span-1"}`}
          >
            <Image
              src={v.photo.url}
              alt={v.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            {/* Accent line on hover */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-green scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            <div className="absolute bottom-0 left-0 p-5">
              <p className="font-black uppercase tracking-tight leading-tight text-white mb-1" style={{ fontSize: "clamp(13px, 1.2vw, 15px)" }}>
                {v.name}
              </p>
              <p className="font-label-bold text-[9px] uppercase tracking-widest text-white/50 group-hover:text-brand-green transition-colors duration-300">
                {v.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
