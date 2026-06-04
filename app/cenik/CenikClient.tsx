"use client";

import { useState } from "react";
import { PricingSection } from "@/components/pricing/PricingSection";
import type { PricingSection as PricingSectionType } from "@/sanity/lib/queries";

export function CenikClient({ sections }: { sections: PricingSectionType[] }) {
  const [active, setActive] = useState(0);

  return (
    <>
      {/* Tabs */}
      <div className="bg-white py-10 md:py-14">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="flex flex-wrap gap-3">
            {sections.map((section, i) => (
              <button
                key={section._id}
                onClick={() => setActive(i)}
                className={`font-label-bold text-[11px] uppercase tracking-widest px-6 py-3 border-2 transition-all duration-200 ${
                  active === i
                    ? "bg-border-dark border-border-dark text-white"
                    : "bg-white border-surface-container-high text-outline hover:border-border-dark hover:text-border-dark"
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active section */}
      <main>
        <PricingSection key={sections[active]._id} section={sections[active]} first />
      </main>
    </>
  );
}
