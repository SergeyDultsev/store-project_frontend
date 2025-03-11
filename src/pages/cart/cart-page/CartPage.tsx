"use client"

import React, {useEffect, useLayoutEffect} from "react";
import styles from './CartPage.module.scss';
import {redirect} from "next/navigation";
import user from "@/entities/user/user";
import cart from "@/entities/cart/model/cart";
import CartList from "@/widgets/cart-list/CartList";
import CartTotal from "@/widgets/cart-total/CartTotal";

export default function CartPage() {
    useLayoutEffect(() => {
        const isAuth = user.isAuth;
        if(!isAuth){
            redirect("/")
        }
    }, [])

    useEffect(() => {
        cart.getCartProducts();
        cart.getTotalPrice();
        cart.getQuantityProduct();
    }, [])

    return (
        <main>
            {cart.cartData.length === 0 && (
                <h2 className={"alert"}>Товаров нету</h2>
            )}
            {cart.cartData.length > 0 && (
                <section className={styles['cart-wrapper']}>
                    <div className={styles['cart-total__block']}>
                        <CartTotal/>
                    </div>
                    <CartList/>
                </section>
            )}
        </main>
    );
}