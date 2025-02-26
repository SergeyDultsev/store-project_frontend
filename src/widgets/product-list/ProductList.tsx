'use client'

import styles from './ProductList.module.scss';
import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";
import ProductItem from "@/entities/product/ui/product-item/ProductItem";
import product from "@/entities/product/model/product";
import cart from '@/entities/cart/model/cart';

const ProductList = observer(() => {

    useEffect(() => {
        product.getProducts();
        cart.getCartProducts();
    }, [])

    return (
        <section className={styles["product-list"]}>
            {product.productData.map((product) => (
                <ProductItem key={product.product_id} product={product} />
            ))}
        </section>
    );
});

export default ProductList;