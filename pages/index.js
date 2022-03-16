import Head from "next/head";

import { Section } from "../components/Layout";
import WindowManager from "../components/WindowManager";
import Scrollable from "../components/Scrollable";

// import { Button } from "@hectorbennett/hcl";

export default function Home() {
  return (
    <>
      <Head>
        <title>Hector Bennett | Web Developer</title>
        <meta name="description" content="hectorbennett.com" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest?v=1" />
        <link
          rel="mask-icon"
          href="/safari-pinned-tab.svg?v=1"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/favicon.ico?v=1" />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="theme-color" content="#ffffff" />
        <link
          rel="preload"
          href="/fonts/Alice-Regular.woff"
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
      <Scrollable.div style={{ width: "100%" }}>
        <Section>
          <h1>
            <span className="highlight">
              Hector Bennett, Full Stack Web Developer :)
              {/* <Button label="Hello world!" />; */}
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
      </Scrollable.div>
      <WindowManager />
    </>
  );
}
