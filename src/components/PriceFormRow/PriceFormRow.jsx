import clsx from "clsx";
import { useEffect, useState } from "preact/hooks";

import currencies from "../../data/currencies";
import formatPriceInputValue from "../../helpers/formatPriceInputValue";

import Checkbox from "../Checkbox/Checkbox";
import Input from "../Input/Input";

import styles from "./price-form-row.css";

const PriceFormRow = ({ register, index, checked, priceDisabled, getValues, setValue, }) => {
  const [isChecked, setIsChecked] = useState(checked);
  const rowName = `prices[${index}]`;

  const [priceValue, setPriceValue] = useState(undefined);

  const currency = currencies[getValues(`${rowName}.price.currency`)];

  const handlePriceInput = (value) => {
    setPriceValue(value);
    
    const formattedValue = formatPriceInputValue(value, currency);
    setPriceValue(formattedValue);
    setValue(`${rowName}.price.amount`, formattedValue);
  }

  useEffect(() => {
    handlePriceInput(getValues(`${rowName}.price.amount`));
  }, []);

  return (
    <div className={styles.row}>
      <input type="hidden" {...register(`${rowName}._id`)} />
      <input type="hidden" {...register(`${rowName}.user`)} />

      <div className={styles.influencerInfo}>
        <Checkbox {...register(`${rowName}.isVisible`)} checked={isChecked} onClick={() => setIsChecked(!isChecked)} />
        <Input className={clsx(styles.nameInput, !isChecked && styles.priceInputDisabled)} readOnly {...register(`${rowName}.name`)} />
        <input type="hidden" {...register(`${rowName}._id`)} />
      </div>

      <Input
        className={clsx(styles.priceInput, (!isChecked || priceDisabled) && styles.priceInputDisabled)}
        placeholder="$"
        {...register(`${rowName}.price.amount`)}
        value={priceValue}
        onInput={(e) => handlePriceInput(e.target.value, currency)}
        readOnly={!isChecked || priceDisabled}
      />
      <input type="hidden" {...register(`${rowName}.price.currency`)} value="USD" />
      <input type="hidden" {...register(`${rowName}.price.description`)} value="1 promo-post" />
    </div>
  );
};

export default PriceFormRow;
