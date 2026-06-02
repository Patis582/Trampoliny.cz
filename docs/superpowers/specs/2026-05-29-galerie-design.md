# Gallery Design Spec
Date: 2026-05-29

## Overview

A new shared photo gallery at `/galerie` for both Trampolíny Liberec and Trampolíny Patrman. Organised as albums (one per event/occasion). Albums are managed entirely in Sanity. Photos are stored in Sanity's built-in asset storage (10 GB free tier; photos should be compressed to ~500–800 KB before upload).

---

## Sanity Schema — `galleryAlbum`

New document type `galleryAlbum`:

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | Album name, e.g. "Český pohár 2.8.2026" |
| `slug` | slug (from title) | yes | Used as URL segment `/galerie/[slug]` |
| `date` | date | yes | Date of the event/shoot |
| `coverImage` | image | yes | Shown on the listing page |
| `photos` | array of image | yes | Supports multi-file bulk upload in Sanity Studio |
| `event` | reference → `event` | no | Optional link to an existing calendar event |

If `event` is set, the album detail page shows a "Zpět na akci" link to `/akce/[event.slug]`.

---

## Pages

### `/galerie` — Album listing

- Server component, fetches all `galleryAlbum` documents ordered by `date desc`
- Albums grouped by **year** (e.g. "2026", "2025")
- Each album card: cover image (aspect-[4/3]), title, date, photo count
- Grid: 1 col mobile → 2 col sm → 3 col desktop
- Page header follows the site pattern: label + h1 + `border-b` separator

### `/galerie/[slug]` — Album detail

- Server component, fetches single album by slug
- Hero: album title + date (no full-screen hero image, just the page header pattern)
- Photos displayed in **masonry layout** (CSS columns or a masonry library)
- Click any photo → opens `yet-another-react-lightbox` with `DownloadPlugin` enabled
- If album has linked event → show "← Zpět na akci" link

---

## Queries (`sanity/lib/queries.ts`)

Two new exports:

```ts
getGalleryAlbums(): Promise<GalleryAlbumCard[] | null>
// Returns: _id, title, slug, date, coverImage, photoCount

getGalleryAlbumBySlug(slug: string): Promise<GalleryAlbumDetail | null>
// Returns: all fields including full photos array and event.slug
```

---

## Implementation Notes

- **Bulk upload:** Sanity's array-of-image field natively supports selecting multiple files at once in Studio — no extra plugin needed.
- **Masonry:** Use CSS `columns` approach (no extra library) for simplicity. Images lazy-loaded with `next/image`.
- **Lightbox:** Reuse `yet-another-react-lightbox` already in the project. Add `DownloadPlugin`.
- **Storage:** Recommend compressing photos to ≤800 KB before upload (Squoosh / Lightroom export). Originals count toward the 10 GB limit; the CDN serves resized versions to the browser.
- **Sanity Studio structure:** Add `galleryAlbum` to `sanity/structure.ts` as a top-level item.

---

## Out of Scope

- No brand filtering on the gallery page (shared for both brands)
- No pagination for now (implement if album count grows large)
- No video support
- PatrmanGallery.tsx (hardcoded) is **not** replaced by this feature — that is a separate decision
