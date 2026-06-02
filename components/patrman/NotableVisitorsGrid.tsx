"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import type { NotableVisitor } from "@/sanity/lib/queries";

const PX_PER_SEC = 80;

function fill(items: NotableVisitor[]): NotableVisitor[] {
  const result = [...items];
  while (result.length < 6) result.push(...items);
  return [...result, ...result];
}

export function NotableVisitorsGrid({ visitors }: { visitors: NotableVisitor[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const state = useRef({ offset: 0, dragging: false, startX: 0, startOffset: 0, lastT: 0 });

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    let raf: number;

    function half() {
      return track!.scrollWidth / 2;
    }

    function applyOffset() {
      const h = half();
      const s = state.current;
      s.offset = ((s.offset % h) + h) % h;
      track!.style.transform = `translateX(-${s.offset}px)`;
    }

    function loop(t: number) {
      const s = state.current;
      if (!s.dragging) {
        const dt = s.lastT > 0 ? (t - s.lastT) / 1000 : 0;
        s.offset += PX_PER_SEC * dt;
        applyOffset();
      }
      s.lastT = s.dragging ? s.lastT : t;
      raf = requestAnimationFrame(loop);
    }

    function startDrag(clientX: number) {
      const s = state.current;
      s.dragging = true;
      s.startX = clientX;
      s.startOffset = s.offset;
    }

    function moveDrag(clientX: number) {
      if (!state.current.dragging) return;
      const s = state.current;
      s.offset = s.startOffset + (s.startX - clientX);
      applyOffset();
    }

    function endDrag() {
      state.current.dragging = false;
      state.current.lastT = 0; // reset so next frame has dt=0, no position jump
    }

    const onMouseDown = (e: MouseEvent) => startDrag(e.clientX);
    const onMouseMove = (e: MouseEvent) => moveDrag(e.clientX);
    const onTouchStart = (e: TouchEvent) => { e.preventDefault(); startDrag(e.touches[0].clientX); };
    const onTouchMove  = (e: TouchEvent) => { e.preventDefault(); moveDrag(e.touches[0].clientX); };

    // Mouse
    wrap.addEventListener("mousedown",  onMouseDown);
    wrap.addEventListener("mousemove",  onMouseMove);
    wrap.addEventListener("mouseup",    endDrag);
    wrap.addEventListener("mouseleave", endDrag);

    // Touch — passive:false so we can call preventDefault and block page scroll
    wrap.addEventListener("touchstart", onTouchStart, { passive: false });
    wrap.addEventListener("touchmove",  onTouchMove,  { passive: false });
    wrap.addEventListener("touchend",   endDrag);

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("mousedown",  onMouseDown);
      wrap.removeEventListener("mousemove",  onMouseMove);
      wrap.removeEventListener("mouseup",    endDrag);
      wrap.removeEventListener("mouseleave", endDrag);
      wrap.removeEventListener("touchstart", onTouchStart);
      wrap.removeEventListener("touchmove",  onTouchMove);
      wrap.removeEventListener("touchend",   endDrag);
    };
  }, []);

  if (visitors.length === 0) return null;
  const row = fill(visitors);

  return (
    <div
      ref={wrapRef}
      className="overflow-hidden select-none cursor-grab active:cursor-grabbing"
    >
      <div ref={trackRef} className="flex gap-4 will-change-transform">
        {row.map((v, i) => (
          <div
            key={i}
            className="relative shrink-0 overflow-hidden"
            style={{
              width: "calc(50vw - 1rem)",
              height: "clamp(300px, 42vw, 540px)",
            }}
          >
            <Image
              src={v.photo.url}
              alt={v.name}
              fill
              className="object-cover pointer-events-none"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
              <p className="font-label-bold text-[9px] uppercase tracking-widest text-brand-green mb-2">
                {v.description}
              </p>
              <p
                className="font-black uppercase text-white leading-none"
                style={{ fontSize: "clamp(15px, 2vw, 26px)" }}
              >
                {v.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
