import clsx from "clsx";

import styles from "./promo-posts-input.css";

const PromoPostsInput = ({ numOfPromoPosts, onInput, className, ...props }) => (
    <div className={clsx(styles.inputWrapper, className)}>
        <div className={styles.title}>Quantity</div>
        <input className={styles.input} placeholder={0} value={numOfPromoPosts} onInput={onInput} {...props} />
    </div>
);

export default PromoPostsInput;