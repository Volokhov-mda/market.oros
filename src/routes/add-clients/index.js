import { useMemo } from "preact/hooks";
import { useQuery } from "react-fetching-library";

import { fetchInfluencersAction, fetchArchiveInfluencersAction } from "../../api/actions";

import Header from "../../components/Header/Header";
import ClientsFormContainer from "../../components/ClientsFormContainer/ClientsFormContainer";

const AddClietns = () => {
  const { payload: influencersActive, loading: loadingActive, error: errorActive } = useQuery(fetchInfluencersAction({ orderby: "weight" }));
  const { payload: influencersArchive, loading: loadingArchive, error: errorArchive } = useQuery(fetchArchiveInfluencersAction({ orderby: "weight" }));

  if (loadingActive || loadingArchive) return <>Загрузка блогеров...</>;
  if (errorActive || errorArchive) return <>Во время загрузки блогеров произошла ошибка.</>;

  const defaultClients = useMemo(() => {
    const influencers = [...influencersActive, ...influencersArchive];
    const influencersMapped = influencers.map((influencer) => ({ influencer: influencer._id, isActive: influencer.isActive, nickname: influencer.nickname, isVisible: true }));

    return { influencers: influencersMapped };
  }, [influencersActive, influencersArchive]);

  return (
    <>
      <Header />
      <ClientsFormContainer defaultValues={defaultClients} />
    </>
  );
};

export default AddClietns;
