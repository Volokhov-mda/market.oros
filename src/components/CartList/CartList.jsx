import CartItem from "../CartItem/CartItem";

import styles from "./cart-list.css";

const CartList = ({ cartItems, onChangeQuantity, onDelete }) => (
    <div className={styles.cartListWrapper}>
        {cartItems ? cartItems.map((cartItem) =>
            <CartItem className={styles.cartItem} cartItem={cartItem} onChangeQuantity={onChangeQuantity} onDelete={onDelete} key={cartItem._id} />
        ) : null}
    </div>
);

export default CartList;