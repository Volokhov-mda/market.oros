import shortenNumber from "../../helpers/shorten-number";

import RestoreButton from "../RestoreButton/RestoreButton";
import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import Link from "../Link/Link";
import UserCardFlat from "../UserCardFlat/UserCardFlat";

import styles from "./price-card-archive.css";

const PriceCardArchive = ({
  influencer,
  onEdit,
  onDelete,
  onRestore,
  name,
}) => {
  const restoreButton = onRestore && (
    <RestoreButton onRestore={() => onRestore(influencer)} />
  );
  const editButton = onEdit && (
    <EditButton onEdit={() => onEdit(name, influencer)} />
  );
  const deleteButton = onDelete && (
    <DeleteButton onDelete={() => onDelete(influencer)} />
  );

  return (
    <UserCardFlat
      className={styles.card}
      leftButtons={[restoreButton, editButton]}
      rightButtons={[deleteButton]}
      name={name}
    >
      <div className={styles.info}>
        <div className={styles.followers}>
          {shortenNumber(influencer.meta?.audience) || "N/A"} followers
        </div>
        <Link external className={styles.name} href={influencer.link}>
          {influencer.nickname}
        </Link>
      </div>
    </UserCardFlat>
  );
};

export default PriceCardArchive;
