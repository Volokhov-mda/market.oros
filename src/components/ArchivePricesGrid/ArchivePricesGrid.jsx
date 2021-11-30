import { useAtom } from "jotai";

import { userAtom } from "../../data/atoms";

import PriceCardArchive from "../PriceCardArchive/PriceCardArchive";

import styles from "./archive-prices-grid.css";

const ArchivePricesGrid = ({ prices, onEdit, onDelete }) => {
  const [user] = useAtom(userAtom);

  return (
    <div className={styles.grid}>
      {!prices.length && !user?.isAdmin && (
        <div className={styles.error}>There are no prices at the moment.</div>
      )}

      {prices.map((price, i) => (
        <PriceCardArchive
          {...price}
          key={price._id}
          id={i}
          onEdit={onEdit}
          onDelete={onDelete}
          onRestore={() => { console.log("Restored", price); }}
        />
      ))}
    </div>
  );
};

export default ArchivePricesGrid;
