import styles from "../styles/Post.module.css";

export default function Video({ src, caption }) {
  return (
    <div className={styles.figure}>
      <video
        className={styles.video}
        src={src}
        width="100%"
        autoPlay
        loop
        muted
      ></video>
      <figcaption className={styles.caption}>{caption}</figcaption>
    </div>
  );
}
