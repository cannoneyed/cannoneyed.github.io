import { MDXRemote } from "next-mdx-remote";
import Video from "./video";

import styles from "../styles/Project.module.css";

// this object will contain all the replacements we want to make
export const components = {
  p: (props) => <div className={styles.paragraph} {...props}></div>,
  Video: (props) => <Video {...props} />,
  img: (props) => {
    // height and width are part of the props, so they get automatically passed here with {...props}
    return (
      <div className={styles.figure}>
        <img className={styles.image} {...props} loading="lazy" />
        <figcaption className={styles.caption}>{props.alt}</figcaption>
      </div>
    );
  },
};

export default function Markdown(postContent) {
  return <MDXRemote {...postContent} components={components} />;
}
