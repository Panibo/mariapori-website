import { useTranslations } from "next-intl";
import styles from "../../styles/home.module.css";
import Image from "next/image";

const Home = () => {
  const t = useTranslations("HomePage");

  const heroIntro = t.raw("hero.intro") as string[];
  const whatIDoDescription = t.raw("whatIDo.description") as string[];
  const howIWorkDescription = t.raw("howIWork.description") as string[];
  const experienceDescription = t.raw("experience.description") as string[];
  const educationDescription = t.raw("education.description") as string[];

  return (
    <main className={styles.home}>
      <section>
        <h1>{t("hero.name")}</h1>

        {heroIntro.map((paragraph, index) => (
          <>
            <p key={index}>{paragraph}</p> <br />
          </>
        ))}
      </section>

      <section>
        <h2>{t("whatIDo.title")}</h2>

        {whatIDoDescription.map((paragraph, index) => (
          <>
            <p key={index}>{paragraph}</p> <br />
          </>
        ))}
      </section>

      <section>
        <h2>{t("howIWork.title")}</h2>

        {howIWorkDescription.map((paragraph, index) => (
          <>
            <p key={index}>{paragraph}</p> <br />
          </>
        ))}
      </section>

      <section>
        <h2>{t("experience.title")}</h2>

        {experienceDescription.map((paragraph, index) => (
          <>
            <p key={index}>{paragraph}</p> <br />
          </>
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
        <a
          href="https://www.linkedin.com/in/miro-mariapori/"
          target="_blank"
          rel="noopener noreferrer"
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
        >
          <Image
            src="/github.png"
            alt={t("links.github")}
            width={50}
            height={50}
          />
        </a>
      </section>
    </main>
  );
};

export default Home;
