import { useAtom } from "jotai";
import { useEffect, useMemo } from "preact/hooks";
import { trackPromise } from "react-promise-tracker";
import { useParameterizedQuery, useQuery } from "react-fetching-library";

import {
  fetchInfluencerPricesAction,
  fetchInfluencerAction,
  fetchUsers,
} from "../../api/actions";

import { userAtom } from "../../data/atoms";

import Header from "../../components/Header/Header";
import PricesFormContainer from "../../components/PricesFormContainer/PricesFormContainer";

const EditPrices = ({ id }) => {
  const [currentUser] = useAtom(userAtom);

  if (currentUser && !currentUser.isAdmin) {
    return route("/", true);
  }

  const { query: queryPrices, payload: prices } = useParameterizedQuery(
    fetchInfluencerPricesAction
  );
  const { query: queryInfluencer, payload: influencer } = useParameterizedQuery(
    fetchInfluencerAction
  );
  const { payload: users, query: queryUsers } = useQuery(fetchUsers, false);

  const fetchPrices = async () => {
    let { error } = await trackPromise(queryPrices(id));
    if (error) return;

    error = await trackPromise(queryInfluencer(id)).error;
    if (error) return;

    error = await trackPromise(queryUsers()).error;
    if (error) return;
  };

  useEffect(() => fetchPrices(), []);

  if (!prices || !influencer || !users) return <>Загрузка цен...</>;

  const defaultValues = useMemo(() => {
    const activePrices = prices.filter((price) => price.targetUser.isActive);

    const unpricedUsers = users.filter((user) => {
      if (!user.isActive) return false;

      const hasPrice = prices.find((price) => {
        return price.targetUser._id === user._id;
      });

      return !hasPrice;
    });

    const remainingPrices = unpricedUsers.map((user) => ({ targetUser: user }));

    return {
      influencer,
      prices: [...activePrices, ...remainingPrices],
    };
  }, [influencer, prices]);

  return (
    <>
      <Header />
      <PricesFormContainer defaultValues={defaultValues} />
    </>
  );
};

export default EditPrices;
