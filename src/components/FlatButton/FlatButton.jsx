import clsx from "clsx";

import styles from "./flat-button.css";

const FlatButton = ({ children, accent, danger, outlinedThin, className, ...props }) => (
  <button
    className={clsx(
      styles.button,
      accent && styles.accent,
      danger && styles.danger,
      outlinedThin && styles.outlinedThin,
      className,
    )}
    {...props}
  >
    {children}
  </button>
);

export default FlatButton;
