import clsx from "clsx";
import { useAtom } from "jotai";
import { useState } from "preact/hooks";

import { contextButtonAtom, contextArchiveButtonAtom, gridShortened } from "../../data/atoms";

import FilterButton from "../FilterButton/FilterButton";
import SortingButton from "../SortingButton/SortingButton";

import styles from "./market-controlls.css";

const MarketControlls = () => {
    const [contextButton] = useAtom(contextButtonAtom);
    const [contextArchiveButton] = useAtom(contextArchiveButtonAtom);
    const [isGridShortened, setIsGridShortened] = useAtom(gridShortened);
    const [isSortingOpen, setIsSortingOpen] = useState(false);
    const isReorder = window.location.pathname === "/reorder";

    return (
        <div className={clsx(styles.container, isReorder && styles.reorderContainer)}>
            <div className={clsx(styles.container2, isSortingOpen && styles.sorting)}>
                {!isReorder && <FilterButton onFilterClick={() => { setIsGridShortened(!isGridShortened); }} />}
                <div className={styles.right}>
                    {contextButton}
                    {contextArchiveButton}
                    {!isReorder && <SortingButton isOpen={isSortingOpen} setIsOpen={setIsSortingOpen} className={styles.sortingButton} />}
                </div>
            </div>
        </div>
    )
}

export default MarketControlls;