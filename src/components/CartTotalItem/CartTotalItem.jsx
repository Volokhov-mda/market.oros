import styles from "./cart-total-item.css";

const CartTotalItem = ({ title, stat, accent, }) => {
    return (
        <div className={styles.cartTotalItem} accent={accent}>
            <div className={styles.title}>{title}</div>
            <div className={styles.stat}>{stat}</div>
        </div>
    );
};

export default CartTotalItem;