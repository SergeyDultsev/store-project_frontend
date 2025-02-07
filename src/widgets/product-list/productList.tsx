'use client'

import styles from './productList.module.scss';
import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";
import ProductItem from "@/entities/product/components/product-item/productItem";
import product from "@/entities/product/product";

const ProductList = observer(() => {

    useEffect(() => {
        product.getProducts();
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