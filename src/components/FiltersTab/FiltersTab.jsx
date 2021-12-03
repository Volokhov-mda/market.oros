import clsx from "clsx";

import minus from "./../../assets/icons/minus-tab.svg";
import plus from "./../../assets/icons/plus-tab.svg";

import styles from "./filters-tab.css";

const FiltersTab = ({ title, content, onClick, isOpened, children }) => {
    return (
        <div className={styles.tabContainer}>
            <button className={styles.tab} onClick={onClick}>
                <div>
                    {title}
                </div>
                <div className={styles.iconContainer}>
                    {isOpened ? (
                        <img className={styles.icon} src={minus} alt="minus" />
                    ) : (
                        <img className={styles.icon} src={plus} alt="plus" />
                    )}
                </div>
            </button>
            <div className={clsx(styles.content, isOpened && styles.contentOpened, !isOpened && styles.contentClosed)}>
                {content}
                {children}
            </div>
        </div>
    );
}

export default FiltersTab;