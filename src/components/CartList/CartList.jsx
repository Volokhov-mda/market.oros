import CartItem from "../CartItem/CartItem";

import styles from "./cart-list.css";

const CartList = ({ cartItems }) => (
    <div className={styles.cartListWrapper}>
        {cartItems.map((cartItem) =>
            <CartItem className={styles.cartItem} influencer={cartItem.subscription} key={cartItem._id} />
        )}
    </div>
);

export default CartList;