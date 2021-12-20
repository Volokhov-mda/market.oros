import { useEffect, useState } from "preact/hooks";
import { useQuery } from "react-fetching-library";
import { trackPromise } from "react-promise-tracker";

import { fetchStatsAction } from "../../api/actions";

import LoginFormContainer from "../../components/LoginFormContainer/LoginFormContainer";
import MarketInfo from "../../components/MarketInfo/MarketInfo";

import styles from "./style.css";

const Home = () => {
  const [stats, setStats] = useState(null);
  const { query } = useQuery(fetchStatsAction, false);

  const fetchStats = async () => {
    const { payload, error } = await query();
    if (error) return;

    setStats(payload);
  }

  useEffect(() => { trackPromise(fetchStats()); }, [])

  return (
    <div className={styles.wrapper}>
      <LoginFormContainer />

      <footer className={styles.footer}>
        <MarketInfo numOfInfluencers={stats ? stats.influencers : "..."} numOfAudience={stats ? stats.audience : "..."} />
      </footer>
    </div>
  );
};

export default Home;
