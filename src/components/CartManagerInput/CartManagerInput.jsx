import styles from "./cart-manager-input.css";

const CartManagerInput = () => {
    return (
        <div className={styles.magerInputWrapper}>
            <div className={styles.title}>Name of manager</div>
            <input className={styles.managerInput} />
        </div>
    );
};

export default CartManagerInput;