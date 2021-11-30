import clsx from "clsx";
import { useState } from "preact/hooks";

import chevron from "./../../assets/icons/chevron-right.svg";

import styles from "./filter-button.css";

const FilterButton = ({ onFilterClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleFilterClick = () => {
        setIsOpen(!isOpen);
        onFilterClick && onFilterClick();
    }

    return (
        <button onClick={handleFilterClick} className={styles.filter}>
            <span>Filter</span>
            <div className={styles.imgWrapper}>
                <img src={chevron} className={clsx(styles.chevron, isOpen && styles.open)} />
            </div>
        </button>
    );
}

export default FilterButton;