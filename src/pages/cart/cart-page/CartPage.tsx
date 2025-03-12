"use client"

import React, {useEffect, useLayoutEffect} from "react";
import styles from './CartPage.module.scss';
import {redirect} from "next/navigation";
import user from "@/entities/user/user";
import cart from "@/entities/cart/model/cart";
import CartTotal from "@/widgets/cart-total/CartTotal";
import ProductList from "@/widgets/product-list/ProductList";
import {observer} from "mobx-react-lite";

export default observer(function CartPage() {
    useLayoutEffect(() => {
        const isAuth = user.isAuth;
        if(!isAuth){
            redirect("/")
        }
    }, [])

    useEffect((): void  => {
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
                    <ProductList cartData={cart.cartData} type={"cart"}/>
                </section>
            )}
        </main>
    );
});