import clsx from "clsx";
import { useEffect, useState } from "preact/hooks";

import currencies from "../../data/currencies";
import formatPriceInputValue from "../../helpers/formatPriceInputValue";

import Checkbox from "../Checkbox/Checkbox";
import Input from "../Input/Input";

import styles from "./client-form-row.css";

const ClientFormRow = ({ register, index, checked, disabled, watch, getValues, }) => {
  const [isChecked, setIsChecked] = useState(checked);
  const rowName = `influencers[${index}]`;

  const [priceValue, setPriceValue] = useState(getValues(`${rowName}.price.amount`));
  const priceWatch = watch(`${rowName}.price.amount`);

  const currency = getValues(`${rowName}.price.currency`);

  useEffect(() => {
    setPriceValue(formatPriceInputValue(priceWatch, currencies[currency]));
  }, [priceWatch]);

  return (
    <div className={styles.row}>
      <input type="hidden" {...register(`${rowName}._id`)} />

      <div className={styles.influencerInfo}>
        <Checkbox {...register(`${rowName}.isVisible`)} checked={isChecked} onClick={() => { setIsChecked(!isChecked) }} />
        <Input className={clsx(styles.nameInput, !isChecked && styles.priceInputDisabled)} readOnly {...register(`${rowName}.nickname`)} />
        <input type="hidden" {...register(`${rowName}.influencer`)} />
      </div>

      <Input
        className={clsx(styles.priceInput, !isChecked && styles.priceInputDisabled, disabled && styles.disabled)}
        placeholder=" "
        {...register(`${rowName}.price.amount`)}
        value={priceValue}
        readOnly={disabled || !isChecked}
      />
      <input type="hidden" {...register(`${rowName}.price.currency`)} value="USD" />
      <input type="hidden" {...register(`${rowName}.price.description`)} value="1 promo-post" />
    </div>
  );
};

export default ClientFormRow;
