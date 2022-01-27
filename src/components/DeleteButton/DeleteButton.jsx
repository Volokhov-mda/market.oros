import clsx from "clsx";
import trash from "../../assets/icons/trash.svg";
import FlatActionButton from "../FlatActionButton/FlatActionButton";

import styles from "./delete-button.css";

const DeleteButton = ({ className, onDelete, ...props }) => {
    return (
        <FlatActionButton className={clsx(styles.button, className)} icon={trash} onClick={onDelete} {...props} />
    );
}

export default DeleteButton;