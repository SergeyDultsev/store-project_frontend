'use client'

import styles from './productItem.module.scss';
import {observer} from "mobx-react-lite";
import React from "react";
import IProductItemProps from '@/types/product/iProductItemProps'
import BtnApp from "@/shared/ui/button/btnApp";

const ProductItem: React.FC<IProductItemProps> = observer(({product}) => {
    const handleProduct = () => {

    }

    return (
        <article className={styles['product-item']}>
            <h2 className={styles['product-item__title']}>{product.title}</h2>
            <p className={styles['product-item__info']}>Цена: {product.price} руб.</p>
            <BtnApp text={'В корзину'} img={'./img/icon/cart.svg'} type={'button'} onClick={handleProduct} />
        </article>
    )
});

export default ProductItem;