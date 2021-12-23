import clsx from "clsx";
import { forwardRef } from "preact/compat";

import styles from "./filters-input.css";

const FiltersInput = forwardRef(({ className, placeholder, ...props }, ref) => {
    return (
        <input className={clsx(className, styles.input)} placeholder={placeholder} {...props} ref={ref} />
    );
});

export default FiltersInput;