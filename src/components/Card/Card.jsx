import { forwardRef } from "preact/compat";
import clsx from "clsx";

import styles from "./card.module.css";

const Card = forwardRef(({ className, children, ...props }, ref) => {
  className = clsx(styles.card, className);

  return (
    <div className={className} ref={ref} {...props}>
      {children}
    </div>
  );
});

export default Card;
