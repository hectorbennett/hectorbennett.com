import Head from "next/head";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTerminal,
  faGlobeEurope,
  faGift,
} from "@fortawesome/free-solid-svg-icons";

import { Section } from "../components/Layout";
import WindowManager from "../components/WindowManager";

import SlimeSoccer from "../components/SlimeSoccer";

// import Terminal from "../Terminal/Terminal.js";
// import WorldWar from "../WorldWar/WorldWar.js";
// import SecretSanta from "../SecretSanta/SecretSanta.js";


const INSTALLED_APPS = [
  {
    name: "terminal",
    title: "terminal",
    width: 500,
    height: 500,
    // component: <Terminal WM={this} />,
    component: <div>Hello world</div>,
    icon: <FontAwesomeIcon icon={faTerminal} />,
    closable: false,
    maximisable: true,
  },
  {
    name: "worldWar",
    title: "world war",
    width: 800,
    height: 450,
    // component: <WorldWar />,
    component: <div>Hello world</div>,
    icon: <FontAwesomeIcon icon={faGlobeEurope} />,
    closable: true,
    maximisable: true,
    lockAspectRatio: true,
  },
  {
    name: "secretSanta",
    title: "secret santa",
    width: 700,
    height: 600,
    // component: <SecretSanta />,
    component: <div>Hello world</div>,
    icon: <FontAwesomeIcon icon={faGift} />,
    closable: true,
    maximisable: true,
  },
  {
    name: "slimeSoccer",
    title: "slime soccer",
    width: 722,
    height: 460,
    component: <SlimeSoccer/>,
    icon: <FontAwesomeIcon icon={faGift} />,
    closable: true,
    maximisable: true,
  },
];

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
      <WindowManager installed_apps={INSTALLED_APPS} />
    </>
  );
}
