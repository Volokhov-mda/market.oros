import { forwardRef } from "preact/compat";
import clsx from "clsx";

import eyeOn from "../../assets/icons/eye-on.svg";
import eyeOff from "../../assets/icons/eye-off.svg";

import styles from "./eye-toggle.css";

const EyeToggle = forwardRef(({ className, ...props }, ref) => (
  <label className={clsx(styles.label, className)}>
    <input type="checkbox" className={styles.checkbox} ref={ref} {...props} />
    <img src={eyeOn} className={clsx(styles.icon, styles.on)} />
    <img src={eyeOff} className={clsx(styles.icon, styles.off)} />
  </label>
));

export default EyeToggle;
