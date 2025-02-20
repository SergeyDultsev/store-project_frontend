'use client'

import styles from '@/widgets/cart-total/cartTotal.module.scss'
import CartTotal from "@/widgets/cart-total/cartTotal";
import cart from "@/entities/cart/cart";
import {useEffect, useLayoutEffect} from "react";
import CartList from "@/widgets/cart-list/cartList";
import user from "@/entities/user/user";
import {redirect} from "next/navigation";

export default function Page() {
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
                    <CartTotal />
                </div>
                <CartList/>
            </section>
        </main>
    );
}