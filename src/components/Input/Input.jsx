import { forwardRef } from "preact/compat";
import clsx from "clsx";

import styles from "./input.css";

const Input = forwardRef(({ className, ...props }, ref) => (
  <input className={clsx(styles.input, className)} {...props} ref={ref} />
));

export default Input;
