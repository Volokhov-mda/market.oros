import { useContext, useEffect, useRef, useState } from "preact/hooks";
import { useAtom } from "jotai";
import { useMutation, useParameterizedQuery, useQuery } from "react-fetching-library";
import { trackPromise } from "react-promise-tracker";
import { useForm } from "react-hook-form";
import { route } from "preact-router";

import {
  archiveInfluencerAction,
  deleteInfluencerAction,
  fetchCategoriesAction,
  fetchFeedAction,
  fetchInfluencersAction,
  fetchInfluencersSummaryAction,
  fetchSubscriptionsSummaryAction,
} from "../../api/actions";

import { userAtom, } from "../../data/atoms";
import NotyfContext from "../../contexts/notyf";

import rolesConfig from "../../data/rolesConfig";

import showConfirm from "../../helpers/show-confirm";
import formatFilterParams from "../../helpers/formatFilterParams";
import useContextReorderButton from "../../hooks/use-context-button";
import useContextArchiveButton from "../../hooks/use-context-archive-button";

import Header from "../../components/Header/Header";
import PricesGrid from "../../components/PricesGrid/PricesGrid";
import Link from "../../components/Link/Link";
import MarketControlls from "../../components/MarketControlls/MarketControlls";
import MarketPages from "../../components/MarketPages/MarketPages";

const Market = ({ page, scroll: scrollElement }) => {
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
  const [params, setParams] = useState(null);
  const notyf = useContext(NotyfContext);

  const { query: fetchFeed } = useParameterizedQuery(fetchFeedAction, false);
  const { query: fetchInfluencers } = useParameterizedQuery(fetchInfluencersAction, false);
  const { mutate: archiveInfluencer } = useMutation(archiveInfluencerAction);
  const { mutate: deleteInfluencer } = useMutation(deleteInfluencerAction);
  const { query: queryInfluencersSummary } = useQuery(fetchInfluencersSummaryAction);
  const { query: querySubscriptionsSummary } = useQuery(fetchSubscriptionsSummaryAction);
  const { query: queryCategories } = useQuery(fetchCategoriesAction);

  const usersPerPage = useRef(null);

  const fetchFilterValues = async () => {
    const { payload: influencersSummary, } = await queryInfluencersSummary();
    const { payload: categories } = await queryCategories();
    const { payload: subscriptionsSummary, } = await querySubscriptionsSummary();

    setFilterValues({
      audienceLimits: influencersSummary?.audienceLimits,
      categories,
      priceLimits: subscriptionsSummary?.priceLimits,
      countries: influencersSummary?.countries,
    });
  }

  const fetchUserPrices = async () => {
    const { payload, headers, error } = await fetchFeed(params);

    if (!error) {
      setInfluencersCount(headers.get("x-market-total"));
      return payload.map((influencer) => ({ influencer }));
    }

    return [];
  };

  const fetchAdminPrices = async () => {
    console.log(params);
    const { payload, headers, error } = await fetchInfluencers(params);

    if (!error) {
      setInfluencersCount(headers.get("x-market-total"));
      return payload.map((influencer) => ({ influencer }));
    }

    return [];
  };

  const fetchPrices = async () => {
    const prices = (currentUser.role <= rolesConfig.manager)
      ? await fetchAdminPrices()
      : await fetchUserPrices();

    setPrices(prices);
  };

  useEffect(() => {
    if (currentUser) {
      usersPerPage.current = (currentUser.role === rolesConfig.admin) ? 29 : 30;

      setParams({
        page: currPageIndex + 1,
        per_page: usersPerPage.current,
        orderby: currentUser.role === rolesConfig.client ? "influencer.weight" : "weight",
        order: "asc",
      });

      trackPromise(fetchFilterValues());
    }
  }, [currentUser]);

  useEffect(() => { trackPromise(fetchPrices()); }, [params])

  useContextReorderButton(
    (currentUser?.role <= rolesConfig.manager) ? <Link href="/reorder">{document.body.clientWidth <= 500 ? "Порядок" : "Изменить порядок"}</Link> : null
  );
  useContextArchiveButton(
    (currentUser?.role <= rolesConfig.manager) ? <Link href="/archive?page=1">Архив</Link> : null
  );

  const onDelete = async ({ nickname, _id }) => {
    const message = `Вы действительно хотите удалить @${nickname}?`;
    const isConfirmed = await showConfirm(message);
    if (!isConfirmed) return;

    const { error } = await trackPromise(deleteInfluencer(_id));
    if (error) return;

    await trackPromise(fetchPrices());
    notyf.success("Инфлюенсер удалён");
  };

  const onEdit = (elementId, { _id }) => {
    route(`/market?page=${currPageIndex + 1}&scroll=${elementId}`);
    route(`/prices/${_id}`);
  };

  const onArchive = async ({ _id }) => {
    const { error } = await trackPromise(archiveInfluencer(_id));
    if (error) return;

    await trackPromise(fetchPrices());
    notyf.success("Инфлюенсер заархивирован");
  }

  useEffect(() => {
    if (prices && scrollElement) {
      console.log("scroll");
      const target = document.getElementById(scrollElement);
      target?.scrollIntoView({ block: 'nearest', }); // behavior: 'smooth', 
    }
  }, [prices, scrollElement]);

  useEffect(() => {
    if (currentUser && currPageIndex && scrollElement) {
      return route(`/market?page=${currPageIndex + 1}&scroll=${scrollElement}`);
    }
  }, [currentUser, currPageIndex, scrollElement]);

  const onSubmit = (data) => {
    data.orderby = ((data.orderby === "meta.audience" || data.orderby === "weight") && currentUser.role === rolesConfig.client) ? `influencer.${data.orderby}` : data.orderby;
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
          <PricesGrid
            prices={prices}
            filterValues={filterValues}
            onDelete={currentUser?.role <= rolesConfig.admin && onDelete}
            onEdit={currentUser?.role <= rolesConfig.manager && onEdit}
            onArchive={currentUser?.role <= rolesConfig.manager && onArchive}
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
          {influencersCount ? <MarketPages currPage={currPageIndex} setCurrPage={setCurrPageIndex} usersPerPage={usersPerPage.current} influencersCount={influencersCount} /> : null}
        </>
      )}
    </>
  );
};

export default Market;
