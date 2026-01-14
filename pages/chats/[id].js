import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import { getAllChatsPath, getChatData } from "../../lib/get-data";
import Markdown from "../../components/markdown";

import styles from "../../styles/Chat.module.css";

export default function Chat({ ChatMetadata, postContent }) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{ChatMetadata.title}</h3>
      <div className={styles.mdxContainer}>
        <Markdown {...postContent} />
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = getAllChatsPath();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const ChatData = await getChatData(params.id);
  const mdxSource = await serialize(ChatData.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  });
  return {
    props: {
      ChatMetadata: ChatData.metadata,
      postContent: mdxSource,
      id: params.id,
    },
  };
}
