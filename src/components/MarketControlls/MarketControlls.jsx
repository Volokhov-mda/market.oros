import clsx from "clsx";
import { useAtom } from "jotai";
import { useState } from "preact/hooks";

import { contextReorderButtonAtom, contextArchiveButtonAtom, gridShortened, userAtom } from "../../data/atoms";
import rolesConfig from "../../data/rolesConfig";

import FilterButton from "../FilterButton/FilterButton";
import SortingButton from "../SortingButton/SortingButton";

import styles from "./market-controlls.css";

const MarketControlls = ({ register, handleSubmit, onSubmit, setValue }) => {
    const [currentUser] = useAtom(userAtom);
    const [contextReorderButton] = useAtom(contextReorderButtonAtom);
    const [contextArchiveButton] = useAtom(contextArchiveButtonAtom);
    const [isGridShortened, setIsGridShortened] = useAtom(gridShortened);
    const [isSortingOpen, setIsSortingOpen] = useState(false);
    const isReorder = window.location.pathname === "/reorder";

    return (
        <div className={clsx(styles.container, isReorder && styles.reorderContainer)}>
            {!isReorder && <FilterButton className={styles.filterButton} onFilterClick={() => { setIsGridShortened(!isGridShortened); }} />}
            <div className={styles.right}>
                {(currentUser.role <= rolesConfig.admin) && contextReorderButton}
                {contextArchiveButton}
                {!isReorder && <SortingButton isOpen={isSortingOpen} setIsOpen={setIsSortingOpen} register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} setValue={setValue} />}
            </div>
        </div>
    )
}

export default MarketControlls;