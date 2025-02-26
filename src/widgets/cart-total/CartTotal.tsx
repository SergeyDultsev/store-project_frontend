'use client'

import styles from './CartTotal.module.scss';

import {observer} from "mobx-react-lite";
import React from "react";
import cart from "@/entities/cart/model/cart";
import BtnApp from "@/shared/ui/button/btnApp";
import order from "@/entities/order/model/order";


const CartTotal: React.FC = observer(() => {

    const handleCard = () => {
        order.setOrders();
    }

    return (
        <section className={styles["cart-total"]}>
            <div className={styles["cart-total__top"]}>
                <div className={styles["cart-total__info"]}>
                    <p className={styles["cart-total__info__title"]}>в корзине</p>
                    <h2 className={styles["cart-total__info__price"]}>{cart.countProducts}</h2>
                </div>
                <div className={styles["cart-total__info"]}>
                    <p className={styles["cart-total__info__title"]}>общая цена</p>
                    <h2 className={styles["cart-total__info__price"]}>{cart.totalPrice} руб</h2>
                </div>
            </div>

            <BtnApp text={"Оформить заказ"} type={'button'} onClick={handleCard}/>
        </section>
    )
})

export default CartTotal;