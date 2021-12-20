import { useMemo } from "preact/hooks";
import { useQuery } from "react-fetching-library";

import { fetchArchiveUsers, fetchUsers } from "../../api/actions";

import categorizeUsers from "../../helpers/categorize-users";

import UsersDashboard from "../../components/UsersClientsDashboard/UsersClientsDashboard";
import Header from "../../components/Header/Header";
import PageWrapper from "../../components/PageWrapper/PageWrapper";

const Clients = () => {
  const { query: queryActive, payload: clientsActive, errorActive, loadingActive } = useQuery(fetchUsers);
  const { query: queryArchive, payload: clientsArchive, errorArchive, loadingArchive } = useQuery(fetchArchiveUsers);

  const categorizedUsersActive = useMemo(() => {
    if (!Array.isArray(clientsActive)) return null;
    return categorizeUsers(clientsActive);
  }, [clientsActive]);
  
  const categorizeUsersArchive = useMemo(() => {
    if (!Array.isArray(clientsArchive)) return null;
    return categorizeUsers(clientsArchive);
  }, [clientsArchive]);

  return (
    <>
      <Header />

      <PageWrapper title="Клиенты">

        {(errorActive || errorArchive) && <>Во время загрузки пользователей произошла ошибка.</>}
        {(loadingActive || loadingArchive) && <>Загрузка пользователей...</>}

        {(categorizedUsersActive && categorizeUsersArchive) && (
          <UsersDashboard usersActive={categorizedUsersActive.clients} usersArchive={categorizeUsersArchive.clients} onUpdateActive={queryActive} onUpdateArchive={queryArchive} />
        )}
      </PageWrapper>
    </>
  );
};

export default Clients;
