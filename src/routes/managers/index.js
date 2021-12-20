import { useMemo } from "preact/hooks";
import { useQuery } from "react-fetching-library";

import { fetchArchiveUsers, fetchUsers } from "../../api/actions";

import categorizeUsers from "../../helpers/categorize-users";

import Header from "../../components/Header/Header";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import UsersManagersDashboard from "../../components/UsersManagersDashboard/UsersManagersDashboard";

const Managers = () => {
  const { query: queryActive, payload: managersActive, errorActive, loadingActive } = useQuery(fetchUsers);
  const { query: queryArchive, payload: managersArchive, errorArchive, loadingArchive } = useQuery(fetchArchiveUsers);

  const categorizedUsersActive = useMemo(() => {
    if (!Array.isArray(managersActive)) return null;
    return categorizeUsers(managersActive);
  }, [managersActive]);
  
  const categorizeUsersArchive = useMemo(() => {
    if (!Array.isArray(managersArchive)) return null;
    return categorizeUsers(managersArchive);
  }, [managersArchive]);

  return (
    <>
      <Header />

      <PageWrapper title="Менеджеры">

        {(errorActive || errorArchive) && <>Во время загрузки менеджеров произошла ошибка.</>}
        {(loadingActive || loadingArchive) && <>Загрузка менеджеров...</>}

        {(categorizedUsersActive && categorizeUsersArchive) && (
          <UsersManagersDashboard usersActive={categorizedUsersActive.managers} usersArchive={categorizeUsersArchive.managers} onUpdateActive={queryActive} onUpdateArchive={queryArchive} />
        )}
      </PageWrapper>
    </>
  );
};

export default Managers;
