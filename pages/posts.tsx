import Head from "../components/Head";
import { Section } from "../components/Layout";
import Scrollable from "../components/Scrollable";

import { getSortedPostsData } from "../lib/posts";

export default function Posts({ allPostsData }) {
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
            {allPostsData.map(({ id, data }) => (
              <li key={id}>
                {data.title || ""}
                {id && (
                  <>
                    <br />
                    {id}
                  </>
                )}
                {data.date && (
                  <>
                    <br />
                    {data.date}
                  </>
                )}
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
