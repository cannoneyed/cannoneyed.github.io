import "../styles/globals.css";
import Header from "../components/header";
import Footer from "../components/footer";

import styles from "../styles/App.module.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.mainContainer}>
      <main className={styles.mainColumn}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </main>
    </div>
  );
}

export default MyApp;
