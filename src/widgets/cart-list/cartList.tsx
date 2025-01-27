'use client'

import styles from './cartList.module.scss';
import {observer} from "mobx-react-lite";
import React from "react";
import IProductListProps from "@/types/product/IProductListProps";
import CartItem from "@/entities/card/components/cart-item/cartItem";

const CartList: React.FC<IProductListProps> = observer(({ products }) => {
    return (
        <section className={styles["cart-list"]}>
            {products.map((product) => (
                <CartItem key={product.id} product={product} />
            ))}
        </section>
    );
});

export default CartList;