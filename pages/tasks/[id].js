import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import { getAllTasksPath, getTaskData } from "../../lib/get-data";
import Markdown from "../../components/markdown";

import styles from "../../styles/Task.module.css";

export default function Task({ taskMetadata, postContent }) {
  return (
    <div>
      <h3 className={styles.title}>{taskMetadata.title}</h3>
      <div className={styles.mdxContainer}>
        <Markdown {...postContent} />
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = getAllTasksPath();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const TaskData = await getTaskData(params.id);
  const mdxSource = await serialize(TaskData.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  });
  return {
    props: {
      taskMetadata: TaskData.metadata,
      postContent: mdxSource,
      id: params.id,
    },
  };
}
