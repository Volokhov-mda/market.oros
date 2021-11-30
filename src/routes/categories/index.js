import { route } from "preact-router";
import { useAtom } from "jotai";
import { useMemo } from "preact/hooks";
import { useQuery } from "react-fetching-library";

// import { fetchCategories } from "../../api/actions";
import { fetchUsers } from "../../api/actions";
import { userAtom } from "../../data/atoms";

import categorizeUsers from "../../helpers/categorize-users";

import Header from "../../components/Header/Header";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import CategoriesGrid from "../../components/CategoriesGrid/CategoriesGrid";

const Categories = () => {
  const [currentUser] = useAtom(userAtom);
  // const { query, payload: users, error, loading } = useQuery(fetchCategories);
  const { query, payload: users, error, loading } = useQuery(fetchUsers);

  if (currentUser && !currentUser.isAdmin) {
    return route("/", true);
  }

  const categories = useMemo(() => {
    if (!Array.isArray(users)) return null;
    return categorizeUsers(users, (user) => user._id !== currentUser._id);
  }, [users]);

  return (
    <>
      <Header />

      <PageWrapper title="Категории">

        {error && <>Во время загрузки категорий произошла ошибка.</>}
        {loading && <>Загрузка категорий...</>}

        {categories && (
          <CategoriesGrid categories={categories} onUpdate={query} />
        )}
      </PageWrapper>
    </>
  );
};

export default Categories;
