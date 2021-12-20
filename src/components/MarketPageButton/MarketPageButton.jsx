import clsx from "clsx";

import styles from "./market-page-button.css";

const MarketPageButton = ({ pageNum, isActive, onClick }) => {
    return (
        <button className={clsx(styles.button, isActive && styles.current)} onClick={onClick}><span>{pageNum}</span></button>
    );
}

export default MarketPageButton;