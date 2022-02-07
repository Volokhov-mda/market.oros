import clsx from "clsx";
import { route } from "preact-router";
import { useFieldArray, useForm } from "react-hook-form";

import AutocompleteInputCountry from "../AutocompleteInputCountry/AutocompleteInputCountry";

import FlatButton from "../FlatButton/FlatButton";
import Input from "../Input/Input";
import MultipleSelect from "../MultipleSelect/MultipleSelect";
import PriceFormRow from "../PriceFormRow/PriceFormRow";
import Select from "../Select/Select";
import TitledGrid from "../TitledGrid/TitledGrid";

import styles from "./prices-form.css";

const PricesForm = ({ categories, onSubmit, defaultValues }) => {
  const goBack = () => {
    if (history.length > 2) {
      history.back();
    } else {
      route("/market");
    }
  }

  const { handleSubmit, register, watch, getValues, setValue, control } = useForm({ defaultValues });
  const categoriesSelected = getValues("influencer.categories");
  const { fields } = useFieldArray({ control, name: "prices" });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputs}>
        <div className={styles.gridSection}>
          <div className={styles.nicknameWrapper}>
            <Input placeholder="Никнейм" {...register("influencer.nickname")} />
            <input type="hidden" {...register("influencer._id")} />
          </div>

          <div className={styles.countriesWrapper}>
            <AutocompleteInputCountry placeholder="Страна" {...register("influencer.countries[0]")} watch={watch} />

            <AutocompleteInputCountry className={clsx(styles.opaquePlaceholder, styles.centeredPlaceholder)} placeholder="+" {...register("influencer.countries[1]")} watch={watch} />

            <AutocompleteInputCountry className={clsx(styles.opaquePlaceholder, styles.centeredPlaceholder)} placeholder="+" {...register("influencer.countries[2]")} watch={watch} />
          </div>

          <div className={styles.categoriesWrapper}>
            <MultipleSelect registerProps={register("influencer.categories")} values={categories} valuesSelected={categoriesSelected} />
          </div>
        </div>

        <div className={styles.clientsWrapper}>
          <TitledGrid gridGap={".5rem"} title="Активные" titleClassName={styles.rowsTitle} className={styles.gridSection}>
            {fields.length ? (
              fields.map((field, index) => field.isActive && (
                <PriceFormRow key={field.id} index={index} register={register} watch={watch} getValues={getValues} setValue={setValue} checked={field.isVisible} priceDisabled={!field.showPrices} />
              ))
            ) : (
              <div className={styles.hint}>Нет активных клиентов</div>
            )}
          </TitledGrid>

          <TitledGrid gridGap={".5rem"} title="Архивированные" titleClassName={styles.rowsTitle} className={styles.gridSection}>
            {fields.length ? (
              fields.map((field, index) => !field.isActive && (
                <PriceFormRow key={field.id} index={index} register={register} watch={watch} getValues={getValues} setValue={setValue} checked={field.isVisible} priceDisabled={!field.showPrices} />
              ))
            ) : (
              <div className={styles.hint}>Нет архивированных клиентов</div>
            )}
          </TitledGrid>
        </div>
      </div>

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
