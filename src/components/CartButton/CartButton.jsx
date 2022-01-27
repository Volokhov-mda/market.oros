import clsx from "clsx";
import { useAtom } from "jotai";

import { cartItemsNumAtom } from "../../data/atoms";

import styles from "./cart-button.css";

const CartButton = ({ active }) => {
    const [cartItemsNum] = useAtom(cartItemsNumAtom);

    return (
        <div className={styles.cartButton}>
            <span>Cart </span>
            <div className={styles.cartIcon}>
                <div className={clsx(styles.cart, active && styles.active)} />
                <span className={styles.cartCount}>{cartItemsNum}</span>
            </div>
        </div>
    );
};

export default CartButton;