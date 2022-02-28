import clsx from "clsx";
import { useAtom } from "jotai";

import { contextReorderButtonAtom, contextArchiveButtonAtom, userAtom } from "../../data/atoms";
import rolesConfig from "../../data/rolesConfig";

import FilterButton from "../FilterButton/FilterButton";
import SortingButton from "../SortingButton/SortingButton";

import styles from "./market-controlls.css";

const MarketControlls = ({ register, handleSubmit, onSubmit, setValue, }) => {
    const [currentUser] = useAtom(userAtom);
    const [contextReorderButton] = useAtom(contextReorderButtonAtom);
    const [contextArchiveButton] = useAtom(contextArchiveButtonAtom);
    
    const isReorder = window.location.pathname === "/reorder";

    return (
        <div className={clsx(styles.container, isReorder && styles.reorderContainer)}>
            {!isReorder && <FilterButton className={styles.filterButton} />}
            <div className={styles.right}>
                {(currentUser.role <= rolesConfig.admin) && contextReorderButton}
                {contextArchiveButton}
                {!isReorder && <SortingButton register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} setValue={setValue} />}
            </div>
        </div>
    )
}

export default MarketControlls;