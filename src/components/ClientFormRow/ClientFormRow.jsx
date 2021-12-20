import clsx from "clsx";
import { useState } from "preact/hooks";
import Checkbox from "../Checkbox/Checkbox";
import Input from "../Input/Input";

import styles from "./client-form-row.css";

const ClientFormRow = ({ register, index, checked, disabled }) => {
  const [isChecked, setIsChecked] = useState(checked);
  const rowName = `influencers[${index}]`;

  return (
    <div className={styles.row}>
      <input type="hidden" {...register(`${rowName}._id`)} />
      <input type="hidden" {...register(`${rowName}.influencer`)} />

      <Input readOnly {...register(`${rowName}.nickname`)} />

      <div className={styles.value}>
        <Input className={clsx(styles.priceInput, !isChecked && styles.priceInputDisabled, disabled && styles.disabled)} placeholder=" " {...register(`${rowName}.price.amount`)} readOnly={disabled || !isChecked} />
        <input type="hidden" {...register(`${rowName}.price.currency`)} value="USD" />
        <input type="hidden" {...register(`${rowName}.price.description`)} value="1 promo-post" />
        <Checkbox {...register(`${rowName}.isVisible`) } checked={isChecked} onClick={() => { setIsChecked(!isChecked) }} />
      </div>
    </div>
  );
};

export default ClientFormRow;
