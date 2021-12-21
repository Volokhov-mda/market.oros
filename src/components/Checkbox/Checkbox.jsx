import clsx from "clsx";
import { forwardRef } from "preact/compat";

import styles from "./checkbox.css";

const Checkbox = forwardRef(({ className, markClassName, children, disabled, ...props }, ref) => (
  <label className={clsx(styles.wrapper, className)}>
    <span className={clsx(styles.mark, markClassName)} />
    {children}
    <input type="checkbox" className={styles.input} {...props} ref={ref} disabled={disabled} />
  </label>
));

export default Checkbox;
