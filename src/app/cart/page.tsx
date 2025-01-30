'use client'

import styles from '@/widgets/cart-total/cartTotal.module.scss'
import CartTotal from "@/widgets/cart-total/cartTotal";
import cart from "@/entities/card/cart";
import {useEffect} from "react";
import CartList from "@/widgets/cart-list/cartList";

export default function Page() {

    useEffect(() => {
        cart.getTotalPrice();
        cart.getQuantityProduct();
    }, [])

    return (
        <main>
            <section className={styles['card-wrapper']}>
                <div className={styles['card-total__block']}>
                    <CartTotal />
                </div>
                <CartList products={cart.cartData}/>
            </section>
        </main>
    );
}