import Link from "next/link";
import Head from "../components/Head";
import { Section } from "../components/Layout";
import Scrollable from "../components/Scrollable";

import { getSortedPostsData } from "../lib/posts";
import BackButton from "../components/BackButton";

export default function Posts({ allPostsData }) {
  return (
    <>
      <Head title="Posts | Hector Bennett" />
      <Scrollable.div style={{ width: "100%" }}>
        <Section>
          <h1>
            <span className="highlight">Hector Bennett</span>
          </h1>

          <h3>
            <span className="highlight">Posts</span>
          </h3>
          <ul>
            {allPostsData.map(({ id, data }) => (
              <li key={id}>
                <Link href={`/posts/${id}`}>{data.title}</Link>
              </li>
            ))}
          </ul>

          <BackButton href="/" />
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
