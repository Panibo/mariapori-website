import Image from "next/image";
import cv from "../../data/cv.json";
import styles from "../../styles/cv.module.css";
import { formatDate } from "../../utils/DateFormatter";

const CV = () => {
  return (
    <div className={styles.cv}>
      <header className={styles.header}>
        <Image
          className={styles.photo}
          src={cv.general.profilePicture}
          alt={`${cv.general.name}'s photo`}
          width={160}
          height={160}
        />
        <div>
          <h1>{cv.general.name}</h1>
          <p>{cv.general.title}</p>
        </div>
      </header>

      <section>
        <h2>Summary</h2>
        <p>{cv.general.summary}</p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          <strong>Email:</strong>{" "}
          <a href={`mailto:${cv.general.email}`}>{cv.general.email}</a>
        </p>
        <p>
          <strong>Phone:</strong>{" "}
          <a href={`tel:${cv.general.phone}`}>{cv.general.phone}</a>
        </p>
        <p>
          <strong>LinkedIn:</strong>{" "}
          <a
            href={"https://www." + cv.general.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            {cv.general.linkedin}
          </a>
        </p>
        <p>
          <strong>GitHub:</strong>{" "}
          <a
            href={"https://www." + cv.general.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            {cv.general.github}
          </a>
        </p>
      </section>

      <section>
        <h2>Core Strengths</h2>
        <span>{cv.core.join(", ")}</span>
      </section>
      <section>
        <div className={styles.avoidBreak}>
          <h2>Experience</h2>

          {cv.workExperience[0] && (
            <div
              key={`${cv.workExperience[0].company}-${cv.workExperience[0].position}`}
              className={styles.avoidBreak}
            >
              <h3>{cv.workExperience[0].position}</h3>
              <p>
                {cv.workExperience[0].company} •{" "}
                {formatDate(cv.workExperience[0].startDate)}-
                {cv.workExperience[0].endDate
                  ? formatDate(cv.workExperience[0].endDate)
                  : ""}
              </p>
              <ul>
                {cv.workExperience[0].description.map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {cv.workExperience.slice(1).map((job) => (
          <div
            key={`${job.company}-${job.position}`}
            className={styles.avoidBreak}
          >
            <h3>{job.position}</h3>
            <p>
              {job.company} • {formatDate(job.startDate)}-
              {job.endDate ? formatDate(job.endDate) : ""}
            </p>
            <ul>
              {job.description.map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <section>
        <h2>Key Technologies</h2>
        {cv.techStack.map((category) => (
          <p key={category.category}>
            <strong>{category.category}:</strong>{" "}
            {category.children.map((tech) => tech.name).join(", ")}
          </p>
        ))}
      </section>

      <section className={styles.avoidBreak}>
        <h2>Projects</h2>
        {cv.projects.map((project) => (
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
        <h2>Education</h2>
        {cv.education.map((edu) => (
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
