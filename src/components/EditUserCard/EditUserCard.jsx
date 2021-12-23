import { useForm } from "react-hook-form";

import FlatButton from "../FlatButton/FlatButton";
import UserCard from "../UserCard/UserCard";

const EditUserCard = ({ user, className, onEdit, onBan, isNameReadOnly, showPassword }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: { name: user?.name, password: user?.password },
  });

  const onSubmit = (data) => onEdit({ ...user, ...data });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <UserCard
        className={className}
        nameProps={{ readOnly: isNameReadOnly, ...register("name") }}
        passwordProps={showPassword && register("password")}
        type="submit"
      >
        {onEdit && <FlatButton accent>Редактировать</FlatButton>}

        {onBan && (
          <FlatButton
            onClick={onBan && (() => onBan(user))}
            type="button"
          >
            Бан
          </FlatButton>
        )}
      </UserCard>
    </form>
  );
};

export default EditUserCard;
