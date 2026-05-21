import { useTranslations } from "next-intl";
import styles from "./cv.module.css";

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

const Projects = () => {
  const t = useTranslations("ProjectsPage");

  const projects = t.raw("projects") as Project[];

  return (
    <div className={styles.cv}>
      <header className={styles.header}>
        <div>
          <h1>{t("title")}</h1>
          <p>{t("description")}</p>
        </div>
      </header>

      <section>
        {projects.map((project) => (
          <article key={project.name} className={styles.avoidBreak}>
            <h3>{project.name}</h3>

            {(project.startDate || project.endDate) && (
              <p>
                <strong>{t("labels.timeline")}:</strong> {project.startDate}
                {project.endDate ? ` - ${project.endDate}` : ""}
              </p>
            )}

            {project.summary && <p>{project.summary}</p>}

            {project.technologies && project.technologies.length > 0 && (
              <p>
                <strong>{t("labels.technologies")}:</strong>{" "}
                {project.technologies.join(", ")}
              </p>
            )}

            <ul>
              {project.description.map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>

            {project.links && project.links.length > 0 && (
              <p>
                <strong>{t("labels.links")}:</strong>{" "}
                {project.links.map((link, index) => (
                  <span key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                    {index < (project.links?.length ?? 0) - 1 ? " • " : ""}
                  </span>
                ))}
              </p>
            )}

            {project.code && project.code.length > 0 && (
              <p>
                <strong>{t("labels.code")}:</strong>{" "}
                {project.code.map((code, index) => (
                  <span key={code.url}>
                    <a
                      href={code.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {code.label}
                    </a>
                    {index < (project.code?.length ?? 0) - 1 ? " • " : ""}
                  </span>
                ))}
              </p>
            )}
          </article>
        ))}
      </section>
    </div>
  );
};

export default Projects;
