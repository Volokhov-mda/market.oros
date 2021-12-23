import { useForm } from "react-hook-form";

import FlatButton from "../FlatButton/FlatButton";
import UserCard from "../UserCard/UserCard";

import styles from "./restore-user-card.css";

const RestoreUserCard = ({ onEdit, onRestore, user, showPassword }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: { name: user?.name, password: user?.password },
  });

  const onSubmit = (data) => onEdit({ ...user, ...data });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <UserCard
        nameProps={{ readOnly: true, ...register("name"), }}
        passwordProps={showPassword && { readOnly: true, ...register("password") }}
        className={styles.card}
      >
        {onEdit && <FlatButton accent type="submit">Редактировать</FlatButton>}
        {onRestore && (
          <FlatButton type="button" onClick={() => { onRestore(user); }}>
            Восстановить
          </FlatButton>
        )}
      </UserCard>
    </form>
  );
};

export default RestoreUserCard;
