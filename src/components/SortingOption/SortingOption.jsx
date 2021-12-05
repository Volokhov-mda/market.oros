import clsx from "clsx";

import arrow from "./../../assets/icons/arrow-sorting.svg";

import styles from "./sorting-option.css";

const SortingOption = ({ option, selected, orderable, setCurrOption, onChoose }) => {
    return (
        <button className={clsx(styles.option, !!selected && styles.selected)} onClick={() => { setCurrOption(option); onChoose() }} >
            <span>{option.name}</span>

            {orderable && (
                <div className={styles.order}>   
                    <button className={styles.ascending} onClick={() => { console.log("ascending"); setCurrOption(option); onChoose() }}>
                        <img src={arrow} alt="ascending" />
                    </button>
                    <button className={styles.descending} onClick={() => { console.log("descending"); setCurrOption(option); onChoose() }}>
                        <img src={arrow} alt="descending" />
                    </button>
                </div>
            )}
        </button>
    );
}

export default SortingOption;