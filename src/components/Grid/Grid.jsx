import clsx from "clsx";

import styles from "./grid.css";

const Grid = ({ children, className, ...props }) => (
  <div className={clsx(styles.grid, className)} {...props}>
    {children}
  </div>
);

export default Grid;
