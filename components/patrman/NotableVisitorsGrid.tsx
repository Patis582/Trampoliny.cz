import Image from "next/image";
import type { NotableVisitor } from "@/sanity/lib/queries";

export function NotableVisitorsGrid({ visitors }: { visitors: NotableVisitor[] }) {
  if (visitors.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[220px]">
      {visitors.map((v, i) => {
        // Every 5th card (0-indexed: 0, 5, 10...) is wide
        const isWide = i % 5 === 0;
        return (
          <div
            key={v._id}
            className={`relative overflow-hidden group ${isWide ? "col-span-2" : "col-span-1"}`}
          >
            <Image
              src={v.photo.url}
              alt={v.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5">
              <p className="font-black uppercase tracking-tight leading-none text-white text-sm mb-1">
                {v.name}
              </p>
              <p className="font-label-bold text-[10px] uppercase tracking-widest text-white/50">
                {v.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
