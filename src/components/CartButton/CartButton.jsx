import clsx from "clsx";
import shoppingBag from "./../../assets/icons/shopping-bag.svg";

import styles from "./cart-button.css";

const CartButton = ({ active }) => {
    return (
        <div className={styles.cartButton}>
            <span>Cart </span>
            <div className={styles.cartIcon}>
                <div className={clsx(styles.cart, active && styles.active)} />
                <span className={styles.cartCount}>12</span>
            </div>
        </div>
    );
};

export default CartButton;