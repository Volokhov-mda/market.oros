import trash from "../../assets/icons/trash.svg";
import FlatActionButton from "../FlatActionButton/FlatActionButton";

import styles from "./delete-button.css";

const DeleteButton = ({ onDelete, }, props) => {
    return (
        <FlatActionButton className={styles.button} icon={trash} onClick={onDelete} {...props} />
    );
}

export default DeleteButton;