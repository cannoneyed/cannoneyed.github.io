import { MDXRemote } from "next-mdx-remote";
import Video from "./video";

import styles from "../styles/Project.module.css";

// this object will contain all the replacements we want to make
export const components = {
  li: (props) => <li className={styles.listItem} {...props} />,
  input: (props) => <input className={styles.checkbox} {...props} />,
  li: (props) => <li className={styles.listItem} {...props} />,
  input: (props) => <input className={styles.checkbox} {...props} />,
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
  Gemini: (props) => {
    return <img src="/gemini.svg" className={styles.geminiIcon} {...props} />;
  },
};

export default function Markdown(postContent) {
  return <MDXRemote {...postContent} components={components} />;
}
