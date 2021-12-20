import clsx from "clsx";

import styles from "./arrow-sorting.css";

const ArrowSorting = ({ className }) => {
    return (
        <svg className={clsx(className, styles.icon)} viewBox="-1 -1 18 18" fill="none" stroke="white" stroke-width="2" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 15V1" stroke="current" stroke-width="current" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M1 8L8 1L15 8" stroke="current" stroke-width="current" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    )
};

export default ArrowSorting;