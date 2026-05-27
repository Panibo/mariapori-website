import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import styles from "./cv.module.css";
import { formatDate } from "../../../utils/DateFormatter";
import { Metadata } from "next";
import JsonLd from "@/src/components/json-ld";
import {
  absoluteUrl,
  getLocale,
  localizedUrl,
  siteConfig,
} from "@/src/config/site";
import { createPageMetadata, personId } from "@/src/utils/seo";

type General = {
  profilePicture: string;
  name: string;
  title: string;
  summary: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  website: string;
};

type Job = {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string[];
};

type TechCategory = {
  category: string;
  children: {
    name: string;
  }[];
};

type Project = {
  name: string;
  description: string[];
};

type Education = {
  institution?: string;
  degree: string;
  description: string[];
};

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = getLocale(locale);

  const t = await getTranslations({
    locale: currentLocale,
    namespace: "CVPage.metadata",
  });

  return createPageMetadata({
    locale: currentLocale,
    path: "/cv",
    title: t("title"),
    description: t("description"),
  });
}

const CV = () => {
  const t = useTranslations("CVPage");
  const locale = getLocale(useLocale());

  const general = t.raw("general") as General;
  const core = t.raw("core") as string[];
  const workExperience = t.raw("workExperience") as Job[];
  const techStack = t.raw("techStack") as TechCategory[];
  const projects = t.raw("projects") as Project[];
  const education = t.raw("education") as Education[];
  const websiteUrl = `${siteConfig.url}/`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: t("metadata.title"),
    description: t("metadata.description"),
    url: localizedUrl(locale, "/cv"),
    inLanguage: locale,
    mainEntity: {
      "@type": "Person",
      "@id": personId,
      name: general.name,
      url: siteConfig.url,
      image: absoluteUrl(general.profilePicture),
      email: general.email,
      telephone: general.phone,
      jobTitle: general.title,
      description: general.summary,
      sameAs: [siteConfig.linkedin, siteConfig.github],
      alumniOf: education.flatMap((edu) => {
        const institution =
          edu.institution ??
          edu.description.find((line) => line.includes("Metropolia"));

        return institution
          ? [
              {
                "@type": "CollegeOrUniversity",
                name: institution,
              },
            ]
          : [];
      }),
      knowsAbout: techStack.flatMap((category) =>
        category.children.map((tech) => tech.name),
      ),
    },
  };

  return (
    <div className={styles.cv}>
      <JsonLd data={structuredData} />

      <header className={styles.header}>
        <Image
          className={styles.photo}
          src={general.profilePicture}
          alt={t("profilePhotoAlt", { name: general.name })}
          width={160}
          height={160}
        />

        <div className={styles.headerText}>
          <h1>{general.name}</h1>
          <p>{general.title}</p>
        </div>
      </header>

      <section>
        <h2>{t("sections.summary")}</h2>
        <p>{general.summary}</p>
      </section>

      <section>
        <h2>{t("sections.contact")}</h2>

        <p>
          <strong>{t("labels.email")}:</strong>{" "}
          <a href={`mailto:${general.email}`}>{general.email}</a>
        </p>

        <p>
          <strong>{t("labels.phone")}:</strong>{" "}
          <a href={`tel:${general.phone}`}>{general.phone}</a>
        </p>

        <p>
          <strong>{t("labels.website")}:</strong>{" "}
          <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
            {general.website}
          </a>
        </p>

        <p>
          <strong>{t("labels.linkedin")}:</strong>{" "}
          <a
            href={`https://www.${general.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {general.linkedin}
          </a>
        </p>

        <p>
          <strong>{t("labels.github")}:</strong>{" "}
          <a
            href={`https://www.${general.github}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {general.github}
          </a>
        </p>
      </section>

      <section>
        <h2>{t("sections.coreStrengths")}</h2>
        <span>{core.join(", ")}</span>
      </section>

      <section>
        <h2>{t("sections.experience")}</h2>

        {workExperience.map((job) => (
          <article
            key={`${job.company}-${job.position}`}
            className={styles.avoidBreak}
          >
            <h3>{job.position}</h3>

            <p>
              {job.company} • {formatDate(job.startDate)}
              {job.endDate
                ? ` - ${formatDate(job.endDate)}`
                : ` - ${t("labels.present")}`}
            </p>

            <ul>
              {job.description.map((line, index) => (
                <li key={`${job.company}-${index}`}>{line}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section>
        <h2>{t("sections.keyTechnologies")}</h2>

        {techStack.map((category) => (
          <p key={category.category}>
            <strong>{category.category}:</strong>{" "}
            {category.children.map((tech) => tech.name).join(", ")}
          </p>
        ))}
      </section>

      <section className={styles.avoidBreak}>
        <h2>{t("sections.projects")}</h2>

        {projects.map((project) => (
          <div key={project.name} className={styles.avoidBreak}>
            <h3>{project.name}</h3>

            <ul>
              {project.description.map((line, index) => (
                <li key={`${project.name}-${index}`}>{line}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2>{t("sections.education")}</h2>

        {education.map((edu) => (
          <div
            key={`${edu.institution}-${edu.degree}`}
            className={styles.avoidBreak}
          >
            <h3>{edu.degree}</h3>
            {edu.description.map((line, index) => (
              <p key={`${edu.institution}-${index}`}>{line}</p>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
};

export default CV;
