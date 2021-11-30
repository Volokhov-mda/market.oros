import MarketStat from "../MarketStat/MarketStat";

import styles from "./market-info.css";

const MarketInfo = () => {
    return (
        <div className={styles.container}>
            <MarketStat number={573} title="Influencers" />
            <MarketStat number={120_000_000} title="Audience" />
        </div>
    );
}

export default MarketInfo;