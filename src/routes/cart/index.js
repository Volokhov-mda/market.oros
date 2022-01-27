import { useContext, useEffect, useState } from "preact/hooks";
import { useMutation, useQuery } from "react-fetching-library";
import { trackPromise } from "react-promise-tracker";

import { cartItemsNumAtom, } from "../../data/atoms";

import { deleteCartItem, editCartItem, emptyCartAction, fetchCartAction, fetchCartTotalAction, submitCartAction } from "../../api/actions";

import { showConfirmEng } from "../../helpers/show-confirm";

import NotyfContext from "../../contexts/notyf";

import CartList from "../../components/CartList/CartList";
import CartTotal from "../../components/CartTotal/CartTotal";
import Header from "../../components/Header/Header";
import PageWrapper from "../../components/PageWrapper/PageWrapper";

import styles from "./style.css";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { route } from "preact-router";

const Cart = () => {
    const notyf = useContext(NotyfContext);

    const { register, handleSubmit } = useForm();

    const [, setCartItemsNum] = useAtom(cartItemsNumAtom);

    const { query: queryCart } = useQuery(fetchCartAction, false);
    const { query: queryCartTotal } = useQuery(fetchCartTotalAction, false);
    const { mutate: mutateEditCartItem } = useMutation(editCartItem);
    const { mutate: mutateDeleteCartItem } = useMutation(deleteCartItem);
    const { mutate: emptyCart } = useMutation(emptyCartAction);
    const { mutate: mutateSubmitCart } = useMutation(submitCartAction);

    const [cartItems, setCartItems] = useState(undefined);
    const [cartTotal, setCartTotal] = useState(undefined);

    const onFetchCart = async () => {
        const { payload, error } = await trackPromise(queryCart());
        if (error) return;

        setCartItems(payload.items);
        setCartTotal(payload.total);
        setCartItemsNum(payload.total.count);
    };

    const onFetchCartTotal = async () => {
        const { payload, error } = await trackPromise(queryCartTotal());
        if (error) return;

        setCartTotal(payload.total);
    };

    const onEditCartItem = async ({ _id }, quantity) => {
        const { error } = await trackPromise(mutateEditCartItem(_id, { quantity }));
        if (error) return;
    };

    const onDeleteCartItem = async ({ _id }) => {
        const { error } = await trackPromise(mutateDeleteCartItem(_id));
        if (error) return;

        notyf.success("Influencer has been removed from the cart");
        
        await onFetchCart();
    };

    const onEmpty = async () => {
        const message = `Do you really want to empty the cart?`;
        const isConfirmed = await showConfirmEng(message);
        if (!isConfirmed) return;

        const { error } = await trackPromise(emptyCart());
        if (error) return;

        notyf.success("The cart has been emptied");
        
        await trackPromise(onFetchCart());
    };
    
    const onChangeQuantity = async (cartItem, quantity) => {
        await onEditCartItem(cartItem, quantity);
        await onFetchCartTotal();
    };

    const onSubmit = async (data) => {
        if (!data.manager) {
            notyf.error("Enter the name of manager to create order");
            return;
        }

        const { error } = await trackPromise(mutateSubmitCart(data));
        if (error) return;

        
        notyf.success("The order has been created");
        route("/market?page=1");
    };

    useEffect(() => {
        onFetchCart();
    }, []);

    return (
        <>
            <Header />

            <PageWrapper title="Your cart">
                {(!cartItems?.length) && <>Cart is empty</>}
                <form className={styles.wrapper} onInput={onFetchCart} onSubmit={handleSubmit(onSubmit)}>
                    <CartList cartItems={cartItems} onChangeQuantity={onChangeQuantity} onDelete={onDeleteCartItem} />
                    {cartItems && cartTotal && cartItems.length ? (
                        <CartTotal register={register} cartTotal={cartTotal} onEmpty={onEmpty} />
                    ) : null}
                </form>
            </PageWrapper>
        </>
    );
};

export default Cart;