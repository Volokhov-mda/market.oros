import { useMemo } from "preact/hooks";
import { useQuery } from "react-fetching-library";

import { fetchInfluencersAction, fetchArchiveInfluencersAction } from "../../api/actions";

import Header from "../../components/Header/Header";
import ClientsFormContainer from "../../components/ClientsFormContainer/ClientsFormContainer";

const AddClietns = () => {
  const { payload: influencersActive, loading: loadingActive, error: errorActive } = useQuery(fetchInfluencersAction({}));
  const { payload: influencersArchive, loading: loadingArchive, error: errorArchive } = useQuery(fetchArchiveInfluencersAction({}));

  if (!(influencersActive && influencersArchive)) return <>Загрузка блоггеров...</>;

  const defaultClients = useMemo(() => {
    const influencers = [...influencersActive, ...influencersArchive];
    const influencersMapped = influencers.map((influencer) => ({ _id: influencer._id, isActive: influencer.isActive, nickname: influencer.nickname, isVisible: true }) );

    return { influencers: influencersMapped };
  }, [influencersActive, influencersArchive]);

  return (
    <>
      <Header />

      {(errorActive || errorArchive) && <>Во время загрузки пользователей произошла ошибка.</>}
      {(loadingActive || loadingArchive) && <>Загрузка пользователей...</>}

      {(influencersActive && influencersArchive) && <ClientsFormContainer defaultValues={defaultClients} />}
    </>
  );
};

export default AddClietns;
