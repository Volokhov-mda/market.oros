import clsx from "clsx";

import Card from "../Card/Card";
import Input from "../Input/Input";

import styles from "./user-card.css";

const UserCard = ({ children, nameProps, passwordProps, className }) => (
  <Card className={clsx(styles.card, className)}>
    <Input placeholder="Имя" {...nameProps} />
    <Input placeholder="Пароль" {...passwordProps} />
    {children && <div className={styles.buttons}>{children}</div>}
  </Card>
);

export default UserCard;
