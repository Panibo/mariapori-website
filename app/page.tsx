import "../styles/home.module.css";

const Home = () => {
  return (
    <main className="home">
      <section>
        <h1>Miro Mariapori</h1>
        <p>
          I&apos;m a software developer with a passion for creating innovative
          and efficient solutions. This portfolio showcases some of my projects
          and experiences in the field. Feel free to explore and learn more
          about my work!
        </p>
      </section>
      <section>
        <a href="/projects" className="btn">
          Projects
        </a>
        <a href="/contact" className="btn">
          Contact
        </a>
        <a href="/cv" className="btn">
          CV
        </a>
      </section>
    </main>
  );
};

export default Home;
