import Img from "react-image-fade-in";

import Card from "../Card/Card";
import CardControls from "../CardControls/CardControls";
import Link from "../Link/Link";

import styles from "./price-card.css";

const PriceCard = ({ influencer, value, title, onEdit, onDelete }) => (
  <Card gradient className={styles.card}>
    <div className={styles.info}>
      <Link external className={styles.name} href={influencer.link}>
        @{influencer.nickname}
      </Link>
      {(value || title) && (
        <div>
          {value && <span className={styles.price}>{value}</span>}
          {title && <p>{title}</p>}
        </div>
      )}
    </div>
    <div className={styles.thumbnailWrapper}>
      {influencer.thumbnail && (
        <Img
          src={influencer.thumbnail}
          alt={influencer.nickname}
          className={styles.thumbnail}
        />
      )}

      <CardControls
        className={styles.controls}
        onEdit={onEdit ? () => onEdit(influencer) : undefined}
        onDelete={onDelete ? () => onDelete(influencer) : undefined}
      />
    </div>
  </Card>
);

export default PriceCard;
