import { useTranslations } from "next-intl";
import styles from "../../styles/home.module.css";
import Image from "next/image";

const Home = () => {
  const t = useTranslations("HomePage");

  return (
    <main className={styles.home}>
      <section>
        <h1>{t("name")}</h1>
        <p>{t("intro")}</p>
      </section>

      <section>
        <h2>{t("whatIDo.title")}</h2>
        <p>{t("whatIDo.description")}</p>
      </section>

      <section>
        <h2>{t("howIWork.title")}</h2>
        <p>
          {t.rich("howIWork.description", {
            b: (chunks) => <b>{chunks}</b>,
            br: () => (
              <>
                <br />
                <br />
              </>
            ),
          })}
        </p>
      </section>

      <section>
        <h2>{t("experience.title")}</h2>
        <p>{t("experience.description")}</p>
      </section>

      <section>
        <h2>{t("education.title")}</h2>
        <p>
          {t.rich("education.description", {
            br: () => <br />,
          })}
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
