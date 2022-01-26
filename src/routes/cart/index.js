import { useContext, useEffect } from "preact/hooks";
import { useMutation, useQuery } from "react-fetching-library";
import { trackPromise } from "react-promise-tracker";

import { emptyCartAction, fetchCartAction } from "../../api/actions";

import { showConfirmEng } from "../../helpers/show-confirm";

import NotyfContext from "../../contexts/notyf";

import CartList from "../../components/CartList/CartList";
import CartTotal from "../../components/CartTotal/CartTotal";
import Header from "../../components/Header/Header";
import PageWrapper from "../../components/PageWrapper/PageWrapper";

import styles from "./style.css";

const Cart = () => {
    const notyf = useContext(NotyfContext);

    const { payload: cartInfo, error, loading } = useQuery(fetchCartAction, true);
    const { mutate: emptyCart } = useMutation(emptyCartAction);

    const onEmpty = async () => {
        const message = `Do you really want to empty the cart?`;
        const isConfirmed = await showConfirmEng(message);
        if (!isConfirmed) return;

        const { error } = await trackPromise(emptyCart());
        if (error) return;

        notyf.success("The cart has been emptied");
    };

    return (
        <>
            <Header />

            <PageWrapper title="Your cart">
                {error && <>An error occurred while loading the cart</>}
                {loading && <>Fethcing cart...</>}
                {(!error && !loading && !cartInfo?.items?.length) && <>Cart is empty</>}
                {cartInfo && cartInfo?.items.length && (
                    <form className={styles.wrapper} onSubmit={() => console.log("submit")}>
                        <CartList cartItems={cartInfo.items} />
                        <CartTotal cartTotal={cartInfo.total} onEmpty={onEmpty} />
                    </form>
                )}
            </PageWrapper>
        </>
    );
};

export default Cart;