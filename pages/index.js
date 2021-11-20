import Head from "next/head";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTerminal,
  faGlobeEurope,
  faGift,
} from "@fortawesome/free-solid-svg-icons";

import { Section } from "../components/Layout";
import WindowManager from "../components/WindowManager";
import WindowWrapper from "../components/WindowWrapper";
import Window from "../components/Window";
import Tray from "../components/Tray";

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
      {/* <WindowManager /> */}
      <WindowWrapper>
        <div
          style={{ background: "white", width: "100%", height: "100%" }}
        ></div>
      </WindowWrapper>
      <Window title="test window" isFocused={true}>
        <div
          style={{ background: "white", width: "100%", height: "100%" }}
        ></div>
      </Window>
      <Tray
        apps={[
          {
            title: "terminal",
            icon: <FontAwesomeIcon icon={faTerminal} />,
            hasFocus: true,
          },
          {
            title: "world war",
            icon: <FontAwesomeIcon icon={faGlobeEurope} />,
            hasFocus: false,
          },
          {
            title: "secret santa",
            icon: <FontAwesomeIcon icon={faGift} />,
            hasFocus: false,
          },
          {
            title: "slime soccer",
            icon: <FontAwesomeIcon icon={faGift} />,
            hasFocus: false,
          },
        ]}
      />
    </>
  );
}
