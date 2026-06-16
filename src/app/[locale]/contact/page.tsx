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
  const pageUrl = localizedUrl(locale, "/contact");
  const profileUrl = localizedUrl(locale, "");

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: t("metadata.title"),
    description: t("metadata.description"),
    url: pageUrl,
    inLanguage: locale,
    mainEntity: {
      "@type": "Person",
      "@id": personId,
      name: siteConfig.name,
      url: profileUrl,
      image: absoluteUrl(siteConfig.profileImage),
      email: siteConfig.email,
      telephone: siteConfig.phone,
      sameAs: [siteConfig.linkedin, siteConfig.github],
    },
  };

  return (
    <div className={styles.contact}>
      <JsonLd data={structuredData} />

      <section className={styles.intro}>
        <div>
          <h1>{t("title")}</h1>
          <p>{t("description")}</p>
        </div>
      </section>

      <section className={styles.methods} aria-label={t("title")}>
        {methods.map((method) => (
          <div className={styles.method} key={method.href}>
            <span className={styles.methodLabel}>{method.label}</span>
            <a
              className={styles.methodValue}
              href={method.href}
              target={method.external ? "_blank" : undefined}
              rel={method.external ? "noopener noreferrer" : undefined}
            >
              {method.value}
            </a>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Contact;
