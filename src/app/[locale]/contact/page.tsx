import type { Metadata } from "next";
import { useLocale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import JsonLd from "@/src/components/json-ld";
import {
  absoluteUrl,
  getLocale,
  localizedUrl,
  siteConfig,
} from "@/src/config/site";
import { createPageMetadata, personId } from "@/src/utils/seo";
import styles from "./contact.module.css";

type ContactMethod = {
  label: string;
  value: string;
  href: string;
  external?: boolean;
};

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = getLocale(locale);

  const t = await getTranslations({
    locale: currentLocale,
    namespace: "ContactPage.metadata",
  });

  return createPageMetadata({
    locale: currentLocale,
    path: "/contact",
    title: t("title"),
    description: t("description"),
  });
}

const Contact = () => {
  const t = useTranslations("ContactPage");
  const locale = getLocale(useLocale());
  const methods = t.raw("methods") as ContactMethod[];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: t("metadata.title"),
    description: t("metadata.description"),
    url: localizedUrl(locale, "/contact"),
    inLanguage: locale,
    mainEntity: {
      "@type": "Person",
      "@id": personId,
      name: siteConfig.name,
      url: siteConfig.url,
      image: absoluteUrl(siteConfig.profileImage),
      email: siteConfig.email,
      telephone: siteConfig.phone,
      sameAs: [siteConfig.linkedin, siteConfig.github],
    },
  };

  return (
    <div className={styles.contact}>
      <JsonLd data={structuredData} />

      <section>
        <h1>{t("title")}</h1>
        <p>{t("description")}</p>
      </section>

      <section>
        {methods.map((method) => (
          <p key={method.href}>
            <strong>{method.label}:</strong>{" "}
            <a
              href={method.href}
              target={method.external ? "_blank" : undefined}
              rel={method.external ? "noopener noreferrer" : undefined}
            >
              {method.value}
            </a>
          </p>
        ))}
      </section>
    </div>
  );
};

export default Contact;
