import type { MetadataRoute } from "next";

const BASE = "https://nateisles.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/films", "/music", "/tools", "/coaching", "/contact"];
  const lastModified = new Date();
  return routes.map((r) => ({
    url: `${BASE}${r}`,
    lastModified,
    changeFrequency: "monthly",
    priority: r === "" ? 1 : 0.8,
  }));
}
