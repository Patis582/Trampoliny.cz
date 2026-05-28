import { getTrainers } from '@/sanity/lib/queries'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { TrainerCard } from '@/components/trainers/TrainerCard'
import { SectionError } from '@/components/ui/SectionError'

export default async function TreneriPage() {
  const trainers = await getTrainers()

  return (
    <div className="font-body-md antialiased bg-white min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>
      <main className="pt-40 pb-section-padding-mobile md:pb-section-padding-desktop">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="mb-16">
            <span className="inline-block text-brand-orange font-label-bold text-label-bold uppercase tracking-widest mb-6">
              Realizační tým
            </span>
            <h1 className="font-headline-md-mobile text-headline-md-mobile md:font-headline-md md:text-headline-md text-border-dark uppercase tracking-tight">
              Naši trenéři
            </h1>
          </div>
          {trainers === null ? (
            <SectionError message="Trenéři se momentálně nepodařilo načíst. Zkuste obnovit stránku." />
          ) : trainers.length === 0 ? (
            <p className="font-body-md text-on-surface-variant font-light">Trenéři brzy přibydou.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {trainers.map((trainer) => (
                <TrainerCard key={trainer._id} trainer={trainer} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
