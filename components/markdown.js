import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import Video from "./video";

import styles from "../styles/Post.module.css";

// this object will contain all the replacements we want to make
export const components = {
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

export default function Markdown(postContent) {
  return <MDXRemote {...postContent} components={components} />;
}