import {useEffect, useLayoutEffect} from "react";
import {redirect} from "next/navigation";
import OrderList from "@/widgets/order-list/OrderList";
import order from '@/entities/order/model/order';
import user from "@/entities/user/user";

export default function ProfilePage() {
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