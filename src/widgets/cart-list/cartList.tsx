'use client'

import styles from './cartList.module.scss';
import {observer} from "mobx-react-lite";
import React from "react";
import CartItem from "@/entities/cart/components/cart-item/cartItem";
import cart from "@/entities/cart/cart";

const CartList = observer(() => {
    return (
        <section className={styles["cart-list"]}>
            {cart.cartData.map((product) => (
                <CartItem key={product.cart_id} product={product} />
            ))}
        </section>
    );
});

export default CartList;