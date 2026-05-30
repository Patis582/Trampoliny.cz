import Image from 'next/image'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { getSiteConfig } from '@/sanity/lib/queries'

const steps = [
  {
    number: '01',
    title: 'Otevři přihlašovací stránku',
    description: 'Klikni na tlačítko „Přihlásit se do EOS" níže na této stránce nebo přejdi přímo na eos.trampoliny.cz.',
    image: null as string | null,
  },
  {
    number: '02',
    title: 'Vytvoř si účet nebo se přihlas',
    description: 'Pokud ještě nemáš účet, klikni na „Registrace" a vyplň své údaje. Pokud účet máš, přihlas se emailem a heslem.',
    image: null as string | null,
  },
  {
    number: '03',
    title: 'Vyber aktivitu',
    description: 'Po přihlášení najdi aktivitu, do které chceš přihlásit své dítě, a klikni na „Přihlásit".',
    image: null as string | null,
  },
  {
    number: '04',
    title: 'Dokončení přihlášky',
    description: 'Vyplň potřebné údaje o dítěti a odešli přihlášku. Potvrzení přijde na tvůj email.',
    image: null as string | null,
  },
]

export default async function JakNaToPage() {
  const config = await getSiteConfig()
  const eosUrl = config?.eosLoginUrl ?? 'https://eos.trampoliny.cz/'

  return (
    <div className="font-body-md antialiased bg-white min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>

      {/* Hero */}
      <section className="bg-border-dark pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-container-max mx-auto px-gutter">
          <span className="inline-block text-brand-orange font-label-bold text-label-bold uppercase tracking-widest mb-4">
            Registrace
          </span>
          <h1 className="font-headline-md-mobile text-headline-md-mobile md:font-headline-md md:text-headline-md text-white uppercase tracking-tight mb-6">
            Jak se přihlásit přes EOS
          </h1>
          <p className="text-white/60 font-light max-w-xl leading-relaxed">
            EOS je náš online systém pro přihlašování na aktivity. Stačí si vytvořit účet a za pár minut máš dítě přihlášené.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-section-padding-mobile md:py-section-padding-desktop">
        <div className="max-w-container-max mx-auto px-gutter space-y-20 md:space-y-32">
          {steps.map((step, i) => {
            const isEven = i % 2 === 1
            return (
              <div
                key={step.number}
                className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center ${isEven ? 'md:[&>*:first-child]:order-2' : ''}`}
              >
                {/* Text */}
                <div>
                  <span className="font-bold text-[56px] md:text-[72px] text-brand-orange leading-none block mb-5 tracking-tighter">
                    {step.number}
                  </span>
                  <h2 className="font-headline-sm-mobile text-headline-sm-mobile md:font-headline-sm md:text-headline-sm text-border-dark uppercase tracking-tight mb-4">
                    {step.title}
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Screenshot */}
                <div className="border border-surface-container-high shadow-sm overflow-hidden bg-surface-container-lowest">
                  <div className="relative aspect-[16/10]">
                    {step.image ? (
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                        <span className="text-outline text-[10px] font-label-bold uppercase tracking-widest">
                          Screenshot
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-border-dark py-20">
        <div className="max-w-container-max mx-auto px-gutter flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="inline-block text-brand-orange font-label-bold text-label-bold uppercase tracking-widest mb-4">
              Připraven/a?
            </span>
            <h2 className="font-headline-sm-mobile text-headline-sm-mobile md:font-headline-sm md:text-headline-sm text-white uppercase tracking-tight">
              Otevřít EOS
            </h2>
          </div>
          <a
            href={eosUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-3 bg-brand-orange text-white font-label-bold uppercase tracking-widest px-8 py-4 text-[11px] hover:bg-white hover:text-border-dark transition-colors"
          >
            Přihlásit se do EOS
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
