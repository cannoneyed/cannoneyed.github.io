import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <section>
      <h2>andy coenen</h2>
      <p>I build tools to turn imagination into reality.</p>
      <p>
        currently working as a software engineer doing AI research at{" "}
        <a href="https://pair.withgoogle.com/" target="_blank">
          Google Brain
        </a>
        . living in the NYC area.
      </p>
    </section>
  );
}
