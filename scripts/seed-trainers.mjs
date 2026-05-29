import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const client = createClient({
  projectId: 'bct8834j',
  dataset: 'production',
  apiVersion: '2026-05-27',
  token: 'skSk9mE6fAxRYg1nmbvJEStnL43joBB59R9yZYLWp0SaRvBfJYkb5C4Ixov1wqOH4j3J1VnJD1Ocz4lJsl7EzK56g7R8CwMU8Jt3DkzxICe4oIRdLCULLuvf2GcnJmRcppHgPuIU1zqglyoYPqSDOHpzUMbhZdkZTqF3hOYPzJT7CoFx8CDV',
  useCdn: false,
})

const TRAINERS = [
  {
    name: 'Eliška Zuzánková',
    slug: 'eliska-zuzankova',
    photo: 'eliska-patrmanova.jpg',
    bio: 'Trenérka skoků na trampolíně III. třídy, lektorka Acroyogy a šéftrenérka programu Děti na startu. Ve sportovní kariéře získala 2. místo na Žákovském MČR v jednotlivcích (2012), 3. místo na MČR juniorek a MČR (2013) a 1. místo v synchronní dvojici na Žákovském MČR. Profesně pracuje jako fyzioterapeutka.',
    order: 1,
  },
  {
    name: 'Monika Patrmanová',
    slug: 'monika-patrmanova',
    photo: 'monika-patrmanova.jpg',
    bio: 'Trenérka II. třídy pro skoky na trampolíně a šéftrenérka programu Děti na startu. Absolventka oboru Rekreologie na TU Liberec. Ve své práci se zaměřuje na radost z pohybu, zábavný trénink a zdravý vývoj dítěte.',
    order: 2,
  },
  {
    name: 'Kamila Brücklerová',
    slug: 'kamila-brucklerova',
    photo: 'kamila-brucklerova.jpg',
    bio: 'Trenérka zaměřená na nejmenší děti. Trenérka III. třídy pro předškolní děti a cvičení rodičů s dětmi a pro skoky na trampolíně. Šéftrenérka programu Děti na startu.',
    order: 3,
  },
  {
    name: 'Gabriel Tichý',
    slug: 'gabriel-tichy',
    photo: 'gabriel-tichy.jpg',
    bio: 'Trenér skoků na trampolíně II. třídy a fitness kondiční trenér. Závodně se věnoval atletice a startoval na Mistrovství České republiky.',
    order: 4,
  },
  {
    name: 'Veronika Arientová',
    slug: 'veronika-arientova',
    photo: 'veronika-arientova.jpg',
    bio: 'Trenérka II. třídy pro skoky na trampolíně a absolventka bakalářského studia sportu. Pracuje s každou závodnicí individuálně a vede ji k aktivnímu sportu s radostí a nadšením.',
    order: 5,
  },
  {
    name: 'Pavel Věchet',
    slug: 'pavel-vechet',
    photo: 'pavel-vechet.jpg',
    bio: 'Trenér II. třídy pro skoky na trampolíně. Absolvent bakalářského studia Sport na TU Liberec, student navazujícího oboru Trenérství a management sportu na FTK UPOL.',
    order: 6,
  },
  {
    name: 'Lenka Pešková',
    slug: 'lenka-peskova',
    photo: 'lenka-peskova.jpg',
    bio: 'Trenérka II. třídy pro skoky na trampolíně, zdravotní cvičitelka a masérka. Mistryně ČR v step-aerobiku v družstvech (2001).',
    order: 7,
  },
  {
    name: 'Radek Povýšil',
    slug: 'radek-povysil',
    photo: 'radek-povysil.jpg',
    bio: 'Trenér skoků na trampolíně III. třídy. Mistr České republiky v družstvech 2022 a celkové 3. místo v Českém poháru 2022.',
    order: 8,
  },
  {
    name: 'Marcela Šefrová',
    slug: 'marcela-sefrova',
    photo: 'marcela-sefrova.jpg',
    bio: 'Trenérka skoků na trampolíně III. třídy a asistentka trenéra reprezentace.',
    order: 9,
  },
  {
    name: 'Daniela Bendová',
    slug: 'daniela-bendova',
    photo: 'daniela-bendova.jpg',
    bio: 'Trenérka skoků na trampolíně III. třídy.',
    order: 10,
  },
  {
    name: 'Michaela Bendová',
    slug: 'michaela-bendova',
    photo: 'michela-bendova.jpg',
    bio: 'Trenérka skoků na trampolíně.',
    order: 11,
  },
  {
    name: 'Jiřina Suchá',
    slug: 'jirina-sucha',
    photo: 'jirina-sucha.jpg',
    bio: 'Trenérka skoků na trampolíně III. třídy. Učitelka druhého stupně ZŠ a metodik prevence. Jejím cílem je podpořit u dětí kladný vztah ke sportu.',
    order: 12,
  },
  {
    name: 'Lucie Šípková',
    slug: 'lucie-sipkova',
    photo: 'lucie-sipkova.jpg',
    bio: 'Trenérka skoků na trampolíně III. třídy a asistentka trenéra programu Děti na startu.',
    order: 13,
  },
  {
    name: 'Šárka Karásková',
    slug: 'sarka-karaskova',
    photo: 'sarka-karaskova.jpg',
    bio: 'Asistentka trenéra programu Děti na startu.',
    order: 14,
  },
  {
    name: 'Pavlína Březinová',
    slug: 'pavlina-brezinova',
    photo: 'pavlina-brezinova.jpg',
    bio: 'Trenérka skoků na trampolíně III. třídy.',
    order: 15,
  },
  {
    name: 'Adéla Savická',
    slug: 'adela-savicka',
    photo: 'adela-savicka.jpg',
    bio: 'Asistentka trenéra v Trampolínách Liberec.',
    order: 16,
  },
  {
    name: 'Nikola Jirgesová',
    slug: 'nikola-jirgesova',
    photo: 'nikola-jirgesova.jpg',
    bio: 'Asistentka trenéra.',
    order: 17,
  },
  {
    name: 'Michal Jun',
    slug: 'michal-jun',
    photo: 'michal-jun.jpg',
    bio: 'Trenér sportovního kroužku, osobní trenér kondičního posilování a trenér kulturistiky.',
    order: 18,
  },
  {
    name: 'Michael Morávek',
    slug: 'michael-moravek',
    photo: 'michael-moravek.jpg',
    bio: 'Trenér parkouru.',
    order: 19,
  },
  {
    name: 'Vojta Uher',
    slug: 'vojta-uher',
    photo: 'vojta-uher.jpg',
    bio: 'Trenér parkouru.',
    order: 20,
  },
]

const PHOTOS_DIR = path.join(__dirname, '../public/treneri')

async function uploadPhoto(filename) {
  const filePath = path.join(PHOTOS_DIR, filename)
  if (!fs.existsSync(filePath)) {
    console.warn(`  ⚠ Fotka nenalezena: ${filename}`)
    return null
  }
  const fileBuffer = fs.readFileSync(filePath)
  const asset = await client.assets.upload('image', fileBuffer, {
    filename,
    contentType: 'image/jpeg',
  })
  return asset._id
}

async function main() {
  console.log(`Nahrávám ${TRAINERS.length} trenérů...\n`)

  for (const trainer of TRAINERS) {
    process.stdout.write(`→ ${trainer.name} ... `)

    const assetId = await uploadPhoto(trainer.photo)

    const doc = {
      _type: 'trainer',
      name: trainer.name,
      slug: { _type: 'slug', current: trainer.slug },
      bio: trainer.bio,
      order: trainer.order,
      ...(assetId && {
        photo: {
          _type: 'image',
          asset: { _type: 'reference', _ref: assetId },
        },
      }),
    }

    await client.create(doc)
    console.log('✓')
  }

  console.log('\nHotovo!')
}

main().catch(console.error)
