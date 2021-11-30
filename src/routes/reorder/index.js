import { useAtom } from "jotai";
import { useContext, useEffect, useState } from "preact/hooks";
import { useMutation, useQuery } from "react-fetching-library";
import { trackPromise } from "react-promise-tracker";
import { route } from "preact-router";

import {
  fetchInfluencersAction,
  reorderInfluencersAction,
} from "../../api/actions";

import NotyfContext from "../../contexts/notyf";
import useContextButton from "../../hooks/use-context-button";
import { userAtom } from "../../data/atoms";

import Header from "../../components/Header/Header";
import ReorderList from "../../components/ReorderList/ReorderList";
import Link from "../../components/Link/Link";

const Reorder = () => {
  const [currentUser] = useAtom(userAtom);
  const notyf = useContext(NotyfContext);
  const [influencers, setInfluencers] = useState(null);

  if (currentUser && !currentUser.isAdmin) {
    return route("/", true);
  }

  const { mutate: reorderInfluencers } = useMutation(reorderInfluencersAction);
  const { query: queryInfluencers } = useQuery(fetchInfluencersAction, false);

  const fetchInfluencers = async () => {
    const { payload, error } = await queryInfluencers();
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
    route("/market");
  };

  useContextButton(<Link onClick={onSave}>Сохранить</Link>);

  return (
    <>
      <Header />

      {!influencers && <>Загрузка инфлюенсеров...</>}

      {influencers && (
        <ReorderList
          influencers={influencers}
          setInfluencers={setInfluencers}
          onUpdate={fetchInfluencers}
        />
      )}
    </>
  );
};

export default Reorder;
