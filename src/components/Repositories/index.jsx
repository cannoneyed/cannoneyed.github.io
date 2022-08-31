import React from "react";

import styles from "./styles.module.scss";

const repositories = [
  {
    title: "umap-js",
    description: "JavaScript port of UMAP (dimensionality reduction algorithm)",
    href: "https://github.com/PAIR-code/umap-js"
  },
  {
    title: "nion",
    description: "Declarative API / Data management library",
    href: "https://github.com/Patreon/nion"
  },
  {
    title: "fiddle",
    description: "OSC Sequencer Application",
    href: "https://github.com/cannoneyed/fiddle"
  },
  {
    title: "tmm-glare",
    description:
      "Geolocation-based web app for prerelease of The M Machine's Glare album",
    href: "https://github.com/cannoneyed/tmm-glare"
  },
  {
    title: "holograf",
    description: "3D program flow and algorithm visualizer",
    href: "https://github.com/cannoneyed/holograf"
  },
  {
    title: "OSCillate",
    description: "Simple OSC plugin (AU / VST)",
    href: "https://github.com/cannoneyed/OSCillate"
  }
];

export default function Repositories() {
  return (
    <div className={styles.container}>
      {repositories.map(repo => (
        <div>
          <a href={repo.href}>{repo.title}</a>
        </div>
      ))}
    </div>
  );
}
