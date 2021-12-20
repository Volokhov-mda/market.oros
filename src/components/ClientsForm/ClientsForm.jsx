import { route } from "preact-router";
import { useFieldArray, useForm } from "react-hook-form";

import generatePassword from "../../helpers/generate-password";

import Checkbox from "../Checkbox/Checkbox";
import FlatButton from "../FlatButton/FlatButton";
import Input from "../Input/Input";
import ClientFormRow from "../ClientFormRow/ClientFormRow";
import TitledGrid from "../TitledGrid/TitledGrid";
import { useAtom } from "jotai";

import { userAtom } from "../../data/atoms";
import rolesConfig from "../../data/rolesConfig";

import styles from "./clients-form.css";
import { useEffect } from "preact/hooks";

const ClientsForm = ({ onSubmit, defaultValues }) => {
  const [user] = useAtom(userAtom);
  const { handleSubmit, register, control, watch, setValue } = useForm({ defaultValues });
  const { fields } = useFieldArray({ control, name: "influencers" });

  const goBack = () => route("/clients");

  const clientName = watch("client.name");
  const showPrices = watch("client.showPrices");

  useEffect(() => {
    if (!defaultValues.client?.password) {
      if (!clientName) return setValue("client.password", "");
      setValue("client.password", generatePassword(clientName));
    }
  }, [clientName])

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputs}>
        <div className={styles.gridSectionUserInfo}>
          <div className={styles.nicknameWrapper}>
            <Input placeholder="Имя клиента" {...{ readOnly: user.role !== rolesConfig.admin, ...register("client.name") }} />
            {user.role === rolesConfig.admin && <Input placeholder="Пароль" {...register("client.password")} />}
            <input type="hidden" {...register("client._id")} />
          </div>

          <div className={styles.showPriceWrapper}>
            <Checkbox className={styles.showPrice} {...{ disabled: user.role !== rolesConfig.admin, ...register("client.showPrices") }}>
              Отображать цену
            </Checkbox>
          </div>
        </div>

        <TitledGrid gridGap={".5rem"} title="Блоггеры" titleClassName={styles.rowsTitle} className={styles.gridSection}>
          {fields.map((field, index) => field.isActive && (
            <ClientFormRow key={field.id} index={index} register={register} checked={field.isVisible} disabled={!showPrices} />
          ))}
        </TitledGrid>

        <TitledGrid gridGap={".5rem"} title="Архивные блоггеры" titleClassName={styles.rowsTitle} className={styles.gridSection}>
          {fields.map((field, index) => !field.isActive && (
            <ClientFormRow key={field.id} index={index} register={register} checked={field.isVisible} disabled={!showPrices} />
          ))}
        </TitledGrid>
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
