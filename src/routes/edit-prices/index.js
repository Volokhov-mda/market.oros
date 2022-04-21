import { useMemo } from "preact/hooks";
import { useQuery } from "react-fetching-library";

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
  const {
    payload: influencer,
    loading: loadingInfluencer,
    error: errorInfluencer,
  } = useQuery(fetchInfluencerAction(id));

  const {
    payload: subscriptions,
    loading: loadingSubscriptions,
    error: errorSubscriptions,
  } = useQuery(fetchSubscriptions({ orderby: "weight" }));

  const {
    payload: usersActive,
    loading: loadingActive,
    error: errorActive,
  } = useQuery(fetchUsers);

  const {
    payload: usersArchive,
    loading: loadingArchive,
    error: errorArchive,
  } = useQuery(fetchArchiveUsers);

  if (
    loadingInfluencer ||
    loadingSubscriptions ||
    loadingActive ||
    loadingArchive
  )
    return <>Загрузка цен...</>;

  if (errorSubscriptions || errorActive || errorArchive || errorInfluencer)
    return <>Во время загрузки пользователей произошла ошибка.</>;

  const defaultValues = useMemo(() => {
    console.log(subscriptions.filter((price) => price.influencer._id === id));

    const users = [...usersActive, ...usersArchive];
    const clients = users.filter((user) => user.role === rolesConfig.client);
    const subscriptionsFiltered = subscriptions
      .filter((subscription) => subscription.influencer._id === id)
      .map((subscription) => ({
        _id: subscription._id,
        isVisible: subscription.isVisible,
        user: subscription.user._id,
        name: subscription.user.name,
        showPrices: subscription.user.showPrices,
        isActive: subscription.user.isActive,
        price: subscription.price || undefined,
      }));

    const unpricedClients = clients.filter((user) => {
      const hasPrice = subscriptionsFiltered.find((subscription) => {
        return subscription.user === user._id;
      });

      return !hasPrice;
    });

    const pricesMapped = unpricedClients.map((user) => ({
      ...user,
      password: undefined,
    }));

    return {
      influencer,
      prices: [...subscriptionsFiltered, ...pricesMapped],
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
