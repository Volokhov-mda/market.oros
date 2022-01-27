import clsx from "clsx";

import CardFlat from "../CardFlat/CardFlat";

import styles from "./user-card-flat.css";

const UserCardFlat = ({ leftButtons, rightButtons, flags, children, className, ...props }) => (
  <CardFlat className={clsx(styles.card, className)} {...props}>
    {children && children}

    {leftButtons && (
      <div className={clsx(styles.buttonsGroup, styles.leftButtons)}>{leftButtons.map((leftButton) => leftButton)}</div>
    )}
    {rightButtons && (
      <div className={clsx(styles.buttonsGroup, styles.rightButtons)}>{rightButtons.map((rightButton) => rightButton)}</div>
    )}
    {flags && (
      <>
        <div className={styles.flags}>
          {flags.map((flag, i) => (
              <img
                className={styles.flag}
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${flag.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${flag.toLowerCase()}.png 2x`}
                alt={flag}
              />
          ))}
        </div>
      </>
    )}
  </CardFlat>
);

export default UserCardFlat;
