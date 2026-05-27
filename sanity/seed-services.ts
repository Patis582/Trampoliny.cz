import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const client = createClient({
  projectId: 'bct8834j',
  dataset: 'production',
  apiVersion: '2026-05-27',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const services = [
  { title: 'Závodní družstvo', description: 'Výkonnostní trénink pro sportovce, kteří se účastní oblastních, národních i mezinárodních závodů — Český pohár, Mistrovství republiky a Evropy. Nejlepší členové jsou součástí reprezentace.', brand: 'liberec', accent: 'orange', order: 1 },
  { title: 'Přípravky', description: 'Pohybová průprava pro děti od 4 do 7 let. Základy gymnastiky a trampolíny v délce 90 minut, zaměřené na vytvoření pozitivního vztahu k pohybu. Centrum Orionka.', brand: 'liberec', accent: 'orange', order: 2 },
  { title: 'Sportovní kroužek', description: 'Trénink základů gymnastiky a trampolíny pro děti od 6 do 18 let. Podle zájmu se mohou účastnit místních a oblastních závodů.', brand: 'liberec', accent: 'orange', order: 3 },
  { title: 'Parkour', description: 'Specializované kempy parkouru otevřené členům i veřejnosti. Učíme pohyb, odvahu a koordinaci v bezpečném prostředí haly.', brand: 'liberec', accent: 'orange', order: 4 },
  { title: 'Soustředění', description: 'Dva pobytové kempy pro závodní družstva — kondiční soustředění v Habarticích a trampolínové soustředění v centru Orionka.', brand: 'liberec', accent: 'orange', order: 5 },
  { title: 'Otevřené hodiny', description: 'Volné hodiny pro veřejnost pravidelně v obou halách — Pondělí 16–18 hod. (Orionka) a Sobota 10–13 hod. (Nádraží). Mimo letních prázdnin.', brand: 'patrman', accent: 'green', order: 6 },
  { title: 'Cvičení rodičů a dětí', description: 'Lekce pro rodiče s malými dětmi kombinující základy gymnastiky a trampolíny. Úterý 9:30–10:30 (Orionka) a Středa 9:30–10:30 (Nádraží).', brand: 'patrman', accent: 'green', order: 7 },
  { title: 'Oslavy narozenin', description: 'Narozeninová párty s instruktorem, který děti provede soutěžemi a naučí základy skoků formou hry. Rodiče si mezitím odpočinou na recepci.', brand: 'patrman', accent: 'green', order: 8 },
  { title: 'Badminton', description: 'Pronájem kurtu s možností zapůjčení raket a košíčků. Ideální doplněk trampolínového tréninku nebo oddechová aktivita.', brand: 'patrman', accent: 'green', order: 9 },
  { title: 'Eventy', description: 'Trampolínová vystoupení na míru — firemní akce, soukromé párty i veřejné události. Profesionální show kdekoliv.', brand: 'patrman', accent: 'green', order: 10 },
  { title: 'Tábory, kempy a workshopy', description: 'Vícedenní programy o prázdninách s trampolínami, lezeckou stěnou, výlety a pestrými aktivitami pod vedením zkušených instruktorů.', brand: 'patrman', accent: 'green', order: 11 },
  { title: 'MŠ, ZŠ a SŠ', description: 'Pohybové lekce pro školy a školky přizpůsobené věku žáků — základy gymnastiky, koordinace a trampolínové prvky pod odborným dohledem.', brand: 'patrman', accent: 'green', order: 12 },
  { title: 'Sportovní kluby a skupiny', description: 'Tréninky pro sportovní organizace zaměřené na koordinaci a prostorovou orientaci. Profesionální vedení pro kluby a kolektivy.', brand: 'patrman', accent: 'green', order: 13 },
  { title: 'Cvičení pro dospělé', description: 'Pravidelné lekce ve středu 18:00–19:30 zaměřené na rozvoj dovedností a kondice pro dospělé začátečníky i pokročilé.', brand: 'patrman', accent: 'green', order: 14 },
  { title: 'Pronájem sportovišť', description: 'Dvě haly s trampolínami, gymnastickým nářadím a lezeckou stěnou k dispozici pro pronájem skupinám, klubům i firemním akcím.', brand: 'patrman', accent: 'green', order: 15 },
  { title: 'Vzdělávání – workshopy', description: 'Odborné kurzy pro trenéry a pedagogy zaměřené na bezpečné metody výuky a pozitivní přístup k vedení sportovních skupin.', brand: 'patrman', accent: 'green', order: 16 },
]

async function seed() {
  console.log(`Nahrávám ${services.length} služeb do Sanity...`)

  for (const s of services) {
    const doc = await client.create({ _type: 'service', ...s })
    console.log(`✔ ${s.order}. ${s.title} (${doc._id})`)
  }

  console.log('\nHotovo!')
}

seed().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
