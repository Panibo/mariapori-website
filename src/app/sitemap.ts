import type { MetadataRoute } from "next";
import { localizedUrl, siteConfig } from "@/src/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return siteConfig.routes.flatMap((route) =>
    siteConfig.locales.map((locale) => ({
      url: localizedUrl(locale, route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          ...Object.fromEntries(
            siteConfig.locales.map((supportedLocale) => [
              supportedLocale,
              localizedUrl(supportedLocale, route.path),
            ]),
          ),
          "x-default": localizedUrl(siteConfig.defaultLocale, route.path),
        },
      },
    })),
  );
}
