"use client";

import { useState } from "react";

type TabKey = "sportovec" | "trener" | "rodic";

const TABS: { key: TabKey; label: string }[] = [
  { key: "sportovec", label: "Sportovec" },
  { key: "trener",    label: "Trenér" },
  { key: "rodic",     label: "Rodič" },
];

const CONTENT: Record<TabKey, string[]> = {
  sportovec: [
    "Chovám se slušně, přátelsky a sportovně, v duchu fair play.",
    "Svým slušným chováním reprezentuji klub nejen na trénincích, ale i ve škole a na veřejnosti.",
    "Na akce spojené s oddílem oblékám oddílové triko nebo soupravu.",
    "Plně respektuji své trenéry.",
    "K majetku a náčiní ve sportovních halách se chovám tak, jako by se jednalo o moje věci.",
    "V tréninku poslouchám pokynů trenéra a neohrožuji bezpečnost svou ani nikoho jiného.",
    "V tréninku pracuji naplno.",
    "Pokud se necítím dobře, informuji o tom svého trenéra.",
    "Jsem zodpovědný sám za sebe a za své věci.",
    "Na tréninky chodím včas, pokud nemohu přijít, předem se omluvím.",
    "Včas potvrzuji nominaci na závody.",
    "Pokud něčemu nerozumím, nebojím se oslovit svého trenéra.",
    "Trenéra oslovuji dle dohody, nejlépe: \"Trenére\" / \"Trenérko\".",
    "Sleduji oddílovou aplikaci EOS.",
  ],
  trener: [
    "Jsem si dobře vědom/a toho, že za děti přebírám odpovědnost.",
    "Dbám na bezpečnost dětí i okolí.",
    "Respektuji doporučení lékaře, pokud takové je.",
    "Spoluvytvářím příjemné prostředí, kam se děti rády vrací.",
    "Vedu děti vlastním příkladem.",
    "Jsem spravedlivá/ý a jsem pro děti vzorem.",
    "Na tréninky chodím včas a pečlivě se na ně připravuji.",
    "Jsem jim příkladem ve všem (nosím oddílové oblečení, nenosím řetízky, nežvýkám apod.).",
    "Před zahájením tréninku zkontroluji, že cvičební plochy a trampolíny jsou bezpečně zajištěny.",
    "Sportovní pomůcky mnou použité vracím na místo jim určené.",
    "Udržuji pořádek v tělocvičnách.",
    "Učím děti, že pravidla jsou vzájemnou dohodou, kterou nikdo nemůže porušovat.",
    "Jsem velkorysá/ý, co se pochvaly týče. Svěřence neurážím, neshazuji a nevysmívám se jim.",
    "Na děti nekřičím. Na druhou stranu jsem přísná/ý a mám přiměřené nároky.",
    "Vedu děti tak, aby je pohyb naplňoval a přinášel jim radost.",
    "Snažím se předat co nejvíce ze svých znalostí a zkušeností, zároveň trénuji formou zábavy.",
    "Beru ohled na cíle a motivace každého jedince.",
    "Stále pracuji na svém rozvoji, absolvuji trenérské kurzy a semináře.",
    "Vyžaduji zpětnou vazbu a umím ji přijmout. Nikdo se nesmí bát za mnou přijít.",
    "Snažím se o optimální souhru trojúhelníku sportovec – trenér – rodič.",
    "Informuji rodiče i vedení oddílu o všem nezbytném.",
  ],
  rodic: [
    "Společně s trenéry jsme partnery, kteří děti vedou a učí.",
    "Respektuji rozhodnutí trenéra.",
    "Nezpochybňuji autoritu trenéra před dítětem.",
    "Pokud je v tělocvičně trenér, nevyjadřuji se negativně k situacím.",
    "Neradím — cílem je, aby si děti dokázaly poradit samy a vnímaly pokyny trenéra.",
    "Trenérům důvěřuji.",
    "Nevyjadřuji se negativně k ostatním závodníkům při závodech.",
    "Snažím se podporovat zdravé sportovní prostředí.",
    "Fandím a podporuji své dítě.",
    "Trénink by neměl být trestem za nevhodné chování.",
    "Dbám na správnou životosprávu dítěte, stravu, pitný režim a spánek.",
    "Šířím dobré jméno oddílu.",
    "Pokud mám výhrady, řeším to s hlavním trenérem nebo vedením oddílu.",
    "Plním včas své závazky (náklady na sportovní přípravu, závody a oddílové akce).",
    "Sleduji klubové nástěnky, web a klubovou aplikaci.",
  ],
};

const TAB_KEYS = TABS.map((t) => t.key);

export function EtickyKodex() {
  const [active, setActive] = useState<TabKey>("sportovec");

  function handleKeyDown(e: React.KeyboardEvent, currentKey: TabKey) {
    const idx = TAB_KEYS.indexOf(currentKey);
    let next: number | null = null;
    if (e.key === "ArrowRight") next = (idx + 1) % TAB_KEYS.length;
    if (e.key === "ArrowLeft")  next = (idx - 1 + TAB_KEYS.length) % TAB_KEYS.length;
    if (e.key === "Home")       next = 0;
    if (e.key === "End")        next = TAB_KEYS.length - 1;
    if (next !== null) {
      e.preventDefault();
      setActive(TAB_KEYS[next]);
      (document.getElementById(`kodex-tab-${TAB_KEYS[next]}`) as HTMLButtonElement)?.focus();
    }
  }

  return (
    <div>
      {/* Tab přepínač */}
      <div role="tablist" aria-label="Skupiny etického kodexu" className="flex border-b border-outline mb-8">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            role="tab"
            id={`kodex-tab-${key}`}
            aria-selected={active === key}
            aria-controls={`kodex-panel-${key}`}
            tabIndex={active === key ? 0 : -1}
            onClick={() => setActive(key)}
            onKeyDown={(e) => handleKeyDown(e, key)}
            className={[
              "px-6 py-3 font-label-bold text-[11px] uppercase tracking-widest transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange",
              active === key
                ? "border-b-2 border-brand-orange text-border-dark -mb-px"
                : "text-on-surface-variant hover:text-border-dark",
            ].join(" ")}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Obsah aktivního tabu */}
      <ul
        role="tabpanel"
        id={`kodex-panel-${active}`}
        aria-labelledby={`kodex-tab-${active}`}
        tabIndex={0}
        className="space-y-3 mb-10 max-w-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
      >
        {CONTENT[active].map((item, i) => (
          <li key={`${active}-${i}`} className="flex gap-3 items-baseline">
            <span aria-hidden="true" className="text-brand-orange font-black text-sm shrink-0 leading-relaxed">—</span>
            <span className="text-on-surface-variant font-light leading-relaxed" style={{ fontSize: "clamp(14px, 1vw, 16px)" }}>
              {item}
            </span>
          </li>
        ))}
      </ul>

      {/* PDF stažení */}
      <a
        href="/eticky-kodex-tl.pdf"
        download="Etický kodex Trampolíny Liberec.pdf"
        className="inline-flex items-center gap-3 border-t-2 border-brand-orange bg-transparent text-border-dark font-label-bold text-[11px] uppercase tracking-widest px-6 py-4 hover:bg-brand-orange hover:text-white transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
      >
        Stáhnout kodex (PDF)
        <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </a>
    </div>
  );
}
