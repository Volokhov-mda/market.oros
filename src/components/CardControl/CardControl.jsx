import pen from "../../assets/icons/pen.svg";
import trash from "../../assets/icons/trash.svg";

import styles from "./card-control.css";

const icons = {
  edit: pen,
  delete: trash,
};

const CardControl = ({ type, ...props }) => (
  <button className={styles.control} {...props}>
    <img src={icons[type]} alt="" className={styles.icon} />
  </button>
);

export default CardControl;
