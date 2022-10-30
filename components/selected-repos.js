const SELECTED_REPOS = [
  {
    url: "https://github.com/PAIR-code/scatter-gl",
    name: "scatter-gl",
    description:
      "Interactive 3D / 2D webgl-accelerated scatter plot point renderer",
  },
  {
    url: "https://github.com/PAIR-code/umap-js",
    name: "umap-js",
    description: "JavaScript implementation of UMAP dimensionality reduction",
  },
  {
    url: "https://pair-code.github.io/understanding-umap/",
    name: "understanding umap",
    description:
      "Interactive article describing effective dimensionality reduction",
  },
  {
    url: "https://github.com/Patreon/nion",
    name: "nion",
    description: "Patreon's core frontend state management system",
  },
];

import styles from "../styles/App.module.css";

export default function SelectedRepos() {
  return (
    <>
      <h3 className={styles.title}>selected repos / articles</h3>
      <div>
        {SELECTED_REPOS.map((repo) => {
          return (
            <div key={repo.name} className={styles.repo}>
              <a href={repo.url} target="_new">
                {repo.name}
              </a>
              <div className={styles.repoDescription}>{repo.description}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
