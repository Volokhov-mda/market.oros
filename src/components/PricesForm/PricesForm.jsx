import clsx from "clsx";
import { useAtom } from "jotai";
import { route } from "preact-router";
import { useFieldArray, useForm } from "react-hook-form";
import { userAtom } from "../../data/atoms";
import rolesConfig from "../../data/rolesConfig";

import AutocompleteInputCountry from "../AutocompleteInputCountry/AutocompleteInputCountry";

import FlatButton from "../FlatButton/FlatButton";
import Input from "../Input/Input";
import PriceFormRow from "../PriceFormRow/PriceFormRow";
import Select from "../Select/Select";
import TitledGrid from "../TitledGrid/TitledGrid";

import styles from "./prices-form.css";

const PricesForm = ({ categories, onSubmit, defaultValues }) => {
  const [user] = useAtom(userAtom);

  const goBack = () => {
    if (history.length > 2) {
      history.back();
    } else {
      route("/market");
    }
  }

  const { handleSubmit, register, control } = useForm({ defaultValues });
  const { fields } = useFieldArray({ control, name: "prices" });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputs}>
        <div className={styles.gridSection}>
          <div className={styles.nicknameWrapper}>
            <Input readOnly={user.role === rolesConfig.manager} placeholder="Никнейм" {...register("influencer.nickname")} />
            <input type="hidden" {...register("influencer._id")} />
          </div>

          <div className={styles.countriesWrapper}>
            <AutocompleteInputCountry readOnly={user.role === rolesConfig.manager} placeholder="Страна" {...register("influencer.countries[0]")} />

            <AutocompleteInputCountry readOnly={user.role === rolesConfig.manager} className={clsx(styles.opaquePlaceholder, styles.centeredPlaceholder)} placeholder="+" {...register("influencer.countries[1]")} />

            <AutocompleteInputCountry readOnly={user.role === rolesConfig.manager} className={clsx(styles.opaquePlaceholder, styles.centeredPlaceholder)} placeholder="+" {...register("influencer.countries[2]")} />
          </div>

          <div className={styles.categoriesWrapper}>
            <Select disabled={user.role === rolesConfig.manager} placeholder="Выбор категории" {...register("influencer.categories[0]._id")}>
              {categories.map((category, i) => (
                <option key={i} value={category._id}>{category.name}</option>
              ))}
            </Select>
          </div>
        </div>

        <div className={styles.clientsWrapper}>
          <TitledGrid gridGap={".5rem"} title="Архивированные" titleClassName={styles.rowsTitle} className={styles.gridSection}>
            {fields.map((field, index) => field.isActive && (
              <PriceFormRow key={field.id} index={index} register={register} checked={field.isVisible} />
            ))}
          </TitledGrid>

          <TitledGrid gridGap={".5rem"} title="Архивированные" titleClassName={styles.rowsTitle} className={styles.gridSection}>
            {fields.map((field, index) => !field.isActive && (
              <PriceFormRow key={field.id} index={index} register={register} checked={field.isVisible} />
            ))}
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
