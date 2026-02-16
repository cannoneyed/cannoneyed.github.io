import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import imageSize from "rehype-img-size";
import { getAllEssaysPath, getEssayData } from "../../lib/get-data";
import Markdown from "../../components/markdown";

import styles from "../../styles/Project.module.css";

export default function Project({ projectMetadata, postContent }) {
  return (
    <div>
      <h3 className={styles.title}>{projectMetadata.title}</h3>
      <Markdown {...postContent} />
    </div>
  );
}

export async function getStaticPaths() {
  const paths = getAllEssaysPath();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const projectData = await getEssayData(params.id);
  const mdxSource = await serialize(projectData.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  });
  return {
    props: {
      projectMetadata: projectData.metadata,
      postContent: mdxSource,
      id: params.id,
    },
  };
}
