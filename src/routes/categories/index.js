import { useQuery } from "react-fetching-library";

import { fetchCategoriesAction } from "../../api/actions";

import Header from "../../components/Header/Header";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import CategoriesGrid from "../../components/CategoriesGrid/CategoriesGrid";

const Categories = () => {
  const { query, payload: categories, error, loading } = useQuery(fetchCategoriesAction);

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
