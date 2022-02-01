import { useContext, useEffect, useState } from "preact/hooks";
import { useMutation, useQuery } from "react-fetching-library";
import { trackPromise } from "react-promise-tracker";
import { route } from "preact-router";
import { useAtom } from "jotai";
import _ from "lodash";

import { userAtom } from "../../data/atoms";

import {
  addSubscriptionAction,
  createUserAction,
  editSubscriptionAction,
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
  const { query } = useQuery(fetchCategoriesAction);

  const onSubmit = async ({ client, influencers }) => {
    const isNewClient = !client._id;
    if (user.role === rolesConfig.admin) {
      client.role = 2;
      const { payload: newClient, error } = client._id
        ? await trackPromise(editUser(client._id, client))
        : await trackPromise(createUser({ ...client, _id: undefined }));

      if (error) return;
      client._id = newClient._id;
    }

    let errorPriceEmpty;

    const influencersMapped = influencers
      .map((influencer) => {
        if (!!influencer.price && !!influencer.price.amount) {
          influencer.price.amount = influencer.price.amount.toString().replace(/[^0-9]/g, "");
        }

        if (influencer.isVisible && client.showPrices && !influencer.price.amount && !errorPriceEmpty) {
          errorPriceEmpty = true;
        }

        return {
          _id: influencer._id || undefined,
          isVisible: influencer.isVisible,
          influencer: influencer.influencer,
          user: client._id,
          price: influencer.price?.amount ? influencer.price : undefined,
        }
      });

    if (errorPriceEmpty) {
      notyf.error(`У всех активных ${user.role === rolesConfig.admin ? "влиятелей" : "блогеров"} должна быть указана цена`);
      return;
    }

    if (isNewClient) {
      const { error } = await trackPromise(addSubscription(influencersMapped));
      if (error) return;
    } else {
      const influencersToEdit = influencersMapped
        .filter((influencer, i) => (!influencer._id || !_.isEqual(influencer.price, defaultValues.influencers[i].price) || influencer.isVisible !== defaultValues.influencers[i].isVisible))
        .map((influencer) => ({ ...influencer, price: influencer.price || null }));

      console.log(influencersToEdit[0]);

      for (const influencer of influencersToEdit) {
        const { error } = influencer._id
          ? await trackPromise(editSubscription(influencer._id, influencer))
          : await trackPromise(addSubscription(influencer));
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
