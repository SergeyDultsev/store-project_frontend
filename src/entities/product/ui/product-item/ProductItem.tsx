'use client'

import styles from './ProductItem.module.scss';
import {observer} from "mobx-react-lite";
import React from "react";
import IProductItemProps from '@/shared/types/product/iProductItemProps'
import BtnApp from "@/shared/ui/button/btnApp";
import cart from "@/entities/cart/model/cart";
import ICartProduct from "@/entities/cart/model/types/cart/iCartProduct";

const ProductItem: React.FC<IProductItemProps> = observer(({product }) => {
    const handleSetProduct = (): void  => {
        cart.setProductInCart(product);
    }

    const handleDeleteProduct = (): void => {
        const cartItem: ICartProduct | undefined = cart.cartData.find(
            (item: ICartProduct): boolean => product.product_id === item.product_id
        );

        cart.deleteProductInCart(cartItem.cart_id);
    }

    return (
        <article className={styles['product-item']}>
            <div className={styles['product-item__left']}>
                <h2 className={styles['product-item__title']}>{product.product_name}</h2>
                <p className={styles['product-item__info']}>Цена: {product.product_price} руб.</p>
            </div>

            <div className={styles['product-item__right']}>
                {
                    product.product_state === "available" ? (
                        <BtnApp
                            text={'В корзину'}
                            type={'button'}
                            onClick={handleSetProduct}/>
                    ) : (
                        <BtnApp
                            text={'Удалить с корзины'}
                            type={'button'}
                            onClick={handleDeleteProduct}/>
                    )
                }
            </div>
        </article>
    )
});

export default ProductItem;