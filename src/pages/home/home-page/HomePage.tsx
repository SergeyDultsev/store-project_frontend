'use client'

import {useEffect} from "react";
import ProductList from "@/widgets/product-list/ProductList";
import {observer} from "mobx-react-lite";
import user from "@/entities/user/user";
import product from "@/entities/product/model/product";
import cart from "@/entities/cart/model/cart";
import Cookies from "js-cookie";
import order from "@/entities/order/model/order";

export default observer(function HomePage() {
    useEffect((): void => {
        const token: string | undefined = Cookies.get("auth_token");
        if (!token) return;
        const response: Promise<void> = user.authorizationCheck();
        if (!response) Cookies.remove("auth_token");
    }, []);

    useEffect(() => {
        async function getProductData(): Promise<void> {
            await cart.getCartProducts();
            await product.getProducts();
            await order.getOrders();
        }
        getProductData();
    }, []);

    return (
        <main>
            {product.productData.length === 0 && (
                <h2 className={"alert"}>Товаров нету</h2>
            )}
            {product.productData.length > 0 && (
                <ProductList productData={product.productData} type={"product"}/>
            )}
        </main>
    );
});
