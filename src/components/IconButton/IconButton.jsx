import clsx from "clsx";

import minus from "../../assets/icons/minus.svg";

import styles from "./icon-button.css";

const icons = {
  delete: minus,
};

const IconButton = ({ type, className, ...props }) => (
  <button className={clsx(styles.button, className)} {...props}>
    <img src={icons[type]} alt="" className={styles.icon} />
  </button>
);

export default IconButton;
