'use client'

import styles from './productItem.module.scss';
import {observer} from "mobx-react-lite";
import React from "react";
import IProductItemProps from '@/types/product/iProductItemProps'
import BtnApp from "@/shared/ui/button/btnApp";
import cart from "@/entities/card/cart";

const ProductItem: React.FC<IProductItemProps> = observer(({product}) => {
    const handleSetProduct = () => {
        cart.setProductInCart(product);
    }

    const handleDeleteProduct = () => {
        cart.deleteProductInCart(product.id);
    }

    return (
        <article className={styles['product-item']}>
            <div className={styles['product-item__left']}>
                <h2 className={styles['product-item__title']}>{product.title}</h2>
                <p className={styles['product-item__info']}>Цена: {product.price} руб.</p>
            </div>

            <div className={styles['product-item__right']}>
                {
                    product.state === "available" ? (
                        <BtnApp
                            text={'В корзину'}
                            img={'./img/icon/cart.svg'}
                            type={'button'}
                            onClick={handleSetProduct}/>
                    ) : (
                        <BtnApp
                            text={'Удалить с корзины'}
                            img={'./img/icon/cart.svg'}
                            type={'button'}
                            onClick={handleDeleteProduct}/>
                    )
                }
            </div>
        </article>
    )
});

export default ProductItem;