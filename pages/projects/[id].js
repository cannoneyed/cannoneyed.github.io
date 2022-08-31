import { serialize } from "next-mdx-remote/serialize";
import imageSize from "rehype-img-size";
import { getAllProjectsPath, getProjectData } from "../../lib/get-data";
import Markdown from "../../components/markdown";

import styles from "../../styles/Post.module.css";

export default function Project({ projectMetadata, postContent }) {
  return (
    <div>
      <h3 className={styles.title}>{projectMetadata.title}</h3>
      <Markdown {...postContent} />
    </div>
  );
}

export async function getStaticPaths() {
  const paths = getAllProjectsPath();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const projectData = await getProjectData(params.id);
  const mdxSource = await serialize(projectData.content, {
    mdxOptions: {
      rehypePlugins: [[imageSize, { dir: `public` }]],
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
