"use client";

import ProductList from "@/widgets/product-list/productList";
import product from "@/entities/product/product";

export default function Catalog() {
    return (
        <main>
            <ProductList products={product.productData}/>
        </main>
    );
}
