'use client'

import styles from './productList.module.scss';
import {observer} from "mobx-react-lite";
import React from "react";
import IProductListProps from "@/types/product/IProductListProps";
import ProductItem from "@/entities/product/components/product-item/productItem";

const ProductList: React.FC<IProductListProps> = observer(({ products }) => {
    return (
        <section className={styles["product-list"]}>
            {products.map((product) => (
                <ProductItem key={product.id} product={product} />
            ))}
        </section>
    );
});

export default ProductList;