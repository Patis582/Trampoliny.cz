import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";

const client = createClient({
  projectId: "bct8834j",
  dataset: "production",
  apiVersion: "2026-05-27",
  token: "skSk9mE6fAxRYg1nmbvJEStnL43joBB59R9yZYLWp0SaRvBfJYkb5C4Ixov1wqOH4j3J1VnJD1Ocz4lJsl7EzK56g7R8CwMU8Jt3DkzxICe4oIRdLCULLuvf2GcnJmRcppHgPuIU1zqglyoYPqSDOHpzUMbhZdkZTqF3hOYPzJT7CoFx8CDV",
  useCdn: false,
});

const GALERIE_DIR = "./galerie-download";

// Parse date from folder name — takes the first (earliest) date mentioned
function parseDate(name) {
  // "22. 11. 2025" or "5.-6. 12. 2025" or "12.–13. 4. 2025" etc.
  const match = name.match(/(\d{1,2})\.\s*(?:[–-]\s*\d{1,2}\.\s*)?(\d{1,2})\.\s*(20\d{2})/);
  if (match) {
    const day = match[1].padStart(2, "0");
    const month = match[2].padStart(2, "0");
    const year = match[3];
    return `${year}-${month}-${day}`;
  }
  // "09/2025" or "09-2025"
  const match2 = name.match(/(\d{2})[/-](20\d{2})/);
  if (match2) return `${match2[2]}-${match2[1]}-01`;
  // Just year "2025"
  const match3 = name.match(/(20\d{2})/);
  if (match3) return `${match3[1]}-01-01`;
  return null;
}

function toSlug(name) {
  return name
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".JPG", ".JPEG", ".PNG"]);

async function uploadImage(filePath) {
  const buffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase().replace(".", "");
  const mime = ext === "png" ? "image/png" : ext === "gif" ? "image/gif" : "image/jpeg";
  return client.assets.upload("image", buffer, {
    filename: path.basename(filePath),
    contentType: mime,
  });
}

async function main() {
  const folders = fs.readdirSync(GALERIE_DIR).filter((f) =>
    fs.statSync(path.join(GALERIE_DIR, f)).isDirectory()
  );

  console.log(`Nalezeno ${folders.length} alb.\n`);

  // Fetch already-uploaded slugs to skip duplicates
  const existing = await client.fetch(`*[_type == "galleryAlbum"]{ "slug": slug.current }`);
  const existingSlugs = new Set(existing.map((d) => d.slug));
  console.log(`Již v Sanity: ${existingSlugs.size} alb.\n`);

  const LIMIT = 50;
  let uploaded_count = 0;

  for (const folder of folders) {
    if (uploaded_count >= LIMIT) {
      console.log(`\nDosažen limit ${LIMIT} alb, zastavuji.`);
      break;
    }
    const slug = toSlug(folder);
    if (existingSlugs.has(slug)) {
      console.log(`⏭ Přeskakuji "${folder}" — již existuje`);
      continue;
    }
    const folderPath = path.join(GALERIE_DIR, folder);
    const files = fs.readdirSync(folderPath).filter((f) => IMAGE_EXTS.has(path.extname(f)));

    if (files.length === 0) {
      console.log(`⚠ Přeskakuji "${folder}" — žádné fotky`);
      continue;
    }

    const date = parseDate(folder);

    console.log(`📁 ${folder}`);
    console.log(`   Datum: ${date || "NEZNÁMÉ"} | Slug: ${slug} | Fotek: ${files.length}`);

    // Upload all images
    const uploaded = [];
    for (let i = 0; i < files.length; i++) {
      const filePath = path.join(folderPath, files[i]);
      try {
        const asset = await uploadImage(filePath);
        uploaded.push({ _type: "image", _key: asset._id, asset: { _type: "reference", _ref: asset._id } });
        process.stdout.write(`\r   Nahrávám: ${i + 1}/${files.length}`);
      } catch (e) {
        console.log(`\n   ✗ Chyba u ${files[i]}: ${e.message}`);
      }
    }
    console.log("");

    if (uploaded.length === 0) {
      console.log(`   ✗ Žádné fotky se nepodařilo nahrát, přeskakuji\n`);
      continue;
    }

    // Create galleryAlbum document
    const doc = {
      _type: "galleryAlbum",
      title: folder,
      slug: { _type: "slug", current: slug },
      date: date || "2025-01-01",
      coverImage: { ...uploaded[0], _key: undefined },
      photos: uploaded,
    };

    try {
      const result = await client.create(doc);
      uploaded_count++;
      console.log(`   ✓ Album vytvořeno v Sanity (${result._id}) [${uploaded_count}/${LIMIT}]\n`);
    } catch (e) {
      console.log(`   ✗ Chyba při vytváření dokumentu: ${e.message}\n`);
    }
  }

  console.log("Hotovo!");
}

main().catch(console.error);
