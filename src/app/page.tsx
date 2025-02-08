"use client";

import ProductList from "@/widgets/product-list/productList";
import {useEffect} from "react";
import user from "@/entities/user/user";

export default function Catalog() {

    useEffect(() => {
        user.authorizationCheck();
    }, []);

    return (
        <main>
            <ProductList/>
        </main>
    );
}
