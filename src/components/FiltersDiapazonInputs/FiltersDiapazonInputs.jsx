import { useEffect, useState } from "preact/hooks";
import formatPriceInputValue from "../../helpers/formatPriceInputValue";

import FiltersInput from "../FiltersInput/FiltersInput";
import styles from "./filters-diapazon-inputs.css";

const FiltersDiapazonInputs = ({ placeholderLeft, placeholderRight, leftRegister, rightRegister, watch, constChar }) => {
    const [leftValue, setLeftValue] = useState(undefined);
    const [rightValue, setRightValue] = useState(undefined);
    const leftValueWatch = watch(leftRegister.name);
    const rightValueWatch = watch(rightRegister.name);

    useEffect(() => {
        setLeftValue(formatPriceInputValue(leftValueWatch, constChar));
    }, [leftValueWatch]);
    
    useEffect(() => {
        setRightValue(formatPriceInputValue(rightValueWatch, constChar));
    }, [rightValueWatch]);

    return (
        <div className={styles.wrapper}>
            <FiltersInput placeholder={`${constChar || ""}${placeholderLeft}`} {...leftRegister} value={leftValue} />
            <span className={styles.delimiter}>—</span>
            <FiltersInput placeholder={`${constChar || ""}${placeholderRight}`} {...rightRegister} value={rightValue} />
        </div>
    );
}

export default FiltersDiapazonInputs;