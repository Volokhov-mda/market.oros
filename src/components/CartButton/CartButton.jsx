import clsx from "clsx";
import { useAtom } from "jotai";

import useGAEventTracker from "../../hooks/use-ga-event-tracker";

import { cartItemsNumAtom } from "../../data/atoms";

import styles from "./cart-button.css";

const CartButton = ({ active }) => {
    const [cartItemsNum] = useAtom(cartItemsNumAtom);

    const GAEventTrackerCartButton = useGAEventTracker("Cart button click");

    const handleClick = () => GAEventTrackerCartButton("Cart page open");
    
    return (
        <button className={clsx(styles.cartButton, active && styles.active)} onClick={handleClick}>
            <span>Cart </span>
            <div className={styles.cartIcon}>
                <div className={clsx(styles.cart, active && styles.active)} />
                <span className={styles.cartCount}>{cartItemsNum}</span>
            </div>
        </button>
    );
};

export default CartButton;