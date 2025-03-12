'use client'

import {useLayoutEffect} from "react";
import {redirect} from "next/navigation";
import order from '@/entities/order/model/order';
import user from "@/entities/user/user";
import ProductList from "@/widgets/product-list/ProductList";

export default function ProfilePage() {
    useLayoutEffect((): void => {
        const isAuth: boolean = user.isAuth;
        if(!isAuth){
            redirect("/")
        }
    }, [])

    return (
        <main>
            {order.orderData.length === 0 && (
                <h2 className={"alert"}>Товаров нету</h2>
            )}
            {order.orderData.length > 0 && (
                <ProductList orderData={order.orderData} type={"order"}/>
            )}
        </main>
    );
}