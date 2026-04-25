import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return [
    { url: `${base}/homepage`, lastModified: new Date(), priority: 1.0 },
    { url: `${base}/cart`, lastModified: new Date(), priority: 0.5 },
    { url: `${base}/checkout`, lastModified: new Date(), priority: 0.5 },
  ];
}