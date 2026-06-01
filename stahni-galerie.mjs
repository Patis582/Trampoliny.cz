import https from "https";
import fs from "fs";
import path from "path";
import { URL } from "url";

const WP_URL = "https://www.trampoliny.cz";
const USER = "filip";
const PASS = "1gcW EVpR D4n0 0Tf6 RIB0 FqTR";
const AUTH = Buffer.from(`${USER}:${PASS}`).toString("base64");
const OUTPUT_DIR = "./galerie-download";
const GALLERIES_PER_PAGE = 50;

function get(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { Authorization: `Basic ${AUTH}` } }, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => resolve(JSON.parse(data)));
    });
    req.on("error", reject);
  });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest)) return resolve();
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { Authorization: `Basic ${AUTH}` } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on("finish", () => file.close(resolve));
    }).on("error", (e) => { fs.unlinkSync(dest); reject(e); });
  });
}

function slugFromThumbnail(thumbnailUrl) {
  const match = thumbnailUrl.match(/\/wp-content\/gallery\/([^/]+)\//);
  return match ? match[1] : null;
}

function safeDirName(name) {
  return name.replace(/[/\\:*?"<>|]/g, "-").replace(/\s+/g, " ").trim();
}

async function fetchAllImages(galleryId) {
  let page = 1;
  let all = [];
  while (true) {
    const batch = await get(`${WP_URL}/wp-json/imagely/v1/images?gallery_id=${galleryId}&per_page=100&page=${page}`);
    if (!Array.isArray(batch) || batch.length === 0) break;
    all = all.concat(batch);
    if (batch.length < 100) break;
    page++;
  }
  return all;
}

async function fetchAllGalleries() {
  let page = 1;
  let all = [];
  while (true) {
    const batch = await get(`${WP_URL}/wp-json/imagely/v1/galleries?per_page=${GALLERIES_PER_PAGE}&page=${page}&orderby=date&order=desc`);
    if (!Array.isArray(batch) || batch.length === 0) break;
    all = all.concat(batch);
    if (batch.length < GALLERIES_PER_PAGE) break;
    page++;
  }
  return all;
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log(`Načítám všechny galerie...`);
  const galleries = await fetchAllGalleries();

  console.log(`Nalezeno ${galleries.length} galerií.\n`);

  for (const gallery of galleries) {
    const dirName = safeDirName(gallery.galleryTitle);
    const galleryDir = path.join(OUTPUT_DIR, dirName);
    fs.mkdirSync(galleryDir, { recursive: true });

    const slug = slugFromThumbnail(gallery.thumbnail || "");
    if (!slug) {
      console.log(`⚠ Přeskakuji "${gallery.galleryTitle}" — nelze určit slug`);
      continue;
    }

    console.log(`📁 ${gallery.galleryTitle} (${gallery.count} fotek)`);
    const images = await fetchAllImages(gallery.id);

    let ok = 0, skip = 0, fail = 0;
    for (const img of images) {
      const imgUrl = `${WP_URL}/wp-content/gallery/${slug}/${img.filename}`;
      const dest = path.join(galleryDir, img.filename);
      try {
        await download(imgUrl, dest);
        if (fs.existsSync(dest) && fs.statSync(dest).size > 0) ok++;
        else skip++;
      } catch {
        fail++;
      }
    }
    console.log(`   ✓ ${ok} staženo, ${skip} přeskočeno, ${fail} chyb`);
  }

  console.log(`\nHotovo! Fotky jsou v: ${OUTPUT_DIR}`);
}

main().catch(console.error);
