import CartTotalItem from "../CartTotalItem/CartTotalItem";
import styles from "./cart-total-info.css";

const CartTotalInfo = ({ audience, posts, price, }) => {
    return (
        <div className={styles.cartTotalGrid}>
            <CartTotalItem title="Audience" stat={audience} />
            <CartTotalItem title="Promo posts" stat={posts} />
            <CartTotalItem title="Cost" stat={price} accent />
        </div>
    );
};

export default CartTotalInfo;