import clsx from "clsx";

import Card from "../Card/Card";

import plus from "../../assets/icons/plus.svg";

import styles from "./button-card.css";

const icons = {
  add: plus,
};

const ButtonCard = ({ type, value, className, ...props }) => (
  <button className={clsx(styles.button, className)} {...props}>
    <Card className={styles.card}>
      <img src={icons[type]} alt="" className={styles.icon} />
      <span className={styles.text}>{value}</span>
    </Card>
  </button>
);

export default ButtonCard;
