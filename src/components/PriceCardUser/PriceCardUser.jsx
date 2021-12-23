import Img from "react-image-fade-in";

import currencies from "../../data/currencies";
import formatNumberSpaces from "../../helpers/formatNumberSpaces";

import Link from "../Link/Link";
import UserCardFlat from "../UserCardFlat/UserCardFlat";

import styles from "./price-card-user.css";

const PriceCardUser = ({ influencer, }) => {
  const { influencer: inf, price } = influencer;
  const showPrices = influencer.user.showPrices;

  return (
    <UserCardFlat flags={inf.countries} gradient className={styles.card}>
      <div className={styles.thumbnailWrapper}>
        {inf.meta.avatar.thumbnail && (
          <Img
            src={inf.meta.avatar.thumbnail}
            alt={inf.nickname}
            className={styles.thumbnail}
          />
        )}
      </div>

      <div className={styles.info}>
        <div className={!(showPrices && price) && styles.infoWithoutPrice}>
          <div className={styles.followers}>
            {inf.meta.audience || "N/A"} followers
          </div>
          <div className={styles.linkContainer}>
            <Link external className={styles.name} href={inf.link}>
              @{inf.nickname}
            </Link>
          </div>
        </div>
        {(showPrices && price) && (
          <div className={styles.priceContainer}>
            {price.amount !== undefined && <span className={styles.price}>{currencies[price.currency]}{formatNumberSpaces(price.amount)}</span>} {price.description && <>for <span className={styles.title}>{price.description}</span></>}
          </div>
        )}
      </div>
    </UserCardFlat>
  );
}

export default PriceCardUser;
