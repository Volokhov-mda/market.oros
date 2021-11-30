import clsx from "clsx";

import CardControl from "../CardControl/CardControl";

import styles from "./card-controls.css";

const CardControls = ({ className, onEdit, onDelete }) => (
  <div className={clsx(styles.controls, className)}>
    {onEdit && <CardControl type="edit" onClick={onEdit} />}
    {onDelete && <CardControl type="delete" onClick={onDelete} />}
  </div>
);

export default CardControls;
