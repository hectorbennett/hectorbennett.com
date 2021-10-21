import styles from "./Page.module.scss";

export default function Page() {
  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <h1 className={styles.heading}>
          <span className={styles.highlight}>
            Hector Bennett, Full Stack Web Developer :)
          </span>
        </h1>
        <p className={styles.highlight}>
          I'm a web developer at{" "}
          <a href="https://www.artlogic.net" target="_blank">
            Artlogic
          </a>
          . I write{" "}
          <a href="https://github.com/hectorbennett" target="_blank">
            nice code
          </a>
          . I make{" "}
          <a
            href="https://open.spotify.com/artist/48J4JtAcKjlqknQaZOf3Jf"
            target="_blank"
          >
            music
          </a>{" "}
          in my spare time. I can be contacted via{" "}
          <a href="mailto:contact@hectorbennett.com" target="_blank">
            email
          </a>{" "}
          or{" "}
          <a href="https://uk.linkedin.com/in/hector-bennett" target="_blank">
            LinkedIn
          </a>
          .
        </p>
      </section>
    </div>
  );
}
