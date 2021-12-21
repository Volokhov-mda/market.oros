import clsx from "clsx";
import { forwardRef } from "preact/compat";

import styles from "./checkbox.css";

const Checkbox = forwardRef(({ className, markClassName, children, disabled, ...props }, ref) => (
  <label className={clsx(styles.wrapper, className)}>
    <input type="checkbox" className={styles.input} {...props} ref={ref} disabled={disabled} />
    <span className={clsx(styles.mark, markClassName)} />
    {children}
  </label>
));

export default Checkbox;
