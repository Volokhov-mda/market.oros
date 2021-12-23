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
  const { payload: influencer, loading: loadingInfluencer, error: errorInfluencer } = useQuery(fetchInfluencerAction(id));
  const { payload: subscriptions, loading: loadingSubscriptions, error: errorSubscriptions } = useQuery(fetchSubscriptions({ orderby: "weight" }));
  const { payload: usersActive, loading: loadingActive, error: errorActive } = useQuery(fetchUsers);
  const { payload: usersArchive, loading: loadingArchive, error: errorArchive } = useQuery(fetchArchiveUsers);

  if (loadingInfluencer || loadingSubscriptions || loadingActive || loadingArchive) return <>Загрузка цен...</>;
  if (errorSubscriptions || errorActive || errorArchive || errorInfluencer) return <>Во время загрузки пользователей произошла ошибка.</>;

  const defaultValues = useMemo(() => {
    const users = [...usersActive, ...usersArchive];
    const clients = users.filter((user) => user.role === rolesConfig.client);
    const subscriptionsFiltered = subscriptions.filter((price) => price.influencer._id === id).map((price) => ({
      _id: price._id,
      isVisible: price.isVisible,
      user: price.user._id,
      name: price.user.name,
      showPrices: price.user.showPrices,
      isActive: price.user.isActive,
      price: price.price,
    }));

    const unpricedClients = clients.filter((user) => {
      const hasPrice = subscriptionsFiltered.find((subscription) => {
        return subscription.user === user._id;
      });

      return !hasPrice;
    });
    
    const pricesMapped = unpricedClients.map((user) => ({ ...user, password: undefined, }));

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
