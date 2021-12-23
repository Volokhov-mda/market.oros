import clsx from "clsx";

import ArrowSorting from "../SvgComponents/ArrowSorting/ArrowSorting";

import styles from "./sorting-option.css";

const SortingOption = ({ option, isAscending, setIsAscending, selected, orderable, setCurrOption, onChoose, register, setValue, }) => {
    const { onChange: onChangeOrderBy, ...regOrderByParams } = register("orderby");
    const { onChange: onChangeOrder, ...regOrderParams } = register("order");

    const onSelectOption = (isAscending) => { setIsAscending(isAscending); setCurrOption(option); onChoose(); }

    return (
        <>
            <input
                className={styles.radio}
                type="radio"
                id={option.value}
                value={option.value}
                onClick={(e) => { setValue("order", undefined); onChangeOrder(e); onSelectOption(true); }}
                {...regOrderByParams}
            />
            <label for={orderable ? `${option.value}asc` : option.value} className={clsx(styles.option, !!selected && styles.selected)}>
                <div className={styles.sibling} />
                <span>{option.name}</span>

                {orderable && (
                    <div className={styles.order}>
                        <label for={`${option.value}asc`} className={clsx(isAscending && styles.selectedOption, styles.ascending)}>
                            <input
                                className={styles.radio}
                                type="radio"
                                id={`${option.value}asc`}
                                value="asc"
                                onClick={(e) => { setValue("orderby", option.value); onChangeOrder(e); onSelectOption(true); }}
                                {...regOrderParams}
                            />
                            <ArrowSorting />
                        </label>
                        <label for={`${option.value}desc`} className={clsx(!isAscending && styles.selectedOption, styles.descending)}>
                            <input
                                className={styles.radio}
                                type="radio"
                                id={`${option.value}desc`}
                                name="order"
                                value="desc"
                                onClick={(e) => { setValue("orderby", option.value); onChangeOrder(e); onSelectOption(false); }}
                                {...regOrderParams}
                            />
                            <ArrowSorting />
                        </label>
                    </div>
                )}
            </label>
        </>
    );
};

export default SortingOption;