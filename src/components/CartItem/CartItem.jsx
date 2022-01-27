import clsx from "clsx";
import { useEffect, useState } from "preact/hooks";
import SwipeToDelete from 'react-swipe-to-delete-ios';

import trash from "../../assets/icons/trash.svg";

import styles from "./cart-item.css";
import CartItemElement from "../CartItemElement/CartItemElement";

const CartItem = ({ cartItem, onChangeQuantity, onDelete, className }) => {
    useEffect(() => {
        const deleteButtons = document.querySelectorAll('[id=delete-button]');

        console.log(deleteButtons);

        if (deleteButtons.length !== 0) {
            deleteButtons.forEach(button => {
                button.type = "button";
            });
        }
    }, []);

    return (
        <>
            <div className={clsx(styles.swipeWrapper, styles.showMobile)}>
                <SwipeToDelete
                    onDelete={() => { onDelete(cartItem); }}
                    deleteColor='var(--delete-button-color)' // default
                    deleteComponent={<img src={trash} style={{ userSelect: "none" }} />}
                >
                    <CartItemElement cartItem={cartItem} onChangeQuantity={onChangeQuantity} onDelete={() => { onDelete(cartItem); }} className={className} />
                </SwipeToDelete>
            </div>

            <CartItemElement cartItem={cartItem} onChangeQuantity={onChangeQuantity} onDelete={() => { onDelete(cartItem); }} className={clsx(className, styles.showDesktop)} />
        </>
    );
};

export default CartItem;