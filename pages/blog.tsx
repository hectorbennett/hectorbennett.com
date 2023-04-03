import Head from "../components/Head";
import { Section } from "../components/Layout";
import WindowManager from "../components/WindowManager";
import Scrollable from "../components/Scrollable";
import ScreenSaver from "../components/ScreenSaver";

// import { Button } from "@hectorbennett/hcl";

import { getSortedPostsData } from "../lib/posts";

export default function Blog({ allPostsData }) {
  return (
    <>
      <Head title="This is a title" />
      <Scrollable.div style={{ width: "100%" }}>
        <Section>
          <h1>
            <span className="highlight">Hector Bennett</span>
          </h1>

          <h3>
            <span className="highlight">Blog</span>
          </h3>
          <ul>
            {allPostsData.map(({ id, date, title }) => (
              <li key={id}>
                {title}
                <br />
                {id}
                <br />
                {date}
              </li>
            ))}
          </ul>
        </Section>
      </Scrollable.div>
    </>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
