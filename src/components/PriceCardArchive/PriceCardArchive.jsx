import RestoreButton from "../RestoreButton/RestoreButton";
import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import Link from "../Link/Link";
import UserCardFlat from "../UserCardFlat/UserCardFlat";

import styles from "./price-card-archive.css";

const PriceCardArchive = ({ influencer, onEdit, onDelete, onRestore, id }) => {
  const restoreButton = <RestoreButton onRestore={onRestore ? () => onRestore(influencer) : undefined} />
  const editButton = <EditButton onEdit={onEdit ? () => onEdit(id, influencer) : undefined} />
  const deleteButton = <DeleteButton onDelete={onDelete ? () => onDelete(influencer) : undefined} />

  return (
    <UserCardFlat className={styles.card} leftButtons={[restoreButton, editButton]} rightButtons={[deleteButton]} id={id}>
      <div className={styles.info}>
        <div className={styles.followers}>
          {influencer.followers || "4 000 000 followers"}
        </div>
        <Link external className={styles.name} href={influencer.link}>
          {influencer.nickname}
        </Link>
      </div>
    </UserCardFlat>
  )
}

export default PriceCardArchive;
