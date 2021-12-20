import clsx from "clsx";

import CardFlat from "../CardFlat/CardFlat";
import Input from "../Input/Input";

import styles from "./user-card.css";

const UserCard = ({ children, nameProps, passwordProps, className, gradient, namePlaceholder }) => (
  <CardFlat gradient={gradient} className={clsx(styles.card, className)}>
    {nameProps && <Input placeholder={namePlaceholder ? namePlaceholder : "Имя"} {...nameProps} />}
    {passwordProps && <Input placeholder="Пароль" {...passwordProps} />}
    {children && <div className={styles.buttons}>{children}</div>}
  </CardFlat>
);

export default UserCard;
