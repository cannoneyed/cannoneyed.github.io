import Image from "next/image";
import Link from "next/link";
import SelectedRepos from "../components/selected-repos";
import { VerticalSpacer } from "../components/spacer";

import { getEssaysMetaData } from "../lib/get-data.js";

import styles from "../styles/Essays.module.css";

export default function Essays({ essaysData }) {
  return (
    <>
      <h3 className={styles.title}>essays</h3>
      <div className={styles.essaysGrid}>
        {[...essaysData].map((essay) => {
          const dateString = essay.date;
          const date = new Date(dateString);
          const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
          });

          return (
            <div className={styles.essayThumb} key={essay.id}>
              <Link className={styles.essayLink} href={`/essays/${essay.id}`}>
                <div>
                  <Image
                    alt={essay.title}
                    src={essay.thumbnail}
                    layout="responsive"
                    width={800}
                    height={450}
                  />
                </div>
              </Link>
              <div className={styles.essayTitle}>
                <div className={styles.essayDate}>{formattedDate}</div>
                {essay.title}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const essaysData = getEssaysMetaData();
  return {
    props: {
      essaysData,
    },
  };
}
