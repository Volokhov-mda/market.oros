import restore from "../../assets/icons/repeat.svg";
import FlatActionButton from "../FlatActionButton/FlatActionButton";

import styles from "./restore-button.css";

const RestoreButton = ({ onRestore }, props) => {
    return (
        <FlatActionButton className={styles.button} icon={restore} onClick={onRestore} {...props} />
    );
}

export default RestoreButton;