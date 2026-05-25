import type { Metadata } from "next";
import { useLocale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import styles from "../../styles/home.module.css";
import Image from "next/image";
import JsonLd from "@/src/components/json-ld";
import { absoluteUrl, getLocale, siteConfig } from "@/src/config/site";
import { createPageMetadata, personId, websiteId } from "@/src/utils/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = getLocale(locale);

  const t = await getTranslations({
    locale: currentLocale,
    namespace: "HomePage.metadata",
  });

  return createPageMetadata({
    locale: currentLocale,
    path: "",
    title: t("title"),
    description: t("description"),
    absoluteTitle: true,
  });
}

const Home = () => {
  const t = useTranslations("HomePage");
  const locale = getLocale(useLocale());

  const heroIntro = t.raw("hero.intro") as string[];
  const whatIDoDescription = t.raw("whatIDo.description") as string[];
  const howIWorkDescription = t.raw("howIWork.description") as string[];
  const experienceDescription = t.raw("experience.description") as string[];
  const educationDescription = t.raw("education.description") as string[];
  const knowsAbout = t.raw("structuredData.knowsAbout") as string[];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: t("hero.name"),
        url: siteConfig.url,
        image: absoluteUrl(siteConfig.profileImage),
        email: siteConfig.email,
        telephone: siteConfig.phone,
        jobTitle: t("structuredData.jobTitle"),
        description: t("structuredData.description"),
        sameAs: [siteConfig.linkedin, siteConfig.github],
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: t("structuredData.alumniOf"),
        },
        knowsAbout,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: siteConfig.name,
        url: siteConfig.url,
        inLanguage: locale,
        publisher: {
          "@id": personId,
        },
      },
    ],
  };

  return (
    <div className={styles.home}>
      <JsonLd data={structuredData} />

      <section>
        <h1>{t("hero.name")}</h1>

        {heroIntro.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </section>

      <section>
        <h2>{t("whatIDo.title")}</h2>

        {whatIDoDescription.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </section>

      <section>
        <h2>{t("howIWork.title")}</h2>

        {howIWorkDescription.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </section>

      <section>
        <h2>{t("experience.title")}</h2>

        {experienceDescription.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </section>

      <section>
        <h2>{t("education.title")}</h2>

        <p>
          {educationDescription.map((line, index) => (
            <span key={index}>
              {line}
              {index < educationDescription.length - 1 && <br />}
            </span>
          ))}
        </p>
      </section>

      <section>
        <h2>{t("links.title")}</h2>

        <a
          href="https://www.linkedin.com/in/miro-mariapori/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("links.linkedin")}
        >
          <Image
            src="/linkedin.png"
            alt={t("links.linkedin")}
            width={50}
            height={50}
          />
        </a>

        <a
          href="https://github.com/panibo"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("links.github")}
        >
          <Image
            src="/github.png"
            alt={t("links.github")}
            width={50}
            height={50}
          />
        </a>
      </section>
    </div>
  );
};

export default Home;
