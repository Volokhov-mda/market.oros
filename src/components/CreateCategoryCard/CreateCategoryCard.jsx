import { useForm } from "react-hook-form";

import FlatButton from "../FlatButton/FlatButton";
import UserCard from "../UserCard/UserCard";

const CreateCategoryCard = ({ onCreate, onCancel, gradient }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    onCreate(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <UserCard
        gradient={gradient}
        nameProps={register("name")}
        namePlaceholder="Название категории"
      >
        {onCreate && (
          <FlatButton
            accent
            type="submit"
          >
            Создать
          </FlatButton>
        )}

        {onCancel && (
          <FlatButton
            danger
            onClick={onCancel}
            type="button"
          >
            Отменить
          </FlatButton>
        )}
      </UserCard>
    </form>
  );
};

export default CreateCategoryCard;
