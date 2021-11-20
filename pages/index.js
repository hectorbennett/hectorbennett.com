import Head from "next/head";

import { Section } from "../components/Layout";

export default function Home() {
  return (
    <>
      <Head>
        <title>Hector Bennett | Web Developer</title>
        <meta name="description" content="hectorbennett.com" />
        <link rel="icon" href="/img/favicon.ico" />
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
      </Section>
    </>
  );
}
