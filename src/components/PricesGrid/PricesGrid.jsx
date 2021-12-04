import { useAtom } from "jotai";
import { route } from "preact-router";

// import PriceCard from "../PriceCard/PriceCard";
// import ButtonCard from "../ButtonCard/ButtonCard";

import { userAtom } from "../../data/atoms";

import PriceCardAdmin from "../PriceCardAdmin/PriceCardAdmin";
import PriceCardUser from "../PriceCardUser/PriceCardUser";
import AddCardFlat from "../AddCardFlat/AddCardFlat";
import FlexibleGrid from "../ShortableGrid/ShortableGrid";

import styles from "./prices-grid.css";

const PricesGrid = ({ prices, onEdit, onDelete }) => {
  const [user] = useAtom(userAtom);

  const onAdd = () => route("/prices/add");

  return (
    <FlexibleGrid>
      {!prices.length && !user?.isAdmin && (
        <div className={styles.error}>There are no prices at the moment.</div>
      )}

      {(user?.isAdmin || user?.isModerator) && (
        <AddCardFlat onClick={onAdd} />
      )}

      {prices.map((price, i) => (
        (user.isAdmin || user.isModerator) ? (
          <PriceCardAdmin
            {...price}
            id={i}
            key={i}
            onEdit={onEdit}
            onDelete={onDelete}
            onArchive={() => { console.log("Archived", price); }}
          />
        ) : (
          <PriceCardUser
            {...price}
            key={i}
            onEdit={onEdit}
            onDelete={onDelete}
            flags={["ru", "ge", "cz"]}
          />
        )
      ))}
    </FlexibleGrid>
  );
};

export default PricesGrid;
