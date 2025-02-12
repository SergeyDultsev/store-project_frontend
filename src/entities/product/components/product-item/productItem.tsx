'use client'

import styles from './productItem.module.scss';
import {observer} from "mobx-react-lite";
import React from "react";
import IProductItemProps from '@/types/product/iProductItemProps'
import BtnApp from "@/shared/ui/button/btnApp";
import cart from "@/entities/cart/cart";
import ICartProduct from "@/types/cart/iCartProduct";

const ProductItem: React.FC<IProductItemProps> = observer(({product}) => {
    const handleSetProduct = () => {
        cart.setProductInCart(product);
    }

    const handleDeleteProduct = () => {
        const cartItem: ICartProduct | undefined = cart.cartData.find(
            (item: ICartProduct) => product.product_id === item.product_id
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