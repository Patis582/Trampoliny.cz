# Etický kodex Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Přidat sekci „Etický kodex" s přepínacími taby (Sportovec / Trenér / Rodič) a PDF stažením na stránku `/trampoliny-liberec`.

**Architecture:** Nová client komponenta `EtickyKodex` se třemi hardcoded taby a `useState` pro přepínání. Sekce vložena do `trampoliny-liberec/page.tsx` mezi Aktivity a CTA. PDF se generuje z existujícího .docx přes AppleScript + Word.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4

---

### Task 1: Konvertovat DOCX na PDF

**Files:**
- Create: `public/eticky-kodex-tl.pdf` (výstup konverze)

- [ ] **Krok 1: Spustit AppleScript konverzi přes Word**

```bash
osascript <<'EOF'
set inputPath to POSIX file "/Users/filippatrman/Documents/WEBY/Zakazky/trampolinycz/public/Kodex sportovce trenéra rodiče TL.docx"
set outputPath to "/Users/filippatrman/Documents/WEBY/Zakazky/trampolinycz/public/eticky-kodex-tl.pdf"

tell application "Microsoft Word"
  set doc to open inputPath
  save as doc file name outputPath file format format PDF
  close doc saving no
end tell
EOF
```

- [ ] **Krok 2: Ověřit existenci souboru**

```bash
ls -lh /Users/filippatrman/Documents/WEBY/Zakazky/trampolinycz/public/eticky-kodex-tl.pdf
```

Očekávaný výstup: soubor existuje, velikost cca 50–200 kB.

- [ ] **Krok 3: Commit PDF**

```bash
git add public/eticky-kodex-tl.pdf
git commit -m "asset: etický kodex PDF pro stažení"
```

---

### Task 2: Vytvořit komponentu EtickyKodex

**Files:**
- Create: `components/liberec/EtickyKodex.tsx`

- [ ] **Krok 1: Vytvořit soubor komponenty**

Vytvoř `components/liberec/EtickyKodex.tsx` s tímto obsahem:

```tsx
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
    "Trenéra oslovuji dle dohody, nejlépe: „Trenére" / „Trenérko".",
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

export function EtickyKodex() {
  const [active, setActive] = useState<TabKey>("sportovec");

  return (
    <div>
      {/* Tab přepínač */}
      <div className="flex border-b border-outline mb-8">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={[
              "px-6 py-3 font-label-bold text-[11px] uppercase tracking-widest transition-colors cursor-pointer",
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
      <ul className="space-y-3 mb-10 max-w-2xl">
        {CONTENT[active].map((item, i) => (
          <li key={i} className="flex gap-3 items-baseline">
            <span className="text-brand-orange font-black text-sm shrink-0 leading-relaxed">—</span>
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
        className="inline-flex items-center gap-3 border-t-2 border-brand-orange bg-transparent text-border-dark font-label-bold text-[11px] uppercase tracking-widest px-6 py-4 hover:bg-brand-orange hover:text-white transition-all duration-300 cursor-pointer"
      >
        Stáhnout kodex (PDF)
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </a>
    </div>
  );
}
```

- [ ] **Krok 2: TypeScript check**

```bash
npx tsc --noEmit 2>&1
```

Očekávaný výstup: žádné chyby.

- [ ] **Krok 3: Commit**

```bash
git add components/liberec/EtickyKodex.tsx
git commit -m "feat(liberec): EtickyKodex komponenta — taby sportovec/trenér/rodič + PDF"
```

---

### Task 3: Integrovat sekci do stránky Liberec

**Files:**
- Modify: `app/trampoliny-liberec/page.tsx`

- [ ] **Krok 1: Přidat import**

Na řádku kde jsou ostatní importy v `app/trampoliny-liberec/page.tsx` přidej:

```tsx
import { EtickyKodex } from "@/components/liberec/EtickyKodex";
```

- [ ] **Krok 2: Vložit sekci mezi Aktivity a CTA**

Za uzavírací `</section>` sekce Aktivity (`id="aktivity"`) a před sekci CTA (`bg-brand-navy-deep`) vlož:

```tsx
      {/* ── ETICKÝ KODEX ── */}
      <section className="py-section-padding-mobile md:py-section-padding-desktop bg-surface-container-lowest" id="kodex">
        <div className="max-w-container-max mx-auto px-gutter">
          <ScrollReveal className="mb-12">
            <span className="inline-block font-label-bold text-label-bold uppercase tracking-widest text-brand-orange mb-6">
              Pravidla oddílu
            </span>
            <h2
              className="font-black uppercase tracking-tight leading-none text-border-dark"
              style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
            >
              Etický <span className="font-medium">kodex</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <EtickyKodex />
          </ScrollReveal>
        </div>
      </section>
```

- [ ] **Krok 3: TypeScript check**

```bash
npx tsc --noEmit 2>&1
```

Očekávaný výstup: žádné chyby.

- [ ] **Krok 4: Commit**

```bash
git add app/trampoliny-liberec/page.tsx
git commit -m "feat(liberec): přidat sekci Etický kodex na stránku"
```

---

### Task 4: Push

- [ ] **Krok 1: Push do v2-redesign**

```bash
git push origin v2-redesign
```

---

## Manuální ověření

Po implementaci ověřit na `http://localhost:3000/trampoliny-liberec`:

1. Sekce „Etický kodex" je vidět mezi Aktivity a CTA
2. Kliknutím na tab Trenér se přepne obsah
3. Kliknutím na tab Rodič se přepne obsah
4. Tlačítko „Stáhnout kodex" spustí stažení PDF
5. Na mobilu jsou taby čitelné a scroll funguje
