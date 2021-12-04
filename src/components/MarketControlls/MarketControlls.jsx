import clsx from "clsx";
import { useAtom } from "jotai";

import { contextButtonAtom, contextArchiveButtonAtom, gridShortened } from "../../data/atoms";
import FilterButton from "../FilterButton/FilterButton";
import FiltersMarket from "../FiltersMarket/FiltersMarket";
import SortingButton from "../SortingButton/SortingButton";

import styles from "./market-controlls.css";

const MarketControlls = () => {
    const [contextButton] = useAtom(contextButtonAtom);
    const [contextArchiveButton] = useAtom(contextArchiveButtonAtom);
    const [isGridShortened, setIsGridShortened] = useAtom(gridShortened);
    const isReorder = window.location.pathname === "/reorder";

    return (
        <div className={clsx(styles.container, isReorder && styles.reorderContainer)}>
            {!isReorder && <FilterButton onFilterClick={() => { setIsGridShortened(!isGridShortened); }} />}
            <div className={styles.right}>
                {contextButton}
                {contextArchiveButton}
                {!isReorder && <SortingButton />}
            </div>
        </div>
    )
}

export default MarketControlls;