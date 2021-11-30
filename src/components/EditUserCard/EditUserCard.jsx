import { useForm } from "react-hook-form";

import FlatButton from "../FlatButton/FlatButton";
import UserCard from "../UserCard/UserCard";

const EditUserCard = ({ user, onEdit, onBan, gradient }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: { name: user?.name, password: user?.password },
  });

  const onSubmit = (data) => onEdit({ ...user, ...data });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <UserCard
        gradient={gradient}
        nameProps={register("name")}
        passwordProps={register("password")}
      >
        {onEdit && <FlatButton accent>Редактировать</FlatButton>}

        {onBan && (
          <FlatButton
            danger
            onClick={onBan ? () => onBan(user) : undefined}
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
