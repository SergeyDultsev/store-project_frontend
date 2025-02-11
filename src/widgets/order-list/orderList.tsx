'use client'

import styles from './orderList.module.scss';
import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";
import OrderItem from "@/entities/order/components/orderItem";
import order from "@/entities/order/order";

const ProductList = observer(() => {
    useEffect(() => {
        order.getOrders();
    }, [])

    return (
        <section className={styles["order-list"]}>
            {order.orderData.map((product ) => (
                <OrderItem key={product.product_id} product={product} />
            ))}
        </section>
    );
});

export default ProductList;