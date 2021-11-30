import { useAtom } from "jotai";

import { contextButtonAtom, userAtom } from "../../data/atoms";

import Logo from "../Logo/Logo";
import LogoutButton from "../LogoutButton/LogoutButton";
import Link from "../Link/Link";

import styles from "./header.css";

const Header = () => {
  const [user] = useAtom(userAtom);
  const [contextButton] = useAtom(contextButtonAtom);

  return (
    <header className={styles.header}>
      <Logo className={styles.logo} to="/" />

      <div className={styles.links}>
        {contextButton}

        {user?.isAdmin && <Link href="/users">Пользователи</Link>}

        <LogoutButton />
      </div>
    </header>
  );
};

export default Header;
