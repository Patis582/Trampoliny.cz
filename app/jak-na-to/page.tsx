import Image from 'next/image'
import { Footer } from '@/components/layout/Footer'
import { getSiteConfig } from '@/sanity/lib/queries'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Jak se přihlásit přes EOS",
  description:
    "Krok za krokem jak se přihlásit na aktivity přes online systém EOS — vytvořte účet, vyberte aktivitu a za pár minut máte dítě přihlášené.",
  openGraph: {
    title: "Jak se přihlásit přes EOS | Trampolíny.cz",
    description:
      "Krok za krokem jak se přihlásit na aktivity přes online systém EOS — vytvořte účet, vyberte aktivitu a za pár minut máte dítě přihlášené.",
    url: "https://trampoliny.cz/jak-na-to",
  },
  alternates: { canonical: "https://trampoliny.cz/jak-na-to" },
};

const steps = [
  {
    number: '01',
    title: 'Otevři přihlašovací stránku',
    description: 'Klikni na tlačítko „Přihlásit se do EOS" níže na této stránce nebo přejdi přímo na eos.trampoliny.cz.',
    image: '/eos-login.png' as string | null,
  },
  {
    number: '02',
    title: 'Jsi tu nový?',
    description: 'Pokud ještě nemáš účet, klikni na „Registrace" a vyplň své údaje včetně výběru kroužku/týmu. Odešli a vyčkej, až tě správce zaregistruje a odsouhlasí. Poté obdržíš na email nebo do aplikace přístup.',
    image: '/eos-vyber-tymu-novy.png' as string | null,
  },
  {
    number: '03',
    title: 'Již jsi členem oddílu?',
    description: 'Pokud jsi již členem oddílu, klikni na „Přihlásit se". Poté budeš vyzván ke kontrole údajů a na konci si vybereš kroužek/tým, do kterého chceš dítě přihlásit. Po schválení správcem obdržíš informaci o zařazení do kroužku/týmu.',
    image: '/eos-vyber-tymu-clen.png' as string | null,
  },
  {
    number: '04',
    title: 'Změna kroužku nebo zařazení do dalšího kroužku',
    description: 'V případě, že chceš přejít do dalšího kroužku nebo změnit již vybraný kroužek, stiskni v systému pod kalendářem „Nový požadavek" a vyber jakou změnu chceš udělat. Odešli a správce v nejbližší době požadavek vyřídí.',
    image: '/eos-novy-pozadavek.png' as string | null,
  },
]

export default async function JakNaToPage() {
  const config = await getSiteConfig()
  const eosUrl = config.eosLoginUrl ?? 'https://eos.trampoliny.cz/'

  return (
    <div className="font-body-md antialiased bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-border-dark pt-24 pb-16 md:pt-40 md:pb-20">
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

      <main>
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

                  {/* Screenshot — mobilní portrait */}
                  <div className={`flex justify-center ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
                    <div className="relative w-56 md:w-64 aspect-[9/19] shadow-xl rounded-2xl overflow-hidden border border-surface-container-high">
                      <Image
                        src={step.image!}
                        alt={step.title}
                        fill
                        unoptimized
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 448px, 512px"
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-border-dark py-section-padding-mobile md:py-section-padding-desktop">
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
      </main>

      <Footer />
    </div>
  )
}
