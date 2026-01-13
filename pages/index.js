import Image from "next/image";

export default function Home() {
  return (
    <section>
      <h2>andy coenen</h2>
      <Image src="/andy_profile.jpg" alt="andy coenen" width={200} height={200} />
      <p>I build tools to turn imagination into reality.</p>
      <p>
        currently working as a software engineer doing AI research at{" "}
        <a href="https://pair.withgoogle.com/" target="_blank" rel="noreferrer">
          Google DeepMind
        </a>
        . living in the NYC area.
      </p>
    </section>
  );
}
