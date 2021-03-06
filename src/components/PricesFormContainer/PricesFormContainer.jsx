import { useContext, useEffect, useState } from "preact/hooks";
import { useMutation, useQuery } from "react-fetching-library";
import { trackPromise } from "react-promise-tracker";
import { route } from "preact-router";

import {
  addInfluencerAction,
  addSubscriptionAction,
  editInfluencerAction,
  editSubscriptionAction,
  fetchCategoriesAction,
} from "../../api/actions";
import NotyfContext from "../../contexts/notyf";

import PricesForm from "../PricesForm/PricesForm";
import CardFlat from "../CardFlat/CardFlat";

import styles from "./prices-form-container.css";

const PricesFormContainer = ({ defaultValues }) => {
  const [categories, setCategories] = useState(null);
  const notyf = useContext(NotyfContext);

  const { mutate: addInfluencer } = useMutation(addInfluencerAction);
  const { mutate: editInfluencer } = useMutation(editInfluencerAction);
  const { mutate: addSubscription } = useMutation(addSubscriptionAction);
  const { mutate: editSubscription } = useMutation(editSubscriptionAction);
  const { query } = useQuery(fetchCategoriesAction);

  const onSubmit = async ({ influencer, prices }) => {
    const isNewInfluencer = !influencer._id;

    const redactedInfluencer = {
      ...influencer,
      countries: influencer.countries.filter((v) => v !== ""),
      categories:
        !influencer.categories || influencer.categories.includes("")
          ? []
          : influencer.categories,
    };

    let errorPriceEmpty;

    const pricesMapped = prices.map((price) => {
      if (price.price?.amount) {
        price.price.amount = price.price.amount
          .toString()
          .replace(/[^0-9]/g, "");
      }

      if (price.isVisible && !price.price?.amount && price.showPrices) {
        errorPriceEmpty = true;
      }

      return {
        _id: price._id || undefined,
        isVisible: price.isVisible,
        user: price.user,
        influencer: influencer._id,
        price: price.price?.amount ? price.price : undefined,
      };
    });

    if (errorPriceEmpty) {
      notyf.error(
        `?? ???????? ???????????????? ???????????????? ?? ???????????????????? ???????????? "???????????????????? ????????" ???????????? ???????? ?????????????? ????????`
      );
      return;
    }

    const { payload: newInfluencer, error } = redactedInfluencer._id
      ? await trackPromise(
          editInfluencer(redactedInfluencer._id, redactedInfluencer)
        )
      : await trackPromise(
          addInfluencer({ ...redactedInfluencer, _id: undefined })
        );

    if (error) return;

    if (isNewInfluencer) {
      const pricesToAdd = pricesMapped.map((price) => ({
        ...price,
        influencer: newInfluencer._id,
      }));

      const { error } = await trackPromise(addSubscription(pricesToAdd));
      if (error) return;
    } else {
      const pricesToEdit = pricesMapped
        .filter(
          (price, i) =>
            !price._id ||
            price.isVisible !== defaultValues.prices[i].isVisible ||
            (price.price &&
              price.price?.amount != defaultValues.prices[i].price.amount)
        )
        .map((price) => ({ ...price, price: price.price || null }));

      for (const price of pricesToEdit) {
        const { error } = price._id
          ? await trackPromise(editSubscription(price._id, price))
          : await trackPromise(addSubscription(price));
        if (error) return;
      }
    }

    notyf.success("???????????????????? ??????????????????");

    goBack();
  };

  const fetchCategories = async () => {
    const { payload, error } = await query();

    if (error) setCategories([]);

    setCategories(payload);
  };

  useEffect(() => {
    trackPromise(fetchCategories());
  }, []);

  return (
    <CardFlat className={styles.card}>
      {categories && (
        <PricesForm
          categories={categories}
          onSubmit={onSubmit}
          defaultValues={defaultValues}
        />
      )}
    </CardFlat>
  );
};

const goBack = () => {
  if (history.length > 2) {
    history.back();
  } else {
    route("/market?page=1");
  }
};

export default PricesFormContainer;
