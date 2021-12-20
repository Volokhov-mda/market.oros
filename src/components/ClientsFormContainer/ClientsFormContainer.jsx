import { useContext, useEffect, useState } from "preact/hooks";
import { useMutation, useQuery } from "react-fetching-library";
import { trackPromise } from "react-promise-tracker";
import { route } from "preact-router";
import { useAtom } from "jotai";

import { userAtom } from "../../data/atoms";

import {
  addSubscriptionAction,
  createUserAction,
  editSubscriptionAction,
  deleteSubscriptionAction,
  editUserAction,
  fetchCategoriesAction,
} from "../../api/actions";
import NotyfContext from "../../contexts/notyf";

import ClientsForm from "../ClientsForm/ClientsForm";
import CardFlat from "../CardFlat/CardFlat";

import styles from "./clients-form-container.css";
import rolesConfig from "../../data/rolesConfig";

const ClientsFormContainer = ({ defaultValues }) => {
  const [user] = useAtom(userAtom);
  const [categories, setCategories] = useState(null);
  const notyf = useContext(NotyfContext);

  const { mutate: createUser } = useMutation(createUserAction);
  const { mutate: editUser } = useMutation(editUserAction);
  const { mutate: addSubscription } = useMutation(addSubscriptionAction);
  const { mutate: editSubscription } = useMutation(editSubscriptionAction);
  const { mutate: deleteSubscription } = useMutation(deleteSubscriptionAction);
  const { query } = useQuery(fetchCategoriesAction);

  const onSubmit = async ({ client, influencers }) => {
    if (user.role === rolesConfig.admin) {
      client.role = 2;
      const { payload: newClient, error } = client._id
        ? await trackPromise(editUser(client._id, client))
        : await trackPromise(createUser({ ...client, _id: undefined }));

      if (error) return;
      client._id = newClient._id;
    }

    const influencersMapped = influencers
      .filter((influencer) => (influencer.isVisible || (influencer.price.amount && !influencer.isVisible) || influencer._id))
      .map((influencer) => ({ _id: influencer._id, isVisible: influencer.isVisible, influencer: influencer.influencer, user: client._id, price: influencer.price }));

    for (const influencer of influencersMapped) {
      if (!influencer.price.amount && influencer.isVisible && influencer._id) {
        let { error } = await trackPromise(deleteSubscription(influencer._id));
        if (error) return;

        influencer.price = (!influencer.price.amount || !influencer.isVisible) ? undefined : influencer.price;
        influencer.isVisible = undefined;

        error = (await trackPromise(addSubscription({ ...influencer, _id: undefined }))).error;
        if (error) return;
      } else if (!influencer.isVisible && influencer._id) {
        const { error } = await trackPromise(deleteSubscription(influencer._id));
        if (error) return;
      } else {
        influencer.price = (!influencer.price.amount || !influencer.isVisible) ? undefined : influencer.price;
        influencer.isVisible = undefined;
        const { error } = influencer._id
          ? await trackPromise(editSubscription(influencer._id, influencer))
          : await trackPromise(addSubscription({ ...influencer, _id: undefined }));

        if (error) return;
      }

    }

    notyf.success("Информация сохранена");

    route("/clients");
  };

  const fetchCategories = async () => {
    const { payload, error } = await query();

    if (error) setCategories([]);

    setCategories(payload);
  }

  useEffect(() => { trackPromise(fetchCategories()); }, [])

  return (
    <CardFlat className={styles.card}>
      {categories && <ClientsForm categories={categories} onSubmit={onSubmit} defaultValues={defaultValues} />}
    </CardFlat>
  );
};

export default ClientsFormContainer;
