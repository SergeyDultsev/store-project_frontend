'use client'

import styles from './orderItem.module.scss';
import {observer} from "mobx-react-lite";
import React from "react";
import IOrderItemProps from "@/types/order/iOrderItemProps";

const OrderItem: React.FC<IOrderItemProps> = observer(({product}) => {
    return (
        <article className={styles['order-item']}>
            <div className={styles['order-item__left']}>
                <h2 className={styles['order-item__title']}>{product.product_name}</h2>
                <p className={styles['order-item__info']}>Приобретено в кол-ве: {product.quantity} шт.</p>
            </div>
        </article>
    )
});

export default OrderItem;