"use client";

import { useEffect, useRef } from "react";

export function HeroScrollHint() {
  const figureRef = useRef<SVGGElement>(null);
  const matRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    let displayY = 0;
    let prevDisplayY = 0;
    let rafId: number;

    const MAX_DOWN = 18;

    function tick() {
      const scrollY = window.scrollY;
      const target = Math.min(scrollY * 0.12, MAX_DOWN);

      displayY += (target - displayY) * 0.15;

      const velocity = displayY - prevDisplayY;
      prevDisplayY = displayY;

      const rotate = velocity * 3;
      const compression = Math.max(0, displayY / MAX_DOWN);
      const matD = compression > 0
        ? `M10,0 Q40,${8 + compression * 6} 70,0`
        : `M10,0 Q40,8 70,0`;

      if (figureRef.current) {
        figureRef.current.setAttribute(
          "transform",
          `translate(0, ${displayY}) rotate(${rotate}, 40, 20)`
        );
      }
      if (matRef.current) {
        matRef.current.setAttribute("d", matD);
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="absolute bottom-8 right-8 z-20 opacity-70 hidden md:block">
      <svg
        width="80"
        height="90"
        viewBox="0 0 80 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Panáček — pohyblivý */}
        <g ref={figureRef}>
          {/* hlava */}
          <circle cx="40" cy="14" r="6" stroke="#0f1f45" strokeWidth="2" />
          {/* tělo */}
          <line x1="40" y1="20" x2="40" y2="36" stroke="#0f1f45" strokeWidth="2" strokeLinecap="round" />
          {/* ruce */}
          <line x1="40" y1="25" x2="30" y2="32" stroke="#0f1f45" strokeWidth="2" strokeLinecap="round" />
          <line x1="40" y1="25" x2="50" y2="32" stroke="#0f1f45" strokeWidth="2" strokeLinecap="round" />
          {/* nohy */}
          <line x1="40" y1="36" x2="32" y2="46" stroke="#0f1f45" strokeWidth="2" strokeLinecap="round" />
          <line x1="40" y1="36" x2="48" y2="46" stroke="#0f1f45" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Trampolína — statická */}
        {/* levá nožička */}
        <line x1="14" y1="60" x2="6" y2="82" stroke="#0f1f45" strokeWidth="2.5" strokeLinecap="round" />
        {/* pravá nožička */}
        <line x1="66" y1="60" x2="74" y2="82" stroke="#0f1f45" strokeWidth="2.5" strokeLinecap="round" />
        {/* základna vlevo */}
        <line x1="2" y1="82" x2="18" y2="82" stroke="#0f1f45" strokeWidth="2.5" strokeLinecap="round" />
        {/* základna vpravo */}
        <line x1="62" y1="82" x2="78" y2="82" stroke="#0f1f45" strokeWidth="2.5" strokeLinecap="round" />
        {/* rám trampolíny */}
        <line x1="10" y1="60" x2="70" y2="60" stroke="#0f1f45" strokeWidth="2.5" strokeLinecap="round" />
        {/* mat — prohnutý, animovaný */}
        <path
          ref={matRef}
          d="M10,0 Q40,8 70,0"
          stroke="#0f1f45"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          transform="translate(0, 60)"
        />
      </svg>
    </div>
  );
}
