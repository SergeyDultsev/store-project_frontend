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

    const handleIncrementQuantity = () => {
        cart.incrementQuantity(product.id)
    }

    const handleDecrementQuantity = () => {
        cart.decrementQuantity(product.id)
    }

    return (
        <article className={styles['card-item']}>
            <div className={styles['card-item__left']}>
                <h2 className={styles['card-item__title']}>{product.title}</h2>
                <p className={styles['card-item__info']}>Цена: {product.price} руб.</p>
            </div>
            <div className={styles['card-item__right']}>
                <BtnApp text={"+"} type={"button"} onClick={handleIncrementQuantity}/>
                <p className={styles['card-item__info']}>{product.quantity}</p>
                <BtnApp text={"-"} type={"button"} onClick={handleDecrementQuantity}/>
                <BtnApp text={"Удалить"} type={"button"} onClick={handleDeleteProduct}/>
            </div>
        </article>
    )
});

export default CardItem;