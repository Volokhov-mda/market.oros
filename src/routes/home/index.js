import { useAtom } from "jotai";
import { route } from "preact-router";

import Link from "../../components/Link/Link";
import LoginFormContainer from "../../components/LoginFormContainer/LoginFormContainer";
import MarketInfo from "../../components/MarketInfo/MarketInfo";

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
        <MarketInfo />
      </footer>
    </div>
  );
};

export default Home;
