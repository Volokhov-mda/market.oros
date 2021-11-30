import { useForm } from "react-hook-form";

import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
import UserCardFlat from "../UserCardFlat/UserCardFlat";

import styles from "./category-card.css";

const CategoryCard = ({ category, onEdit, onDelete }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: { name: category?.name, password: category?.password },
  });

  const onSubmit = (data) => onEdit({ ...category, ...data });

  const editButton = <EditButton onEdit={onEdit ? () => onEdit(category) : undefined} />

  const deleteButton = <DeleteButton onDelete={onDelete ? () => onDelete(category) : undefined} />

  return (
    <UserCardFlat
      leftButtons={[editButton]}
      rightButtons={[deleteButton]}
    >
      <div className={styles.name}>{category.name}</div>
    </UserCardFlat>
  );
};

export default CategoryCard;
