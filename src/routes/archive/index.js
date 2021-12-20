import { useContext, useEffect, useState } from "preact/hooks";
import { useAtom } from "jotai";
import { useMutation, useParameterizedQuery, useQuery } from "react-fetching-library";
import { trackPromise } from "react-promise-tracker";
import { route } from "preact-router";
import { useForm } from "react-hook-form";

import {
  deleteInfluencerAction,
  fetchArchiveInfluencersAction,
  fetchArchiveInfluencersSummaryAction,
  fetchCategoriesAction,
  fetchSubscriptionsSummaryAction,
  restoreInfluencerAction,
} from "../../api/actions";

import { userAtom } from "../../data/atoms";
import NotyfContext from "../../contexts/notyf";

import rolesConfig from "../../data/rolesConfig";

import showConfirm from "../../helpers/show-confirm";
import formatFilterParams from "../../helpers/formatFilterParams";
import useContextReorderButton from "../../hooks/use-context-button";
import useContextArchiveButton from "../../hooks/use-context-archive-button";

import Header from "../../components/Header/Header";
import ArchivePricesGrid from "../../components/ArchivePricesGrid/ArchivePricesGrid";
import Link from "../../components/Link/Link";
import MarketControlls from "../../components/MarketControlls/MarketControlls";
import MarketPages from "../../components/MarketPages/MarketPages";

const Archive = ({ page, scroll: scrollElement }) => {
  history.scrollRestoration = "manual";

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      orderby: "weight",
      order: "asc",
    }
  });

  const [currentUser] = useAtom(userAtom);

  const [currPageIndex, setCurrPageIndex] = useState(page ? (page - 1) : 0);
  const [prices, setPrices] = useState(null);
  const [filterValues, setFilterValues] = useState(null);
  const [influencersCount, setInfluencersCount] = useState(null);
  const [params, setParams] = useState(undefined);
  const notyf = useContext(NotyfContext);

  const { query: queryArchiveInfluencers } = useParameterizedQuery(fetchArchiveInfluencersAction, false);
  const { mutate: restoreInfluencer } = useMutation(restoreInfluencerAction);
  const { mutate: deleteInfluencer } = useMutation(deleteInfluencerAction);
  const { query: queryArchiveInfluencersSummary } = useQuery(fetchArchiveInfluencersSummaryAction);
  const { query: querySubscriptionsSummary } = useQuery(fetchSubscriptionsSummaryAction);
  const { query: queryCategories } = useQuery(fetchCategoriesAction);

  const usersPerPage = 30;

  const fetchFilterValues = async () => {
    const { payload: archiveInfluencersSummary, } = await queryArchiveInfluencersSummary();
    const { payload: categories } = await queryCategories();
    const { payload: subscriptionsSummary, } = await querySubscriptionsSummary();

    setFilterValues({
      audienceLimits: archiveInfluencersSummary?.audienceLimits, 
      categories,
      priceLimits: subscriptionsSummary?.priceLimits,
      countries: archiveInfluencersSummary?.countries
    });
  }

  const fetchArchivePrices = async () => {
    const { payload, headers, error } = await queryArchiveInfluencers(params);

    setInfluencersCount(headers.get("x-market-total"));

    if (error) return [];

    setPrices(payload.map((influencer) => ({ influencer })));
  };

  useEffect(() => {
    if (currentUser) {
      setParams({
        page: currPageIndex + 1,
        per_page: usersPerPage.current,
        orderby: "weight",
        order: "asc",
      });

      trackPromise(fetchFilterValues());
    }
  }, [currentUser]);

  useEffect(() => { trackPromise(fetchArchivePrices()); }, [params])

  useContextReorderButton(
    (currentUser?.role <= 1) ? <Link href="/reorder">{document.body.clientWidth <= 500 ? "Порядок" : "Изменить порядок"}</Link> : null
  );
  useContextArchiveButton(
    (currentUser?.role <= 1) ? <Link href="/market?page=1">Активные</Link> : null
  );

  const onDelete = async ({ nickname, _id }) => {
    const message = `Вы действительно хотите удалить @${nickname}?`;
    const isConfirmed = await showConfirm(message);
    if (!isConfirmed) return;

    const { error } = await trackPromise(deleteInfluencer(_id));
    if (error) return;

    await trackPromise(fetchArchivePrices());
    notyf.success("Инфлюенсер удалён");
  };

  const onEdit = (elementId, { _id }) => {
    route(`/archive?page=${currPageIndex + 1}&scroll=${elementId}`);
    route(`/prices/${_id}`);
  };

  const onRestore = async ({ _id }) => {
    const { error } = await trackPromise(restoreInfluencer(_id));
    if (error) return;

    await trackPromise(fetchArchivePrices());
    notyf.success("Инфлюенсер восстановлен");
  }

  useEffect(() => {
    if (prices && scrollElement) {
      const target = document.getElementById(scrollElement);
      target?.scrollIntoView({ block: 'nearest', }); // behavior: 'smooth', 
    }
  }, [prices, scrollElement]);

  const onSubmit = (data) => {
    console.log(data);
    setParams(formatFilterParams(currPageIndex + 1, usersPerPage.current, data));
  }

  return (
    <>
      <Header />

      {!prices && <>Fetching prices...</>}

      {prices && (
        <>
          <MarketControlls
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            setValue={setValue}
          />
          <ArchivePricesGrid
            prices={prices}
            filterValues={filterValues}
            onDelete={currentUser.role <= rolesConfig.admin && onDelete}
            onEdit={currentUser.role <= rolesConfig.manager && onEdit}
            onRestore={currentUser.role <= rolesConfig.manager && onRestore}
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
          {influencersCount ? <MarketPages currPage={currPageIndex} setCurrPage={setCurrPageIndex} usersPerPage={usersPerPage} influencersCount={influencersCount} /> : null}
        </>
      )}
    </>
  );
};

export default Archive;
