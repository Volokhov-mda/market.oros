import { forwardRef } from "preact/compat";

import styles from "./checkbox.css";

const Checkbox = forwardRef(({ children, ...props }, ref) => (
  <label className={styles.wrapper}>
    {children}
    <input type="checkbox" className={styles.input} {...props} ref={ref} />
    <span className={styles.mark} />
  </label>
));

export default Checkbox;
