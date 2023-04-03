import Head from "../../components/Head/Head";
import { getAllPostIds, getPost } from "../../lib/posts";

import { Section } from "../../components/Layout";
import Scrollable from "../../components/Scrollable";
import styles from "./[id].module.scss";

import type { Post as IPost } from "../../lib/posts";

interface PostProps {
  postData: IPost;
}

export default function Post({ postData }: PostProps) {
  return (
    <>
      <Head title={postData.data.title} />
      <Scrollable.div style={{ width: "100%" }}>
        <Section className={styles.article}>
          <h1>
            <span className="highlight">{postData.data.title}</span>
          </h1>
          <div>
            {postData.data.date}
            <br />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.html }} />
        </Section>
      </Scrollable.div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const postData = await getPost(params.id);
  return {
    props: {
      postData,
    },
  };
}
export async function getStaticPaths() {
  const ids = getAllPostIds();
  return {
    paths: ids.map((id: string) => ({ params: { id: id } })),
    fallback: false,
  };
}
