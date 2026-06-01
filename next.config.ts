import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const defaultLocale = "en";
const canonicalSiteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mariapori.dev"
).replace(/\/+$/, "");
const canonicalHost = new URL(canonicalSiteUrl).host;
const legacyHost = canonicalHost.startsWith("www.")
  ? canonicalHost.slice(4)
  : `www.${canonicalHost}`;
const legacyHostMatcher = [
  { type: "host" as const, value: legacyHost.replaceAll(".", "\\.") },
];
const unlocalizedRoutes = ["/cv", "/projects", "/contact"] as const;

const nextConfig: NextConfig = {
  trailingSlash: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
    ],
  },

  async redirects() {
    const canonicalHostRedirects = [
      {
        source: "/",
        has: legacyHostMatcher,
        destination: `${canonicalSiteUrl}/${defaultLocale}`,
        permanent: true,
      },
      ...unlocalizedRoutes.map((route) => ({
        source: route,
        has: legacyHostMatcher,
        destination: `${canonicalSiteUrl}/${defaultLocale}${route}`,
        permanent: true,
      })),
      {
        source: "/:path*",
        has: legacyHostMatcher,
        destination: `${canonicalSiteUrl}/:path*`,
        permanent: true,
      },
    ];
    const defaultLocaleRedirects = [
      {
        source: "/",
        destination: `/${defaultLocale}`,
        permanent: true,
      },
      ...unlocalizedRoutes.map((route) => ({
        source: route,
        destination: `/${defaultLocale}${route}`,
        permanent: true,
      })),
    ];

    return [
      ...canonicalHostRedirects,
      ...defaultLocaleRedirects,
    ];
  },
};

export default withNextIntl(nextConfig);
