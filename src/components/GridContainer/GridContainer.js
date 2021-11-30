import Grid from "../Grid/Grid";

import styles from "./grid-container.css";

const GridContainer = (props) => {
    return (
        <Grid className={styles.users}>
            {props.children}
        </Grid>
    );
}

export default GridContainer;