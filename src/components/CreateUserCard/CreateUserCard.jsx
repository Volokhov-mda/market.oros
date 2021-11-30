import { useEffect } from "preact/hooks";
import { useForm } from "react-hook-form";

import FlatButton from "../FlatButton/FlatButton";
import UserCard from "../UserCard/UserCard";

import generatePassword from "../../helpers/generate-password";

const CreateUserCard = ({ onCreate }) => {
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
        nameProps={register("name")}
        passwordProps={register("password")}
      >
        <FlatButton accent>Создать</FlatButton>
      </UserCard>
    </form>
  );
};

export default CreateUserCard;
