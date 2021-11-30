import FlatButton from "../FlatButton/FlatButton";
import UserCard from "../UserCard/UserCard";

import styles from "./restore-user-card.css";

const RestoreUserCard = ({ onRestore, user, gradient }) => (
  <UserCard
    gradient={gradient}
    nameProps={{ readOnly: true, defaultValue: user.name }}
    passwordProps={{ readOnly: true, defaultValue: user.password }}
    className={styles.card}
  >
    {onRestore && (
      <FlatButton accent onClick={() => onRestore(user)}>
        Восстановить
      </FlatButton>
    )}
  </UserCard>
);

export default RestoreUserCard;
