import Image from "next/image";
import Link from "next/link";

import { getProjectsMetaData } from "../lib/get-data.js";

import styles from "../styles/Post.module.css";

export default function Projects({ projectsData }) {
  return (
    <>
      <h3 className={styles.title}>selected projects</h3>
      <div className={styles.projectsGrid}>
        {[...projectsData].map((project) => {
          return (
            <div className={styles.projectThumb} key={project.id}>
              <Link
                className={styles.projectLink}
                href={`/projects/${project.id}`}
              >
                <div>
                  <Image
                    src={project.thumbnail}
                    layout="responsive"
                    width={800}
                    height={450}
                  />
                </div>
              </Link>
              <div className={styles.projectTitle}>{project.title}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const projectsData = getProjectsMetaData();
  return {
    props: {
      projectsData,
    },
  };
}
