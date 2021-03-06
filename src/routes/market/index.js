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

import { gridShortened, userAtom } from "../../data/atoms";
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

  const [currPageIndex, setCurrPageIndex] = useState(null);
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
    if (page - 1 !== currPageIndex) {
      setCurrPageIndex(page && page > 0 ? page - 1 : 0);
    }
  }, [page]);

  useEffect(() => {
    if (currentUser && !params) {
      usersPerPage.current = currentUser.role !== rolesConfig.client ? 29 : 30;

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
        {document.body.clientWidth <= 500 ? "??????????????" : "???????????????? ??????????????"}
      </Link>
    ) : null
  );
  useContextArchiveButton(
    currentUser?.role <= rolesConfig.manager ? (
      <Link href="/archive?page=1">??????????</Link>
    ) : null
  );

  const onDelete = async ({ nickname, _id }) => {
    const message = `???? ?????????????????????????? ???????????? ?????????????? @${nickname}?`;
    const isConfirmed = await showConfirmRu(message);
    if (!isConfirmed) return;

    const { error } = await trackPromise(deleteInfluencer(_id));
    if (error) return;

    await trackPromise(fetchPrices());
    notyf.success("???????????????????? ????????????");
  };

  const onEdit = (elementName, { _id }) => {
    route(`/market?page=${currPageIndex + 1}&scroll=${elementName}`);
    route(`/prices/${_id}`);
  };

  const onArchive = async ({ _id }) => {
    const { error } = await trackPromise(archiveInfluencer(_id));
    if (error) return;

    await trackPromise(fetchPrices());
    notyf.success("???????????????????? ??????????????????????????");
  };

  useEffect(() => {
    if (prices && scrollElement) {
      const targets = document.getElementsByName(`${scrollElement}`);
      const target = targets[gridShortened ? 1 : 0];
      const scrollY =
        target?.getBoundingClientRect().top -
        (window.innerHeight - target?.clientHeight) / 2;

      setTimeout(() => {
        window.scrollTo(0, scrollY);
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [prices, scrollElement]);

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
              onRedirect={(newPageNum) => {
                setCurrPageIndex(newPageNum);
                route(`/market?page=${newPageNum + 1}`);
              }}
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
