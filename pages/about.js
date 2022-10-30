import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import imageSize from "rehype-img-size";
import { getAboutData } from "../lib/get-data";
import Markdown from "../components/markdown";

import styles from "../styles/Project.module.css";

export default function About({ aboutContent }) {
  return (
    <div>
      <h3 className={styles.title}>about</h3>
      <Markdown {...aboutContent} />
    </div>
  );
}

export async function getStaticProps({ aboutContent }) {
  const aboutData = await getAboutData();
  const mdxSource = await serialize(aboutData.content, {
    mdxOptions: {
      rehypePlugins: [[imageSize, { dir: `public` }]],
    },
  });
  return {
    props: {
      aboutContent: mdxSource,
    },
  };
}
