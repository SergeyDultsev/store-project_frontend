'use client'

import ProductList from "@/widgets/product-list/ProductList";
import {useEffect} from "react";
import user from "@/entities/user/user";
import product from "@/entities/product/model/product";
import Cookies from "js-cookie";

export default function HomePage() {

    useEffect(() => {
        const token = Cookies.get("auth_token");
        if (!token) return;
        const response = user.authorizationCheck();
        if (!response) Cookies.remove("auth_token");
    }, []);

    return (
        <main>
            {product.productData.length === 0 && (
                <h2 className={"alert"}>Товаров нету</h2>
            )}
            {product.productData.length > 0 && (
                <ProductList/>
            )}
        </main>
    );
}
