import edit from "../../assets/icons/edit.svg";
import FlatActionButton from "../FlatActionButton/FlatActionButton";

import styles from "./edit-button.css";

const EditButton = ({ onEdit }, props) => {
    return (
        <FlatActionButton className={styles.button} icon={edit} onClick={onEdit} {...props} />
    );
}

export default EditButton;