import { useAtom } from "jotai";
import { route } from "preact-router";

import PriceCard from "../PriceCard/PriceCard";
import ButtonCard from "../ButtonCard/ButtonCard";

import { userAtom } from "../../data/atoms";

import styles from "./prices-grid.css";
import PriceCardAdmin from "../PriceCardAdmin/PriceCardAdmin";
import PriceCardUser from "../PriceCardUser/PriceCardUser";
import AddCardFlat from "../AddCardFlat/AddCardFlat";

const PricesGrid = ({ prices, onEdit, onDelete }) => {
  const [user] = useAtom(userAtom);

  const onAdd = () => route("/prices/add");

  return (
    <div className={styles.grid}>
      {!prices.length && !user?.isAdmin && (
        <div className={styles.error}>There are no prices at the moment.</div>
      )}

      {/* <ButtonCard type="add" value="Добавить инфлюенсера" onClick={onAdd} /> */}
      {(user?.isAdmin || user?.isModerator) && (
        <AddCardFlat onClick={onAdd} />
      )}

      {prices.map((price, i) => (
        (user.isAdmin || user.isModerator) ? (
          <PriceCardAdmin
            {...price}
            key={price._id}
            id={i}
            onEdit={onEdit}
            onDelete={onDelete}
            onArchive={() => { console.log("Archived", price); }}
          />
        ) : (
          <PriceCardUser
            {...price}
            key={price._id}
            onEdit={onEdit}
            onDelete={onDelete}
            flags={["ru", "ge", "cz"]}
          />
        )
      ))}
    </div>
  );
};

export default PricesGrid;
