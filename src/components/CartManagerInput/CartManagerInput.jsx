import { forwardRef } from "preact/compat";
import styles from "./cart-manager-input.css";

const CartManagerInput = forwardRef(({ ...props }, ref) => (
    <div className={styles.magerInputWrapper}>
        <div className={styles.title}>Name of manager</div>
        <input className={styles.managerInput} ref={ref} {...props} />
    </div>
));

export default CartManagerInput;