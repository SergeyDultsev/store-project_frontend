'use client'

import styles from './CartList.module.scss';
import {observer} from "mobx-react-lite";
import React from "react";
import ArtItem from "@/entities/cart/ui/cart-item/СartItem";
import cart from "@/entities/cart/model/cart";

const CartList = observer(() => {
    return (
        <section className={styles["cart-list"]}>
            {cart.cartData.map((product) => (
                <ArtItem key={product.cart_id} product={product} />
            ))}
        </section>
    );
});

export default CartList;