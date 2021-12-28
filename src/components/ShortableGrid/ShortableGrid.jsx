import { useEffect } from "preact/hooks";
import { useAtom } from "jotai";

import { gridShortened } from "../../data/atoms";

import styles from "./shortable-grid.css";
import clsx from "clsx";

const ShortableGrid = ({ children,  }) => {
    const [isGridShortened] = useAtom(gridShortened);

    useEffect(() => {
        const pricesWrapper = document.getElementById(styles.pricesWrapper);

        if (pricesWrapper) {
            const gridShortenedHeight = document.getElementById(styles.gridShortened).offsetHeight;
            if (!isGridShortened) {
                pricesWrapper.style.height = "unset";
            } else {
                pricesWrapper.style.height = gridShortenedHeight ? `${gridShortenedHeight}px` : "unset";
            }
        }
    }, [isGridShortened, children, window.innerWidth]);

    return (
        <div id={styles.pricesWrapper} className={isGridShortened && styles.shorteningWrapper}>
            <div className={clsx(styles.container, isGridShortened && styles.shorteningContainer)}>
                <div id={styles.grid} className={isGridShortened && styles.shortening}>
                    {children}
                </div>
                <div id={styles.gridShortened} className={clsx(isGridShortened && styles.shortening, styles.hideMobile)}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default ShortableGrid;