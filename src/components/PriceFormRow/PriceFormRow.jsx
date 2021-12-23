import clsx from "clsx";
import { useEffect, useState } from "preact/hooks";

import currencies from "../../data/currencies";
import formatPriceInputValue from "../../helpers/formatPriceInputValue";

import Checkbox from "../Checkbox/Checkbox";
import Input from "../Input/Input";

import styles from "./price-form-row.css";

const PriceFormRow = ({ register, index, checked, priceDisabled, watch, getValues, }) => {
  const [isChecked, setIsChecked] = useState(checked);
  const rowName = `prices[${index}]`;

  const [priceValue, setPriceValue] = useState(getValues(`${rowName}.price.amount`));
  const priceWatch = watch(`${rowName}.price.amount`);

  useEffect(() => {
    setPriceValue(formatPriceInputValue(priceWatch, currencies[getValues(`${rowName}.price.currency`)]));
  }, [priceWatch]);

  return (
    <div className={styles.row}>
      <input type="hidden" {...register(`${rowName}._id`)} />

      <div className={styles.influencerInfo}>
        <Checkbox {...register(`${rowName}.isVisible`)} checked={isChecked} onClick={() => setIsChecked(!isChecked)} />
        <Input className={clsx(styles.nameInput, !isChecked && styles.priceInputDisabled)} readOnly {...register(`${rowName}.name`)} />
        <input type="hidden" {...register(`${rowName}._id`)} />
      </div>

      <Input
        className={clsx(styles.priceInput, (!isChecked || priceDisabled) && styles.priceInputDisabled)}
        placeholder=" "
        {...register(`${rowName}.price.amount`)}
        value={priceValue}
        readOnly={!isChecked || priceDisabled}
      />
      <input type="hidden" {...register(`${rowName}.price.currency`)} value="USD" />
      <input type="hidden" {...register(`${rowName}.price.description`)} value="1 promo-post" />
    </div>
  );
};

export default PriceFormRow;
