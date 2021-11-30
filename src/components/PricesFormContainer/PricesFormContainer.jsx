import { route } from "preact-router";
import { useContext } from "preact/hooks";
import { useMutation } from "react-fetching-library";
import { trackPromise } from "react-promise-tracker";

import {
  addInfluencerAction,
  addPriceAction,
  editInfluencerAction,
  editPriceAction,
} from "../../api/actions";
import NotyfContext from "../../contexts/notyf";

import PricesForm from "../PricesForm/PricesForm";
import Card from "../Card/Card";

import styles from "./prices-form-container.css";

const PricesFormContainer = ({ defaultValues }) => {
  const notyf = useContext(NotyfContext);

  const { mutate: addInfluencer } = useMutation(addInfluencerAction);
  const { mutate: addPrice } = useMutation(addPriceAction);
  const { mutate: editPrice } = useMutation(editPriceAction);
  const { mutate: editInfluencer } = useMutation(editInfluencerAction);

  const onSubmit = async ({ influencer, prices }) => {
    const { payload: newInfluencer, error } = influencer._id
      ? await trackPromise(editInfluencer(influencer._id, influencer))
      : await trackPromise(addInfluencer({ ...influencer, _id: undefined }));

    if (error) return;
    influencer._id = newInfluencer._id;

    for (const price of prices) {
      if (price.title === "" || price.value === "") continue;

      price.targetUser = price.targetUser._id;
      price.influencer = influencer._id;

      const { error } = price._id
        ? await trackPromise(editPrice(price._id, price))
        : await trackPromise(addPrice({ ...price, _id: undefined }));

      if (error) return;
    }

    notyf.success("Информация сохранена");
    route("/market");
  };

  return (
    <Card className={styles.card}>
      <PricesForm onSubmit={onSubmit} defaultValues={defaultValues} />
    </Card>
  );
};

export default PricesFormContainer;
