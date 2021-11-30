import { forwardRef } from "preact/compat";
import clsx from "clsx";

import styles from "./select.module.css";

const Select = forwardRef(
  ({ className, children, placeholder, ...props }, ref) => (
    <div className={styles.wrapper}>
      <select className={clsx(styles.select, className)} {...props} ref={ref}>
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </select>
    </div>
  )
);

export default Select;
