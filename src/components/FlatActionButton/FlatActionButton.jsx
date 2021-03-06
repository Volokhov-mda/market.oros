import clsx from "clsx";
import styles from "./flat-action-button.css";

const FlatActionButton = ({ onClick, icon, className, ...props }) => {
    return (
        <button className={clsx(styles.button, className)} onClick={onClick} {...props}>
            <img className={styles.icon} src={icon} />
        </button>
    );
}

export default FlatActionButton;