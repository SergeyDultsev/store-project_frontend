'use client'

import styles from './CartItem.module.scss';
import {observer} from "mobx-react-lite";
import React from "react";
import BtnApp from "@/shared/ui/button/btnApp";
import cart from "@/entities/cart/model/cart";
import ICartItemProps from "@/entities/cart/model/types/iCartItemProps";

const СartItem: React.FC<ICartItemProps> = observer(({product}) => {
    const handleDeleteProduct = () => {
        cart.deleteProductInCart(product.cart_id)
    }

    const handleIncrementQuantity = () => {
        cart.incrementQuantity(product.cart_id)
    }

    const handleDecrementQuantity = () => {
        cart.decrementQuantity(product.cart_id)
    }

    return (
        <article className={styles['cart-item']}>
            <div className={styles['cart-item__left']}>
                {product.image_url && <img
                    className={styles['cart-item__image']}
                    src={product.image_url}
                    alt={product.product_name}
                    loading="lazy"
                />}
                <div className={styles['cart-item__left-content']}>
                    <h2 className={styles['cart-item__title']}>{product.product_name}</h2>
                    <p className={styles['cart-item__info']}>Цена: {product.product_price} руб.</p>
                </div>
            </div>
            <div className={styles['cart-item__right']}>
                <BtnApp text={"+"} type={"button"} onClick={handleIncrementQuantity}/>
                <p className={styles['cart-item__info']}>{product.quantity}</p>
                <BtnApp text={"-"} type={"button"} onClick={handleDecrementQuantity}/>
                <BtnApp text={"Удалить"} type={"button"} onClick={handleDeleteProduct}/>
            </div>
        </article>
    )
});

export default СartItem;