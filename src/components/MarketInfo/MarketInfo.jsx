import MarketStat from "../MarketStat/MarketStat";

import styles from "./market-info.css";

const MarketInfo = ({ numOfInfluencers, numOfAudience }) => {
    return (
        <div className={styles.container}>
            <MarketStat number={numOfInfluencers} title="Influencers" />
            <MarketStat number={numOfAudience} title="Audience" />
        </div>
    );
}

export default MarketInfo;