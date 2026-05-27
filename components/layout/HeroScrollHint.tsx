"use client";

import { useEffect, useRef } from "react";

const FIGURE_RADIUS = 10;
const MAT_Y = 200;
const MAT_HEIGHT = 150; // extra thick — prevents tunneling at any velocity
const REST_Y = MAT_Y - FIGURE_RADIUS;
const COLOR = "#0f1f45";

export function HeroScrollHint() {
  const figureRef = useRef<SVGGElement>(null);
  const matRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    let rafId: number;
    let stopped = false;

    import("matter-js").then((Matter) => {
      if (stopped) return;
      const { Engine, Runner, Bodies, Body, Composite } = Matter;

      const engine = Engine.create({ gravity: { y: 1.4 } });

      // Mat center is shifted down so top surface sits exactly at MAT_Y
      const mat = Bodies.rectangle(50, MAT_Y + MAT_HEIGHT / 2, 80, MAT_HEIGHT, {
        isStatic: true,
        restitution: 0.75,
        friction: 0,
        label: "mat",
      });

      const figure = Bodies.circle(50, REST_Y, FIGURE_RADIUS, {
        restitution: 0.75,
        friction: 0,
        frictionAir: 0.015,
        label: "figure",
      });

      Composite.add(engine.world, [mat, figure]);

      const runner = Runner.create();
      Runner.run(runner, engine);

      let prevScrollY = window.scrollY;
      const MAX_UP_VEL = -12;

      function tick() {
        if (stopped) return;

        const currentScrollY = window.scrollY;
        const delta = currentScrollY - prevScrollY;
        prevScrollY = currentScrollY;

        // Only apply upward impulse on scroll down — let gravity handle scroll up
        if (delta > 0.5) {
          const force = Math.min(delta * 0.0012, 0.012);
          Body.applyForce(figure, figure.position, { x: 0, y: -force });
        }

        // Cap upward velocity so figure stays visible
        if (figure.velocity.y < MAX_UP_VEL) {
          Body.setVelocity(figure, { x: 0, y: MAX_UP_VEL });
        }

        // relY: 0 = on mat, negative = above mat
        const relY = figure.position.y - REST_Y;

        if (figureRef.current) {
          figureRef.current.setAttribute("transform", `translate(0, ${relY})`);
        }

        if (matRef.current) {
          // Compress mat proportionally to impact — springs back as figure rises
          const compression = Math.max(0, 1 - Math.abs(relY) / 10);
          const sag = 6 + compression * 16;
          matRef.current.setAttribute("d", `M10,0 Q50,${sag} 90,0`);
        }

        rafId = requestAnimationFrame(tick);
      }

      rafId = requestAnimationFrame(tick);
    });

    return () => {
      stopped = true;
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className="fixed bottom-4 right-6 z-50 hidden md:block"
      style={{ filter: "drop-shadow(0 1px 6px rgba(255,255,255,0.8))" }}
    >
      <svg
        width="100"
        height="175"
        viewBox="0 0 100 175"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        {/* Panáček — resting: feet at y=125, translate(0,0) */}
        <g ref={figureRef}>
          <circle cx="50" cy="88" r="9" stroke={COLOR} strokeWidth="2.5" />
          <line x1="50" y1="97"  x2="50" y2="114" stroke={COLOR} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="50" y1="104" x2="36" y2="113" stroke={COLOR} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="50" y1="104" x2="64" y2="113" stroke={COLOR} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="50" y1="114" x2="41" y2="125" stroke={COLOR} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="50" y1="114" x2="59" y2="125" stroke={COLOR} strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Trampolína */}
        <line x1="10" y1="125" x2="90" y2="125" stroke={COLOR} strokeWidth="3" strokeLinecap="round" />
        <path
          ref={matRef}
          d="M10,0 Q50,6 90,0"
          stroke={COLOR}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          transform="translate(0, 125)"
        />
        <line x1="16" y1="125" x2="5"  y2="163" stroke={COLOR} strokeWidth="3" strokeLinecap="round" />
        <line x1="84" y1="125" x2="95" y2="163" stroke={COLOR} strokeWidth="3" strokeLinecap="round" />
        <line x1="1"  y1="163" x2="19" y2="163" stroke={COLOR} strokeWidth="3" strokeLinecap="round" />
        <line x1="81" y1="163" x2="99" y2="163" stroke={COLOR} strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}
