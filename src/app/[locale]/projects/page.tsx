import type { Metadata } from "next";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import JsonLd from "@/src/components/json-ld";
import { getLocale, localizedUrl } from "@/src/config/site";
import { createPageMetadata } from "@/src/utils/seo";
import styles from "./projects.module.css";

type ProjectLink = {
  url: string;
  label: string;
};

type Project = {
  name: string;
  startDate?: string;
  endDate?: string;
  summary?: string;
  technologies?: string[];
  description: string[];
  links?: ProjectLink[];
  code?: ProjectLink[];
};

type Props = {
  params: Promise<{ locale: string }>;
};

const projectVisuals = [
  "/placeholders/project-gamerat.svg",
  "/placeholders/project-tkio-finder.svg",
  "/placeholders/project-portfolio.svg",
] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = getLocale(locale);

  const t = await getTranslations({
    locale: currentLocale,
    namespace: "ProjectsPage.metadata",
  });

  return createPageMetadata({
    locale: currentLocale,
    path: "/projects",
    title: t("title"),
    description: t("description"),
  });
}

const Projects = () => {
  const t = useTranslations("ProjectsPage");
  const locale = getLocale(useLocale());

  const projects = t.raw("projects") as Project[];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("title"),
    description: t("description"),
    url: localizedUrl(locale, "/projects"),
    inLanguage: locale,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.name,
          description: project.summary ?? project.description.join(" "),
          url: project.links?.[0]?.url ?? localizedUrl(locale, "/projects"),
          keywords: project.technologies?.join(", "),
        },
      })),
    },
  };

  return (
    <div className={styles.projects}>
      <JsonLd data={structuredData} />

      <header className={styles.header}>
        <div>
          <h1>{t("title")}</h1>
          <p>{t("description")}</p>
        </div>
      </header>

      <div className={styles.projectList}>
        {projects.map((project, index) => {
          const visual = projectVisuals[index];

          return (
            <section key={project.name} className={styles.projectCard}>
              {visual && (
                <div className={styles.projectVisual}>
                  <Image
                    className={styles.projectImage}
                    src={visual}
                    alt=""
                    width={960}
                    height={600}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              )}

              <div className={styles.projectContent}>
                <h2>{project.name}</h2>

                {(project.startDate || project.endDate) && (
                  <p className={styles.timeline}>
                    <strong>{t("labels.timeline")}:</strong>{" "}
                    {project.startDate}
                    {project.endDate ? ` - ${project.endDate}` : ""}
                  </p>
                )}

                {project.summary && (
                  <p className={styles.summary}>{project.summary}</p>
                )}

                {project.technologies && project.technologies.length > 0 && (
                  <div className={styles.techBlock}>
                    <strong>{t("labels.technologies")}</strong>
                    <ul className={styles.techList}>
                      {project.technologies.map((technology) => (
                        <li key={technology}>{technology}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <ul className={styles.descriptionList}>
                  {project.description.map((line, descriptionIndex) => (
                    <li key={descriptionIndex}>{line}</li>
                  ))}
                </ul>

                <div className={styles.linkRows}>
                  {project.links && project.links.length > 0 && (
                    <p>
                      <strong>{t("labels.links")}:</strong>{" "}
                      {project.links.map((link, linkIndex) => (
                        <span key={link.url}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link.label}
                          </a>
                          {linkIndex < (project.links?.length ?? 0) - 1
                            ? " • "
                            : ""}
                        </span>
                      ))}
                    </p>
                  )}

                  {project.code && project.code.length > 0 && (
                    <p>
                      <strong>{t("labels.code")}:</strong>{" "}
                      {project.code.map((code, codeIndex) => (
                        <span key={code.url}>
                          <a
                            href={code.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {code.label}
                          </a>
                          {codeIndex < (project.code?.length ?? 0) - 1
                            ? " • "
                            : ""}
                        </span>
                      ))}
                    </p>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
