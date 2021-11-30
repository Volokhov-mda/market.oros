import archive from "../../assets/icons/archive.svg";
import FlatActionButton from "../FlatActionButton/FlatActionButton";

import styles from "./archive-button.css";

const ArchiveButton = ({ onArchive }, props) => {
    return (
        <FlatActionButton className={styles.button} icon={archive} onClick={onArchive} {...props} />
    );
}

export default ArchiveButton;