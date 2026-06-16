import type { Metadata } from "next";
import { useLocale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import styles from "../../styles/home.module.css";
import Image from "next/image";
import JsonLd from "@/src/components/json-ld";
import { Link } from "@/src/i18n/routing";
import {
  absoluteUrl,
  getLocale,
  localizedUrl,
  siteConfig,
} from "@/src/config/site";
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
  const navT = useTranslations("Layout.navigation");
  const locale = getLocale(useLocale());

  const heroIntro = t.raw("hero.intro") as string[];
  const whatIDoDescription = t.raw("whatIDo.description") as string[];
  const howIWorkDescription = t.raw("howIWork.description") as string[];
  const experienceDescription = t.raw("experience.description") as string[];
  const educationDescription = t.raw("education.description") as string[];
  const knowsAbout = t.raw("structuredData.knowsAbout") as string[];
  const pageUrl = localizedUrl(locale, "");

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: t("hero.name"),
        url: pageUrl,
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
        url: pageUrl,
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

      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>{t("structuredData.jobTitle")}</p>
          <h1 id="home-title">{t("hero.name")}</h1>

          <div className={styles.heroIntro}>
            {heroIntro.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className={styles.heroActions}>
            <Link href="/projects" className={styles.primaryAction}>
              {navT("projects")}
            </Link>
            <Link href="/cv" className={styles.secondaryAction}>
              {navT("cv")}
            </Link>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.portraitFrame}>
            <Image
              className={styles.portrait}
              src={siteConfig.profileImage}
              alt={t("hero.name")}
              width={360}
              height={360}
              priority
            />
          </div>

          <div className={styles.focusList} aria-label={t("whatIDo.title")}>
            {knowsAbout.slice(0, 5).map((topic) => (
              <span key={topic}>{topic}</span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.sectionGrid}>
      <section className={styles.contentSection}>
        <h2>{t("whatIDo.title")}</h2>

        {whatIDoDescription.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </section>

      <section className={styles.contentSection}>
        <h2>{t("howIWork.title")}</h2>

        {howIWorkDescription.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </section>

      <section className={styles.contentSection}>
        <h2>{t("experience.title")}</h2>

        {experienceDescription.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </section>

      <section className={styles.contentSection}>
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

      <section className={`${styles.contentSection} ${styles.linksSection}`}>
        <h2>{t("links.title")}</h2>

        <a
          className={styles.iconLink}
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
          className={styles.iconLink}
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
    </div>
  );
};

export default Home;
