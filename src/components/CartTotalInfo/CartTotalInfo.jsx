import { useAtom } from "jotai";

import { userAtom } from "../../data/atoms";

import CartTotalItem from "../CartTotalItem/CartTotalItem";
import styles from "./cart-total-info.css";

const CartTotalInfo = ({ audience, posts, price, }) => {
    const [user] = useAtom(userAtom);

    return (
        <div className={styles.cartTotalGrid}>
            <CartTotalItem title="Audience" stat={audience} />
            <CartTotalItem title="Promo posts" stat={posts} />
            {user.showPrices && <CartTotalItem title="Cost" stat={price} accent />}
        </div>
    );
};

export default CartTotalInfo;