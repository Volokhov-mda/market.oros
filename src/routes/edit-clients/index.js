import { useMemo } from "preact/hooks";
import { useQuery } from "react-fetching-library";

import { fetchInfluencersAction, fetchArchiveInfluencersAction, fetchUserAction, fetchSubscriptions } from "../../api/actions";

import Header from "../../components/Header/Header";
import ClientsFormContainer from "../../components/ClientsFormContainer/ClientsFormContainer";

const EditClietns = ({ id }) => {
  const { payload: subscriptions, loading: loadingSubscriptions, error: errorSubscriptions } = useQuery(fetchSubscriptions({ orderby: "weight" }));
  const { payload: influencersActive, loading: loadingActive, error: errorActive } = useQuery(fetchInfluencersAction({ orderby: "weight" }));
  const { payload: influencersArchive, loading: loadingArchive, error: errorArchive } = useQuery(fetchArchiveInfluencersAction({}));
  const { payload: client, loading: loadingClient, error: errorClient } = useQuery(fetchUserAction(id));

  if (!(subscriptions && influencersActive && influencersArchive && client)) return <>Загрузка блоггеров...</>;

  const defaultClients = useMemo(() => {
    const influencers = [...influencersActive, ...influencersArchive];
    const subscriptionsFiltered = subscriptions.filter((subscription) => subscription.user._id === id).map((subscription) => ({
      _id: subscription._id,
      influencer: subscription.influencer._id,
      nickname: subscription.influencer.nickname,
      isActive: subscription.user.isActive,
      price: subscription.price && subscription.price
    })).map((subscription) => { subscription.isVisible = true; return subscription; });

    const unpricedInfluencers = influencers.filter((influencer) => {
      const hasPrice = subscriptionsFiltered.find((subscription) => {
        return subscription.influencer === influencer._id;
      });

      return !hasPrice;
    });

    const influencersMapped = unpricedInfluencers.map((influencer) => ({ influencer: influencer._id, isActive: influencer.isActive, nickname: influencer.nickname, }));

    return { client, influencers: [...subscriptionsFiltered, ...influencersMapped] };
  }, [client, subscriptions, influencersActive, influencersArchive]);

  return (
    <>
      <Header />

      {(errorSubscriptions || errorActive || errorArchive || errorClient) && <>Во время загрузки пользователей произошла ошибка.</>}
      {(loadingSubscriptions || loadingActive || loadingArchive || loadingClient) && <>Загрузка пользователей...</>}

      {(influencersActive && influencersArchive) && <ClientsFormContainer defaultValues={defaultClients} />}
    </>
  );
};

export default EditClietns;
