import { useAtom } from "jotai";
import { route } from "preact-router";
import Swal from "sweetalert2/dist/sweetalert2.all";

import exit from "../../assets/icons/exit-rest.svg";
import arrow from "../../assets/icons/arrow-right.svg";

import { userAtom } from "../../data/atoms";

import styles from "./logout-button.css";
import showConfirm from "../../helpers/show-confirm";

const LogoutButton = () => {
  const [user, setUser] = useAtom(userAtom);

  const onClick = async () => {
    const isConfirmed = await showConfirm("Do you want to log out?");
    if (!isConfirmed) return;

    setUser(null);
    localStorage.removeItem("token");
    route("/");
  };

  return (
    <button className={styles.button} onClick={onClick}>
      {user && <span className={styles.name}>{user.name}</span>}
      <div className={styles.icons}>
        <img src={exit} alt="" className={styles.icon} />
        <img src={arrow} alt="" className={styles.arrow} />
      </div>
    </button>
  );
};

export default LogoutButton;
