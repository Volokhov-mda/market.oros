import { useMemo } from "preact/hooks";
import { useQuery } from "react-fetching-library";

import { fetchUsers, fetchArchiveUsers } from "../../api/actions";

import Header from "../../components/Header/Header";
import PricesFormContainer from "../../components/PricesFormContainer/PricesFormContainer";
import rolesConfig from "../../data/rolesConfig";

const AddClients = () => {
  const { payload: usersActive, loading: loadingActive, error: errorActive } = useQuery(fetchUsers);
  const { payload: usersArchive, loading: loadingArchive, error: errorArchive } = useQuery(fetchArchiveUsers);

  if (!usersActive && !usersArchive) return <>Загрузка клиентов...</>;

  const defaultPrices = useMemo(() => {
    const activeUsers = (usersActive) ? (usersActive).filter((user) => (user.role === rolesConfig.client)) : [];
    const archiveUsers = (usersArchive) ? (usersArchive).filter((user) => (user.role === rolesConfig.client)) : [];

    const pricesActive = activeUsers.map((user) => ({ user: user._id, name: user.name, isActive: user.isActive, price: { currency: "USD", description: "1 promo-post" }, isVisible: true, }));
    const pricesArchive = archiveUsers.map((user) => ({ user: user._id, name: user.name, isActive: user.isActive, price: { currency: "USD", description: "1 promo-post" }, isVisible: true, }));

    return { prices: [...pricesActive, ...pricesArchive] };
  }, [usersActive, usersArchive]);

  return (
    <>
      <Header />

      {(errorActive || errorArchive) && <>Во время загрузки пользователей произошла ошибка.</>}
      {(loadingActive || loadingArchive) && <>Загрузка пользователей...</>}

      {(usersActive && usersArchive) && <PricesFormContainer defaultValues={defaultPrices} />}
    </>
  );
};

export default AddClients;
