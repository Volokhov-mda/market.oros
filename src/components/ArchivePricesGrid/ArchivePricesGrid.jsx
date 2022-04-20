import { useAtom } from "jotai";

import { userAtom } from "../../data/atoms";
import FlexibleGrid from "../ShortableGrid/ShortableGrid";

import PriceCardArchive from "../PriceCardArchive/PriceCardArchive";

import styles from "./archive-prices-grid.css";

const ArchivePricesGrid = ({ prices, onEdit, onDelete, onRestore, ...props }) => {
  const [user] = useAtom(userAtom);

  return (
    <FlexibleGrid {...props}>
      {!prices.length && !user?.isAdmin && (
        <div className={styles.error}>There are no prices at the moment.</div>
      )}

      {prices.map((price, i) => (
        <PriceCardArchive
          {...price}
          key={price._id}
          name={i}
          onEdit={onEdit}
          onDelete={onDelete}
          onRestore={onRestore}
        />
      ))}
    </FlexibleGrid>
  );
};

export default ArchivePricesGrid;
