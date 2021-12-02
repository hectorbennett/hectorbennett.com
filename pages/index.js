import Head from "next/head";

import { Section } from "../components/Layout";
import WindowManager from "../components/WindowManager";

export default function Home() {
  return (
    <>
      <Head>
        <title>Hector Bennett | Web Developer</title>
        <meta name="description" content="hectorbennett.com" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="/fonts/Alice-Regular.woff"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Catamaran-Black.woff"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Droid-Sans-Mono.woff"
          as="font"
          crossOrigin=""
        />
      </Head>
      <Section>
        <h1>
          <span className="highlight">
            Hector Bennett, Full Stack Web Developer :)
          </span>
        </h1>
        <p className="highlight">
          I&apos;m a web developer at{" "}
          <a href="https://www.artlogic.net" target="_blank" rel="noreferrer">
            Artlogic
          </a>
          . I write{" "}
          <a
            href="https://github.com/hectorbennett"
            target="_blank"
            rel="noreferrer"
          >
            nice code
          </a>
          . I make{" "}
          <a
            href="https://open.spotify.com/artist/48J4JtAcKjlqknQaZOf3Jf"
            target="_blank"
            rel="noreferrer"
          >
            music
          </a>{" "}
          in my spare time. I can be contacted via{" "}
          <a
            href="mailto:contact@hectorbennett.com"
            target="_blank"
            rel="noreferrer"
          >
            email
          </a>{" "}
          or{" "}
          <a
            href="https://uk.linkedin.com/in/hector-bennett"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          .
        </p>
      </Section>
      <Section style={{ marginTop: "7rem" }}>
        <p className="highlight">
          Type <code>help</code>.
        </p>
      </Section>
      <WindowManager />
    </>
  );
}
