import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import imageSize from "rehype-img-size";
import {
  getAllProjectsPath,
  getProjectData,
} from "../../lib/get-projects-data";
import Image from "next/image";
import Video from "../../components/video";

import styles from "../../styles/Post.module.css";

// this object will contain all the replacements we want to make
const components = {
  p: (props) => <div className={styles.paragraph} {...props}></div>,
  Video: (props) => <Video {...props} />,
  img: (props) => {
    // height and width are part of the props, so they get automatically passed here with {...props}
    return (
      <div className={styles.figure}>
        <Image {...props} layout="responsive" loading="lazy" />
        <figcaption className={styles.caption}>{props.alt}</figcaption>
      </div>
    );
  },
};

export default function Project({ projectMetadata, postContent }) {
  return (
    <div>
      <h3 className={styles.title}>{projectMetadata.title}</h3>
      <MDXRemote {...postContent} components={components} />
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
