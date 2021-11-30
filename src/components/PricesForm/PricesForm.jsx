import { useAtom } from "jotai";
import { useFieldArray, useForm } from "react-hook-form";

import { prevScrollPageState } from "../../data/atoms";

import FlatButton from "../FlatButton/FlatButton";
import Input from "../Input/Input";
import PriceFormRow from "../PriceFormRow/PriceFormRow";

import styles from "./prices-form.css";

const PricesForm = ({ onSubmit, defaultValues }) => {
  const [scrollState, setScrollState] = useAtom(prevScrollPageState);

  const goBack = () => {
    if (scrollState) {
      history.pushState({ elementId: scrollState.elementId }, "", scrollState.url);
      setScrollState(undefined);
      history.go();
    } else {
      history.back();
    }
  }

  const { handleSubmit, register, control } = useForm({ defaultValues });
  const { fields } = useFieldArray({ control, name: "prices" });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder="Никнейм" {...register("influencer.nickname")} />
      <input type="hidden" {...register("influencer._id")} />

      {fields.map((field, index) => (
        <PriceFormRow key={field.id} index={index} register={register} />
      ))}

      <div className={styles.buttons}>
        <FlatButton type="button" onClick={goBack}>
          Закрыть
        </FlatButton>
        <FlatButton accent>Сохранить</FlatButton>
      </div>
    </form>
  );
};

export default PricesForm;
