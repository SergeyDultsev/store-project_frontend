'use client'

import styles from './OrderList.module.scss';
import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";
import OrderItem from "@/entities/order/ui/order-item/OrderItem";
import order from "@/entities/order/model/order";

const ProductList = observer(() => {
    useEffect(() => {
        order.getOrders();
    }, [])

    return (
        <section className={styles["order-list"]}>
            {order.orderData.map((product ) => (
                <OrderItem key={product.order_id} product={product} />
            ))}
        </section>
    );
});

export default ProductList;