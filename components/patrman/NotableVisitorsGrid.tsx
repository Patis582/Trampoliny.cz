import Image from "next/image";
import type { NotableVisitor } from "@/sanity/lib/queries";

export function NotableVisitorsGrid({ visitors }: { visitors: NotableVisitor[] }) {
  if (visitors.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
      {visitors.map((v) => (
        <div key={v._id} className="flex flex-col">
          <div className="relative h-32 md:h-36 overflow-hidden mb-3">
            <Image
              src={v.photo.url}
              alt={v.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
          </div>
          <div className="border-t-2 border-brand-green pt-3">
            <p className="font-black uppercase tracking-tight text-border-dark leading-tight mb-1" style={{ fontSize: "clamp(13px, 1.2vw, 15px)" }}>
              {v.name}
            </p>
            <p className="font-label-bold text-[9px] uppercase tracking-widest text-on-tertiary-container">
              {v.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
