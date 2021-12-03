import { forwardRef } from "preact/compat";

import styles from "./filters-checkbox.css";

import check from "./../../assets/icons/check.svg";

const FiltersCheckbox = forwardRef(({ children, ...props }, ref) => (
    <label className={styles.wrapper}>
        <input type="checkbox" className={styles.input} {...props} ref={ref} />
        <span className={styles.mark}>
            <div>
                <img className={styles.check} src={check} alt="check" />
            </div>
        </span>
        {children}
    </label>
));

export default FiltersCheckbox;
