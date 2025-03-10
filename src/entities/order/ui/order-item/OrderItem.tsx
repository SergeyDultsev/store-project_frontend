'use client'

import styles from './OrderItem.module.scss';
import {observer} from "mobx-react-lite";
import React from "react";
import IOrderItemProps from "@/entities/order/model/types/iOrderItemProps";

const OrderItem: React.FC<IOrderItemProps> = observer(({product}) => {
    return (
        <article className={styles['order-item']}>
            {product.image_url && <img
                className={styles['order-item__image']}
                src={product.image_url}
                alt={product.product_name}
                loading="lazy"
            />}
            <div className={styles['order-item__left']}>
                <h2 className={styles['order-item__title']}>{product.product_name}</h2>
                <p className={styles['order-item__info']}>Приобретено в кол-ве: {product.quantity} шт.</p>
            </div>
        </article>
    )
});

export default OrderItem;