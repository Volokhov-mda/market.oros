import { useEffect } from "preact/hooks";
import { useForm } from "react-hook-form";

import FlatButton from "../FlatButton/FlatButton";
import UserCard from "../UserCard/UserCard";

import generatePassword from "../../helpers/generate-password";

const CreateCategoryCard = ({ onCreate, onCancel, gradient }) => {
  const { register, handleSubmit, watch, setValue, reset } = useForm();
  const name = watch("name");

  useEffect(() => {
    if (!name) return setValue("password", "");
    setValue("password", generatePassword(name));
  }, [name]);

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
            onClick={onCreate}
            type="button"
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
