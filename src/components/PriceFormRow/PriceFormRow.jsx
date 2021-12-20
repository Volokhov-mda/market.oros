import clsx from "clsx";
import { useState } from "preact/hooks";
import Checkbox from "../Checkbox/Checkbox";
import Input from "../Input/Input";

import styles from "./price-form-row.css";

const PriceFormRow = ({ register, index, checked }) => {
  const [isChecked, setIsChecked] = useState(checked);
  const rowName = `prices[${index}]`;

  return (
    <div className={styles.row}>
      <input type="hidden" {...register(`${rowName}._id`)} />

      <Input readOnly {...register(`${rowName}.name`)} />
      <input type="hidden" {...register(`${rowName}._id`)} />

      <div className={styles.value}>
        <Input className={clsx(styles.priceInput, !isChecked && styles.priceInputDisabled)} placeholder=" " {...register(`${rowName}.price.amount`)} disabled={!isChecked} />
        <input type="hidden" {...register(`${rowName}.price.currency`)} value="USD" />
        <input type="hidden" {...register(`${rowName}.price.description`)} value="1 promo-post" />
        <Checkbox {...register(`${rowName}.isVisible`)} checked={isChecked} onClick={() => setIsChecked(!isChecked)} />
      </div>
    </div>
  );
};

export default PriceFormRow;
