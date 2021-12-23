import clsx from "clsx";
import { useAtom } from "jotai";
import { useState } from "preact/hooks";

import { userAtom } from "../../data/atoms";
import rolesConfig from "../../data/rolesConfig";

import chevron from "./../../assets/icons/chevron-right.svg";

import styles from "./filter-button.css";

const FilterButton = ({ className, onFilterClick }) => {
    const [currUser] = useAtom(userAtom);
    const [isOpen, setIsOpen] = useState(false);

    const handleFilterClick = () => {
        setIsOpen(!isOpen);
        onFilterClick && onFilterClick();
    }

    return (
        <button onClick={handleFilterClick} className={clsx(className, styles.filter)}>
            <span>{currUser.role <= rolesConfig.manager ? "Фильтр" : "Filter"}</span>
            <div className={styles.imgWrapper}>
                <img src={chevron} className={clsx(styles.chevron, isOpen && styles.open)} />
            </div>
        </button>
    );
}

export default FilterButton;