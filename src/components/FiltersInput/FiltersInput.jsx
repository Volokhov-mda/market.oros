import { forwardRef } from "preact/compat";

import styles from "./filters-input.css";

const FiltersInput = forwardRef(({ placeholder, ...props }, ref) => {
    return (
        <input className={styles.input} placeholder={placeholder} {...props} ref={ref} />
    );
});

export default FiltersInput;