import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'bct8834j',
  dataset: 'production',
  apiVersion: '2026-05-27',
  token: 'skSk9mE6fAxRYg1nmbvJEStnL43joBB59R9yZYLWp0SaRvBfJYkb5C4Ixov1wqOH4j3J1VnJD1Ocz4lJsl7EzK56g7R8CwMU8Jt3DkzxICe4oIRdLCULLuvf2GcnJmRcppHgPuIU1zqglyoYPqSDOHpzUMbhZdkZTqF3hOYPzJT7CoFx8CDV',
  useCdn: false,
})

const BIOS = {
  'eliska-zuzankova':  'Trenérka skoků na trampolíně III. třídy, lektorka Acroyogy a fyzioterapeutka. Šéftrenérka programu Děti na startu.',
  'monika-patrmanova': 'Trenérka II. třídy pro skoky na trampolíně. Šéftrenérka programu Děti na startu.',
  'kamila-brucklerova':'Trenérka III. třídy zaměřená na nejmenší děti a předškoláky. Šéftrenérka programu Děti na startu.',
  'gabriel-tichy':     'Trenér II. třídy pro skoky na trampolíně a fitness kondiční trenér.',
  'veronika-arientova':'Trenérka II. třídy pro skoky na trampolíně.',
  'pavel-vechet':      'Trenér II. třídy pro skoky na trampolíně.',
  'lenka-peskova':     'Trenérka II. třídy pro skoky na trampolíně, zdravotní cvičitelka a masérka.',
  'radek-povysil':     'Trenér skoků na trampolíně III. třídy. Mistr ČR v družstvech 2022.',
  'marcela-sefrova':   'Trenérka skoků na trampolíně III. třídy, asistentka trenéra reprezentace.',
  'daniela-bendova':   'Trenérka skoků na trampolíně III. třídy.',
  'michaela-bendova':  'Trenérka skoků na trampolíně.',
  'jirina-sucha':      'Trenérka skoků na trampolíně III. třídy a učitelka ZŠ.',
  'lucie-sipkova':     'Trenérka skoků na trampolíně III. třídy.',
  'sarka-karaskova':   'Asistentka trenéra programu Děti na startu.',
  'pavlina-brezinova': 'Trenérka skoků na trampolíně III. třídy.',
  'adela-savicka':     'Asistentka trenéra.',
  'nikola-jirgesova':  'Asistentka trenéra.',
  'michal-jun':        'Trenér sportovního kroužku a osobní trenér kondičního posilování.',
  'michael-moravek':   'Trenér parkouru.',
  'vojta-uher':        'Trenér parkouru.',
}

const trainers = await client.fetch(`*[_type == "trainer"]{ _id, "slug": slug.current }`)

for (const t of trainers) {
  const bio = BIOS[t.slug]
  if (!bio) { console.warn(`⚠ Nenalezen slug: ${t.slug}`); continue }
  await client.patch(t._id).set({ bio }).commit()
  console.log(`✓ ${t.slug}`)
}

console.log('\nHotovo!')
