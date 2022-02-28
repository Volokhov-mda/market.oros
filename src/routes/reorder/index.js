import { useContext, useEffect, useState } from "preact/hooks";
import { useMutation, useParameterizedQuery, useQuery } from "react-fetching-library";
import { trackPromise } from "react-promise-tracker";
import { route } from "preact-router";

import {
  fetchInfluencersAction,
  reorderInfluencersAction,
} from "../../api/actions";

import NotyfContext from "../../contexts/notyf";
import useContextReorderButton from "../../hooks/use-context-button";
import useContextArchiveButton from "../../hooks/use-context-archive-button";

import Header from "../../components/Header/Header";
import ReorderList from "../../components/ReorderList/ReorderList";
import Link from "../../components/Link/Link";
import MarketControlls from "../../components/MarketControlls/MarketControlls";

import styles from "./style.css";

const Reorder = () => {
  const notyf = useContext(NotyfContext);
  const [influencers, setInfluencers] = useState(null);

  const { query: queryInfluencers } = useParameterizedQuery(fetchInfluencersAction, false);
  const { mutate: reorderInfluencers } = useMutation(reorderInfluencersAction);

  const fetchInfluencers = async () => {
    const { payload, error } = await queryInfluencers({
      orderby: "weight",
      order: "asc",
    });
    !error && setInfluencers(payload);
  };

  useEffect(() => trackPromise(fetchInfluencers()), []);

  const onSave = async () => {
    const weighed = influencers.map((influencer, index) => {
      return { _id: influencer._id, weight: index };
    });

    const { error } = await trackPromise(reorderInfluencers(weighed));
    if (error) return;

    notyf.success("Порядок успешно сохранён");
    route("/market?page=1");
  };

  useContextReorderButton(<Link className={styles.active} onClick={onSave}>Сохранить</Link>);
  useContextArchiveButton(<Link href="/archive?page=1" onClick={onSave}>Архив</Link>);

  return (
    <>
      <Header />

      {!influencers && <>Загрузка инфлюенсеров...</>}

      {influencers && (
        <>
          <MarketControlls />
          <ReorderList
            influencers={influencers}
            setInfluencers={setInfluencers}
            onUpdate={fetchInfluencers}
          />
        </>
      )}
    </>
  );
};

export default Reorder;
