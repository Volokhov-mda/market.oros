import { useAtom } from "jotai";
import { route } from "preact-router";

import rolesConfig from "../../data/rolesConfig";

import { gridShortened, userAtom } from "../../data/atoms";

import PriceCardAdmin from "../PriceCardAdmin/PriceCardAdmin";
import PriceCardUser from "../PriceCardUser/PriceCardUser";
import AddCardFlat from "../AddCardFlat/AddCardFlat";
import ShortableGrid from "../ShortableGrid/ShortableGrid";
import FiltersMarket from "../FiltersMarket/FiltersMarket";

import styles from "./prices-grid.css";

const PricesGrid = ({ prices, onEdit, onDelete, onArchive, ...props }) => {
  const [user] = useAtom(userAtom);
  const [isGridShortened] = useAtom(gridShortened);

  const onAdd = () => route("/prices/add");

  return (
    <>
      <FiltersMarket className={styles.mobileFilters} show={isGridShortened} {...props} />
      <ShortableGrid>
        {!prices.length && !(user.role <= rolesConfig.manager) && (
          <div className={styles.error}>There are no prices at the moment.</div>
        )}

        {(user.role === rolesConfig.admin) && (
          <AddCardFlat onClick={onAdd} />
        )}


        {prices.map((price, i) => (
          (user.role <= rolesConfig.manager) ? (
            <PriceCardAdmin
              {...price}
              id={i}
              key={i}
              onEdit={onEdit}
              onDelete={onDelete}
              onArchive={onArchive}
            />
          ) : (
            <PriceCardUser
              {...price}
              key={i}
            />
          )
        ))}
      </ShortableGrid>
    </>
  );
};

export default PricesGrid;
