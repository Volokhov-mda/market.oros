import { useMemo } from "preact/hooks";
import { useQuery } from "react-fetching-library";

import { fetchInfluencersAction, fetchArchiveInfluencersAction, fetchUserAction, fetchSubscriptions } from "../../api/actions";

import Header from "../../components/Header/Header";
import ClientsFormContainer from "../../components/ClientsFormContainer/ClientsFormContainer";

const EditClietns = ({ id }) => {
  const { payload: client, error: errorClient } = useQuery(fetchUserAction(id));
  const { payload: subscriptions, error: errorSubscriptions } = useQuery(fetchSubscriptions({ orderby: "influencer.weight" }));
  const { payload: influencersActive, error: errorActive } = useQuery(fetchInfluencersAction({ orderby: "influencer.weight" }));
  const { payload: influencersArchive, error: errorArchive } = useQuery(fetchArchiveInfluencersAction({ orderby: "influencer.weight" }));

  if (!(subscriptions && influencersActive && influencersArchive && client)) return <>Загрузка блоггеров...</>;
  if (errorSubscriptions || errorActive || errorArchive || errorClient) return <>Во время загрузки пользователей произошла ошибка.</>;

  const defaultClients = useMemo(() => {
    const subscriptionsFiltered = subscriptions.filter((subscription) => subscription.user._id === id).map((subscription) => ({
      _id: subscription._id,
      isVisible: subscription.isVisible,
      influencer: subscription.influencer._id,
      nickname: subscription.influencer.nickname,
      isActive: subscription.influencer.isActive,
      weight: subscription.influencer.weight,
      price: subscription.price && subscription.price,
    }));

    return { client, influencers: subscriptionsFiltered };
  }, [client, subscriptions, influencersActive, influencersArchive]);

  return (
    <>
      <Header />
      <ClientsFormContainer defaultValues={defaultClients} />
    </>
  );
};

export default EditClietns;
