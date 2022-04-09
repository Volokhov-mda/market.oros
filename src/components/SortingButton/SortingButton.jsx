import clsx from "clsx";
import { useAtom } from "jotai";
import { useEffect, useState } from "preact/hooks";
import _ from "lodash";

import { gridShortened, sortingOpened, userAtom } from "../../data/atoms";
import rolesConfig from "../../data/rolesConfig";

import useGAEventTracker from "../../hooks/use-ga-event-tracker";

import chevron from "./../../assets/icons/chevron-right.svg";

import SortingOption from "../SortingOption/SortingOption";
import ArrowSorting from "../SvgComponents/ArrowSorting/ArrowSorting";

import styles from "./sorting-button.css";

const SortingButton = ({ className, register, handleSubmit, onSubmit, setValue, }) => {
    const [currUser] = useAtom(userAtom);
    const [isSortingOpen, setIsSortingOpen] = useAtom(sortingOpened);
    const [, setIsGridShortened] = useAtom(gridShortened);
    
    const [currOption, setCurrOption] = useState(undefined);
    const [isAscending, setIsAscending] = useState(undefined);
    const [sortingOptions, setSortingOptions] = useState(undefined);
    const GAEventTrackerSorting = useGAEventTracker("Sorting Button Click");

    const handleSortingButtonClick = () => {
        currUser.role === rolesConfig.client && GAEventTrackerSorting(`Sorting button ${!isSortingOpen ? "Opened" : "Closed"}`);
        setIsSortingOpen(!isSortingOpen);
        setIsGridShortened(false);
    };

    useEffect(function setDefaultSortingOptions() {
        setSortingOptions(
            (currUser.role <= rolesConfig.manager) ? ([
                { name: "По умолчанию", value: "weight", },
                { name: "Аудитория", orderable: true, value: "meta.audience", },
            ]) : ((currUser.role === rolesConfig.client && !currUser.showPrices) ? ([
                { name: "By default", value: "weight", },
                { name: "Auditorium", orderable: true, value: "meta.audience", },
            ]) : ([
                { name: "By default", value: "weight", },
                { name: "Auditorium", orderable: true, value: "meta.audience", },
                { name: "Cost", orderable: true, value: "price.amount", },
            ]))
        );
    }, []);

    const classes = clsx(styles.wrapper, className);

    return (
        <form className={classes} onChange={handleSubmit(onSubmit)}>
            <button id="sorting-button" className={clsx(styles.button, isSortingOpen && styles.open)} onClick={handleSortingButtonClick} type="button">
                <div className={styles.currOption}>
                    {currOption?.name || (currUser.role <= rolesConfig.manager ? "Сортировка" : "Sorting")} {currOption?.orderable && (isAscending ? <ArrowSorting className={styles.ascending} /> : <ArrowSorting className={styles.descending} />)}
                </div>
                <img src={chevron} className={styles.chevron} />
            </button>
            <div className={styles.options}>
                {sortingOptions && sortingOptions.map((option, i) =>
                    <SortingOption
                        key={i}
                        option={option}
                        isAscending={isAscending}
                        setIsAscending={setIsAscending}
                        orderable={option.orderable}
                        selected={option === currOption}
                        setCurrOption={setCurrOption}
                        onChoose={() => setIsSortingOpen(false)}
                        register={register}
                        setValue={setValue}
                    />
                )}
            </div>
        </form>
    )
}

export default SortingButton;