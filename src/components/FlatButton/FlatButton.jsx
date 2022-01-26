import clsx from "clsx";

import styles from "./flat-button.css";

const FlatButton = ({ children, accent, danger, className, ...props }) => (
  <button
    className={clsx(
      styles.button,
      accent && styles.accent,
      danger && styles.danger,
      className,
    )}
    {...props}
  >
    {children}
  </button>
);

export default FlatButton;
