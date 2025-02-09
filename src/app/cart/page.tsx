'use client'

import styles from '@/widgets/cart-total/cartTotal.module.scss'
import CartTotal from "@/widgets/cart-total/cartTotal";
import cart from "@/entities/cart/cart";
import {useEffect} from "react";
import CartList from "@/widgets/cart-list/cartList";

export default function Page() {

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