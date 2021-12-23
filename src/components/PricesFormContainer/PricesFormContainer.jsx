import { useContext, useEffect, useState } from "preact/hooks";
import { useMutation, useQuery } from "react-fetching-library";
import { trackPromise } from "react-promise-tracker";
import { route } from "preact-router";
import _ from "lodash";

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
      countries: influencer.countries.filter(v => v !== ""),
      categories: influencer.categories.includes("") ? undefined : influencer.categories,
    };

    const { payload: newInfluencer, error } = redactedInfluencer._id
      ? await trackPromise(editInfluencer(redactedInfluencer._id, redactedInfluencer))
      : await trackPromise(addInfluencer({ ...redactedInfluencer, _id: undefined }));

    if (error) return;
    influencer._id = newInfluencer._id;

    const pricesMapped = prices
      .map((price) => {
        if (price.price) {
          price.price.amount = price.price.amount.toString().replace(/[^0-9]/g, "");
        }

        return {
          _id: price._id || undefined,
          isVisible: price.isVisible,
          user: price.user,
          influencer: influencer._id,
          price: price.price?.amount ? price.price : undefined,
        }
      });

    if (isNewInfluencer) {
      const { error } = await trackPromise(addSubscription(pricesMapped));
      if (error) return;
    } else {
      const pricesToEdit = pricesMapped
        .filter((price, i) => (!price._id || !_.isEqual(price.price, defaultValues.prices[i].price) || price.isVisible !== defaultValues.prices[i].isVisible));

      for (const price of pricesToEdit) {
        const { error } = price._id
          ? await trackPromise(editSubscription(price._id, price))
          : await trackPromise(addSubscription(price));
        if (error) return;
      }
    }

    notyf.success("Информация сохранена");

    route("/market");
  };

  const fetchCategories = async () => {
    const { payload, error } = await query();

    if (error) setCategories([]);

    setCategories(payload);
  }

  useEffect(() => { trackPromise(fetchCategories()); }, [])

  return (
    <CardFlat className={styles.card}>
      {categories && <PricesForm categories={categories} onSubmit={onSubmit} defaultValues={defaultValues} />}
    </CardFlat>
  );
};

export default PricesFormContainer;
