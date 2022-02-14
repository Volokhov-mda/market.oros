import clsx from "clsx";
import { useAtom } from "jotai";

import useGAEventTracker from "../../hooks/use-ga-event-tracker";

import { gridShortened, sortingOpened, userAtom } from "../../data/atoms";
import rolesConfig from "../../data/rolesConfig";

import chevron from "./../../assets/icons/chevron-right.svg";

import styles from "./filter-button.css";

const FilterButton = ({ className, }) => {
    const [currUser] = useAtom(userAtom);
    const [, setIsSortingOpen] = useAtom(sortingOpened);
    const [isGridShortened, setIsGridShortened] = useAtom(gridShortened);

    const GAEventTrackerFilter = useGAEventTracker("Filter Button Click");

    const handleFilterClick = () => {
        currUser.role === rolesConfig.client && GAEventTrackerFilter(`Filter button ${!isGridShortened ? "Opened" : "Closed"}`);
        setIsGridShortened(!isGridShortened);
        window.innerWidth <= 500 && setIsSortingOpen(false);
    }

    return (
        <button onClick={handleFilterClick} className={clsx(className, styles.filter)}>
            <span>{currUser.role <= rolesConfig.manager ? "Фильтр" : "Filter"}</span>
            <div className={styles.imgWrapper}>
                <img src={chevron} className={clsx(styles.chevron, isGridShortened && styles.open)} />
            </div>
        </button>
    );
}

export default FilterButton;