import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
import UserCardFlat from "../UserCardFlat/UserCardFlat";

import styles from "./category-card.css";

const CategoryCard = ({ category, onEdit, onDelete, ...props }) => {
  const editButton = onEdit && <EditButton onEdit={() => onEdit(category)} />

  const deleteButton = onDelete && <DeleteButton onDelete={() => onDelete(category)} />

  return (
    <UserCardFlat
      leftButtons={[editButton]}
      rightButtons={[deleteButton]}
      className={styles.categoryCard}
      {...props}
    >
      <div className={styles.name}>{category.name}</div>
    </UserCardFlat>
  );
};

export default CategoryCard;
