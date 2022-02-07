import ArchiveButton from "../ArchiveButton/ArchiveButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
import Link from "../Link/Link";
import UserCardFlat from "../UserCardFlat/UserCardFlat";

import styles from "./price-card-admin.css";

const PriceCardAdmin = ({ influencer, onEdit, onDelete, onArchive, id }) => {
  const editButton = onEdit && <EditButton onEdit={() => onEdit(id, influencer)} />
  const archiveButton = onArchive && <ArchiveButton onArchive={() => onArchive(influencer)} /> // : onDelete(influencer)
  const deleteButton = onDelete && <DeleteButton onDelete={() => onDelete(influencer)} />

  return (
    <UserCardFlat className={styles.card} leftButtons={[editButton]} rightButtons={[archiveButton, deleteButton]} id={id}>
      <div className={styles.info}>
        <div className={styles.followers}>
          {influencer.meta?.audience || "N/A"} followers
        </div>
        <Link external className={styles.name} href={influencer.link}>
          {influencer.nickname}
        </Link>
      </div>
    </UserCardFlat>
  )
}

export default PriceCardAdmin;
