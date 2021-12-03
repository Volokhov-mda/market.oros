import { useEffect } from "preact/hooks";
import clsx from "clsx";
import { useAtom } from "jotai";

import { gridShortened } from "../../data/atoms";

import FiltersMarket from "../FiltersMarket/FiltersMarket";

import styles from "./flexible-grid.css";

const FlexibleGrid = ({ children }) => {
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
    }, [isGridShortened]);

    return (
        <div id={styles.pricesWrapper}>
            <FiltersMarket show={isGridShortened} />
            <div className={styles.container}>
                <div className={clsx(styles.grid, isGridShortened && styles.shortening)}>
                    {children}
                </div>
                <div id={styles.gridShortened} className={isGridShortened && styles.shortening}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default FlexibleGrid;