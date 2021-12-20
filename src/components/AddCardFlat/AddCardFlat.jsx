import clsx from "clsx";

import CardFlat from "../CardFlat/CardFlat";

import styles from "./add-card-flat.css";

const AddCardFlat = ({ type, className, ...props }) => {
    return (
        <button className={clsx(styles.button, className)} {...props}>
            <CardFlat className={styles.icon}>
                +
            </CardFlat>
        </button>
    );
}

export default AddCardFlat;