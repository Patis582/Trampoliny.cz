"use client";

import type { Testimonial } from "@/sanity/lib/queries";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-3.5 h-3.5 ${i < rating ? "text-brand-green" : "text-white/20"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="shrink-0 w-72 bg-white border-t-2 border-brand-green p-6 flex flex-col gap-3">
      <Stars rating={t.rating} />
      <p className="text-on-surface-variant font-light leading-relaxed text-sm line-clamp-4">
        &ldquo;{t.text}&rdquo;
      </p>
      <p className="font-label-bold text-[10px] uppercase tracking-widest text-border-dark mt-auto">
        {t.authorName}
      </p>
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

  const half = Math.ceil(testimonials.length / 2);
  const row1 = fillRow(testimonials.slice(0, half));
  const row2 = fillRow(testimonials.slice(half).length > 0 ? testimonials.slice(half) : testimonials);

  return (
    <div className="overflow-hidden select-none" aria-hidden="true">
      <div className="flex gap-4 mb-4 animate-marquee-left">
        {row1.map((t, i) => <TestimonialCard key={`r1-${i}`} t={t} />)}
      </div>
      <div className="flex gap-4 animate-marquee-right">
        {row2.map((t, i) => <TestimonialCard key={`r2-${i}`} t={t} />)}
      </div>
    </div>
  );
}
