'use client'

import styles from './cartTotal.module.scss';
import {observer} from "mobx-react-lite";
import React from "react";


const CartTotal: React.FC = observer(() => {
    return (
        <section className={styles["card-total"]}>
            <div className={styles["card-total__info"]}>
                <p className={styles["card-total__info__title"]}>в корзине</p>
                <h2 className={styles["card-total__info__price"]}>16</h2>
            </div>
            <div className={styles["card-total__info"]}>
                <p className={styles["card-total__info__title"]}>общая цена</p>
                <h2 className={styles["card-total__info__price"]}>20000 руб</h2>
            </div>
        </section>
    )
})

export default CartTotal;