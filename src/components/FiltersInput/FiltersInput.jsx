import styles from "./filters-input.css";

const FiltersInput = ({ placeholder }) => {
    return (
        <input className={styles.input} placeholder={placeholder} />
    );
}

export default FiltersInput;