import Img from "react-image-fade-in";

import Link from "../Link/Link";
import UserCardFlat from "../UserCardFlat/UserCardFlat";

import styles from "./price-card-user.css";

const PriceCardUser = ({ influencer, value, title, flags }) => (
  <UserCardFlat flags={flags} gradient className={styles.card}>
    <div className={styles.thumbnailWrapper}>
      {influencer.thumbnail && (
        <Img
          src={influencer.thumbnail}
          alt={influencer.nickname}
          className={styles.thumbnail}
        />
      )}
    </div>
    <div className={styles.info}>
      <div className={!(value || title) && styles.infoWithoutPrice}>
        <div className={styles.followers}>
          {influencer.followers || "4 000 000 followers"}
        </div>
        <div className={styles.linkContainer}>
          <Link external className={styles.name} href={influencer.link}>
            @{influencer.nickname}
          </Link>
        </div>
      </div>
      {(value || title) && (
        <div className={styles.priceContainer}>
          {value && <span className={styles.price}>{value}</span>} {title && <>for <span className={styles.title}>{title}</span></>}
        </div>
      )}
    </div>
  </UserCardFlat>
);

export default PriceCardUser;
