import clsx from "clsx";
import { useAtom } from "jotai";
import { useEffect, useState } from "preact/hooks";

import { userAtom } from "../../data/atoms";

import formatPriceInputValue from "../../helpers/formatPriceInputValue";

import DeleteButton from "../DeleteButton/DeleteButton";
import PriceCardUser from "../PriceCardUser/PriceCardUser";
import PromoPostsFinalCost from "../PromoPostsFinalCost/PromoPostsFinalCost";
import PromoPostsInput from "../PromoPostsInput/PromoPostsInput";

import styles from "./cart-item-element.css";

const CartItemElement = ({ cartItem, onChangeQuantity, onDelete, className }) => {
    const [user] = useAtom(userAtom);

    const cartItemPostPrice = cartItem.price.amount / cartItem.quantity;
    const [numOfPromoPosts, setNumOfPromoPosts] = useState(cartItem.quantity);

    const onInput = (quantity) => {
        quantity = formatPriceInputValue(quantity);
        if (quantity === "") {
            setNumOfPromoPosts("");
            onChangeQuantity(cartItem, 1);
            return;
        }

        let newQuantity;
        if (!quantity || quantity == 0) {
            newQuantity = 1;
        } else {
            newQuantity = quantity > 99 ? 99 : quantity
        }

        newQuantity = formatPriceInputValue(newQuantity);

        setNumOfPromoPosts(newQuantity);
        onChangeQuantity(cartItem, newQuantity);
    };

    const onFocusOut = (quantity) => {
        if (!numOfPromoPosts) {
            setNumOfPromoPosts(quantity);
            onChangeQuantity(cartItem, quantity);
        }
    }

    return (
        <div className={clsx(styles.cartItemWrapper, className, styles.showDesktop)}>
            <div className={styles.influencerInfo}>
                <DeleteButton className={styles.deleteButton} onDelete={() => { onDelete(cartItem); }} type="button" />
                <div className={styles.cardWrapper}>
                    <PriceCardUser className={styles.influencerCard} influencer={cartItem.subscription} priceDescription="per promo post" />
                </div>
            </div>
            <div className={styles.cost}>
                <PromoPostsInput
                    className={styles.promoPostsInput}
                    numOfPromoPosts={numOfPromoPosts}
                    setNumOfPromoPosts={setNumOfPromoPosts}
                    onInput={(e) => { onInput(e.target.value); }}
                    onfocusout={() => { onFocusOut(1); }}
                />
                {user.showPrices && (
                    <>
                        <div className={styles.verticalSeparator} />
                        <PromoPostsFinalCost className={styles.total} cost={cartItemPostPrice * numOfPromoPosts} />
                    </>
                )}
            </div>
        </div>
    );
};

export default CartItemElement;