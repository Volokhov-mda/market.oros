import FiltersInput from "../FiltersInput/FiltersInput";
import styles from "./filters-diapazon-inputs.css";

const FiltersDiapazonInputs = ({ placeholderLeft, placeholderRight, leftRegister, rightRegister }) => {
    return (
        <div className={styles.wrapper}>
            <FiltersInput placeholder={placeholderLeft} {...leftRegister} />
            <span className={styles.delimiter}>—</span>
            <FiltersInput placeholder={placeholderRight} {...rightRegister} />
        </div>
    );
}

export default FiltersDiapazonInputs;