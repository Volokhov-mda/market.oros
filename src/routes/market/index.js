import { useContext, useEffect, useRef, useState } from "preact/hooks";
import { useAtom } from "jotai";
import {
  useMutation,
  useParameterizedQuery,
  useQuery,
} from "react-fetching-library";
import { trackPromise } from "react-promise-tracker";
import { useForm } from "react-hook-form";
import { route } from "preact-router";

import {
  archiveInfluencerAction,
  deleteInfluencerAction,
  fetchFeedAction,
  fetchInfluencersAction,
  fetchInfluencersSummaryAction,
  fetchFeedSummary,
} from "../../api/actions";

import { userAtom } from "../../data/atoms";
import NotyfContext from "../../contexts/notyf";

import rolesConfig from "../../data/rolesConfig";

import { showConfirmRu } from "../../helpers/show-confirm";
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

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      orderby: "weight",
    },
  });

  const [currentUser] = useAtom(userAtom);

  const [currPageIndex, setCurrPageIndex] = useState(page ? page - 1 : 0);
  const [totalNumOfPages, setTotalNumOfPages] = useState(undefined);
  const [prices, setPrices] = useState(null);
  const [filterValues, setFilterValues] = useState(null);
  const [influencersCount, setInfluencersCount] = useState(null);
  const [params, setParams] = useState(null);
  const notyf = useContext(NotyfContext);

  const { query: fetchFeed } = useParameterizedQuery(fetchFeedAction, false);
  const { query: queryFeedSummary } = useQuery(fetchFeedSummary);
  const { query: fetchInfluencers } = useParameterizedQuery(
    fetchInfluencersAction,
    false
  );
  const { mutate: archiveInfluencer } = useMutation(archiveInfluencerAction);
  const { mutate: deleteInfluencer } = useMutation(deleteInfluencerAction);
  const { query: queryInfluencersSummary } = useQuery(
    fetchInfluencersSummaryAction
  );

  const usersPerPage = useRef(null);

  const fetchAdminFilterValues = async () => {
    const { payload: influencersSummary } = await queryInfluencersSummary();

    setFilterValues({
      audienceLimits: influencersSummary?.audienceLimits,
      categories: influencersSummary?.categories,
      countries: influencersSummary?.countries,
    });
  };

  const fetchClientFilterValues = async () => {
    const { payload: feedSummary } = await queryFeedSummary();

    setFilterValues({
      audienceLimits: feedSummary?.audienceLimits,
      categories: feedSummary?.categories,
      priceLimits: feedSummary?.priceLimits,
      countries: feedSummary?.countries,
    });
  };

  const fetchUserPrices = async () => {
    const { payload, headers, error } = await fetchFeed(params);

    if (!error) {
      setInfluencersCount(headers.get("x-market-total"));
      return payload.map((influencer) => ({ influencer }));
    }

    return [];
  };

  const fetchAdminPrices = async () => {
    const { payload, headers, error } = await fetchInfluencers(params);

    if (!error) {
      setInfluencersCount(headers.get("x-market-total"));
      return payload.map((influencer) => ({ influencer }));
    }

    return [];
  };

  const fetchPrices = async () => {
    const prices =
      currentUser.role <= rolesConfig.manager
        ? await fetchAdminPrices()
        : await fetchUserPrices();

    setPrices(prices);
  };

  useEffect(() => {
    if (currentUser && !params) {
      usersPerPage.current = currentUser.role === rolesConfig.admin ? 29 : 30;

      setParams({
        page: currPageIndex + 1,
        per_page: usersPerPage.current,
        orderby:
          currentUser.role === rolesConfig.client
            ? "influencer.weight"
            : "weight",
        order: "asc",
      });

      if (currentUser.role === rolesConfig.client) {
        trackPromise(fetchClientFilterValues());
      } else {
        trackPromise(fetchAdminFilterValues());
      }
    }
  }, [currentUser]);

  useEffect(() => {
    currentUser &&
      setParams({
        ...params,
        page: currPageIndex + 1,
        per_page: usersPerPage.current,
        orderby: !params?.orderby
          ? currentUser.role === rolesConfig.client
            ? "influencer.weight"
            : "weight"
          : params.orderby,
      });
  }, [currPageIndex]);

  useEffect(() => {
    trackPromise(fetchPrices());
  }, [params]);

  useContextReorderButton(
    currentUser?.role <= rolesConfig.manager ? (
      <Link href="/reorder">
        {document.body.clientWidth <= 500 ? "Порядок" : "Изменить порядок"}
      </Link>
    ) : null
  );
  useContextArchiveButton(
    currentUser?.role <= rolesConfig.manager ? (
      <Link href="/archive?page=1">Архив</Link>
    ) : null
  );

  const onDelete = async ({ nickname, _id }) => {
    const message = `Вы действительно хотите удалить @${nickname}?`;
    const isConfirmed = await showConfirmRu(message);
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
  };

  useEffect(() => {
    if (prices && scrollElement) {
      const target = document.getElementById(scrollElement);
      target?.scrollIntoView({ block: "nearest" }); // behavior: 'smooth',
    } else {
      window.scrollTo(0, 0);
    }
  }, [prices, scrollElement]);

  useEffect(() => {
    if (
      currentUser &&
      (`${window.location.pathname}${window.location.search}` !==
        "/market?page=1" ||
        currPageIndex !== 0)
    ) {
      route(
        `/market?page=${currPageIndex + 1}${
          scrollElement ? `&scroll=${scrollElement}` : ""
        }`
      );
    }
  }, [currentUser, currPageIndex, scrollElement]);

  useEffect(() => {
    if (totalNumOfPages < currPageIndex + 1) {
      setCurrPageIndex(0);
    }
  }, [totalNumOfPages]);

  const onSubmit = (data) => {
    data.orderby =
      (data.orderby === "meta.audience" || data.orderby === "weight") &&
      currentUser.role === rolesConfig.client
        ? `influencer.${data.orderby}`
        : data.orderby;
    setParams(
      formatFilterParams(
        totalNumOfPages < currPageIndex + 1 ? 0 : currPageIndex + 1,
        usersPerPage.current,
        data
      )
    );
  };

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
            watch={watch}
            setValue={setValue}
          />
          {influencersCount ? (
            <MarketPages
              currPage={currPageIndex}
              setCurrPage={setCurrPageIndex}
              setTotalNumOfPages={setTotalNumOfPages}
              usersPerPage={usersPerPage.current}
              influencersCount={influencersCount}
            />
          ) : null}
        </>
      )}
    </>
  );
};

export default Market;
