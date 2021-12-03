import FiltersInput from "../FiltersInput/FiltersInput";
import styles from "./filters-diapazon-inputs.css";

const FiltersDiapazonInputs = ({ placeholderLeft, placeholderRight }) => {
    return (
        <div className={styles.wrapper}>
            <FiltersInput placeholder={placeholderLeft} />
            <span className={styles.delimiter}>—</span>
            <FiltersInput placeholder={placeholderRight} />
        </div>
    );
}

export default FiltersDiapazonInputs;