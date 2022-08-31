import Image from "next/image";
import Link from "next/link";

import { getProjectsMetaData } from "../lib/get-projects-data.js";

import styles from "../styles/Post.module.css";

export default function Projects({ projectsData }) {
  return (
    <>
      <h3 className={styles.title}>selected projects</h3>
      <div className={styles.projectsGrid}>
        {[...projectsData].map((project) => {
          console.log(project);
          return (
            <div className={styles.projectThumb} key={project.id}>
              <Link
                className={styles.projectLink}
                href={`/projects/${project.id}`}
              >
                <Image
                  src={project.thumbnail}
                  layout="responsive"
                  width={800}
                  height={450}
                />
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
