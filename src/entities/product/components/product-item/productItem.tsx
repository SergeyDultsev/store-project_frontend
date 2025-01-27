'use client'

import styles from './productItem.module.scss';
import {observer} from "mobx-react-lite";
import React from "react";
import IProductItemProps from '@/types/product/iProductItemProps'

const ProductItem: React.FC<IProductItemProps> = observer(({product}) => {
    return (
        <article className={styles['product-item']}>
            <h2 className={styles['product-item__title']}>{product.title}</h2>
            <p className={styles['product-item__info']}>Цена: {product.price} руб.</p>
        </article>
    )
});

export default ProductItem;