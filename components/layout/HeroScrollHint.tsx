"use client";

import { useEffect, useRef } from "react";

const FIGURE_RADIUS = 10;
const MAT_Y = 200;
const MAT_HEIGHT = 150;
const REST_Y = MAT_Y - FIGURE_RADIUS;
const COLOR = "#0f1f45";

// Limb tip endpoints (x2,y2) for each pose
const REST = { lArmX: 36, lArmY: 113, rArmX: 64, rArmY: 113, lLegX: 41, lLegY: 125, rLegX: 59, rLegY: 125 };
const UP   = { lArmX: 40, lArmY: 96,  rArmX: 60, rArmY: 96,  lLegX: 43, lLegY: 127, rLegX: 57, rLegY: 127 };
const WIDE = { lArmX: 27, lArmY: 104, rArmX: 73, rArmY: 104, lLegX: 42, lLegY: 127, rLegX: 58, rLegY: 127 };

function lerp(a: number, b: number, t: number) { return a + t * (b - a); }

export function HeroScrollHint() {
  const figureRef   = useRef<SVGGElement>(null);
  const matRef      = useRef<SVGPathElement>(null);
  const leftArmRef  = useRef<SVGLineElement>(null);
  const rightArmRef = useRef<SVGLineElement>(null);
  const leftLegRef  = useRef<SVGLineElement>(null);
  const rightLegRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    let rafId: number;
    let stopped = false;

    import("matter-js").then((Matter) => {
      if (stopped) return;
      const { Engine, Runner, Bodies, Body, Composite } = Matter;

      const engine = Engine.create({ gravity: { y: 1.4 } });

      const mat = Bodies.rectangle(50, MAT_Y + MAT_HEIGHT / 2, 80, MAT_HEIGHT, {
        isStatic: true, restitution: 0.75, friction: 0, label: "mat",
      });

      const figure = Bodies.circle(50, REST_Y, FIGURE_RADIUS, {
        restitution: 0.75, friction: 0, frictionAir: 0.015, label: "figure",
      });

      Composite.add(engine.world, [mat, figure]);
      const runner = Runner.create();
      Runner.run(runner, engine);

      let prevScrollY = window.scrollY;
      const MAX_UP_VEL = -5;

      function tick() {
        if (stopped) return;

        const currentScrollY = window.scrollY;
        const delta = currentScrollY - prevScrollY;
        prevScrollY = currentScrollY;

        if (delta > 0.5) {
          const force = Math.min(delta * 0.0005, 0.005);
          Body.applyForce(figure, figure.position, { x: 0, y: -force });
        }

        if (figure.velocity.y < MAX_UP_VEL) {
          Body.setVelocity(figure, { x: 0, y: MAX_UP_VEL });
        }

        const relY = figure.position.y - REST_Y;
        const velY = figure.velocity.y;

        // 0 = on mat, 1 = fully in air (at 40px above mat)
        const airFactor = Math.max(0, Math.min(1, -relY / 40));
        // -1 = rising fast, +1 = falling fast
        const vNorm = Math.max(-1, Math.min(1, velY / 3));
        // inAirT: 0 = falling/peak, 1 = rising fast
        const inAirT = Math.max(0, -vNorm);

        // In-air pose: blend between WIDE (falling/peak) and UP (rising)
        const airLArmX = lerp(WIDE.lArmX, UP.lArmX, inAirT);
        const airLArmY = lerp(WIDE.lArmY, UP.lArmY, inAirT);
        const airRArmX = lerp(WIDE.rArmX, UP.rArmX, inAirT);
        const airRArmY = lerp(WIDE.rArmY, UP.rArmY, inAirT);
        const airLLegX = lerp(WIDE.lLegX, UP.lLegX, inAirT);
        const airLLegY = lerp(WIDE.lLegY, UP.lLegY, inAirT);
        const airRLegX = lerp(WIDE.rLegX, UP.rLegX, inAirT);
        const airRLegY = lerp(WIDE.rLegY, UP.rLegY, inAirT);

        // Final blend: rest ↔ air pose
        const lArmX = lerp(REST.lArmX, airLArmX, airFactor);
        const lArmY = lerp(REST.lArmY, airLArmY, airFactor);
        const rArmX = lerp(REST.rArmX, airRArmX, airFactor);
        const rArmY = lerp(REST.rArmY, airRArmY, airFactor);
        const lLegX = lerp(REST.lLegX, airLLegX, airFactor);
        const lLegY = lerp(REST.lLegY, airLLegY, airFactor);
        const rLegX = lerp(REST.rLegX, airRLegX, airFactor);
        const rLegY = lerp(REST.rLegY, airRLegY, airFactor);

        // Subtle body lean while in air
        const lean = vNorm * airFactor * 5;

        if (figureRef.current) {
          figureRef.current.setAttribute(
            "transform",
            `translate(0, ${relY}) rotate(${lean}, 50, 106)`
          );
        }
        leftArmRef.current?.setAttribute("x2",  lArmX.toFixed(1));
        leftArmRef.current?.setAttribute("y2",  lArmY.toFixed(1));
        rightArmRef.current?.setAttribute("x2", rArmX.toFixed(1));
        rightArmRef.current?.setAttribute("y2", rArmY.toFixed(1));
        leftLegRef.current?.setAttribute("x2",  lLegX.toFixed(1));
        leftLegRef.current?.setAttribute("y2",  lLegY.toFixed(1));
        rightLegRef.current?.setAttribute("x2", rLegX.toFixed(1));
        rightLegRef.current?.setAttribute("y2", rLegY.toFixed(1));

        if (matRef.current) {
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

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroHeight = window.innerHeight * 0.9;
    function onScroll() {
      if (!containerRef.current) return;
      const progress = Math.min(1, window.scrollY / (heroHeight * 0.5));
      containerRef.current.style.opacity = String((1 - progress) * 0.45 + 0.08);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-4 right-6 z-50 hidden md:block transition-opacity duration-300"
      style={{ opacity: 0.45 }}
    >
      <svg
        width="80"
        height="140"
        viewBox="0 0 100 175"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        {/* Panáček */}
        <g ref={figureRef}>
          <circle cx="50" cy="88" r="9" stroke={COLOR} strokeWidth="3.5" />
          <line x1="50" y1="97"  x2="50"  y2="114" stroke={COLOR} strokeWidth="3.5" strokeLinecap="round" />
          <line ref={leftArmRef}  x1="50" y1="104" x2="36" y2="113" stroke={COLOR} strokeWidth="3.5" strokeLinecap="round" />
          <line ref={rightArmRef} x1="50" y1="104" x2="64" y2="113" stroke={COLOR} strokeWidth="3.5" strokeLinecap="round" />
          <line ref={leftLegRef}  x1="50" y1="114" x2="41" y2="125" stroke={COLOR} strokeWidth="3.5" strokeLinecap="round" />
          <line ref={rightLegRef} x1="50" y1="114" x2="59" y2="125" stroke={COLOR} strokeWidth="3.5" strokeLinecap="round" />
        </g>

        {/* Trampolína */}
        <line x1="10" y1="125" x2="90" y2="125" stroke={COLOR} strokeWidth="4" strokeLinecap="round" />
        <path
          ref={matRef}
          d="M10,0 Q50,6 90,0"
          stroke={COLOR}
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          transform="translate(0, 125)"
        />
        <line x1="16" y1="125" x2="5"  y2="163" stroke={COLOR} strokeWidth="4" strokeLinecap="round" />
        <line x1="84" y1="125" x2="95" y2="163" stroke={COLOR} strokeWidth="4" strokeLinecap="round" />
        <line x1="1"  y1="163" x2="19" y2="163" stroke={COLOR} strokeWidth="4" strokeLinecap="round" />
        <line x1="81" y1="163" x2="99" y2="163" stroke={COLOR} strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>
  );
}
