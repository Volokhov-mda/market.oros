import clsx from "clsx";
import formatPriceInputValue from "../../helpers/formatPriceInputValue";
import styles from "./promo-posts-input.css";

const PromoPostsInput = ({ numOfPromoPosts, setNumOfPromoPosts, className, }) => {
    return (
        <div className={clsx(styles.inputWrapper, className)}>
            <div className={styles.title}>Quantity</div>
            <input className={styles.input} placeholder={0} value={numOfPromoPosts} onChange={(e) => { setNumOfPromoPosts(formatPriceInputValue(e.target.value)); }} />
        </div>
    );
};

export default PromoPostsInput;