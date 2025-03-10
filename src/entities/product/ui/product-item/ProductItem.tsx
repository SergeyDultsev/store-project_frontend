'use client'

import React from "react";
import {observer} from "mobx-react-lite";
import {useRouter} from "next/navigation";
import IProductItemProps from '@/entities/product/model/types/iProductItemProps';
import ICartProduct from "@/entities/cart/model/types/iCartProduct";
import styles from './ProductItem.module.scss';
import BtnApp from "@/shared/ui/button/btnApp";
import cart from "@/entities/cart/model/cart";
import user from "@/entities/user/user";

const ProductItem: React.FC<IProductItemProps> = observer(({ product }) => {
    const router =  useRouter();

    const handleSetProduct = (): void  => {
        user.isAuth === false ? router.push('/login') : cart.setProductInCart(product);
    }

    const handleDeleteProduct = (): void => {
        const cartItem: ICartProduct | undefined = cart.cartData.find(
            (item: ICartProduct): boolean => product.product_id === item.product_id
        );

        if(cartItem) cart.deleteProductInCart(cartItem.cart_id);
    }

    return (
        <article className={styles['product-item']}>
            <div className={styles['product-item__left']}>
                {product.image_url && <img
                    className={styles['product-item__image']}
                    src={product.image_url}
                    alt={product.product_name}
                    loading="lazy"
                />}
                <div className={styles['product-item__left-content']}>
                    <h2 className={styles['product-item__title']}>{product.product_name}</h2>
                    <p className={styles['product-item__info']}>Цена: {product.product_price} руб.</p>
                </div>
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