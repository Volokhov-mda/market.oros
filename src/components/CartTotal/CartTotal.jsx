import clsx from "clsx";

import CardFlat from "../CardFlat/CardFlat";
import CartManagerInput from "../CartManagerInput/CartManagerInput";
import CartTotalInfo from "../CartTotalInfo/CartTotalInfo";
import FlatButton from "../FlatButton/FlatButton";

import styles from "./cart-total.css";

const CartTotal = ({ cartTotal, onEmpty, className }) => {
    console.log(cartTotal);
    return (
        <div className={clsx(styles.cartTotalWrapper, className)}>
            <button className={styles.emptyCartButton} onClick={onEmpty} type="button">Empty the cart</button>
            
            <CardFlat className={styles.cartTotalContainer}>
                <div className={styles.title}>Total:</div>
                <div className={styles.horizontalSeparator} />
                <CartTotalInfo audience={cartTotal.audience} posts={cartTotal.posts} price={`$${cartTotal.price}`} />
            </CardFlat>

            <CartManagerInput />

            <FlatButton className={styles.submitCartButton} type="submit">Create order</FlatButton>
        </div>
    );
};

export default CartTotal;