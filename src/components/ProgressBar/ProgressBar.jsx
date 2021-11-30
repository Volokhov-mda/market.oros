import { usePromiseTracker } from "react-promise-tracker";
import clsx from "clsx";

import styles from "./progress-bar.css";

const ProgressBar = () => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    <div className={clsx(styles.wrapper, promiseInProgress && styles.active)}>
      <div className={styles.bar} />
    </div>
  );
};

export default ProgressBar;
