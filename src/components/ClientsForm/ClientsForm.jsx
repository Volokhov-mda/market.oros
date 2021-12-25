import { route } from "preact-router";
import { useFieldArray, useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { useEffect } from "preact/hooks";
import clsx from "clsx";

import { userAtom } from "../../data/atoms";
import rolesConfig from "../../data/rolesConfig";

import generatePassword from "../../helpers/generate-password";

import Checkbox from "../Checkbox/Checkbox";
import FlatButton from "../FlatButton/FlatButton";
import Input from "../Input/Input";
import ClientFormRow from "../ClientFormRow/ClientFormRow";
import TitledGrid from "../TitledGrid/TitledGrid";


import styles from "./clients-form.css";

const ClientsForm = ({ onSubmit, defaultValues }) => {
  const [user] = useAtom(userAtom);
  const { handleSubmit, register, control, watch, getValues, setValue } = useForm({ defaultValues });
  const { fields } = useFieldArray({ control, name: "influencers" });

  const goBack = () => route("/clients");

  const clientName = watch("client.name");
  const showPrices = watch("client.showPrices");

  useEffect(() => {
    if (!defaultValues.client?.password) {
      if (!clientName) return setValue("client.password", "");
      setValue("client.password", generatePassword(clientName));
    }
  }, [clientName]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputs}>
        <div className={styles.gridSectionUserInfo}>
          <div className={clsx(styles.nicknameWrapper, user.role === rolesConfig.manager && styles.nicknameWrapperWithoutPassword)}>
            <Input placeholder="Имя клиента" {...{ readOnly: user.role !== rolesConfig.admin, ...register("client.name") }} />
            {user.role === rolesConfig.admin && <Input placeholder="Пароль" {...register("client.password")} />}
            <input type="hidden" {...register("client._id")} />
          </div>
        </div>

        <div className={styles.influencersWrapper}>
          <div className={styles.titledGridTwoColumns}>
            <div className={styles.columnsHeader}>
              <div className={styles.rowsTitle}>{user.role === rolesConfig.admin ? "Влиятели" : "Блогеры"}</div>
              <Checkbox className={styles.showPrice} markClassName={styles.showPriceMark} {...{ disabled: user.role !== rolesConfig.admin, ...register("client.showPrices") }}>
                Отображать цену
              </Checkbox>
            </div>
            <div className={styles.gridSection}>
              {fields.map((field, index) => field.isActive && (
                <ClientFormRow key={field.id} index={index} register={register} watch={watch} getValues={getValues} setValue={setValue} checked={field.isVisible} disabled={!showPrices} />
              ))}
            </div>
          </div>

          <TitledGrid gridGap={".5rem"} title={`Архивные ${user.role === rolesConfig.admin ? "влиятели" : "блогеры"}`} titleClassName={styles.rowsTitle} className={styles.gridSection}>
            {fields.map((field, index) => !field.isActive && (
              <ClientFormRow key={field.id} index={index} register={register} watch={watch} getValues={getValues} setValue={setValue} checked={field.isVisible} disabled={!showPrices} />
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

export default ClientsForm;
