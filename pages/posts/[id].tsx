import _BackButton from "../../components/BackButton";
import Head from "../../components/Head/Head";
import { Section } from "../../components/Layout";
import Scrollable from "../../components/Scrollable";

import { getAllPostIds, getPost } from "../../lib/posts";
import type { Post as IPost } from "../../lib/posts";

import styles from "./[id].module.scss";

interface PostProps {
  postData: IPost;
}

const BackButton = () => <_BackButton href="/posts" />;

export default function Post({ postData }: PostProps) {
  return (
    <>
      <Head title={`${postData.data.title} | Hector Bennett`} />

      <Scrollable.div style={{ width: "100%" }}>
        <Section className={styles.article}>
          <BackButton />
          <div>{postData.data.date}</div>
          <h1>
            <span className="highlight">{postData.data.title}</span>
          </h1>
          <div dangerouslySetInnerHTML={{ __html: postData.html }} />
          <BackButton />
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
