import type { MetadataRoute } from "next";
import {
  getAllEventSlugs,
  getAllGalleryAlbumSlugs,
  getAllServiceSlugs,
} from "@/sanity/lib/queries";

const BASE = "https://trampoliny.cz";

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE,                         priority: 1.0, changeFrequency: "weekly" },
  { url: `${BASE}/trampoliny-liberec`, priority: 0.9, changeFrequency: "monthly" },
  { url: `${BASE}/trampoliny-patrman`, priority: 0.9, changeFrequency: "monthly" },
  { url: `${BASE}/treneri`,            priority: 0.7, changeFrequency: "monthly" },
  { url: `${BASE}/cenik`,              priority: 0.8, changeFrequency: "weekly" },
  { url: `${BASE}/jak-na-to`,          priority: 0.6, changeFrequency: "monthly" },
  { url: `${BASE}/dokumenty`,          priority: 0.6, changeFrequency: "monthly" },
  { url: `${BASE}/akce`,               priority: 0.8, changeFrequency: "daily" },
  { url: `${BASE}/galerie`,            priority: 0.7, changeFrequency: "weekly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [eventSlugs, albumSlugs, serviceSlugs] = await Promise.all([
    getAllEventSlugs(),
    getAllGalleryAlbumSlugs(),
    getAllServiceSlugs(),
  ]);

  return [
    ...STATIC_ROUTES,
    ...eventSlugs.map((slug) => ({
      url: `${BASE}/akce/${slug}`,
      priority: 0.7 as number,
      changeFrequency: "weekly" as const,
    })),
    ...albumSlugs.map((slug) => ({
      url: `${BASE}/galerie/${slug}`,
      priority: 0.5 as number,
      changeFrequency: "monthly" as const,
    })),
    ...serviceSlugs.map((slug) => ({
      url: `${BASE}/aktivity/${slug}`,
      priority: 0.8 as number,
      changeFrequency: "monthly" as const,
    })),
  ];
}
