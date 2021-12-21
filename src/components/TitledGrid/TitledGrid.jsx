import clsx from "clsx";
import Grid from "../Grid/Grid";

import styles from "./titled-grid.css";

const TitledGrid = ({ gridGap, title, titleClassName, children, ...props }) => (
  <div className={styles.grid} style={{ gridGap: gridGap || "1rem" }}>
    <h2 className={titleClassName}>{title}</h2>
    <Grid {...props}>{children}</Grid>
  </div>
);

export default TitledGrid;
