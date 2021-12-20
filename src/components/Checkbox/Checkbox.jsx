import clsx from "clsx";
import { forwardRef } from "preact/compat";

import styles from "./checkbox.css";

const Checkbox = forwardRef(({ className, children, disabled, ...props }, ref) => (
  <label className={clsx(styles.wrapper, className)}>
    {children}
    <input type="checkbox" className={styles.input} {...props} ref={ref} disabled={disabled} />
    <span className={styles.mark} />
  </label>
));

export default Checkbox;
