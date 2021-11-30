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

import { userAtom } from "../../data/atoms";
import NotyfContext from "../../contexts/notyf";

import showConfirm from "../../helpers/show-confirm";
import useContextButton from "../../hooks/use-context-button";

import Header from "../../components/Header/Header";
import PricesGrid from "../../components/PricesGrid/PricesGrid";
import Link from "../../components/Link/Link";

const Market = () => {
  const [currentUser] = useAtom(userAtom);
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
    currentUser?.isAdmin ? <Link href="/reorder">Изменить</Link> : null
  );

  const onDelete = async ({ nickname, _id }) => {
    const message = `Do you want to delete @${nickname}?`;
    const isConfirmed = await showConfirm(message);
    if (!isConfirmed) return;

    const { error } = await trackPromise(deleteInfluencer(_id));
    if (error) return;

    await trackPromise(fetchPrices());
    notyf.success("Инфлюенсер удалён");
  };

  const onEdit = ({ _id }) => {
    route(`/prices/${_id}`);
  };

  return (
    <>
      <Header />

      {!prices && <>Fetching prices...</>}

      {prices && (
        <PricesGrid
          prices={prices}
          onDelete={currentUser?.isAdmin ? onDelete : undefined}
          onEdit={currentUser?.isAdmin ? onEdit : undefined}
        />
      )}
    </>
  );
};

export default Market;
