import { useContext, useEffect, useState } from "preact/hooks";
import { useMutation, useQuery } from "react-fetching-library";
import { trackPromise } from "react-promise-tracker";
import { route } from "preact-router";
import { useAtom } from "jotai";

import { userAtom } from "../../data/atoms";
import rolesConfig from "../../data/rolesConfig";

import {
  addInfluencerAction,
  addSubscriptionAction,
  deleteSubscriptionAction,
  editInfluencerAction,
  editSubscriptionAction,
  fetchCategoriesAction,
} from "../../api/actions";
import NotyfContext from "../../contexts/notyf";

import PricesForm from "../PricesForm/PricesForm";
import CardFlat from "../CardFlat/CardFlat";

import styles from "./prices-form-container.css";

const PricesFormContainer = ({ defaultValues }) => {
  const [user] = useAtom(userAtom);
  const [categories, setCategories] = useState(null);
  const notyf = useContext(NotyfContext);

  const { mutate: addInfluencer } = useMutation(addInfluencerAction);
  const { mutate: editInfluencer } = useMutation(editInfluencerAction);
  const { mutate: addSubscription } = useMutation(addSubscriptionAction);
  const { mutate: editSubscription } = useMutation(editSubscriptionAction);
  const { mutate: deleteSubscription } = useMutation(deleteSubscriptionAction);
  const { query } = useQuery(fetchCategoriesAction);

  const onSubmit = async ({ influencer, prices }) => {
    console.log(influencer);
    if (user.role === rolesConfig.admin) {
      const redactedInfluencer = {
        ...influencer,
        countries: influencer.countries.filter(v => v !== ""),
        categories: Array.isArray(influencer.categories) ? influencer.categories.filter(v => (v !== "" && v._id !== "")) : (influencer.categories === "" ? undefined : influencer.categories),
      };

      const { payload: newInfluencer, error } = redactedInfluencer._id
        ? await trackPromise(editInfluencer(redactedInfluencer._id, redactedInfluencer))
        : await trackPromise(addInfluencer({ ...redactedInfluencer, _id: undefined }));

      if (error) return;
      influencer._id = newInfluencer._id;
    }

    const pricesMapped = prices
      .filter((price) => (price.isVisible || (price.price.amount && !price.isVisible) || price._id))
      .map((price) => ({ _id: price._id, isVisible: price.isVisible, user: price.user, influencer: influencer._id, price: price.price }));

    for (const price of pricesMapped) {
      if (!price.price.amount && price.isVisible && price._id) {
        let { error } = await trackPromise(deleteSubscription(price._id));

        if (error) return;

        price.price = (!price.price.amount || !price.isVisible) ? undefined : price.price;
        price.isVisible = undefined;

        error = (await trackPromise(addSubscription({ ...price, _id: undefined }))).error;
        if (error) return;
      } else if (!price.isVisible && price._id) {
        const { error } = await trackPromise(deleteSubscription(price._id));
        if (error) return;
      } else {
        price.price = (!price.price.amount || !price.isVisible) ? undefined : price.price;
        price.isVisible = undefined;

        const { error } = price._id
          ? await trackPromise(editSubscription(price._id, price))
          : await trackPromise(addSubscription({ ...price, _id: undefined }));

        if (error) return;
      }
    }

    notyf.success("Информация сохранена");

    if (history.length > 2) {
      history.back();
    } else {
      route("/market");
    }
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
