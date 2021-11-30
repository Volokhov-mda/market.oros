import { useAtom } from "jotai";
import { route } from "preact-router";

import Link from "../../components/Link/Link";
import LoginFormContainer from "../../components/LoginFormContainer/LoginFormContainer";

import { userAtom } from "../../data/atoms";

import styles from "./style.css";

const Home = () => {
  const [user] = useAtom(userAtom);

  if (user?.isActive) {
    return route("/market", true);
  }

  return (
    <div className={styles.wrapper}>
      <LoginFormContainer />

      <footer className={styles.footer}>
        If you forgot your password, email
        <br />
        <Link href="mailto:password@orosdigital.agency" className={styles.link}>
          password@orosdigital.agency
        </Link>
      </footer>
    </div>
  );
};

export default Home;
