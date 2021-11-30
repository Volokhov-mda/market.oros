import clsx from "clsx";

import Card from "../Card/Card";
import Input from "../Input/Input";

import styles from "./user-card.css";

const UserCard = ({ children, nameProps, passwordProps, className, gradient, namePlaceholder }) => (
  <Card gradient={gradient} className={clsx(styles.card, className)}>
    {nameProps && <Input placeholder={namePlaceholder ? namePlaceholder : "Имя"} {...nameProps} />}
    {passwordProps && <Input placeholder="Пароль" {...passwordProps} />}
    {children && <div className={styles.buttons}>{children}</div>}
  </Card>
);

export default UserCard;
