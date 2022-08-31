import Link from "next/link";
import styles from "../styles/App.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div>
          <Link href={"/"}>cannoneyed</Link>
        </div>
        &middot;
        <div>
          <Link href={"/about/"}>about</Link>
        </div>
        &middot;
        <div>
          <Link href={"/projects/"}>projects</Link>
        </div>
      </nav>
    </header>
  );
}
