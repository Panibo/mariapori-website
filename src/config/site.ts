export const locales = ["en", "fi"] as const;

export type Locale = (typeof locales)[number];
export type RoutePath = "" | "/cv" | "/projects" | "/contact";

export const siteConfig = {
  name: "Miro Mariapori",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://mariapori.dev").replace(
    /\/+$/,
    "",
  ),
  defaultLocale: "en" as const,
  locales,
  profileImage: "/profile.jpeg",
  email: "miro.mariapori@gmail.com",
  phone: "+358405140403",
  linkedin: "https://www.linkedin.com/in/miro-mariapori/",
  github: "https://github.com/panibo",
  routes: [
    { path: "", changeFrequency: "monthly", priority: 1 },
    { path: "/cv", changeFrequency: "monthly", priority: 0.9 },
    { path: "/projects", changeFrequency: "monthly", priority: 0.9 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
  ] as const,
};

export const isLocale = (locale: string): locale is Locale =>
  siteConfig.locales.some((supportedLocale) => supportedLocale === locale);

export const getLocale = (locale: string): Locale =>
  isLocale(locale) ? locale : siteConfig.defaultLocale;

export const absoluteUrl = (path = "") =>
  new URL(path, siteConfig.url).toString();

export const localizedPath = (locale: Locale, path: RoutePath) =>
  `/${locale}${path}`;

export const localizedUrl = (locale: Locale, path: RoutePath) =>
  absoluteUrl(localizedPath(locale, path));
