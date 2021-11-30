import { useAtom } from "jotai";
import { useMemo } from "preact/hooks";
import { useQuery } from "react-fetching-library";

import { fetchUsers } from "../../api/actions";
import { userAtom } from "../../data/atoms";

import Header from "../../components/Header/Header";
import PricesFormContainer from "../../components/PricesFormContainer/PricesFormContainer";

const AddPrices = () => {
  const [currentUser] = useAtom(userAtom);

  if (currentUser && !currentUser.isAdmin) {
    return route("/", true);
  }

  const { payload: users, loading, error } = useQuery(fetchUsers);

  const defaultPrices = useMemo(() => {
    const activeUsers = (users || []).filter((user) => user.isActive);
    const prices = activeUsers.map((user) => ({ targetUser: user }));

    return { prices };
  }, [users]);

  return (
    <>
      <Header />

      {error && <>Во время загрузки пользователей произошла ошибка.</>}
      {loading && <>Загрузка пользователей...</>}

      {users && <PricesFormContainer defaultValues={defaultPrices} />}
    </>
  );
};

export default AddPrices;
