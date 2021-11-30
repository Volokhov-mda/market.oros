import { useAtom } from "jotai";
import { route } from "preact-router";

import PriceCard from "../PriceCard/PriceCard";
import ButtonCard from "../ButtonCard/ButtonCard";

import { userAtom } from "../../data/atoms";

import styles from "./prices-grid.css";

const PricesGrid = ({ prices, onEdit, onDelete }) => {
  const [user] = useAtom(userAtom);

  const onAdd = () => route("/prices/add");

  return (
    <div className={styles.grid}>
      {!prices.length && !user?.isAdmin && (
        <div className={styles.error}>There are no prices at the moment.</div>
      )}

      {prices.map((price) => (
        <PriceCard
          {...price}
          key={price._id}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}

      {user?.isAdmin && (
        <ButtonCard type="add" value="Добавить инфлюенсера" onClick={onAdd} />
      )}
    </div>
  );
};

export default PricesGrid;
