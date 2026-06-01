"use client";

import type { Testimonial } from "@/sanity/lib/queries";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < rating ? "text-brand-green" : "text-white/20"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="shrink-0 w-80 bg-white/5 border-t-2 border-brand-green p-7 flex flex-col relative overflow-hidden">
      <span
        className="absolute -top-2 -left-1 text-brand-green/10 font-black leading-none select-none pointer-events-none"
        style={{ fontSize: "clamp(80px, 8vw, 120px)" }}
        aria-hidden="true"
      >
        &ldquo;
      </span>
      <div className="relative z-10">
        <Stars rating={t.rating} />
        <p className="text-white/80 font-light leading-relaxed text-sm mb-6 line-clamp-5">
          {t.text}
        </p>
        <div className="flex items-center gap-3">
          <div className="w-6 h-px bg-brand-green" />
          <p className="font-label-bold text-[10px] uppercase tracking-widest text-brand-green">
            {t.authorName}
          </p>
        </div>
      </div>
    </div>
  );
}

function fillRow(items: Testimonial[], minCount = 8): Testimonial[] {
  if (items.length === 0) return [];
  const result = [...items];
  while (result.length < minCount) result.push(...items);
  return [...result, ...result];
}

export function TestimonialsMarquee({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  const row = fillRow(testimonials);

  return (
    <div className="overflow-hidden select-none" aria-hidden="true">
      <div className="flex gap-5 animate-marquee-left">
        {row.map((t, i) => <TestimonialCard key={`r-${i}`} t={t} />)}
      </div>
    </div>
  );
}
