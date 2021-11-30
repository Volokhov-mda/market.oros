import { route } from "preact-router";
import { useAtom } from "jotai";
import { useMemo } from "preact/hooks";
import { useQuery } from "react-fetching-library";

import { fetchUsers } from "../../api/actions";
import { userAtom } from "../../data/atoms";

import categorizeUsers from "../../helpers/categorize-users";

import UsersDashboard from "../../components/UsersDashboard/UsersDashboard";
import Header from "../../components/Header/Header";

const Users = () => {
  const [currentUser] = useAtom(userAtom);
  const { query, payload: users, error, loading } = useQuery(fetchUsers);

  if (currentUser && !currentUser.isAdmin) {
    return route("/", true);
  }

  const categorizedUsers = useMemo(() => {
    if (!Array.isArray(users)) return null;
    return categorizeUsers(users, (user) => user._id !== currentUser._id);
  }, [users]);

  return (
    <>
      <Header />

      {error && <>Во время загрузки пользователей произошла ошибка.</>}
      {loading && <>Загрузка пользователей...</>}

      {categorizedUsers && (
        <UsersDashboard users={categorizedUsers} onUpdate={query} />
      )}
    </>
  );
};

export default Users;
