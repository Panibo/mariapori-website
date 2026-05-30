import type { Metadata } from "next";
import "../globals.css";
import Footer from "@/src/components/footer/footer";
import Header from "@/src/components/header/header";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { getLocale, locales, siteConfig } from "@/src/config/site";
import { SpeedInsights } from "@vercel/speed-insights/next";

type Props = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = getLocale(rawLocale);

  return {
    metadataBase: new URL(siteConfig.url),

    title: {
      default: "Miro Mariapori - Software Engineer",
      template: "%s | Miro Mariapori",
    },

    description:
      "Welcome to my software engineer portfolio! Explore my projects, experience, and skills in software development. Discover innovative solutions I've created and learn more about my work in the field.",

    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "software development",

    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages: {
        en: `${siteConfig.url}/en`,
        fi: `${siteConfig.url}/fi`,
        "x-default": `${siteConfig.url}/${siteConfig.defaultLocale}`,
      },
    },

    manifest: "/site.webmanifest",

    icons: {
      icon: [
        {
          url: "/favicon-96x96.png",
          sizes: "96x96",
          type: "image/png",
        },
        {
          url: "/favicon.svg",
          type: "image/svg+xml",
        },
      ],
      shortcut: "/favicon.ico",
      apple: [
        {
          url: "/apple-touch-icon.png",
          sizes: "180x180",
        },
      ],
    },

    appleWebApp: {
      title: siteConfig.shortName,
    },

    verification: process.env.GOOGLE_SITE_VERIFICATION
      ? {
          google: process.env.GOOGLE_SITE_VERIFICATION,
        }
      : undefined,
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = getLocale(rawLocale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
