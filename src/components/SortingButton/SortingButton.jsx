import clsx from "clsx";
import { useState } from "preact/hooks";
import SortingOption from "../SortingOption/SortingOption";

import chevron from "./../../assets/icons/chevron-right.svg";

import styles from "./sorting-button.css";

const sotringOptions = [
    { name: "By default" },
    { name: "Auditorium", orderable: true, },
    { name: "Cost", orderable: true, },
]

const SortingButton = ({ isOpen, setIsOpen, className }) => {
    const [currOption, setCurrOption] = useState(undefined);

    const classes = clsx(className, styles.wrapper);

    return (
        <div className={classes}>
            <button id="sorting-button" className={clsx(styles.button, isOpen && styles.open)} onClick={() => setIsOpen(!isOpen)}>
                <div className={styles.currOption}>
                    <span>
                        {currOption?.name || "Sorting"}
                    </span>
                    <img src={chevron} className={styles.chevron} />
                </div>
            </button>
            <div className={styles.options}>
                {sotringOptions.map((option, i) => <SortingOption key={i} option={option} orderable={option.orderable} selected={option === currOption} setCurrOption={setCurrOption} onChoose={() => setIsOpen(false)} />)}
            </div>
        </div>
    )
}

export default SortingButton;