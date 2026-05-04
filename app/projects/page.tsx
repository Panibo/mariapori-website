import Image from "next/image";
import cv from "../../data/cv.json";
import styles from "../../styles/cv.module.css";
import projects from "../../data/projects.json";
const Projects = () => {
  return (
    <div className={styles.cv}>
      <header className={styles.header}>
        <div>
          <h1>Projects</h1>
          <p>Selected work, research, and software projects.</p>
        </div>
      </header>

      <section>
        {projects.map((project) => (
          <article key={project.name} className={styles.avoidBreak}>
            <h3>{project.name}</h3>

            {project.role && (
              <p>
                <strong>Role:</strong> {project.role}
              </p>
            )}

            {(project.startDate || project.endDate) && (
              <p>
                <strong>Timeline:</strong> {project.startDate}
                {project.endDate ? ` - ${project.endDate}` : ""}
              </p>
            )}

            {project.summary && <p>{project.summary}</p>}

            {project.technologies && project.technologies.length > 0 && (
              <p>
                <strong>Technologies:</strong> {project.technologies.join(", ")}
              </p>
            )}

            <ul>
              {project.description.map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>

            {project.links && project.links.length > 0 && (
              <p>
                <strong>Links:</strong>{" "}
                {project.links.map((link, index) => (
                  <span key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                    {index < project.links.length - 1 ? " • " : ""}
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
