import clsx from "clsx";
import { useEffect, useState } from "preact/hooks";

import formatPriceInputValue from "../../helpers/formatPriceInputValue";

import DeleteButton from "../DeleteButton/DeleteButton";
import PriceCardUser from "../PriceCardUser/PriceCardUser";
import PromoPostsInput from "../PromoPostsInput/PromoPostsInput";
import PromoPostsFinalCost from "../PromoPostsFinalCost/PromoPostsFinalCost";

import styles from "./cart-item.css";

const CartItem = ({ influencer, className }) => {
    const [numOfPromoPosts, setNumOfPromoPosts] = useState(undefined);

    console.log(influencer);

    useEffect(() => {
        if (numOfPromoPosts === undefined) {
            setNumOfPromoPosts(undefined);
            return;
        }
        if (numOfPromoPosts > 99) {
            setNumOfPromoPosts(99);
        }
    }, [numOfPromoPosts]);

    return (
        <div className={clsx(styles.cartItemWrapper, className)}>
            <div className={styles.influencerInfo}>
                <DeleteButton className={styles.deleteButton} />
                <PriceCardUser className={styles.influencerCard} influencer={influencer} priceDescription="per promo post" />
            </div>
            <div className={styles.cost}>
                <PromoPostsInput className={styles.promoPostsInput} numOfPromoPosts={numOfPromoPosts} setNumOfPromoPosts={setNumOfPromoPosts} />
                <div className={styles.verticalSeparator} />
                <PromoPostsFinalCost className={styles.total} cost={influencer?.price?.amount * (numOfPromoPosts || 0)} />
            </div>
        </div>
    );
};

export default CartItem;