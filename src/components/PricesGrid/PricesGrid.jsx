import { useContext, useEffect, useState } from "preact/hooks";
import { useAtom } from "jotai";
import { route } from "preact-router";
import { useParameterizedQuery, useQuery } from "react-fetching-library";
import { trackPromise } from "react-promise-tracker";

import useGAEventTracker from "../../hooks/use-ga-event-tracker";

import NotyfContext from "../../contexts/notyf";

import { addCartItem, fetchCartItemsAction, fetchCartTotalAction, } from "../../api/actions";

import rolesConfig from "../../data/rolesConfig";
import { cartItemsNumAtom, gridShortened, userAtom } from "../../data/atoms";

import PriceCardAdmin from "../PriceCardAdmin/PriceCardAdmin";
import PriceCardUser from "../PriceCardUser/PriceCardUser";
import AddCardFlat from "../AddCardFlat/AddCardFlat";
import ShortableGrid from "../ShortableGrid/ShortableGrid";
import FiltersMarket from "../FiltersMarket/FiltersMarket";

import styles from "./prices-grid.css";

const PricesGrid = ({ prices, onEdit, onDelete, onArchive, ...props }) => {
  const notyf = useContext(NotyfContext);
  const GAEventTrackerAddToCartButton = useGAEventTracker("Add to cart button click");

  const { query: addToCartQuery } = useParameterizedQuery(addCartItem);
  const { query: queryCartTotal } = useQuery(fetchCartTotalAction, false);
  const { query: queryCartItems } = useQuery(fetchCartItemsAction, false);

  const [user] = useAtom(userAtom);
  const [, setCartItemsNum] = useAtom(cartItemsNumAtom);
  const [isGridShortened] = useAtom(gridShortened);

  const [cartItems, setCartItems] = useState(undefined);

  const onAdd = () => route("/prices/add");

  const fetchCartItems = async () => {
    const { payload, error } = await trackPromise(queryCartItems());
    if (error) return;

    setCartItems(payload.items);
  };

  const onAddToCart = async ({ _id }) => {
    const { error: errorAddToCart } = await trackPromise(addToCartQuery({ subscription: _id, quantity: 1, }));
    if (errorAddToCart) return;

    const { payload, error: errorCartTotal } = await trackPromise(queryCartTotal());
    if (errorCartTotal) return;

    setCartItemsNum(payload.total.count);

    GAEventTrackerAddToCartButton("Influencer added to cart")
    notyf.success("Influencer has been added to the cart");
  };

  useEffect(() => {
    if (user.role === rolesConfig.client) {
      fetchCartItems();
    }
  }, []);

  return (
    <>
      <FiltersMarket className={styles.mobileFilters} show={isGridShortened} {...props} />
      <ShortableGrid>
        {!prices.length && !(user.role <= rolesConfig.manager) && (
          <div className={styles.error}>There are no prices at the moment.</div>
        )}

        {(user.role <= rolesConfig.manager) && (
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
              showAddToCartButton={user?.showCart}
              onAddToCart={onAddToCart}
              isInCart={cartItems?.find((cartItem) => cartItem.subscription._id === price.influencer._id)}
              key={i}
            />
          )
        ))}
      </ShortableGrid>
    </>
  );
};

export default PricesGrid;
