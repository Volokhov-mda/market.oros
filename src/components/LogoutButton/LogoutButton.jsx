import { useAtom } from "jotai";
import { route } from "preact-router";

import exit from "../../assets/icons/exit-rest.svg";
import arrow from "../../assets/icons/arrow-right.svg";

import { userAtom } from "../../data/atoms";

import styles from "./logout-button.css";
import { showConfirmRu, showConfirmEng } from "../../helpers/show-confirm";
import rolesConfig from "../../data/rolesConfig";

const LogoutButton = () => {
  const [user, setUser] = useAtom(userAtom);

  const onClick = async () => {
    let isConfirmed;
    if (user.role === rolesConfig.client) {
      isConfirmed = await showConfirmEng("Do you really want to logout?");
    } else {
      isConfirmed = await showConfirmRu("Вы действительно хотите выйти?");
    }
    if (!isConfirmed) return;

    setUser(null);
    localStorage.removeItem("token");
    route("/");
  };

  return (
    <button className={styles.button} onClick={onClick}>
      {user && <span className={styles.name}>{user.isAdmin ? "Выход" : user.name}</span>}
      <div className={styles.icons}>
        <img src={exit} alt="" className={styles.icon} />
        <img src={arrow} alt="" className={styles.arrow} />
      </div>
    </button>
  );
};

export default LogoutButton;
