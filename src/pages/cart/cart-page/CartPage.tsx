import React, {useEffect, useLayoutEffect} from "react";

import styles from './CartPage.module.scss';
import {redirect} from "next/navigation";
import user from "@/entities/user/user";
import cart from "@/entities/cart/model/cart";
import CartList from "@/widgets/cart-list/CartList";
import CartTotal from "@/widgets/cart-total/CartTotal";

export default function Profile() {
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
            <section className={styles['cart-wrapper']}>
                <div className={styles['cart-total__block']}>
                    <CartTotal/>
                </div>
                <CartList/>
            </section>
        </main>
    );
}