import { useContext, useEffect, useState } from "preact/hooks";
import { useAtom } from "jotai";
import { useMutation, useQuery } from "react-fetching-library";
import { trackPromise } from "react-promise-tracker";
import { route } from "preact-router";

import {
  deleteInfluencerAction,
  fetchInfluencersAction,
  fetchTargetPricesAction,
} from "../../api/actions";

import { prevScrollPageState, userAtom } from "../../data/atoms";
import NotyfContext from "../../contexts/notyf";

import showConfirm from "../../helpers/show-confirm";
import useContextButton from "../../hooks/use-context-button";
import useContextArchiveButton from "../../hooks/use-context-archive-button";

import Header from "../../components/Header/Header";
import ArchivePricesGrid from "../../components/ArchivePricesGrid/ArchivePricesGrid";
import Link from "../../components/Link/Link";
import MarketControlls from "../../components/MarketControlls/MarketControlls";

const Archive = () => {
  const [currentUser] = useAtom(userAtom);
  const [, setScrollState] = useAtom(prevScrollPageState);
  const [prices, setPrices] = useState(null);
  const notyf = useContext(NotyfContext);

  const { mutate: deleteInfluencer } = useMutation(deleteInfluencerAction);
  const { query: fetchTargetPrices } = useQuery(fetchTargetPricesAction, false);
  const { query: fetchInfluencers } = useQuery(fetchInfluencersAction, false);

  const fetchUserPrices = async () => {
    const { payload, error } = await fetchTargetPrices();
    return error ? [] : payload;
  };

  const fetchAdminPrices = async () => {
    const { payload, error } = await fetchInfluencers();
    if (error) return [];

    return payload.map((influencer) => ({ influencer }));
  };

  const fetchPrices = async () => {
    const prices = currentUser.isAdmin
      ? await fetchAdminPrices()
      : await fetchUserPrices();

    setPrices(prices);
  };

  useEffect(() => currentUser && trackPromise(fetchPrices()), [currentUser]);
  useContextButton(
    (currentUser?.isAdmin || currentUser?.isModerator) ? <Link href="/reorder">Изменить</Link> : null
  );
  useContextArchiveButton(
    (currentUser?.isAdmin || currentUser?.isModerator) ? <Link href="/market">Активные</Link> : null
  );

  const onDelete = async ({ nickname, _id }) => {
    const message = `Вы действительно хотите удалить @${nickname}?`;
    const isConfirmed = await showConfirm(message);
    if (!isConfirmed) return;

    const { error } = await trackPromise(deleteInfluencer(_id));
    if (error) return;

    await trackPromise(fetchPrices());
    notyf.success("Инфлюенсер удалён");
  };

  const onEdit = (id, { _id }) => {
    setScrollState({ url: window.location.href, elementId: id });
    route(`/prices/${_id}`);
  };

  useEffect(() => {
    history.state && prices && document.getElementById(history.state.elementId).scrollIntoView({ inline: "center", block: "center", behavior: "smooth" });
  }, [prices]);

  return (
    <>
      <Header />

      {!prices && <>Fetching prices...</>}

      {prices && (
        <>
          <MarketControlls />
          <ArchivePricesGrid
            prices={prices}
            onDelete={currentUser?.isAdmin ? onDelete : undefined}
            onEdit={currentUser?.isAdmin ? onEdit : undefined}
          />
        </>
      )}
    </>
  );
};

export default Archive;
