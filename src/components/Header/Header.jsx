import { useAtom } from "jotai";

import { userAtom } from "../../data/atoms";

import Logo from "../Logo/Logo";
import LogoutButton from "../LogoutButton/LogoutButton";
import Link from "../Link/Link";

import styles from "./header.css";

const Header = () => {
  const [user] = useAtom(userAtom);

  const setLinkActiveStyle = (pathToMatch) => window.location.pathname === pathToMatch ? styles.active : null;

  return (
    <header className={styles.header}>
      <Logo className={styles.logo} to="/" />

      <div className={styles.links}>

        {(user?.isAdmin || user?.isModerator) && <Link href="/clients" className={setLinkActiveStyle("/clients")}>Клиенты</Link>}
        {(user?.isAdmin || user?.isModerator) && <Link href="/managers" className={setLinkActiveStyle("/managers")}>Менеджеры</Link>}
        {(user?.isAdmin || user?.isModerator) && <Link href="/categories" className={setLinkActiveStyle("/categories")}>Категории</Link>}
        {user?.isAdmin && <Link href="/admin" className={setLinkActiveStyle("/admin")}>Admin</Link>}

        <LogoutButton />
      </div>
    </header>
  );
};

export default Header;
