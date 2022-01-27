import clsx from "clsx";

import styles from "./promo-posts-final-cost.css";

const PromoPostsFinalCost = ({ cost, className, }) => (
    <div className={clsx(styles.totalWrapper, className)}>
        <div className={styles.title}>
            Final Cost
        </div>
        <div className={styles.cost}>
            {`$${cost}`}
        </div>
    </div>
);

export default PromoPostsFinalCost;