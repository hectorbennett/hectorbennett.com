import Head from "../components/Head";
import { Section } from "../components/Layout";
import WindowManager from "../components/WindowManager";
import Scrollable from "../components/Scrollable";
import ScreenSaver from "../components/ScreenSaver";

// import { Button } from "@hectorbennett/hcl";

export default function Home() {
  return (
    <>
      <Head />
      <Scrollable.div style={{ width: "100%" }}>
        <Section>
          <h1>
            <span className="highlight">
              Hector Bennett, Full Stack Web Developer :)
              {/* <Button label="Hello world!" />; */}
            </span>
          </h1>
          <p className="highlight">
            I write{" "}
            <a href="https://github.com/hectorbennett" target="_blank" rel="noreferrer">
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
            <a href="mailto:contact@hectorbennett.com" target="_blank" rel="noreferrer">
              email
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
      <ScreenSaver />
    </>
  );
}
