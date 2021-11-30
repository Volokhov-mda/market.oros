import ArchiveButton from "../ArchiveButton/ArchiveButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
import Link from "../Link/Link";
import UserCardFlat from "../UserCardFlat/UserCardFlat";

import styles from "./price-card-admin.css";

const PriceCardAdmin = ({ influencer, onEdit, onDelete, onArchive, id }) => {
  const editButton = <EditButton onEdit={onEdit ? () => onEdit(id, influencer) : undefined} />
  const deleteButton = <DeleteButton onDelete={onDelete ? () => onDelete(influencer) : undefined} />
  const archiveButton = <ArchiveButton onArchive={onArchive ? () => onArchive(influencer) : onDelete(influencer)} />

  return (
    <UserCardFlat className={styles.card} leftButtons={[editButton]} rightButtons={[archiveButton, deleteButton]} id={id}>
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

export default PriceCardAdmin;
