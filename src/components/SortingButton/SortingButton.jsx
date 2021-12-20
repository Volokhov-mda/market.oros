import clsx from "clsx";
import { useState } from "preact/hooks";
import SortingOption from "../SortingOption/SortingOption";
import ArrowSorting from "../SvgComponents/ArrowSorting/ArrowSorting";

import chevron from "./../../assets/icons/chevron-right.svg";

import styles from "./sorting-button.css";

const sotringOptions = [
    { name: "By default", value: "weight" },
    { name: "Auditorium", orderable: true, value: "meta.audience" },
    { name: "Cost", orderable: true, value: "price.amount" },
]

const SortingButton = ({ isOpen, setIsOpen, className, register, handleSubmit, onSubmit, setValue }) => {
    const [currOption, setCurrOption] = useState(undefined);
    const [isAscending, setIsAscending] = useState(undefined);

    const classes = clsx(className, styles.wrapper);

    return (
        <form className={classes} onChange={handleSubmit(onSubmit)}>
            <button id="sorting-button" className={clsx(styles.button, isOpen && styles.open)} onClick={() => setIsOpen(!isOpen)} type="button">
                <div className={styles.currOption}>
                    {currOption?.name || "Sorting"} {currOption?.orderable && (isAscending ? <ArrowSorting className={styles.ascending} /> : <ArrowSorting className={styles.descending} />)}
                </div>
                <img src={chevron} className={styles.chevron} />
            </button>
            <div className={styles.options}>
                {sotringOptions.map((option, i) =>
                    <SortingOption
                        key={i}
                        option={option}
                        isAscending={isAscending}
                        setIsAscending={setIsAscending}
                        orderable={option.orderable}
                        selected={option === currOption}
                        setCurrOption={setCurrOption}
                        onChoose={() => setIsOpen(false)}
                        register={register}
                        setValue={setValue}
                    />
                )}
            </div>
        </form>
    )
}

export default SortingButton;