import clsx from "clsx";

import arrow from "../../assets/icons/arrow-right.svg";

import styles from "./arrow-button.css";

const ArrowButton = ({ className, children, ...props }) => (
  <button className={clsx(styles.button, className)} {...props}>
    <span className={styles.text}>{children}</span>
    <img src={arrow} alt="" className={styles.icon} />
  </button>
);

export default ArrowButton;
