import { useEffect, useMemo } from "preact/hooks";
import { trackPromise } from "react-promise-tracker";
import { useParameterizedQuery, useQuery } from "react-fetching-library";

import {
  fetchInfluencerAction,
  fetchUsers,
  fetchArchiveUsers,
  fetchSubscriptions,
} from "../../api/actions";

import Header from "../../components/Header/Header";
import PricesFormContainer from "../../components/PricesFormContainer/PricesFormContainer";
import rolesConfig from "../../data/rolesConfig";

const EditPrices = ({ id }) => {
  const { query: querySubscriptions, payload: subscriptions } = useQuery(fetchSubscriptions({ orderby: "weight" }));
  const { query: queryInfluencer, payload: influencer } = useParameterizedQuery(fetchInfluencerAction);
  const { query: queryUsers, payload: usersActive } = useQuery(fetchUsers, false);
  const { query: queryArchiveUsers, payload: usersArchive } = useQuery(fetchArchiveUsers, false);

  const fetchPrices = async () => {
    let { error } = await trackPromise(querySubscriptions());
    if (error) return;

    error = await trackPromise(queryInfluencer(id)).error;
    if (error) return;

    error = await trackPromise(queryUsers()).error;
    if (error) return;

    error = await trackPromise(queryArchiveUsers()).error;
    if (error) return;
  };

  useEffect(() => fetchPrices(), []);

  if (!subscriptions || !influencer || !usersActive || !usersArchive) return <>Загрузка цен...</>;

  const defaultValues = useMemo(() => {
    const users = [...usersActive, ...usersArchive];
    const clients = users.filter((user) => user.role === rolesConfig.client);
    const subscriptionsFiltered = subscriptions.filter((price) => price.influencer._id === id).map((price) => ({
      _id: price._id,
      user: price.user._id,
      name: price.user.name,
      isActive: price.user.isActive,
      price: price.price
    })).map((subscription) => { subscription.isVisible = true; return subscription; });

    const unpricedClients = clients.filter((user) => {
      const hasPrice = subscriptionsFiltered.find((subscription) => {
        return subscription.user === user._id;
      });

      return !hasPrice;
    });

    const remainingPrices = unpricedClients.map((user) => ({ user: user._id, name: user.name, isActive: user.isActive }));

    return {
      influencer,
      prices: [...subscriptionsFiltered, ...remainingPrices],
    };
  }, [influencer, subscriptions]);

  return (
    <>
      <Header />
      <PricesFormContainer defaultValues={defaultValues} />
    </>
  );
};

export default EditPrices;
