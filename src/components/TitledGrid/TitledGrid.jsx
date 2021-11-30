import Grid from "../Grid/Grid";

import styles from "./titled-grid.css";

const TitledGrid = ({ title, children, ...props }) => (
  <div className={styles.grid}>
    <h2>{title}</h2>
    <Grid {...props}>{children}</Grid>
  </div>
);

export default TitledGrid;
