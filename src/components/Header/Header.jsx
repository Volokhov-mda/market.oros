import clsx from "clsx";
import { useAtom } from "jotai";

import { userAtom } from "../../data/atoms";

import rolesConfig from "../../data/rolesConfig";

import Logo from "../Logo/Logo";
import LogoutButton from "../LogoutButton/LogoutButton";
import Link from "../Link/Link";
import CartButton from "../CartButton/CartButton";

import styles from "./header.css";

const Header = () => {
  const [user] = useAtom(userAtom);

  const isLinkActive = (pathToMatch) => window.location.pathname === pathToMatch;
  const setLinkActiveStyle = (pathToMatch) => isLinkActive(pathToMatch) ? styles.active : null;

  return (
    <header className={clsx(styles.header, user?.role === rolesConfig.client && styles.clientHeader)}>
      <Logo className={styles.logo} to="/market?page=1" />

      <div className={styles.links}>

        {user?.role <= rolesConfig.manager && <Link href="/clients" className={setLinkActiveStyle("/clients")}>Клиенты</Link>}
        {user?.role <= rolesConfig.admin   && <Link href="/managers" className={setLinkActiveStyle("/managers")}>Менеджеры</Link>}
        {user?.role <= rolesConfig.manager && <Link href="/categories" className={setLinkActiveStyle("/categories")}>Категории</Link>}
        {user?.role <= rolesConfig.admin   && <Link href="/admin" className={setLinkActiveStyle("/admin")}>Admin</Link>}
        {(user?.role === rolesConfig.client && user.showCart) && <Link href="/cart" className={setLinkActiveStyle("/cart")}><CartButton active={isLinkActive("/cart")} /></Link>}

        <LogoutButton />
      </div>
    </header>
  );
};

export default Header;
