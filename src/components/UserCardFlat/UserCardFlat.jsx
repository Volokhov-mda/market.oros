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
      <div className={styles.flags}>
          {flags.map((flag, i) => <span key={i} className={clsx("flag-icon", `flag-icon-${flag}`, styles.flag)} />)}
      </div>
    )}
  </CardFlat>
);

export default UserCardFlat;
