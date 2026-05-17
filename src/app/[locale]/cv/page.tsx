import Image from "next/image";
import { useTranslations } from "next-intl";
import styles from "./cv.module.css";
import { formatDate } from "../../../utils/DateFormatter";

const CV = () => {
  const t = useTranslations("CVPage");

  const general = t.raw("general");
  const core = t.raw("core");
  const workExperience = t.raw("workExperience");
  const techStack = t.raw("techStack");
  const projects = t.raw("projects");
  const education = t.raw("education");

  return (
    <div className={styles.cv}>
      <header className={styles.header}>
        <Image
          className={styles.photo}
          src={general.profilePicture}
          alt={t("profilePhotoAlt", { name: general.name })}
          width={160}
          height={160}
        />
        <div>
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
                <li key={index}>{line}</li>
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
                <li key={index}>{line}</li>
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
            <p>{edu.institution}</p>
            <p>{edu.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default CV;
