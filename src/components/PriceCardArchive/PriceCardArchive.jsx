import RestoreButton from "../RestoreButton/RestoreButton";
import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import Link from "../Link/Link";
import UserCardFlat from "../UserCardFlat/UserCardFlat";

import styles from "./price-card-archive.css";

const PriceCardArchive = ({ influencer, onEdit, onDelete, onRestore, id }) => {
  const restoreButton = onRestore && <RestoreButton onRestore={() => onRestore(influencer)} />
  const editButton = onEdit && <EditButton onEdit={() => onEdit(id, influencer)} />
  const deleteButton = onDelete && <DeleteButton onDelete={() => onDelete(influencer)} />

  return (
    <UserCardFlat className={styles.card} leftButtons={[restoreButton, editButton]} rightButtons={[deleteButton]} id={id}>
      <div className={styles.info}>
        <div className={styles.followers}>
          {influencer.meta.audience || "4 000 000"} followers
        </div>
        <Link external className={styles.name} href={influencer.link}>
          {influencer.nickname}
        </Link>
      </div>
    </UserCardFlat>
  )
}

export default PriceCardArchive;
