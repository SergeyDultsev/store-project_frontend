'use client'

import styles from './cartTotal.module.scss';

import {observer} from "mobx-react-lite";
import React from "react";
import cart from "@/entities/card/cart";
import BtnApp from "@/shared/ui/button/btnApp";


const CartTotal: React.FC = observer(() => {

    const handleCard = () => {

    }

    return (
        <section className={styles["card-total"]}>
            <div className={styles["card-total__top"]}>
                <div className={styles["card-total__info"]}>
                    <p className={styles["card-total__info__title"]}>в корзине</p>
                    <h2 className={styles["card-total__info__price"]}>{cart.countProducts}</h2>
                </div>
                <div className={styles["card-total__info"]}>
                    <p className={styles["card-total__info__title"]}>общая цена</p>
                    <h2 className={styles["card-total__info__price"]}>{cart.totalPrice} руб</h2>
                </div>

            </div>

            <BtnApp text={"Оформить заказ"} type={'button'} onClick={handleCard}/>
        </section>
    )
})

export default CartTotal;