import { serialize } from "next-mdx-remote/serialize";
import { getAllDocsPath, getDocData } from "../../lib/get-data";
import Markdown from "../../components/markdown";

import styles from "../../styles/Project.module.css";

export default function Doc({ docMetadata, postContent }) {
  return (
    <div>
      <h3 className={styles.title}>{docMetadata.title}</h3>
      <Markdown {...postContent} />
    </div>
  );
}

export async function getStaticPaths() {
  const paths = getAllDocsPath();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const docData = await getDocData(params.id);
  const mdxSource = await serialize(docData.content);
  return {
    props: {
      docMetadata: docData.metadata,
      postContent: mdxSource,
      id: params.id,
    },
  };
}
