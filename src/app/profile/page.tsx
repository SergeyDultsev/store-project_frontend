'use client'

import {useEffect} from "react";
import order from '@/entities/order/order';
import OrderList from "@/widgets/order-list/orderList";

export default function Profile() {
    useEffect(() => {
        order.getOrders();
    }, []);

    return (
        <main>
            <OrderList/>
        </main>
    );
}