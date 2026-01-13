import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import imageSize from "rehype-img-size";
import { getAboutData } from "../lib/get-data";
import Markdown from "../components/markdown";
import styles from "../styles/Project.module.css";

export default function About({ aboutContent }) {
  return (
    <>
      <h2 className={styles.title}>about</h2>
      <Image src="/andy_profile.jpg" alt="andy coenen" width={200} height={200} />
      <Markdown {...aboutContent} />
    </>
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
