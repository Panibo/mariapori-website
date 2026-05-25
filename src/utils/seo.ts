import type { Metadata } from "next";
import {
  type Locale,
  type RoutePath,
  absoluteUrl,
  localizedPath,
  siteConfig,
} from "@/src/config/site";

const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fi: "fi_FI",
};

type PageMetadata = {
  locale: Locale;
  path: RoutePath;
  title: string;
  description: string;
  absoluteTitle?: boolean;
};

export const getLanguageAlternates = (path: RoutePath) => ({
  ...Object.fromEntries(
    siteConfig.locales.map((locale) => [locale, localizedPath(locale, path)]),
  ),
  "x-default": localizedPath(siteConfig.defaultLocale, path),
});

export const createPageMetadata = ({
  locale,
  path,
  title,
  description,
  absoluteTitle = false,
}: PageMetadata): Metadata => {
  const canonical = localizedPath(locale, path);
  const alternateLocales = siteConfig.locales
    .filter((supportedLocale) => supportedLocale !== locale)
    .map((supportedLocale) => openGraphLocales[supportedLocale]);
  const image = {
    url: siteConfig.profileImage,
    width: 800,
    height: 800,
    alt: siteConfig.name,
  };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
      languages: getLanguageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: openGraphLocales[locale],
      alternateLocale: alternateLocales,
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
};

export const personId = absoluteUrl("/#person");
export const websiteId = absoluteUrl("/#website");
