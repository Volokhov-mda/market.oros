import Checkbox from "../Checkbox/Checkbox";
import Input from "../Input/Input";
import Select from "../Select/Select";

import styles from "./price-form-row.css";

const PriceFormRow = ({ register, index }) => {
  // console.log(a);

  const rowName = `prices.${index}`;

  return (
    <div className={styles.row}>
      <input type="hidden" {...register(`${rowName}._id`)} />

      <Input readOnly {...register(`${rowName}.targetUser.name`)} />
      <input type="hidden" {...register(`${rowName}.targetUser._id`)} />

      <Select placeholder="Описание" {...register(`${rowName}.title`)}>
        <option value="Reach">Reach</option>
        <option value="1 promo-post">1 promo-post</option>
      </Select>

      <div className={styles.value}>
        <Input placeholder="Значение" {...register(`${rowName}.value`)} />
        <Checkbox {...register(`${rowName}.isVisible`)} />
      </div>
    </div>
  );
};

export default PriceFormRow;
