import clsx from "clsx";
import Img from "react-image-fade-in";

import currencies from "../../data/currencies";
import formatNumberSpaces from "../../helpers/formatNumberSpaces";
import FlatButton from "../FlatButton/FlatButton";

import Link from "../Link/Link";
import UserCardFlat from "../UserCardFlat/UserCardFlat";

import styles from "./price-card-user.css";

const PriceCardUser = ({ className, influencer, onAddToCart, priceDescription, }) => {
  const { influencer: inf, price } = influencer;
  const showPrices = influencer.user.showPrices;

  return (
    <UserCardFlat flags={inf.countries} className={clsx(styles.card, !!onAddToCart && styles.hoverable, className)} onclick={() => { }} aria-haspopup="true">
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
            {price.amount !== undefined && <span className={styles.price}>{currencies[price.currency]}{formatNumberSpaces(price.amount)}</span>} {priceDescription || price.description && <>for <span className={styles.title}>{price.description}</span></>}
          </div>
        )}
      </div>

      {!!onAddToCart && (
        <div className={styles.addToCartContainer}>
          <FlatButton className={styles.addToCartButton} onclick={() => onAddToCart(influencer)} accent>Add to cart</FlatButton>
        </div>
      )}

    </UserCardFlat>
  );
}

export default PriceCardUser;
