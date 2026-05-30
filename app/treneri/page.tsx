import { getTrainers } from '@/sanity/lib/queries'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { TrainerCard } from '@/components/trainers/TrainerCard'
import { SectionError } from '@/components/ui/SectionError'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export default async function TreneriPage() {
  const trainers = await getTrainers()

  return (
    <div className="font-body-md antialiased bg-white min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>

      {/* ── HERO ── */}
      <section className="bg-border-dark pt-24 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-container-max mx-auto px-gutter">
          <span className="inline-block text-brand-orange font-label-bold text-label-bold uppercase tracking-widest mb-4">
            Realizační tým
          </span>
          <h1
            className="font-black uppercase tracking-tight leading-none text-white mb-6"
            style={{ fontSize: "clamp(40px, 6vw, 80px)", letterSpacing: "-0.03em" }}
          >
            Naši trenéři
          </h1>
          <p
            className="text-white/55 font-light max-w-xl leading-relaxed"
            style={{ fontSize: "clamp(14px, 1.1vw, 17px)" }}
          >
            Lidé, kteří stojí za každým skokem, tréninkem a závodem.
          </p>
        </div>
      </section>

      {/* ── GRID ── */}
      <main className="py-section-padding-mobile md:py-section-padding-desktop">
        <div className="max-w-container-max mx-auto px-gutter">
          {trainers === null ? (
            <SectionError message="Trenéři se momentálně nepodařilo načíst. Zkuste obnovit stránku." />
          ) : trainers.length === 0 ? (
            <p className="text-on-surface-variant font-light">Trenéři brzy přibydou.</p>
          ) : (
            <ScrollReveal>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-10">
                {trainers.map((trainer) => (
                  <TrainerCard key={trainer._id} trainer={trainer} />
                ))}
              </div>
            </ScrollReveal>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
