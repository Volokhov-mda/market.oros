import { forwardRef } from "preact/compat";
import Img from "react-image-fade-in";
import clsx from "clsx";

import Card from "../Card/Card";
import CardFlat from "../CardFlat/CardFlat";
import IconButton from "../IconButton/IconButton";

import burger from "../../assets/icons/burger.svg";

import styles from "./reorder-card.css";

const ReorderCard = forwardRef(
  ({ onDelete, influencer, className, ...props }, ref) => (
    <CardFlat className={clsx(styles.card, className)} {...props} ref={ref}>
      <div className={styles.info}>
        {onDelete && (
          <IconButton
            type="delete"
            className={styles.action}
            onClick={() => onDelete(influencer)}
          />
        )}

        <Img
          src={influencer.thumbnail}
          alt={influencer.nickname}
          className={styles.thumbnail}
        />

        <span className={styles.name}>@{influencer.nickname}</span>
      </div>

      <img src={burger} alt="" className={clsx(styles.action, styles.burger)} />
    </CardFlat>
  )
);

export default ReorderCard;
