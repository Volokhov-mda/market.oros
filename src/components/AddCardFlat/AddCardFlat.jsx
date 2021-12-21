import clsx from "clsx";

import CardFlat from "../CardFlat/CardFlat";

import styles from "./add-card-flat.css";

const AddCardFlat = ({ type, className, ...props }) => {
    return (
        <CardFlat className={styles.icon}>
            <button className={clsx(styles.button, className)} {...props}>
                +
            </button>
        </CardFlat>
    );
}

export default AddCardFlat;