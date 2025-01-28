'use client'

import styles from './cartItem.module.scss';
import {observer} from "mobx-react-lite";
import React from "react";
import IProductItemProps from '@/types/product/iProductItemProps'
import BtnApp from "@/shared/ui/button/btnApp";
import cart from "@/entities/card/cart";

const CardItem: React.FC<IProductItemProps> = observer(({product}) => {
    const handleDeleteProduct = () => {
        cart.deleteProductInCart(product.id)
    }

    return (
        <article className={styles['card-item']}>
            <div className={styles['card-item__left']}>
                <h2 className={styles['card-item__title']}>{product.title}</h2>
                <p className={styles['card-item__info']}>Цена: {product.price} руб.</p>
            </div>
            <div className={styles['card-item__right']}>
                <BtnApp text={"Удалить с корзины"} type={"button"} onClick={handleDeleteProduct}/>
            </div>
        </article>
    )
});

export default CardItem;