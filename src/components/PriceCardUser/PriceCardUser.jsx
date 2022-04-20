import clsx from "clsx";
import { useEffect, useRef, useState } from "preact/hooks";
import Img from "react-image-fade-in";
import useClickOutside from "use-click-outside";

import useToggle from "../../hooks/use-toggle";

import currencies from "../../data/currencies";
import formatNumberSpaces from "../../helpers/formatNumberSpaces";
import shortenNumber from "../../helpers/shorten-number";

import Link from "../Link/Link";
import FlatButton from "../FlatButton/FlatButton";
import UserCardFlat from "../UserCardFlat/UserCardFlat";

import styles from "./price-card-user.css";

const PriceCardUser = ({
  className,
  influencer,
  showAddToCartButton,
  onAddToCart,
  priceDescription,
  isInCart,
}) => {
  const ref = useRef();

  const { influencer: inf, price } = influencer;
  const showPrices = influencer.user.showPrices;

  const [isAddedToCart, setIsAddedToCart] = useState(isInCart);
  const [open, toggleOpen] = useToggle(false);

  useClickOutside(ref, () => {
    open && toggleOpen();
  });

  useEffect(() => {
    setIsAddedToCart(isInCart);
  }, [isInCart]);

  return (
    <div ref={ref}>
      <UserCardFlat
        flags={inf.countries}
        className={clsx(
          styles.card,
          showAddToCartButton && !!onAddToCart && styles.hoverable,
          open && styles.opened,
          className
        )}
        onclick={toggleOpen}
        aria-haspopup="true"
      >
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
              {shortenNumber(inf.meta.audience) || "N/A"} followers
            </div>
            <div className={styles.linkContainer}>
              <Link external className={styles.name} href={inf.link}>
                @{inf.nickname}
              </Link>
            </div>
          </div>
          {showPrices && price && (
            <div className={styles.priceContainer}>
              {price.amount !== undefined && (
                <span className={styles.price}>
                  {currencies[price.currency]}
                  {formatNumberSpaces(price.amount)}
                </span>
              )}{" "}
              {priceDescription ||
                (price.description && (
                  <>
                    for{" "}
                    <span className={styles.title}>{price.description}</span>
                  </>
                ))}
            </div>
          )}
        </div>

        {showAddToCartButton && !!onAddToCart && (
          <div className={styles.addToCartContainer}>
            <FlatButton
              className={styles.addToCartButton}
              onclick={() => {
                if (!isAddedToCart) {
                  onAddToCart(influencer);
                  setIsAddedToCart(true);
                }
              }}
              accent={!isAddedToCart}
              outlinedThin={isAddedToCart}
            >
              {!isAddedToCart ? "Add to cart" : "Added to cart"}
            </FlatButton>
          </div>
        )}
      </UserCardFlat>
    </div>
  );
};

export default PriceCardUser;
