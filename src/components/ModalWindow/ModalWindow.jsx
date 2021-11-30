import clsx from "clsx";
import styles from "./modal-window.css";

const ModalWindow = ({ isShow, hide, children }) => {
    const className = clsx(styles.container, isShow && styles.visible);

    return (
        <div className={className} onClick={hide}>
            <div className={styles.content} onClick={(e) => { e.stopPropagation() }}>
                {children}
            </div>
        </div>
    );
}

export default ModalWindow;