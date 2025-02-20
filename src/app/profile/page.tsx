'use client'

import {useEffect, useLayoutEffect} from "react";
import order from '@/entities/order/order';
import OrderList from "@/widgets/order-list/orderList";
import user from "@/entities/user/user";
import {redirect} from "next/navigation";

export default function Profile() {
    useLayoutEffect(() => {
        const isAuth = user.isAuth;
        if(!isAuth){
            redirect("/")
        }
    }, [])

    useEffect(() => {
        order.getOrders();
    }, []);

    return (
        <main>
            <OrderList/>
        </main>
    );
}